let { WebSocketServer } = require("ws")
let wss = new WebSocketServer({ port: 1615 });
let rpc = require("discord-rpc");
rpc.register("1067582647745925221");
rpc = new rpc.Client({ transport: 'ipc' });

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        data = JSON.parse(data)
        rpc.setActivity(build(data.details, data.largeImageKey, data.button));
    });
});

rpc.login({ clientId: "1067582647745925221" }).catch(console.error);

function build(details = "Expose", largeImageKey = "https://arealcattbh.github.io/Expose/expose.png", button = { label: "Expose", url: "https://github.com/aRealCatTBH/Expose"}) {
return {
        details: fix(details),
        largeImageKey: largeImageKey,
        buttons: new Array(button, { label: "Expose", url: "https://github.com/aRealCatTBH/Expose"})
    }
}

function fix(data) {
    return data.substring(0, 128)
}