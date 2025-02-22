import { buildUserService } from './user.service';

export { buildUserController };

function buildUserController() {
    const userService = buildUserService();
    const userController = {
        login,
        getAvailableSkills,
    };

    return userController;

    async function login(params: { body: { actionPopulaireId: string } }) {
        return userService.login(params.body.actionPopulaireId);
    }

    async function getAvailableSkills() {
        return userService.getAvailableSkills();
    }
}
