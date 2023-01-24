window.ExposePresence = {
    presData: {
        details: "",
        state: "",
        largeImageKey: "",
    },
    richPresence: {
        init: () => this.ws.send(ExposePresence.presData),
    },
    github: {
        getRepo: location.pathname.replace("/", ""),
    },
};
