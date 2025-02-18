import { Mission } from '../mission';
import { User } from '../user';

const APPLICATION_STATUSES = ['pending', 'accepted', 'declined'] as const;
type applicationStatusType = (typeof APPLICATION_STATUSES)[number];
type applicationDtoType = { content: string; missionId: Mission['id']; user: User };

export type { applicationStatusType, applicationDtoType };
export { APPLICATION_STATUSES };
