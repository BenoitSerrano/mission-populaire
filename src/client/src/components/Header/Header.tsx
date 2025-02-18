import { AppBar, styled } from '@mui/material';
import { Logo } from '../Logo';
import { RoleSelector } from './RoleSelector';

const HEADER_HEIGHT = 50;

function Header() {
    return (
        <StyledAppBar position="sticky">
            <Logo />
            <RoleSelector />
        </StyledAppBar>
    );
}

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    height: `${HEADER_HEIGHT}px`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

export { Header };
export { HEADER_HEIGHT };
