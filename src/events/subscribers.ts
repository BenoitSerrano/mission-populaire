import { userSubscriber } from '../modules/user';
import { missionSubscriber } from '../modules/mission';

const subscribers: Array<{ subscribe: () => void }> = [];
subscribers.push(userSubscriber);
subscribers.push(missionSubscriber);

export { subscribers };
