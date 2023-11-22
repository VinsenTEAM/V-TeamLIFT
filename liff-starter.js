window.onload = function() {
    const useNodeJS = false; 
    const defaultLiffId = "2001802457-n2KbaYwM";
    let myLiffId = "2001802457-n2KbaYwM";

    if (useNodeJS) {
        fetch('/liff/send-id', {
            headers: {
                "referer": "https://pixiv.net/en/"
            }
        })
        .then(function(reqResponse) {
            return reqResponse.json();
        })
        .then(function(jsonResponse) {
            myLiffId = jsonResponse.id;
            initializeLiff(myLiffId);
        })
        .catch(function(error) {
            console.log(error.message, error.code);
        });
    } else {
        myLiffId = defaultLiffId;
        initializeLiff(myLiffId);
    }
};

function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            sendLiff();
        })
        .catch((err) => {
            console.log(err);
        });
}

function sendLiff(){
    var tipe = getParameterByName('type');
    if (tipe === 'text') {
        liff.sendMessages([{
            type: 'text',
            text: getParameterByName('text'),
            sentBy: {
                label: "©𝐕𝐓𝐄𝐀𝐌•𝐂𝐨𝐩𝐲𝐫𝐢𝐠𝐡𝐭-𝟐𝟎𝟐𝟑",
                iconUrl: "https://i.ibb.co/n7pzyGj/20220308-173553.jpg",
                linkUrl: "https://vinsenteam.github.io"
            }
        }]).then(function () {
            liff.closeWindow();
        });
    } else if (tipe === 'image') {
        liff.sendMessages([{
            type: 'image',
            originalContentUrl: getParameterByName('img'),
            previewImageUrl: getParameterByName('img'),
            sentBy: {
                label: "©𝐕𝐓𝐄𝐀𝐌•𝐂𝐨𝐩𝐲𝐫𝐢𝐠𝐡𝐭-𝟐𝟎𝟐𝟑",
                iconUrl: "https://i.ibb.co/n7pzyGj/20220308-173553.jpg",
                linkUrl: "https://vinsenteam.github.io"
            }
        }]).then(function () {
            liff.closeWindow();
        });
    } else if (tipe === 'video') {
        prev = getParameterByName('piu');
        if(prev !== null && prev !== '') {
            dura = prev;
        } else {
            dura = "https://i.ibb.co/n7pzyGj/20220308-173553.jpg";
        }
        liff.sendMessages([{
            type: 'video',
            originalContentUrl: getParameterByName('ocu'),
            previewImageUrl: dura
        }]).then(function () {
            liff.closeWindow();
        });
    } else if (tipe === 'audio') {
        duration = getParameterByName('duration');
        if(duration !== null && duration !== '') {
            dura = parseInt(duration);
        } else {
            dura = 60000;
        }
        liff.sendMessages([{
            type: 'audio',
            originalContentUrl: getParameterByName('link'),
            duration: dura
        }]).then(function () {
            liff.closeWindow();
        });
    }
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
