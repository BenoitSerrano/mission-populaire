import { dataSource } from '../../dataSource';
import { hasher } from '../../lib/hasher';
import { signer } from '../../lib/signer';
import { User } from './User.entity';

export { buildUserService };

function buildUserService() {
    const userRepository = dataSource.getRepository(User);

    const userService = {
        login,
    };

    return userService;

    function createJwt(params: { userId: User['id']; displayName: User['displayName'] }) {
        return signer.sign(params);
    }

    async function login(actionPopulaireId: string) {
        const user = await userRepository.findOneOrFail({ where: { actionPopulaireId } });

        const token = createJwt({ userId: user.id, displayName: user.displayName });
        const userInfo = { displayName: user.displayName };

        return { token, userInfo };
    }
}
