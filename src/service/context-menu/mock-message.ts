import { injectable } from "inversify";

@injectable()
export class MockMessage {
  public mock(content: string): string {
    var result: string = "<:mock:510964804014571530> ";
    [...content].forEach((e, i) => {
      result += this.toRandomCase(e);
    });
    return result;
  }

  private toRandomCase(letter: string): string {
    if (letter !== " ") {
      if (Math.round(Math.random()) == 1) {
        letter = letter.toUpperCase();
      } else {
        letter = letter.toLowerCase();
      }
    }
    return letter;
  }
}