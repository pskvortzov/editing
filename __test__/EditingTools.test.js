import EditingTools from '../src/EditingTools.js';

describe('Moving words', () => {
	const tools = new EditingTools;

	it("shouldn't move the closest word to the left when it is already the first word", () => {
		const results = tools.movePhrase('one two three four', 0, 0, tools.LEFT);
		expect(results.modifiedText).toBe('one two three four');
	});

	it("shouldn't move the closest word to the right when it is already the last word", () => {
		const results = tools.movePhrase('one two three four', 15, 15, tools.RIGHT);
		expect(results.modifiedText).toBe('one two three four');
	});

	it("should move the closest word to the left when nothing is selected", () => {
		const results = tools.movePhrase('one two three four', 10, 10, tools.LEFT);
		expect(results.modifiedText).toBe('one three two four');
	});

	it("should move the closest word to the right when nothing is selected", () => {
		const results = tools.movePhrase('one two three four', 5, 5, tools.RIGHT);
		expect(results.modifiedText).toBe('one three two four');
	});

	it("should move the closest word to the left when nothing is selected and the cursor is at the beginning of the word", () => {
		const results = tools.movePhrase('one two three four', 8, 8, tools.LEFT);
		expect(results.modifiedText).toBe('one three two four');
	});

	it("should move the closest word to the right when nothing is selected and the cursor is at the end of the word", () => {
		const results = tools.movePhrase('one two three four', 13, 13, tools.RIGHT);
		expect(results.modifiedText).toBe('one two four three');
	});

	it("should move the closest word to the leftmost position when nothing is selected", () => {
		const results = tools.movePhrase('one two three four', 5, 5, tools.LEFT);
		expect(results.modifiedText).toBe('two one three four');
	});

	it("should move the closest word to the rightmost position when nothing is selected", () => {
		const results = tools.movePhrase('one two three four', 10, 10, tools.RIGHT);
		expect(results.modifiedText).toBe('one two four three');
	});

	it("should move two or more selected words to the left", () => {
		const results = tools.movePhrase('one two three four', 4, 12, tools.LEFT);
		expect(results.modifiedText).toBe('two three one four');
	});

	it("should move two or more selected words to the right", () => {
		const results = tools.movePhrase('one two three four', 4, 12, tools.RIGHT);
		expect(results.modifiedText).toBe('one four two three');
	});

	it("should move two or more selected words in a long phrase to the left", () => {
		const results = tools.movePhrase('The quick brown fox jumped over the lazy dog', 10, 18, tools.LEFT);
		expect(results.modifiedText).toBe('The brown fox quick jumped over the lazy dog');
	});

	it("should move two or more selected words in a long phrase to the right", () => {
		const results = tools.movePhrase('The quick brown fox jumped over the lazy dog', 4, 14, tools.RIGHT);
		expect(results.modifiedText).toBe('The fox quick brown jumped over the lazy dog');
	});

	it("should move two or more partially selected words to the left", () => {
		const results = tools.movePhrase('one two three four', 5, 11, tools.LEFT);
		expect(results.modifiedText).toBe('two three one four');
	});

	it("should move two or more partially selected words to the right", () => {
		const results = tools.movePhrase('one two three four', 5, 11, tools.RIGHT);
		expect(results.modifiedText).toBe('one four two three');
	});

	it("should words to the left if the last selected symbol is space", () => {
		const results = tools.movePhrase('one two three four', 4, 14, tools.LEFT);
		expect(results.modifiedText).toBe('two three one four');
	});

	it("should words to the right if the last selected symbol is space", () => {
		const results = tools.movePhrase('one two three four', 4, 14, tools.RIGHT);
		expect(results.modifiedText).toBe('one four two three');
	});
});

describe('Selection indexes', () => {
	const tools = new EditingTools;

	it("should return the correct selection indexes when the phrase has one word and it is moved to the left", () => {
		const results = tools.movePhrase('test', 2, 2, tools.LEFT);
		expect(results.newSelectionStart).toBe(0);
		expect(results.newSelectionEnd).toBe(4);
	});

	it("should return the correct selection indexes when the phrase has one word and it is moved to the right", () => {
		const results = tools.movePhrase('test', 2, 2, tools.RIGHT);
		expect(results.newSelectionStart).toBe(0);
		expect(results.newSelectionEnd).toBe(4);
	});

	it("should return the correct selection indexes when one word is moved to the left", () => {
		const results = tools.movePhrase('my test phrase', 10, 10, tools.LEFT);
		expect(results.newSelectionStart).toBe(3);
		expect(results.newSelectionEnd).toBe(9);
	});

	it("should return the correct selection indexes when one word is moved to the right", () => {
		const results = tools.movePhrase('my test phrase', 5, 5, tools.RIGHT);
		expect(results.newSelectionStart).toBe(10);
		expect(results.newSelectionEnd).toBe(14);
	});

	it("should return the correct selection indexes when two or more words are moved to the left", () => {
		const results = tools.movePhrase('one two three four', 4, 12, tools.LEFT);
		expect(results.newSelectionStart).toBe(0);
		expect(results.newSelectionEnd).toBe(9);
	});

	it("should return the correct selection indexes when two or more words are moved to the right", () => {
		const results = tools.movePhrase('one two three four', 4, 12, tools.RIGHT);
		expect(results.newSelectionStart).toBe(9);
		expect(results.newSelectionEnd).toBe(18);
	});
});