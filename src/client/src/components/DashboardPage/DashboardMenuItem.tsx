import { ElementType } from 'react';
import { Link } from '../Link';
import { styled, Typography } from '@mui/material';

function DashboardMenuItem(props: {
    isActive: boolean;
    IconComponent: ElementType;
    title: string;
    to: string;
}) {
    const { IconComponent } = props;
    const color = props.isActive ? 'primary' : 'action';
    return (
        <Container isActive={props.isActive}>
            <Link to={props.to}>
                <Text>
                    <IconContainer>
                        <IconComponent color={color} />
                    </IconContainer>
                    {props.title}
                </Text>
            </Link>
        </Container>
    );
}

const Container = styled('div')<{ isActive: boolean }>(({ theme, isActive }) => ({
    background: isActive ? theme.palette.background.paper : undefined,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
}));

const IconContainer = styled('div')(({ theme }) => ({ marginRight: theme.spacing(1) }));
const Text = styled(Typography)(({ theme }) => ({ display: 'flex' }));
export { DashboardMenuItem };
