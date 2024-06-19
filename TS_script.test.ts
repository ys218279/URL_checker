import { makeText, writeToConsole, fetchURL, handleError, handleResponse } from "../testing/pp";

describe('Console output text', () => {
    let currentTime: Date;
    let hours: number;
    let minutes: number;
    let seconds: number;
    let fakeText: string;
    let expectedOutput: string;

    beforeAll(() => {
        currentTime = new Date();
        hours = currentTime.getHours();
        minutes = currentTime.getMinutes();
        seconds = currentTime.getSeconds();

        fakeText = "200 URL is valid: http://127.0.0.1:5500/HTTP_Request/";
        expectedOutput = `(${hours}:${minutes}:${seconds}) ${fakeText}\n`;
    });

    test('check if correct output text is produced', async () => {
        const text = await makeText(fakeText);
        expect(text).toBe(expectedOutput);
    });
});
describe('startFetching and stopFetching', () => {
    let urlInput: HTMLInputElement;
    let startButton: HTMLButtonElement;
    let stopButton: HTMLButtonElement;
    
    beforeEach(() => {
        // Set up the necessary DOM elements
        urlInput = document.createElement('input');
        urlInput.id = 'urlInput';
        document.body.appendChild(urlInput);
        
        startButton = document.createElement('button');
        startButton.id = 'startButton';
        document.body.appendChild(startButton);
        
        stopButton = document.createElement('button');
        stopButton.id = 'stopButton';
        document.body.appendChild(stopButton);
    });

    afterEach(() => {
        // Clean up the DOM elements
        document.body.removeChild(urlInput);
        document.body.removeChild(startButton);
        document.body.removeChild(stopButton);
    });

    it('should start fetching URL at intervals when start button is clicked', () => {
        urlInput.value = "https://example.com";
        startButton.click();
        
        // Check if startButton is disabled and stopButton is enabled
        expect(startButton.disabled).toBe(true);
        expect(stopButton.disabled).toBe(false);
    });

    it('should stop fetching URL when stop button is clicked', () => {
        // Simulate starting the fetching process first
        urlInput.value = "https://example.com";
        startButton.click();
        
        // Now, simulate stopping the fetching process
        stopButton.click();
        
        // Check if startButton is enabled and stopButton is disabled
        expect(startButton.disabled).toBe(false);
        expect(stopButton.disabled).toBe(true);
    });
});


describe('writeToConsole', () => {
    let currentTime: Date;
    let hours: number;
    let minutes: number;
    let seconds: number;
    let fakeText: string;

    beforeEach(() => {
        currentTime = new Date();
        hours = currentTime.getHours();
        minutes = currentTime.getMinutes();
        seconds = currentTime.getSeconds();
        fakeText = "200 URL is valid: http://127.0.0.1:5500/HTTP_Request/";
        document.body.innerHTML = `
            <textarea id="console"></textarea>
        `;
    });

    test('should format and append text to the console element', async () => {
        await writeToConsole(fakeText);
        const consoleText = (document.getElementById('console') as HTMLTextAreaElement).value;
        console.log(consoleText);
        expect(consoleText).toContain(`(${hours}:${minutes}:${seconds}) ${fakeText}\n`);
    });
});
