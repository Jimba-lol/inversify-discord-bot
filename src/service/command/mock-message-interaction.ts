import { injectable } from "inversify";

@injectable()
export class MockMessageInteraction {
	public mock(content: string): string {
		let result = ":mock: ";
		let contentChars = [...content];
		for (let char in contentChars) {
			result += this.toRandomCase(char);
		}
		return result;
	}

	private toRandomCase(char: string) {
		if (char !== " ") {
			if (Math.round(Math.random()) == 1) {
				char.toUpperCase();
			} else {
				char.toLowerCase();
			}
		}
		return char;
	}
}