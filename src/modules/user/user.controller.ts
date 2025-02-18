import { buildUserService } from './user.service';

export { buildUserController };

function buildUserController() {
    const userService = buildUserService();
    const userController = {
        login,
    };

    return userController;

    async function login(params: { body: { actionPopulaireId: string } }) {
        return userService.login(params.body.actionPopulaireId);
    }
}
