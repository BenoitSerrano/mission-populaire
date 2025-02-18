import { dataSource } from '../../dataSource';
import { Mission } from '../mission';
import { User } from '../user';
import { Application } from './Application.entity';
import { applicationDtoType } from './types';

export { buildApplicationService };

function buildApplicationService() {
    const applicationRepository = dataSource.getRepository(Application);
    const applicationService = {
        createApplication,
        retrieveApplication,
    };

    function createApplication(applicationDto: applicationDtoType) {
        return applicationRepository.insert({
            mission: { id: applicationDto.missionId },
            user: applicationDto.user,
            content: applicationDto.content,
            status: 'pending',
        });
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

    return applicationService;
}
