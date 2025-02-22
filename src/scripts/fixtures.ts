import { generateArray } from '../lib/utils';
import crypto from 'crypto';
import { Mission } from '../modules/mission';
import { MISSION_STATUSES } from '../modules/mission';
import { SKILL_LABELS, User } from '../modules/user';

const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

const MILITANT_UUIDS: string[] = generateArray(40).map(() => generateUuid());
const ANIMATEURICE_UUIDS: string[] = generateArray(5).map(() => generateUuid());

type userDto = Pick<User, 'id' | 'actionPopulaireId' | 'displayName' | 'skills'>;

const MILITANT_DTOS: Array<userDto> = MILITANT_UUIDS.map((id, index) => ({
    actionPopulaireId: generateUuid(),
    id,
    displayName: `Militant ${index + 1}`,
    skills: generateRandomValues(SKILL_LABELS, 1, 2),
}));

const ANIMATEURICE_DTOS: Array<userDto> = ANIMATEURICE_UUIDS.map((id, index) => ({
    actionPopulaireId: generateUuid(),
    id,
    displayName: `Animateurice ${index + 1}`,
    skills: generateRandomValues(SKILL_LABELS, 1, 2),
}));

const USER_DTOS = [...MILITANT_DTOS, ...ANIMATEURICE_DTOS];

const MISSION_DTOS: Array<
    { userId: string } & Pick<
        Mission,
        'deadline' | 'description' | 'status' | 'title' | 'publishedAt' | 'requiredSkills'
    >
> = generateArray(40).map((_, index) => {
    const deadline = generateDeadline();

    return {
        title: `TITLE ${index + 1}`,
        deadline,
        description: `DESCRIPTION ${index + 1}`,
        publishedAt: generatePublishedAt(deadline, 5),
        requiredSkills: generateRandomValues(SKILL_LABELS, 1, 2),
        status: generateRandomValue(MISSION_STATUSES),
        userId: generateRandomValue(ANIMATEURICE_UUIDS),
    };
});

function generateUuid() {
    return crypto.randomUUID();
}

function generateDeadline() {
    const daysFromNow = generateRandomValue([-1, 0, 1]) * 30;
    const now = new Date();
    now.setTime(now.getTime() + daysFromNow * ONE_DAY_IN_MILLISECONDS);
    return now.toISOString();
}

function generatePublishedAt(deadline: string, daysBefore: number) {
    const deadlineDate = new Date(deadline);
    const publishedAt = new Date(deadlineDate.getTime() - daysBefore * ONE_DAY_IN_MILLISECONDS);
    return publishedAt.toISOString();
}

function generateRandomValue<T>(possibleValues: T[] | readonly T[]): T {
    const count = possibleValues.length;
    const rand = Math.random();
    for (let i = 1; i <= count; i++) {
        if (rand < i / count) {
            return possibleValues[i - 1];
        }
    }
    return possibleValues[count - 1];
}

function generateRandomValues<T>(
    possibleValues: T[] | readonly T[],
    min: number,
    max: number,
): T[] {
    const values: T[] = [];
    const valuesCount = Math.floor(Math.random() * (max - min + 1)) + min;
    for (let i = 0; i < valuesCount; i++) {
        const generatedValue = generateRandomValue(possibleValues);
        if (!values.includes(generatedValue)) {
            values.push(generatedValue);
        }
    }
    return values;
}

export { USER_DTOS, MISSION_DTOS };
