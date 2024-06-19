var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var intervalId;
function fetchURL(urlInput) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch(urlInput)];
                case 1:
                    response = _a.sent();
                    handleResponse(response, urlInput);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    handleError(error_1, urlInput);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handleResponse(response, urlInput) {
    var statusMessage = "(".concat(response.status, ")");
    if (response.ok) {
        console.log(statusMessage + ' URL is valid:', urlInput);
        var consoleInput = statusMessage + ' URL is valid: ' + urlInput;
        writeToConsole(consoleInput);
    }
    else {
        console.log(statusMessage + ' URL is invalid:', urlInput);
        var consoleInput = statusMessage + ' URL is invalid: ' + urlInput;
        writeToConsole(consoleInput);
    }
}
function handleError(error, urlInput) {
    console.log('Failed to fetch URL:', urlInput, error);
    var consoleInput = "Failed to fetch URL: ".concat(urlInput, ". Error: ").concat(error.message);
    writeToConsole(consoleInput);
}
function stopFetching() {
    clearInterval(intervalId); // Clear the interval
    writeToConsole('Stopped Checking URL');
    stopButton.disabled = true;
    startButton.disabled = false;
}
function makeText(text) {
    return __awaiter(this, void 0, void 0, function () {
        var currentTime, hours, minutes, seconds;
        return __generator(this, function (_a) {
            currentTime = new Date();
            hours = currentTime.getHours();
            minutes = currentTime.getMinutes();
            seconds = currentTime.getSeconds();
            text = "(".concat(hours, ":").concat(minutes, ":").concat(seconds, ") ").concat(text, "\n");
            return [2 /*return*/, text];
        });
    });
}
function writeToConsole(text) {
    return __awaiter(this, void 0, void 0, function () {
        var consoleText, consoleInput;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, makeText(text)];
                case 1:
                    consoleText = _a.sent();
                    consoleInput = document.getElementById("console");
                    if (consoleInput) {
                        consoleInput.value = consoleText + consoleInput.value;
                    }
                    else {
                        console.error("Console element not found.");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
var urlInputElement = document.getElementById('urlInput');
var urlRegex = /^(?:https?|ftp):\/\/(?:(?:[\w-]+\.)+[\w-]+)(?::\d+)?(?:\/[^\s/$.?#].[^\s]*)?$/;
var startButton = document.getElementById("startButton");
var stopButton = document.getElementById("stopButton");
// Add event listener to the input
urlInputElement.addEventListener('input', function () {
    var urlInput = urlInputElement.value;
    if (urlRegex.test(urlInput)) {
        startButton.disabled = false;
    }
    else {
        startButton.disabled = true;
    }
});
// Add event listener to the start button
startButton.addEventListener('click', function () {
    var urlInput = urlInputElement.value;
    fetchURL(urlInput);
    console.log('Button clicked! Fetching URL: ' + urlInput);
    // Set interval to fetch URL every 5 seconds
    intervalId = setInterval(function () {
        fetchURL(urlInput);
    }, 5000); // 5 seconds for testing
    startButton.disabled = true;
    stopButton.disabled = false;
});
// Add event listener to the stop button
stopButton.addEventListener('click', stopFetching);
