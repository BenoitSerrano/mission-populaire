import { Chip, ListItem, styled } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

import { jobOfferApiType } from '../lib/api/missionsApi';

function RequiredSkills(props: { jobOffer: jobOfferApiType }) {
    return (
        <RequiredSkillsContainer>
            {props.jobOffer.requiredSkills.map((requiredSkill) => {
                return (
                    <RequiredSkillItem key={requiredSkill.label}>
                        <Chip
                            icon={
                                requiredSkill.isCompetent ? <StarIcon color="success" /> : undefined
                            }
                            label={requiredSkill.value}
                        />
                    </RequiredSkillItem>
                );
            })}
        </RequiredSkillsContainer>
    );
}

const RequiredSkillsContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
}));
const RequiredSkillItem = styled(ListItem)(({ theme }) => ({
    ':not(:first-child)': {
        paddingLeft: theme.spacing(1),
    },
    width: 'auto',
    paddingRight: theme.spacing(1),
}));
export { RequiredSkills };
