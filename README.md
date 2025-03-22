# URL Fetcher Application

This application allows users to check the validity of a URL and fetch its status periodically. The URL is checked every 5 seconds, and the status is logged with a timestamp.

## Features
- **URL Validation**: Checks if the URL is valid using a regular expression.
- **Start/Stop Fetching**: Fetches the URL every 5 seconds. Can be stopped at any time.
- **Error Handling**: Logs errors if the URL fetch fails.
- **Timestamped Logs**: Logs the status (valid/invalid) with a timestamp.

## Files
1. **HTML (`index.html`)**: Provides the user interface.
2. **CSS (`styles.css`)**: Basic page styling.
3. **TypeScript (`TS_script.ts`)**: Contains the URL fetching logic.

## HTML Elements
- `#urlInput`: Input field for the URL.
- `#startButton`: Button to start fetching the URL.
- `#stopButton`: Button to stop fetching the URL.
- `#console`: Text area for logs.

## Functions
- **`fetchURL(urlInput: string)`**: Fetches the URL and handles the response.
- **`handleResponse(response: Response)`**: Logs the response status (valid/invalid).
- **`handleError(error: any)`**: Logs any errors encountered.
- **`stopFetching()`**: Stops the periodic fetching of the URL.
- **`writeToConsole(text: string)`**: Logs the text (with timestamp) to the console.

## CORS (Cross-Origin Resource Sharing) Limitations
This application is subject to CORS restrictions when attempting to fetch URLs from different origins. Some URLs may trigger a CORS error due to security policies enforced by the server. This issue can be mitigated using a proxy server or by making requests from a server-side application where CORS restrictions do not apply.

## Usage
1. Enter a valid URL (e.g., `https://www.example.com`).
2. Click **Start** to begin fetching the URL every 5 seconds.
3. Click **Stop** to stop the fetching process.

## Error Handling
- If the URL is invalid, the **Start** button remains disabled.
- Errors during fetching (including CORS errors) are logged in the console.
