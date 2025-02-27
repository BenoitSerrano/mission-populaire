import { AppBar, styled } from '@mui/material';
import { Logo } from '../Logo';
import { RoleSelector } from './RoleSelector';

const HEADER_HEIGHT = 72;

function Header() {
    return (
        <StyledAppBar elevation={0} color="transparent" position="sticky">
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
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    justifyContent: 'space-between',
    borderBottom: `solid 2px ${theme.palette.divider}`,
}));

export { Header };
export { HEADER_HEIGHT };
