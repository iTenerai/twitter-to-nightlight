const prefix = "[Nightlight Repost Debug]: ";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "sendRequest") {

        fetch("https://night-light.cz/nlapi/post", {
            method: "POST",
            credentials: true,
            body: message.postData
        }).then(data => data.json()).then(data => {
            if (data['status'] == 0) {
                sendResponse({ success: false, message: data['message'] });
                chrome.notifications.create({
                    type: "basic",
                    iconUrl: browser.runtime.getURL('assets/nightycry.png'),
                    title: "Failed to repost to Nightlight",
                    message: "Please check if you are logged in to Nightlight, try again later or contact support with this error: " + data['message'],
                });
                return true;
            }
            else if (data['status'] == 1) {
                sendResponse({ success: true, message: "Repost successful" });
                chrome.notifications.create({
                    type: "basic",
                    iconUrl: browser.runtime.getURL('assets/logo_monochrome.png'),
                    title: "Reposted to Nightlight",
                    message: "Tweet has been reposted to Nightlight succcessfully",
                });
                return true;
            }
        });
    }
    if(message.type === "cookieRequest") {
        getCookies(message.name, function(cookie) {
            sendResponse(cookie);
        });
        return true;
    }
});

function getCookies(name, callback) {
    chrome.cookies.get({
        "url": "https://night-light.cz",
        "name": name
    }, function (cookie) {
        if (callback) {
            if (cookie === null) {
                callback(null)
            } else {
                callback(cookie.value);
            }
        }
    });
}