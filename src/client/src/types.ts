type userInfoType = { displayName: string };
const APPLICATION_STATUSES = ['pending', 'accepted', 'declined'] as const;
type applicationStatusType = (typeof APPLICATION_STATUSES)[number];

const MISSION_STATUSES = ['open', 'filled', 'completed'] as const;
type missionStatusType = (typeof MISSION_STATUSES)[number];

export type { userInfoType, applicationStatusType, missionStatusType };
