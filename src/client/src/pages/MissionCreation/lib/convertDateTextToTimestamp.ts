const DATETIME_REGEX = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/;

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
    date.setMonth(Number(month));
    date.setDate(Number(day));
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    return date.getTime();
}

export { convertDateTextToTimestamp };
