import { convertDateTextToTimestamp } from './convertDateTextToTimestamp';

describe('convertDateTextToTimestamp', () => {
    it('should return the right date and time', () => {
        const deadline = '2025-02-18 01:23';
        const timestamp = convertDateTextToTimestamp(deadline);

        const date = new Date(timestamp);
        expect(date.getMonth()).toBe(2);
        expect(date.getFullYear()).toBe(2025);
        expect(date.getDate()).toBe(18);
        expect(date.getHours()).toBe(1);
        expect(date.getMinutes()).toBe(23);
    });
});
