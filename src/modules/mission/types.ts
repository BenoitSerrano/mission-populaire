type missionDtoType = {
    title: string;
    description: string;
    deadline: string;
};

const MISSION_STATUSES = ['open', 'filled', 'completed'] as const;
type missionStatusType = (typeof MISSION_STATUSES)[number];

export type { missionDtoType, missionStatusType };
export { MISSION_STATUSES };
