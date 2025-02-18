import { jwtTokenHandler } from './jwtTokenHandler';
import { userInfoHandler } from './userInfoHandler';
import { roleHandler } from './roleHandler';

const localStorage = { jwtTokenHandler, userInfoHandler, roleHandler };

export { localStorage };
