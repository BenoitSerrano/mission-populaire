import { Menu, MenuItem, styled } from '@mui/material';
import { localSessionHandler } from '../../lib/localSessionHandler';
import { Button } from '../Button';
import { useState } from 'react';
import { localStorage } from '../../lib/localStorage';
import { roleType } from '../../lib/localStorage/roleHandler';
import { useNavigate } from 'react-router-dom';
import { pathHandler } from '../../lib/pathHandler';

function RoleSelector() {
    const userInfo = localSessionHandler.getUserInfo();
    const currentRole = localStorage.roleHandler.get();
    const navigate = useNavigate();
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    if (!userInfo) {
        return <div />;
    }
    return (
        <Container>
            <Button onClick={openMenu} color="inherit">
                {userInfo.displayName} ({currentRole})
            </Button>
            <Menu id="role-menu" anchorEl={menuAnchorEl} open={!!menuAnchorEl} onClose={closeMenu}>
                <MenuItem onClick={buildSelectRole('MILITANT')}>Militant·e</MenuItem>
                <MenuItem onClick={buildSelectRole('CHEF_GA')}>Chef·fe de GA</MenuItem>
                <MenuItem onClick={logout}>Se déconnecter</MenuItem>
            </Menu>
        </Container>
    );

    function openMenu(event: React.MouseEvent<HTMLButtonElement>) {
        setMenuAnchorEl(event.currentTarget);
    }

    function buildSelectRole(role: roleType) {
        return () => {
            localStorage.roleHandler.set(role);
            closeMenu();
            switch (role) {
                case 'MILITANT':
                    navigate(pathHandler.getRoutePath('MISSIONS'));
                    break;
                case 'CHEF_GA':
                    navigate(pathHandler.getRoutePath('MY_ADS'));
                    break;
            }
        };
    }

    function logout() {
        closeMenu();
        localSessionHandler.logout();
        navigate(pathHandler.getRoutePath('SIGN_IN'));
    }

    function closeMenu() {
        setMenuAnchorEl(null);
    }
}
const Container = styled('div')(({ theme }) => ({}));

export { RoleSelector };
