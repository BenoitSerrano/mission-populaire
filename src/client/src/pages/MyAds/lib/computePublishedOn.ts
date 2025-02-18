import { dateTextConverter } from '../../AdUpsertion/lib/dateTextConverter';

function computePublishedOn(publishedAt: string) {
    const { date } = dateTextConverter.convertTimestampToDateText(new Date(publishedAt).getTime());
    return date;
}

export { computePublishedOn };
