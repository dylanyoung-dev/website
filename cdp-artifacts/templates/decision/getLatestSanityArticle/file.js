// Use server-side JavaScript to create a programmable template
// You have full access to the guest context which can be accessed under guest, e.g. guest.email
// This file is being controlled by Source Control!
// This file will automatically get combined with your config.json and added to your tenant.

function getLatestSessionEvents() {
    var lastSanityId = '';

    for (var i = 0; i < guest.session.length; i++) {
        var currentSession = guest.session[i];

        if (currentSession.sessionType === 'WEB') {
            var events = currentSession.events;

            for (var j = 0; j < events.length; j++) {
                var currentEvent = events[j];

                if (event.type === 'VIEW' && event.arbitraryData && event.arbitraryData.sanity_id) {
                    lastSanityId = event.arbitraryData.sanity_id;

                    break;
                }
            }
        }

        if (lastSanityId) {
            break;
        }
    }

    return lastSanityId;
}

(function () {
    var lastSanityId = getLatestSessionEvents();

    return lastSanityId;
})();