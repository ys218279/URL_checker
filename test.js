let intervalId; // Variable to hold the interval ID

async function fetchURL(urlInput) {
    try {
        const response = await fetch(urlInput);
        if (response.ok) {
            console.log(response.status + ' URL is valid:', urlInput);
            const consoleInput = response.status + ' URL is valid: ' + urlInput;
            writeToConsole(consoleInput);
            //console.log(response.ok, response.status);
        } else {
            console.log(response.status + ' URL is invalid:', urlInput);
            const consoleInput = response.status + ' URL is invalid: ' + urlInput;
            writeToConsole(consoleInput);
        }
    } catch (error) {
        console.log(error + ' Failed to fetch URL:', urlInput, error);
        const consoleInput = error + ' Failed to fetch URL: ' + urlInput;
        writeToConsole(consoleInput);
    }
}

function startFetching() {
    const urlInput = document.getElementById('urlInput').value;
    const urlRegex = /^(?:https?|ftp):\/\/(?:[\w-]+\.)*[\w-]+(?::\d+)?(?:\/[^\s/$.?#].[^\s]*)?$/;
    if (!urlInput) {
        //alert("Please enter a URL");
        writeToConsole("Please enter a URL")
        return
    }
    if (urlRegex.test(urlInput)) {
        fetchURL(urlInput);
        console.log('Button clicked! Fetching URL: ' + urlInput);
        startButton.disabled = true;
        stopButton.disabled = false;

        // Set interval to fetch URL every 5 seconds
        intervalId = setInterval(() => {
            fetchURL(urlInput);
        }, 5000); // 5 seconds for testing
    } else {
        console.log("Invalid URL");
        writeToConsole("Invalid URL");
    }
}

function stopFetching() {
    clearInterval(intervalId); // Clear the interval
    writeToConsole('Stopped Checking URL');
    stopButton.disabled = true;
    startButton.disabled = false;
}

function writeToConsole(text) {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    const consoleInput = document.getElementById("console");
    consoleInput.value += '(' + hours + ':' + minutes + ':' + seconds + ') ' + text + '\n';
}

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startFetching);
startButton.disabled = false;

const stopButton = document.getElementById('stopButton');
stopButton.addEventListener('click', stopFetching);
