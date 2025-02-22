import { dataSource } from '../dataSource';
import { Mission } from '../modules/mission';
import { User } from '../modules/user';
import { MISSION_DTOS, USER_DTOS } from './fixtures';

async function runFixtures() {
    console.log('Initializing database...');
    await dataSource.initialize();
    console.log('Database initialized!');
    const missionRepository = dataSource.getRepository(Mission);
    const userRepository = dataSource.getRepository(User);

    console.log('Erasing local database...');

    await missionRepository.delete({});
    await userRepository.delete({});

    console.log(`Inserting ${USER_DTOS.length} users...`);

    await userRepository.insert(USER_DTOS);
    console.log('Missions inserted!');

    console.log(`Inserting ${MISSION_DTOS.length} missions...`);

    await missionRepository.insert(
        MISSION_DTOS.map((missionDto) => ({ ...missionDto, user: { id: missionDto.userId } })),
    );
    console.log('Missions inserted!');

    console.log('Done!');
}

runFixtures();
