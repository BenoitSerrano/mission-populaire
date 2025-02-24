import { buildEventHandler } from './event.handler';

type missionCreatedEventDataType = {
    displayName: string;
    message: string;
};

const eventEmitter = {
    MISSION_CREATED: buildEventHandler<missionCreatedEventDataType>('MISSION_CREATED'),
};

export { eventEmitter };
