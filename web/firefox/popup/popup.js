browser.runtime.sendMessage("open")

document.getElementById("ca").addEventListener("click", function () { browser.runtime.sendMessage("open") })
document.getElementById("rc").addEventListener("click", function () { browser.runtime.sendMessage("reconnect"); browser.runtime.sendMessage("open") })


function handleMessage(request) {
    if (request.code == "open") {
        if (request.data.isConnected) {
            document.getElementById("c").innerHTML = "Connected"
            document.getElementById("dc").innerHTML = ""
        } else {
            document.getElementById("c").innerHTML = ""
            document.getElementById("dc").innerHTML = "Disconnected"
        }
    }
}
browser.runtime.onMessage.addListener(handleMessage);