import { computeQueryParams } from './utils';

describe('utils', () => {
    describe('computeQueryParams', () => {
        it('should return empty string when no query params are passed', () => {
            expect(computeQueryParams({})).toBe('');
        });

        it('should return query params string', () => {
            expect(computeQueryParams({ key1: 'value1', key2: 'value2' })).toBe(
                'key1=value1&key2=value2',
            );
        });

        it('should return query params string with encoded values', () => {
            expect(computeQueryParams({ key1: 'value 1', key2: 'value 2' })).toBe(
                'key1=value%201&key2=value%202',
            );
        });
    });
});
