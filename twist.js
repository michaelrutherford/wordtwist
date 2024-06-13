function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function scrambleWords(text) {
    const cleanedText = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"'”“‘’\[\]]/g, '');
    const words = cleanedText.split(/\s+/);
    const shuffledWords = shuffleArray(words.slice());
    return shuffledWords.join(' ');
}

function generateScrambledText() {
    const inputText = document.getElementById('paragraph-input').value;
    const scrambledText = scrambleWords(inputText);
    const scrambledParagraph = document.getElementById('scrambled-paragraph');

    scrambledParagraph.textContent = scrambledText;
    scrambledParagraph.style.padding = '1vw';
}

function saveAsTxt() {
    const container = document.getElementById('scrambled-paragraph');
    const textContent = container.textContent;

    // Add a newline character when a line approaches 80 characters
    const wordsArray = textContent.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of wordsArray) {
        if ((currentLine + word).length < 80) {
            // Add word to the current line if it doesn't exceed 80 characters
            currentLine += `${word} `;
        } else {
            // Start new line if new word would exceed 80 characters
            lines.push(currentLine.trim());
            currentLine = `${word} `;
        }
    }

    // Add last line if it contains content
    if (currentLine.trim()) {
        lines.push(currentLine.trim());
    }

    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });

    // Create link element to trigger the download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'scrambled_text.txt';

    // Append link to the document body, trigger the click event, and remove the link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
