const port = 1615
const ws = new WebSocket(`ws://127.0.0.1:1615`);

ws.onopen = start
ws.onerror = error


function start() {
    browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
        let tab = tabs[0];
        ws.send(JSON.stringify({
            name: "Test Name",
            details: fix(tab.title),
            largeImageKey: fix(`https://icon.horse/icon/${new URL(tab.url).host}`),
            buttons: [
                { label: new URL(tab.url).host || "Expose", url: tab.url || "https://github.com/aRealCatTBH/Expose" },
                { label: "Expose", url: "https://github.com/aRealCatTBH/Expose" }
            ]
        }))
    }, console.error)
}

function error() {
    console.error("Failed to connect, is the server on?")
    ws = new WebSocket(`ws://127.0.0.1:1615`);
}

setInterval(start, 15e3)

function fix(data) {
    return data.substring(0, 128)
}