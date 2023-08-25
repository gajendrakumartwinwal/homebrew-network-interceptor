import fs from "fs";
import {getMappingConfig, matchUrlPattern} from "./utils";

const mapping = {url: 'http://url', request: {}, response: {}};
const mapping1 = {url1: 'http://url', request1: {}, response1: {}};


jest.mock('fs', () => ({
    readFileSync: jest.fn().mockReturnValue(JSON.stringify(mapping))
}))

describe('getMappingConfig', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return mappingConfig from cache if less than one minute has passed', () => {
        // Arrange
        getMappingConfig();

        const result = getMappingConfig();

        expect(result).toEqual(mapping);
        expect(fs.readFileSync).toHaveBeenCalledTimes(0);
    });

    it('should return mappingConfig from file if more than one minute has passed', () => {
        // Arrange
        getMappingConfig();
        fs.readFileSync.mockReturnValue(JSON.stringify(mapping1))


        const currentTime1 = Date.now();
        Date.now = () => currentTime1 + 60 * 1000

        const result = getMappingConfig();

        expect(result).toEqual(mapping1);
        expect(fs.readFileSync).toHaveBeenCalledTimes(1);
    });

});

describe('matchUrlPattern', () => {

    it.each([
        ['http://www.google.com/a/23/b/43', "http://www.google.com/a/23/b/43", true],
        ['http://www.google.com/a/*/b/43', "http://www.google.com/a/23/b/43", true],
        ['http://www.google.com/a/23/b/*', "http://www.google.com/a/23/b/43", true],
        ['http://www.google.com/a/*/b/*', "http://www.google.com/a/23/b/43/c", true],
        ['http://www.google.com/a/*/b/*', "http://www.google.com/a/23/d/43/c", false],
        ['http://www.google.com/a/*/b/*', "http://www.google.com/d/23/b/43/c", false]
    ])('pattern: %s & url: %s should return: %s', (pattern, url, matched) => {
        // Arrange

        // Act
        const result = matchUrlPattern(pattern, url);

        // Assert
        expect(result).toEqual(matched);
    });
});
