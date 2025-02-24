import { TableCell, Typography } from '@mui/material';
import { locale } from '../locale';
import { variabilize } from '../locale/utils';
import { dateTextConverter } from '../lib/dateTextConverter';

function MissionTitleCell(props: { mission: { title: string; publishedAt: string } }) {
    return (
        <TableCell>
            <>
                <Typography variant="h4">{props.mission.title}</Typography>
                <Typography variant="h6">
                    {variabilize(locale.myAds.adsTable.publishedOn, {
                        publishedOn: computePublishedOn(props.mission.publishedAt),
                    })}
                </Typography>
            </>
        </TableCell>
    );

    function computePublishedOn(publishedAt: string) {
        const { date } = dateTextConverter.convertTimestampToDateText(
            new Date(publishedAt).getTime(),
        );
        return date;
    }
}

export { MissionTitleCell };
