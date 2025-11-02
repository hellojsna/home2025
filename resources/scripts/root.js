//
//  root.js
//  home2025
//
//  Created by Js Na on 2025/06/20.
//  Copyright © 2025 Js Na, All rights reserved.
//

function eById(id) {
    return document.getElementById(id);
}
function eByCl(cl) {
    return document.getElementsByClassName(cl);
}
function setCookie(name, value, exp) {
    var date = new Date();
    date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';expires=' + date.toUTCString() + ';path=/; ';
}
function getCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
}
function deleteCookie(name) {
    document.cookie = encodeURIComponent(name) + '=;expires=Thu, 01 JAN 1999 00:00:10 GMT;';
}
function getParameter(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}

// Code for injecting halloween.css on 10/31.
function injectHalloweenTheme() {
    const today = new Date();
    if (today.getMonth() == 9 && today.getDate() > 24 || today.getMonth() == 10 && today.getDate() < 7) { // not only 10/31
        console.log("🎃");
        // CSS for theme.
        const styleElem = document.createElement("style");
        styleElem.textContent = "@import url('./resources/css/halloween.css');";
        document.head.appendChild(styleElem);
        // Pumpkin on the bottom right corner.
        const pumpkinElem = document.createElement("img");
        pumpkinElem.src = "./resources/images/Halloween_emoji_u1f383.png";
        pumpkinElem.id = "JsHalloweenPumpkin";
        pumpkinElem.className = "JsHalloweenImage";
        document.body.appendChild(pumpkinElem); 
        pumpkinElem.addEventListener("click", function() {
            document.body.classList.add("JsHalloweenCursor");
            const batElem = document.createElement("img");
            batElem.src = "./resources/images/Halloween_emoji_u1f987.png";
            batElem.className = "JsHalloweenImage JsHalloweenBat";
            for (let i = 0; i < 5; i += 1) {
                let randomDx = `-${Math.random() * 100}vw`
                let randomDy = `-${Math.random() * 100}vh`
                let batElemClone = batElem.cloneNode(true);
                document.body.appendChild(batElemClone);
                setTimeout(() => {
                    batElemClone.style.transform = `translate(${randomDx}, ${randomDy})`;
                    batElemClone.style.opacity = "0";
                    setTimeout(() => {
                        document.body.removeChild(batElemClone);
                    }, 3500);
                }, Math.random() * 50);
            }
        });

        const halloweenTextList = ["Happy Halloween!", "Trick or Treat!", "Boo!", "Click the pumpkin!"];
        const halloweenTextElem = document.createElement("div");
        halloweenTextElem.id = "JsHalloweenText";
        halloweenTextElem.textContent = halloweenTextList[0];
        document.body.appendChild(halloweenTextElem);
        let textIndex = 0;
        setInterval(() => {
            textIndex = (textIndex + 1) % halloweenTextList.length;
            halloweenTextElem.textContent = halloweenTextList[textIndex];
        }, 3000);
        console.log("Halloween theme injected.");
    }
}
injectHalloweenTheme();