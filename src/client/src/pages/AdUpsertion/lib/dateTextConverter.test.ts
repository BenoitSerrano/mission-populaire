import { dateTextConverter } from './dateTextConverter';

describe('dateTextConverter', () => {
    describe('convertDateTextToTimestamp', () => {
        it('should return the right date and time', () => {
            const dateText = '2025-02-18 01:23';
            const timestamp = dateTextConverter.convertDateTextToTimestamp(dateText);

            const date = new Date(timestamp);
            expect(date.getMonth()).toBe(2);
            expect(date.getFullYear()).toBe(2025);
            expect(date.getDate()).toBe(18);
            expect(date.getHours()).toBe(1);
            expect(date.getMinutes()).toBe(23);
        });
    });

    describe('convertTimestampToDateText', () => {
        it('should return the right date and time', () => {
            const date = new Date();
            date.setFullYear(2025);
            date.setMonth(2);
            date.setDate(18);
            date.setHours(1);
            date.setMinutes(23);

            const dateText = dateTextConverter.convertTimestampToDateText(date.getTime());

            expect(dateText).toEqual({ date: '2025-02-18', time: '01:23' });
        });
    });
});
