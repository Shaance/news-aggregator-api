import { getArticleFromStory } from "../../apis/HackerNewsApi";
import fs from "fs";
import path from "path";

const pathToItemSample = path.join('src', 'tests', 'res', 'hacker-news-item-sample.json');
const encoding = 'UTF-8';

describe('HackerNews api', function () {
  it('parse function should return Article object with correct info', async function () {
    fs.readFile(pathToItemSample, encoding, async (_, data) => {
      let result = getArticleFromStory(data);
      const expected = {
        url: 'https://churchlifejournal.nd.edu/articles/youre-a-slave-to-money-then-you-die/',
        title: "You're a Slave to Money, Then You Die",
        date: new Date("2020-04-12T10:58:14+00:00"),
        author: 'jxub',
        source: 'HackerNews'
      }
      expect(result[0]).toEqual(expected);
    });
  });

});