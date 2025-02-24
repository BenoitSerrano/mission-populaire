import { userSubscriber } from '../modules/user';

const subscribers: Array<{ subscribe: () => void }> = [];
subscribers.push(userSubscriber);

export { subscribers };
