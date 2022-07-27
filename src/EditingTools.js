export default class EditingTools {
	static LEFT = -1;
	static RIGHT = 1;

	static movePhrase(originalText, selectionStart, selectionEnd, direction = this.LEFT) {
		if (selectionStart !== selectionEnd && originalText[selectionEnd - 1] === ' ') {
			selectionEnd -= 1;
		} 

		const results = {
			modifiedText: originalText,
			newSelectionStart: 0,
			newSelectionEnd: originalText.length
		};

		let wordsArray = originalText.split(' ');

		let wordsStartIndex, wordsEndIndex;

		[wordsStartIndex, wordsEndIndex] = this.getIndexes(originalText, selectionStart, selectionEnd);

		if (direction === this.LEFT && wordsStartIndex !== 0) {
			[wordsArray, results.newSelectionStart, results.newSelectionEnd] = this.moveWords(wordsArray, wordsStartIndex, wordsEndIndex, direction);
		}

		if (direction === this.RIGHT && wordsEndIndex !== wordsArray.length) {
			[wordsArray, results.newSelectionStart, results.newSelectionEnd] = this.moveWords(wordsArray, wordsStartIndex, wordsEndIndex, direction);
		}

		results.modifiedText = wordsArray.join(' ').replace(/  */g, ' ').trim();

		return results;
	}

	static moveWords(wordsArray, wordStartIndex, wordEndIndex, direction) {
		const selectedPhrase = wordsArray.splice(wordStartIndex, wordEndIndex - wordStartIndex);
		wordsArray.splice(wordStartIndex + direction, 0, ...selectedPhrase);

		const newSelectionStart = this.getSelectionStart(wordsArray, wordStartIndex + direction);	
		const newSelectionEnd = newSelectionStart + selectedPhrase.join(' ').length;

		return [wordsArray, newSelectionStart, newSelectionEnd];
	}

	static getIndexes(originalText, selectionStart, selectionEnd) {
		const matchesStart = originalText.substring(0, selectionStart).match(/ /g);
		const wordsStartIndex = matchesStart !== null ? matchesStart.length : 0;

		const matchesEnd = originalText.substring(selectionStart, selectionEnd).match(/ /g);
		const wordsEndIndex = matchesEnd !== null ? wordsStartIndex + matchesEnd.length + 1 : wordsStartIndex + 1;

		return [wordsStartIndex, wordsEndIndex];
	}


	static getSelectionStart(wordsArray, wordIndex) {
		if (wordIndex === 0) {
			return 0;
		}

		return wordsArray
			.slice(0, wordIndex)
			.reduce((length, word) => {
				return length + word.length + 1;
			}, 0);
	}
}