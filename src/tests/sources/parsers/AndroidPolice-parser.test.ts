import fs from 'fs';
import path from 'path';
import parse from '../../../sources/parsers/Android-police-parser';

const pathToSample = path.join('res', 'tests', 'android-police-sample.html');
const encoding = 'UTF-8';

describe('AndroidPolice-blog-parser', () => {
  it('parse function should return 2', async () => {
    fs.readFile(pathToSample, encoding, async (_, data) => {
      const result = parse(data);
      expect(result.length).toBe(2);
    });
  });

  it('parse function should return Article object with correct info', async () => {
    fs.readFile(pathToSample, encoding, async (_, data) => {
      const result = parse(data);
      const expected = {
        url: 'https://www.androidpolice.com/2020/04/10/google-completely-ruined-shared-folders-in-drive/',
        title: 'Google completely ruined shared folders in Drive (Update: Workaround, Google shares longterm plan)',
        date: new Date('2020-04-10T03:15:39-07:00'),
        author: 'Rita El Khoury',
        source: 'Android Police',
      };
      expect(result[0]).toEqual(expected);
    });
  });
});
