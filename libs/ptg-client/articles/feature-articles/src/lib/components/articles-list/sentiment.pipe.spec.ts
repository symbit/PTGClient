import { SentimentPipe } from './sentiment.pipe';

describe('SentimentPipe', () => {
  it('create an instance', () => {
    const pipe = new SentimentPipe();
    expect(pipe).toBeTruthy();
  });
});
