let { WebSocketServer } = require("ws")
let wss = new WebSocketServer({ port: 1615 });
let rpc = require("discord-rpc");
rpc.register("1067582647745925221");
rpc = new rpc.Client({ transport: 'ipc' });


wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        rpc.setActivity(JSON.parse(data));
    });

    rpc.login({ clientId: "1067582647745925221" }).catch(console.error);
});