import { skillType } from '../user/types';

type missionDtoType = {
    title: string;
    description: string;
    deadline: string;
    requiredSkills: skillType[];
};

const MISSION_STATUSES = ['open', 'filled', 'completed'] as const;
type missionStatusType = (typeof MISSION_STATUSES)[number];

export type { missionDtoType, missionStatusType };
export { MISSION_STATUSES };
