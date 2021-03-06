/* eslint-disable @typescript-eslint/no-unused-vars */
import nock from 'nock';
import sinon from 'sinon';
import path from 'path';
import fs from 'fs';
import source from '../../sources/ParsedSourceHandler';
import { getHackerNewsCategory } from '../../helpers/SourceHelper';
import SourceOptionsBuilder from '../../helpers/SourceOptionsBuilder';

const ParsedSourceHandler = source();

describe('ParsedSourceHandler androidPolice function', () => {
  it('should call the right URL and get the right number of articles', (done) => {
    // two articles from html
    const pathToSample = path.join('res', 'tests', 'android-police-sample.html');
    const fakeResponse = fs.readFileSync(pathToSample, 'utf8');

    nock('https://www.androidpolice.com')
      .get('/')
      .reply(200, fakeResponse);

    const onFulfilled = sinon.spy();
    const numberOfArticles = 1;
    const options = new SourceOptionsBuilder().withArticleNumber(numberOfArticles).build();
    const promise = ParsedSourceHandler.androidPolice(options).then(onFulfilled);

    promise.then(() => {
      expect(onFulfilled.getCall(0).args[0].length).toEqual(numberOfArticles);
      done();
    });
  });
});

describe('ParsedSourceHandler hackernews function', () => {
  it('should call the right URL and get the right number of articles', (done) => {
    const pathToSample = path.join('res', 'tests', 'hacker-news-item-sample.json');
    const fakeResponse = fs.readFileSync(pathToSample, 'utf8');
    const category = 'new';

    nock('https://hacker-news.firebaseio.com/v0')
      .get(`/${getHackerNewsCategory(category)}.json`)
      .reply(200, '[1, 2]');

    nock('https://hacker-news.firebaseio.com/v0')
      .get(/\/item\/*/)
      .reply(200, fakeResponse);

    const onFulfilled = sinon.spy();
    const numberOfArticles = 1;

    const options = new SourceOptionsBuilder()
      .withArticleNumber(numberOfArticles)
      .withCategory(category)
      .build();

    const promise = ParsedSourceHandler.hackerNews(options).then(onFulfilled);

    promise.then(() => {
      expect(onFulfilled.getCall(0).args[0].length).toEqual(numberOfArticles);
      done();
    });
  });
});

describe('ParsedSourceHandler uber function', () => {
  it('should call the right URL when uber method is called', (done) => {
    const pathToSample = path.join('res', 'tests', 'uber-blog-sample.html');
    const fakeResponse = fs.readFileSync(pathToSample, 'utf8');

    nock('https://eng.uber.com')
      .get('/')
      .reply(200, fakeResponse);

    const onFulfilled = sinon.spy();
    const articleNumber = 2;
    const promise = ParsedSourceHandler.uber(
      new SourceOptionsBuilder()
        .withArticleNumber(articleNumber)
        .build(),
    ).then(onFulfilled);

    promise.then(() => {
      expect(onFulfilled.getCall(0).args[0].length).toEqual(articleNumber);
      done();
    });
  });
});

// TODO find a way to mock pupeeter
describe('ParsedSourceHandler class', () => {
  // it('should call the right URL and resolve category when dev-to method is called', (done) => {
  //   const pathToSample = path.join('res', 'tests', 'dev-to-sample.html');
  //   const fakeResponse = fs.readFileSync(pathToSample, 'utf8');
  //   const category = 'month';

  //   const mockedDynamicHtmlLoaderInstance = {
  //     getFullHtml: (_url: string, _elementToTrack: string, _limit: number, _loadButton?: string) => {
  //       Promise.resolve(fakeResponse);
  //     },
  //   };
  //   const mockedParsedSourceHandler = proxyquire(`../../${path.join('sources', 'ParsedSourceHandler.ts')}`, {
  //     './DynamicHtmlLoader': () => mockedDynamicHtmlLoaderInstance,
  //   });

  //   const numberOfArticles = 4;

  //   const options = new SourceOptionsBuilder()
  //     .setNumberOfArticles(numberOfArticles)
  //     .setCategory(category)
  //     .build();
  //   // nock('https://dev.to')
  //   // .get(`/${getDevToCategory(category)}`)
  //   // .reply(200, fakeResponse);

  //   spyOn(mockedDynamicHtmlLoaderInstance, 'getFullHtml');

  //   const onFulfilled = sinon.spy();
  //   const promise = mockedParsedSourceHandler.devTo(options).then(onFulfilled);

  //   promise.then(() => {
  //     // expect(onFulfilled.getCall(0).args[0].length).toEqual(numberOfArticles);
  //     expect(mockedDynamicHtmlLoaderInstance.getFullHtml).toHaveBeenCalledWith(
  //       'https://dev.to',
  //       'time',
  //       4,
  //     );
  //     done();
  //   });
  // });

  // it('should call the right URL netflix method is called', (done) => {
  //   const pathToSample = path.join('res', 'tests', 'netflix-blog-sample.html');
  //   const fakeResponse = fs.readFileSync(pathToSample, 'utf8');

  //   nock('https://netflixtechblog.com')
  //     .get('/')
  //     .reply(200, fakeResponse);

  //   const onFulfilled = sinon.spy();
  //   const promise = ParsedSourceHandler.netflix(new SourceOptionsBuilder().build()).then(onFulfilled);

  //   promise.then(() => {
  //     expect(onFulfilled.getCall(0).args[0].length).toEqual(3);
  //     done();
  //   });
  // });
});
