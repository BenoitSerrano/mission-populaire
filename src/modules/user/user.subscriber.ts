import { eventEmitter } from '../../events/event.emitter';
import { buildUserService } from './user.service';

const userSubscriber = {
    subscribe,
};

function subscribe() {
    const userService = buildUserService();

    eventEmitter.MISSION_CREATED.on(userService.alertUser);
}

export { userSubscriber };
