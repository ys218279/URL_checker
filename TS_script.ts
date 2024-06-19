let intervalId: NodeJS.Timeout
async function fetchURL(urlInput: string): Promise<void> {
    try {
        const response = await fetch(urlInput);
        handleResponse(response, urlInput);
    } catch (error) {
        handleError(error, urlInput);
    }
}

function handleResponse(response: Response, urlInput: string): void {
    const statusMessage = `(${response.status})`;

    if (response.ok) {
        console.log(statusMessage + ' URL is valid:', urlInput);
        const consoleInput: string = statusMessage + ' URL is valid: ' + urlInput;
        writeToConsole(consoleInput);
    } else {
        console.log(statusMessage + ' URL is invalid:', urlInput);
        const consoleInput: string = statusMessage + ' URL is invalid: ' + urlInput;
        writeToConsole(consoleInput);
    }
}

function handleError(error: any, urlInput: string): void {
    console.log('Failed to fetch URL:', urlInput, error);
    const consoleInput: string = `Failed to fetch URL: ${urlInput}. Error: ${error.message}`;
    writeToConsole(consoleInput);
}

function stopFetching(): void {
    clearInterval(intervalId); // Clear the interval
    writeToConsole('Stopped Checking URL');
    stopButton.disabled = true;
    startButton.disabled = false;
}

async function makeText(text: string): Promise<string> {
    const currentTime: Date = new Date();
    const hours: number = currentTime.getHours();
    const minutes: number = currentTime.getMinutes();
    const seconds: number = currentTime.getSeconds();

    text = `(${hours}:${minutes}:${seconds}) ${text}\n`;
    return text;
}

async function writeToConsole(text: string): Promise<void> {
    const consoleText = await makeText(text);
    const consoleInput = document.getElementById("console") as HTMLTextAreaElement | null;
    if (consoleInput) {
        consoleInput.value = consoleText + consoleInput.value;
    } else {
        console.error("Console element not found.");
    }
}

const urlInputElement = document.getElementById('urlInput') as HTMLInputElement;
const urlRegex: RegExp = /^(?:https?|ftp):\/\/(?:(?:[\w-]+\.)+[\w-]+)(?::\d+)?(?:\/[^\s/$.?#].[^\s]*)?$/;

const startButton = document.getElementById("startButton") as HTMLButtonElement;
const stopButton = document.getElementById("stopButton") as HTMLButtonElement;

// Add event listener to the input
urlInputElement.addEventListener('input', () => {
    const urlInput: string = urlInputElement.value;
    if (urlRegex.test(urlInput)) {
        startButton.disabled = false;
    } else {
        startButton.disabled = true;
    }
});

// Add event listener to the start button
startButton.addEventListener('click', () => {
    const urlInput: string = urlInputElement.value;
    fetchURL(urlInput);
    console.log('Button clicked! Fetching URL: ' + urlInput);

    // Set interval to fetch URL every 5 seconds
    intervalId = setInterval(() => {
        fetchURL(urlInput);
    }, 5000); // 5 seconds for testing

    startButton.disabled = true;
    stopButton.disabled = false;
});

// Add event listener to the stop button
stopButton.addEventListener('click', stopFetching);
