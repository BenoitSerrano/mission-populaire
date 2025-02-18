import { Mission } from '../modules/mission';
import { User } from '../modules/user';

const USER_DTOS: Array<Pick<User, 'actionPopulaireId' | 'displayName'>> = [
    { actionPopulaireId: '22a39299-2f81-4f44-9303-4d636b242f5f', displayName: 'Benoit' },
];

const MISSION_DTOS: Array<{ title: Mission['title']; userId: string }> = [];

export { USER_DTOS, MISSION_DTOS };
