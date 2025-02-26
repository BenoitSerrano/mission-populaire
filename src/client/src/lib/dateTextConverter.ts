const DATETIME_REGEX = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/;

const dateTextConverter = {
    convertDateTextToTimestamp,
    convertTimestampToDateText,
    convertDateToReadableText,
};

function convertDateTextToTimestamp(dateText: string): number {
    const date = new Date();
    const match = dateText.match(DATETIME_REGEX);
    if (!match) {
        throw new Error(
            `Le format de la date "${dateText}" ne correspond pas à la regex "YYYY-MM-DD hh-mm"`,
        );
    }
    const [_, year, month, day, hours, minutes] = match;
    date.setFullYear(Number(year));
    date.setMonth(Number(month) + 1);
    date.setDate(Number(day));
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    return date.getTime();
}

function convertDateToReadableText(date: Date) {
    const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth()}`;
    const year = `${date.getFullYear()}`;

    return `le ${day}/${month}/${year}`;
}

function convertTimestampToDateText(timestamp: number) {
    const date = new Date(timestamp);
    const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth()}`;
    const year = `${date.getFullYear()}`;
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;

    return { date: `${year}-${month}-${day}`, time: `${hours}:${minutes}` };
}

export { dateTextConverter };
