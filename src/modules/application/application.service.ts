import { In, Not } from 'typeorm';
import { dataSource } from '../../dataSource';
import { Mission } from '../mission';
import { User } from '../user';
import { Application } from './Application.entity';
import { applicationDtoType } from './types';
import { buildMissionService } from '../mission/mission.service';
import { eventEmitter } from '../../events/event.emitter';

export { buildApplicationService };

function buildApplicationService() {
    const applicationRepository = dataSource.getRepository(Application);
    const applicationService = {
        getJobOfferApplicationById,
        retrieveApplication,
        retrieveApplications,
        getMappedApplicationCountByMission,
        pickApplication,
        createApplication,
    };

    function createApplication(applicationDto: applicationDtoType) {
        return applicationRepository.insert({
            mission: { id: applicationDto.missionId },
            user: applicationDto.user,
            content: applicationDto.content,
            status: 'pending',
        });
    }

    async function getJobOfferApplicationById(applicationId: Application['id']) {
        const missionService = buildMissionService();
        const applicationWithUserAndMission = await applicationRepository.findOneOrFail({
            where: { id: applicationId },
            relations: { user: true, mission: true },
        });
        const { user, mission, ...application } = applicationWithUserAndMission;
        const jobOffer = missionService.convertMissionToJobOffer(mission, user);
        return { application, user, jobOffer };
    }

    function retrieveApplication(
        missionId: Mission['id'],
        userId: User['id'],
    ): Promise<Application | null> {
        return applicationRepository.findOneBy({
            mission: { id: missionId },
            user: { id: userId },
        });
    }

    async function pickApplication(criteria: {
        missionId: Mission['id'];
        applicationId: Application['id'];
        userId: User['id'];
    }) {
        const acceptedApplications = await applicationRepository.count({
            where: { mission: { id: criteria.missionId }, status: 'accepted' },
        });
        if (acceptedApplications > 0) {
            throw new Error(`Could not accept several applications for the same mission`);
        }
        await applicationRepository.update({ id: criteria.applicationId }, { status: 'accepted' });
        await applicationRepository.update(
            { id: Not(criteria.applicationId), mission: { id: criteria.missionId } },
            { status: 'declined' },
        );
        eventEmitter.APPLICATION_PICKED.emit({
            applicationId: criteria.applicationId,
            missionId: criteria.missionId,
            userId: criteria.userId,
        });
        return { ok: true };
    }

    async function getMappedApplicationCountByMission(missionIds: Mission['id'][]) {
        const applications = await applicationRepository.find({
            where: { mission: { id: In(missionIds) } },
            select: { id: true, mission: { id: true } },
            relations: { mission: true },
        });
        const mappedApplicationCount: Record<Mission['id'], number> = {};
        for (const missionId of missionIds) {
            const count = applications.filter(
                (application) => application.mission.id === missionId,
            ).length;
            mappedApplicationCount[missionId] = count;
        }
        return mappedApplicationCount;
    }

    function retrieveApplications(missionId: Mission['id']): Promise<Application[]> {
        return applicationRepository.find({
            where: {
                mission: { id: missionId },
            },
            relations: { user: true },
        });
    }

    return applicationService;
}
