import { dataSource } from '../../dataSource';
import { Application } from './Application.entity';
import { applicationDtoType } from './types';

export { buildApplicationService };

function buildApplicationService() {
    const applicationRepository = dataSource.getRepository(Application);
    const applicationService = {
        createApplication,
    };

    function createApplication(applicationDto: applicationDtoType) {
        return applicationRepository.insert({ ...applicationDto, status: 'pending' });
    }

    return applicationService;
}
