import { buildEventHandler } from './event.handler';

type missionCreatedEventDataType = {
    displayName: string;
    message: string;
};

type applicationPickedEventDataType = {
    applicationId: string;
    missionId: string;
    userId: string;
};

const eventEmitter = {
    MISSION_CREATED: buildEventHandler<missionCreatedEventDataType>('MISSION_CREATED'),
    APPLICATION_PICKED: buildEventHandler<applicationPickedEventDataType>('APPLICATION_PICKED'),
};

export { eventEmitter };
