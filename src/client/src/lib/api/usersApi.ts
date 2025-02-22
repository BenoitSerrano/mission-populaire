import { userInfoType } from '../../types';
import { performApiCall } from './utils';

const usersApi = {
    login,
    getAvailableSkills,
};

async function login(params: { actionPopulaireId: string }) {
    const URI = `login`;
    return performApiCall<{ token: string; userInfo: userInfoType }>(URI, 'POST', {
        actionPopulaireId: params.actionPopulaireId,
    });
}

type skillType = { label: string; value: string };

async function getAvailableSkills() {
    const URI = `available-skills`;
    return performApiCall<skillType[]>(URI, 'GET');
}

export { usersApi };
export type { skillType };
