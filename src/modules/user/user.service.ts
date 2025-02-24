import { dataSource } from '../../dataSource';
import { signer } from '../../lib/signer';
import { SKILLS } from './types';
import { User } from './User.entity';

export { buildUserService };

function buildUserService() {
    const userRepository = dataSource.getRepository(User);

    const userService = {
        login,
        getAvailableSkills,
    };

    return userService;

    function createJwt(params: { userId: User['id']; displayName: User['displayName'] }) {
        return signer.sign(params);
    }

    async function login(actionPopulaireId: string) {
        const user = await userRepository.findOneOrFail({ where: { actionPopulaireId } });

        const token = createJwt({ userId: user.id, displayName: user.displayName });
        const userInfo = {
            displayName: user.displayName,
            skills: user.skills.map((skill) => SKILLS[skill]),
        };

        return { token, userInfo };
    }

    async function getAvailableSkills() {
        return Object.values(SKILLS);
    }
}
