const port = 1615
let ws = new WebSocket(`ws://127.0.0.1:1615`);

ws.onopen = start
ws.onerror = error


function start() {
    browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
        let tab = tabs[0];
        ws.send(JSON.stringify({
            details: tab.title,
            largeImageKey: `https://icon.horse/icon/${new URL(tab.url).host}`,
            button: { label: new URL(tab.url).host || "Expose", url: tab.url || "https://github.com/aRealCatTBH/Expose" }

        }))
    }, console.error)
}

function error() {
    console.error("Failed to connect, is the server on?")
}

setInterval(start, 15e3)

function handleMessage(request) {
    if (request == "open") {
        browser.runtime.sendMessage({code: "open", data: {isConnected: ws.readyState !== WebSocket.CLOSED}})
    } else if (request == "reconnect") {
        ws = new WebSocket(`ws://127.0.0.1:1615`);
    }
}
browser.runtime.onMessage.addListener(handleMessage);