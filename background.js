const prefix = "[Nightlight Repost Debug]: ";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Message received:', message);
    if (message.type === "sendRequest") {

        const xhttp = new XMLHttpRequest();
        xhttp.onloadstart = function () {
            console.log(prefix + "Sending repost data to Nightlight");
        };
        xhttp.onload = function () {

            var data;
            try {
                data = JSON.parse(this.responseText);
            } catch (error) {
                console.log("Error parsing JSON response:", error);
                return true;
            }

            if (data['status'] == 0) {
                console.log(prefix + "Repost failed: ", data['message']);            
                sendResponse({ success: false, message: data['message'] });
                chrome.notifications.create({
                    type: "basic",
                    iconUrl: browser.runtime.getURL('assets/logo_monochrome.png'),
                    title: "Failed to repost to Nightlight",
                    message: "Please check if you are logged in to Nightlight, try again later or contact support with this error: " + data['message'],
                });
                return true;
            }
            else if (data['status'] == 1) {
                console.log(prefix + "Repost successful");
                alert("Repost successful");
                sendResponse({ success: true, message: "Repost successful" });
                chrome.notifications.create({
                    type: "basic",
                    iconUrl: browser.runtime.getURL('assets/logo_monochrome.png'),
                    title: "Reposted to Nightlight",
                    message: "Tweet has been reposted to Nightlight succcessfully, you can view it in your Nightlight account",
                });
                return true;
            }
        };

        xhttp.onerror = function () {
            console.error("Error occurred while sending the request");
            sendResponse({ success: false, message: "Request failed" });
            return true;
        };

        xhttp.open("GET", message.requestURL);
        xhttp.send();
        return true;
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