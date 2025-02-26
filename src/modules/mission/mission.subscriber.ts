import { eventEmitter } from '../../events/event.emitter';
import { buildMissionService } from './mission.service';

const missionSubscriber = {
    subscribe,
};

function subscribe() {
    const missionService = buildMissionService();

    eventEmitter.APPLICATION_PICKED.on(missionService.setStatusFilled);
}

export { missionSubscriber };
