import fs from 'fs';
import path from 'path';
import parse from '../../../sources/parsers/Uber-blog-parser';

const pathToSample = path.join('res', 'tests', 'uber-blog-sample.html');
const encoding = 'UTF-8';

describe('Uber-blog-parser parse function', () => {
  it('should return 2 articles', async () => {
    fs.readFile(pathToSample, encoding, async (_, data) => {
      const result = parse(data);
      expect(result.length).toBe(2);
    });
  });

  it('should return Article object with correct info', async () => {
    fs.readFile(pathToSample, encoding, async (_, data) => {
      const result = parse(data);
      const expected = {
        url: 'https://eng.uber.com/piranha/',
        title: 'Introducing Piranha: An Open Source Tool to Automatically Delete Stale Code',
        date: new Date('2020-03-17T08:30:25+00:00'),
        author: 'Murali Krishna Ramanathan, Lazaro Clapp, Rajkishore Barik, Manu Sridharan',
        imageUrl: 'https://eng.uber.com/wp-content/uploads/2020/03/Header-Piranha-696x298.jpg',
        source: 'uber',
      };
      expect(result[0]).toEqual(expected);
    });
  });
});
