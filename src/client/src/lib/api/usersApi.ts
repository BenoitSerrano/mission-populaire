import { userInfoType } from '../../types';
import { performApiCall } from './utils';

const usersApi = {
    login,
};

async function login(params: { actionPopulaireId: string }) {
    const URI = `login`;
    return performApiCall<{ token: string; userInfo: userInfoType }>(URI, 'POST', {
        actionPopulaireId: params.actionPopulaireId,
    });
}

export { usersApi };
