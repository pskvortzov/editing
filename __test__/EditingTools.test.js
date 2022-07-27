import EditingTools from '../src/EditingTools.js';

describe('Moving words', () => {
	it("shouldn't move the closest word to the left when it is already the first word", () => {
		const results = EditingTools.movePhrase('one two three four', 0, 0, EditingTools.LEFT);
		expect(results.modifiedText).toBe('one two three four');
	});

	it("shouldn't move the closest word to the right when it is already the last word", () => {
		const results = EditingTools.movePhrase('one two three four', 15, 15, EditingTools.RIGHT);
		expect(results.modifiedText).toBe('one two three four');
	});

	it("should move the closest word to the left when nothing is selected", () => {
		const results = EditingTools.movePhrase('one two three four', 10, 10, EditingTools.LEFT);
		expect(results.modifiedText).toBe('one three two four');
	});

	it("should move the closest word to the right when nothing is selected", () => {
		const results = EditingTools.movePhrase('one two three four', 5, 5, EditingTools.RIGHT);
		expect(results.modifiedText).toBe('one three two four');
	});

	it("should move the closest word to the left when nothing is selected and the cursor is at the beginning of the word", () => {
		const results = EditingTools.movePhrase('one two three four', 8, 8, EditingTools.LEFT);
		expect(results.modifiedText).toBe('one three two four');
	});

	it("should move the closest word to the right when nothing is selected and the cursor is at the end of the word", () => {
		const results = EditingTools.movePhrase('one two three four', 13, 13, EditingTools.RIGHT);
		expect(results.modifiedText).toBe('one two four three');
	});

	it("should move the closest word to the leftmost position when nothing is selected", () => {
		const results = EditingTools.movePhrase('one two three four', 5, 5, EditingTools.LEFT);
		expect(results.modifiedText).toBe('two one three four');
	});

	it("should move the closest word to the rightmost position when nothing is selected", () => {
		const results = EditingTools.movePhrase('one two three four', 10, 10, EditingTools.RIGHT);
		expect(results.modifiedText).toBe('one two four three');
	});

	it("should move two or more selected words to the left", () => {
		const results = EditingTools.movePhrase('one two three four', 4, 12, EditingTools.LEFT);
		expect(results.modifiedText).toBe('two three one four');
	});

	it("should move two or more selected words to the right", () => {
		const results = EditingTools.movePhrase('one two three four', 4, 12, EditingTools.RIGHT);
		expect(results.modifiedText).toBe('one four two three');
	});

	it("should move two or more selected words in a long phrase to the left", () => {
		const results = EditingTools.movePhrase('The quick brown fox jumped over the lazy dog', 10, 18, EditingTools.LEFT);
		expect(results.modifiedText).toBe('The brown fox quick jumped over the lazy dog');
	});

	it("should move two or more selected words in a long phrase to the right", () => {
		const results = EditingTools.movePhrase('The quick brown fox jumped over the lazy dog', 4, 14, EditingTools.RIGHT);
		expect(results.modifiedText).toBe('The fox quick brown jumped over the lazy dog');
	});

	it("should move two or more partially selected words to the left", () => {
		const results = EditingTools.movePhrase('one two three four', 5, 11, EditingTools.LEFT);
		expect(results.modifiedText).toBe('two three one four');
	});

	it("should move two or more partially selected words to the right", () => {
		const results = EditingTools.movePhrase('one two three four', 5, 11, EditingTools.RIGHT);
		expect(results.modifiedText).toBe('one four two three');
	});

	it("should words to the left if the last selected symbol is space", () => {
		const results = EditingTools.movePhrase('one two three four', 4, 14, EditingTools.LEFT);
		expect(results.modifiedText).toBe('two three one four');
	});

	it("should words to the right if the last selected symbol is space", () => {
		const results = EditingTools.movePhrase('one two three four', 4, 14, EditingTools.RIGHT);
		expect(results.modifiedText).toBe('one four two three');
	});
});

describe('Selection indexes', () => {
	it("should return the correct selection indexes when the phrase has one word and it is moved to the left", () => {
		const results = EditingTools.movePhrase('test', 2, 2, EditingTools.LEFT);
		expect(results.newSelectionStart).toBe(0);
		expect(results.newSelectionEnd).toBe(4);
	});

	it("should return the correct selection indexes when the phrase has one word and it is moved to the right", () => {
		const results = EditingTools.movePhrase('test', 2, 2, EditingTools.RIGHT);
		expect(results.newSelectionStart).toBe(0);
		expect(results.newSelectionEnd).toBe(4);
	});

	it("should return the correct selection indexes when one word is moved to the left", () => {
		const results = EditingTools.movePhrase('my test phrase', 10, 10, EditingTools.LEFT);
		expect(results.newSelectionStart).toBe(3);
		expect(results.newSelectionEnd).toBe(9);
	});

	it("should return the correct selection indexes when one word is moved to the right", () => {
		const results = EditingTools.movePhrase('my test phrase', 5, 5, EditingTools.RIGHT);
		expect(results.newSelectionStart).toBe(10);
		expect(results.newSelectionEnd).toBe(14);
	});

	it("should return the correct selection indexes when two or more words are moved to the left", () => {
		const results = EditingTools.movePhrase('one two three four', 4, 12, EditingTools.LEFT);
		expect(results.newSelectionStart).toBe(0);
		expect(results.newSelectionEnd).toBe(9);
	});

	it("should return the correct selection indexes when two or more words are moved to the right", () => {
		const results = EditingTools.movePhrase('one two three four', 4, 12, EditingTools.RIGHT);
		expect(results.newSelectionStart).toBe(9);
		expect(results.newSelectionEnd).toBe(18);
	});
});