type userInfoType = { displayName: string };
const APPLICATION_STATUSES = ['pending', 'accepted', 'declined'] as const;
type applicationStatusType = (typeof APPLICATION_STATUSES)[number];

export type { userInfoType, applicationStatusType };
