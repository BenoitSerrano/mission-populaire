import { In } from 'typeorm';
import { dataSource } from '../../dataSource';
import { Mission } from '../mission';
import { User } from '../user';
import { Application } from './Application.entity';
import { applicationDtoType } from './types';
import { buildMissionService } from '../mission/mission.service';

export { buildApplicationService };

function buildApplicationService() {
    const applicationRepository = dataSource.getRepository(Application);
    const applicationService = {
        createApplication,
        retrieveApplication,
        getJobOfferApplicationById,
        getMappedApplicationCountByMission,
        retrieveApplications,
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
