/**
 * isMobile.js v0.4.1
 *
 * A simple library to detect Apple phones and tablets,
 * Android phones and tablets, other mobile devices (like blackberry, mini-opera and windows phone),
 * and any kind of seven inch device, via user agent sniffing.
 *
 * @author: Kai Mallea (kmallea@gmail.com)
 *
 * @license: http://creativecommons.org/publicdomain/zero/1.0/
 */
(function (global) {

    var apple_phone = /iPhone/i,
        apple_ipod = /iPod/i,
        apple_tablet = /iPad/i,
        android_phone = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
        android_tablet = /Android/i,
        amazon_phone = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
        amazon_tablet = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
        windows_phone = /Windows Phone/i,
        windows_tablet = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
        other_blackberry = /BlackBerry/i,
        other_blackberry_10 = /BB10/i,
        other_opera = /Opera Mini/i,
        other_chrome = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
        other_firefox = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
        seven_inch = new RegExp('(?:' + // Non-capturing group

            'Nexus 7' + // Nexus 7

            '|' + // OR

            'BNTV250' + // B&N Nook Tablet 7 inch

            '|' + // OR

            'Kindle Fire' + // Kindle Fire

            '|' + // OR

            'Silk' + // Kindle Fire, Silk Accelerated

            '|' + // OR

            'GT-P1000' + // Galaxy Tab 7 inch

            ')', // End non-capturing group

            'i'); // Case-insensitive matching

    var match = function (regex, userAgent) {
        return regex.test(userAgent);
    };

    var IsMobileClass = function (userAgent) {
        var ua = userAgent || navigator.userAgent;

        // Facebook mobile app's integrated browser adds a bunch of strings that
        // match everything. Strip it out if it exists.
        var tmp = ua.split('[FBAN');
        if (typeof tmp[1] !== 'undefined') {
            ua = tmp[0];
        }

        // Twitter mobile app's integrated browser on iPad adds a "Twitter for
        // iPhone" string. Same probable happens on other tablet platforms.
        // This will confuse detection so strip it out if it exists.
        tmp = ua.split('Twitter');
        if (typeof tmp[1] !== 'undefined') {
            ua = tmp[0];
        }

        this.apple = {
            phone: match(apple_phone, ua),
            ipod: match(apple_ipod, ua),
            tablet: !match(apple_phone, ua) && match(apple_tablet, ua),
            device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
        };
        this.amazon = {
            phone: match(amazon_phone, ua),
            tablet: !match(amazon_phone, ua) && match(amazon_tablet, ua),
            device: match(amazon_phone, ua) || match(amazon_tablet, ua)
        };
        this.android = {
            phone: match(amazon_phone, ua) || match(android_phone, ua),
            tablet: !match(amazon_phone, ua) && !match(android_phone, ua) && (match(amazon_tablet, ua) || match(android_tablet, ua)),
            device: match(amazon_phone, ua) || match(amazon_tablet, ua) || match(android_phone, ua) || match(android_tablet, ua)
        };
        this.windows = {
            phone: match(windows_phone, ua),
            tablet: match(windows_tablet, ua),
            device: match(windows_phone, ua) || match(windows_tablet, ua)
        };
        this.other = {
            blackberry: match(other_blackberry, ua),
            blackberry10: match(other_blackberry_10, ua),
            opera: match(other_opera, ua),
            firefox: match(other_firefox, ua),
            chrome: match(other_chrome, ua),
            device: match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua) || match(other_chrome, ua)
        };
        this.seven_inch = match(seven_inch, ua);
        this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;

        // excludes 'other' devices and ipods, targeting touchscreen phones
        this.phone = this.apple.phone || this.android.phone || this.windows.phone;

        // excludes 7 inch devices, classifying as phone or tablet is left to the user
        this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;

        if (typeof window === 'undefined') {
            return this;
        }
    };

    var instantiate = function () {
        var IM = new IsMobileClass();
        IM.Class = IsMobileClass;
        return IM;
    };

    if (typeof module !== 'undefined' && module.exports && typeof window === 'undefined') {
        //node
        module.exports = IsMobileClass;
    } else if (typeof module !== 'undefined' && module.exports && typeof window !== 'undefined') {
        //browserify
        module.exports = instantiate();
    } else if (typeof define === 'function' && define.amd) {
        //AMD
        define('isMobile', [], global.isMobile = instantiate());
    } else {
        global.isMobile = instantiate();
    }

})(this);

var personer = [{
        navn: "Per",
        pronomen: "han"
    },
    {
        navn: "Kåre",
        pronomen: "han"
    },
    {
        navn: "Pål",
        pronomen: "han"
    },
    {
        navn: "Espen",
        pronomen: "han"
    },
    {
        navn: "Donald",
        pronomen: "han"
    },
    {
        navn: "Pavel",
        pronomen: "han"
    },
    {
        navn: "Martine",
        pronomen: "hun"
    },
    {
        navn: "Tiril",
        pronomen: "hun"
    },
    {
        navn: "Kristina",
        pronomen: "hun"
    },
    {
        navn: "Lana",
        pronomen: "hun"
    },
    {
        navn: "Kira",
        pronomen: "hun"
    }
]

var ting = ["en pizza", "en taco", "en baguett", "en kjøttdeig", "en sjokolade", "en brus", "en agurk", "en gulrot", "en banan", "et eple", "en pakke med druer", "et ostehorn", "en tomat", "en pose med chips"];

var svarboks = '<input type="number" pattern="[0-9]*" required inputmode="numeric" class="svarboks w2l" title="Svar" id="svarboks1" tabindex="0" />',
    svarboks2 = '<input type="number" pattern="[0-9]*" required inputmode="numeric" class="svarboks w2l" title="Svar" id="svarboks2" tabindex="0" />',
    svarboks3 = '<input type="number" pattern="[0-9]*" required inputmode="numeric" class="svarboks w2l" title="Svar" id="svarboks3" tabindex="0" />',
    svarboks4 = '<input type="number" pattern="[0-9]*" required inputmode="numeric" class="svarboks w2l" title="Svar" id="svarboks4" tabindex="0" />',
    svarboks4 = '<input type="number" pattern="[0-9]*" required inputmode="numeric" class="svarboks w2l" title="Svar" id="svarboks5" tabindex="0" />';

var typeOppgave, typerOppgave;

var person = personer[0],
    pengerStart, penger1, penger2, ting1, ting2, svar, personer1,
    tall0 = 0,
    tall1 = 0,
    tall2 = 0,
    tall3 = 0,
    tall4 = 0,
    tall5 = 0,
    tall6 = 0,
    tall7 = 0,
    tall8 = 0,
    tall9 = 0,
    tall10 = 0,
    tallTest0 = 0,
    tallTest1 = 0,
    tallTest2 = 0,
    tallTest3 = 0,
    tallTest4 = 0,
    tallTest5 = 0,
    tallTest6 = 0,
    tallTest7 = 0,
    tallTest8 = 0,
    tallTest9 = 0,
    tallTest10 = 0;

var helBrøk = false;

var vanskelighetsgrader = [];

var oppgObj = {};

var vanskArray = [],
    oppgObj = {};

var oppgArr;

function random(from, to) {
    let from1 = to - from;
    return Math.floor(Math.random() * from1) + from;
}

function randomItem() {
    return ting[Math.floor(Math.random() * ting.length)];
}

function randomPerson() {
    return personer[Math.floor(Math.random() * personer.length)];
}

function randomFromArr(arr) {
    return arr[random(0, arr.length)];
}

function randomFromObj(obj) {
    return obj[randomFromArr(Object.keys(obj))];
}

function cfl(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}

function sortNumbers(a, b) {
    return a - b;
}

var tekstoppgaver = {
    lettere: {
        pluss: [{
            func: function () {
                person = randomPerson();

                pengerStart = random(1, 6) * 10;
                penger1 = random(1, 9);

                svar = pengerStart + penger1;

                return {
                    text: `${person.navn} har ${pengerStart} kr.<br/>${cfl(person.pronomen)} får ${penger1} kr til bursdagen.<br/>Hvor mange kroner har ${person.pronomen}?`,
                    svar: `${cfl(person.pronomen)} har ${svarboks} kr.`,
                    riktig: svar
                }
            },
            svarFunc: function () {
                if ($("#svarboks1").val() == oppgave.riktig) {
                    riktig();
                } else {
                    feil();
                }
            }
        }]
    },
    lett: {
        minus: [{
            func: function () {
                person = randomPerson();

                pengerStart = random(30, 80);
                penger1 = random(1, pengerStart - 5);

                ting1 = randomItem();

                svar = pengerStart - penger1;

                return {
                    text: `${person.navn} har ${pengerStart} kr.<br/>${cfl(person.pronomen)} kjøper ${ting1} for ${penger1} kr.<br/>Hvor mange kroner har ${person.pronomen} igjen?`,
                    svar: `${cfl(person.pronomen)} har ${svarboks} kr igjen.`,
                    riktig: svar
                }
            },
            svarFunc: function () {
                if ($("#svarboks1").val() == oppgave.riktig) {
                    riktig();
                } else {
                    feil();
                }
            }
        }],
        "brøk": [{
            func: function () {
                tallTest0 = random(1, 8);
                tallTest1 = random(1, 8);
                tallTest2 = random(1, 8);
                tall3 = random(1, 4);
                tall4 = random(1, 4);

                var tallArr = [tallTest0, tallTest1, tallTest2];
                tallArr.sort(sortNumbers);
                tall0 = tallArr[0];
                tall1 = tallArr[1];
                tall2 = tallArr[2] + 1;

                var hele = tall3 + tall4,
                    tall1_2 = tall0 + tall1;

                if (tall0 + tall1 >= tall2) {
                    hele++;
                    // tall1_2 = tall1 - tall2;
                    tall1_2 = tall0 + tall1 - tall2;
                }

                var nevner = [],
                    teller = [];

                for (var i = tall2; i >= 0; i--) {
                    if ((tall2) % i == 0 && tall1_2 % i == 0) {
                        nevner.push(tall2 / i);
                        teller.push(tall1_2 / i);
                    }
                }

                // console.log("teller", teller);
                // console.log("nevner", nevner);

                var ekte = `<brøk ekte><span>${svarboks2}</span><span>—</span><span>${svarboks3}</span></brøk></brøk>`;
                if (teller.includes(0)) {
                    ekte = "";
                    helBrøk = true;
                }

                return {
                    text: `Hva er <brøk blandet><brøk hel>${tall3}</brøk><brøk ekte><span>${tall0}</span><span>—</span><span>${tall2}</span></brøk></brøk> + <brøk blandet><brøk hel>${tall4}</brøk><brøk ekte><span>${tall1}</span><span>—</span><span>${tall2}</span></brøk></brøk>`,
                    svar: `Det er <brøk><brøk hel>${svarboks}</brøk>${ekte}`,
                    riktig: {
                        teller: teller,
                        nevner: nevner,
                        hele: hele
                    }
                }
            },
            svarFunc: function () {
                // console.log("teller", oppgave.riktig["teller"], oppgave.riktig["teller"].includes(eval($("#svarboks1").val())), $("#svarboks1").val());
                // console.log("nevner", oppgave.riktig["nevner"], oppgave.riktig["nevner"].includes(eval($("#svarboks2").val())), $("#svarboks2").val());
                if ($("#svarboks1").val() == oppgave.riktig.hele && (helBrøk = true || (oppgave.riktig["teller"].includes(eval($("#svarboks2").val())) && oppgave.riktig["nevner"].includes(eval($("#svarboks3").val()))))) {
                    riktig();
                } else {
                    feil();
                }
            }
        }]
    },
    middels: {
        minus: [{
            func: function () {
                person = randomPerson();

                pengerStart = random(30, 80);
                penger1 = random(1, pengerStart / 2);
                penger2 = random(1, pengerStart - penger1);
                pengerStart += 2;

                ting1 = randomItem();
                ting2 = randomItem();

                svar = pengerStart - (penger1 + penger2);

                return {
                    text: `${person.navn} har ${pengerStart} kr.<br/>${cfl(person.pronomen)} kjøper ${ting1} for ${penger1} kr og ${ting2} for ${penger2} kr.<br/>Hvor mange kroner har ${person.pronomen} igjen?`,
                    svar: `${cfl(person.pronomen)} har ${svarboks} kr igjen.`,
                    riktig: svar
                }
            },
            svarFunc: function () {
                if ($("#svarboks1").val() == oppgave.riktig) {
                    riktig();
                } else {
                    feil();
                }
            }
        }],
        pluss: [{
            func: function () {
                person = randomPerson();

                pengerStart = random(10, 60);
                penger1 = random(5, 35);

                svar = pengerStart + penger1;

                return {
                    text: `${person.navn} har ${pengerStart} kr.<br/>${cfl(person.pronomen)} får ${penger1} kr til bursdagen.<br/>Hvor mange kroner har ${person.pronomen}?`,
                    svar: `${cfl(person.pronomen)} har ${svarboks} kr.`,
                    riktig: svar
                }
            },
            svarFunc: function () {
                if ($("#svarboks1").val() == oppgave.riktig) {
                    riktig();
                } else {
                    feil();
                }
            }
        }, {
            func: function () {
                person = randomPerson();

                penger1 = random(50, 100);
                penger2 = random(50, 100);

                svar = penger1 + penger2;

                return {
                    text: `${person.navn} har bursdag.<br/>${cfl(person.pronomen)} får ${penger1} kr i familiebesøket og ${penger2} kr i  klassebesøket.<br/>Hvor mange penger får ${person.pronomen}?`,
                    svar: `${cfl(person.pronomen)} får ${svarboks} kr til bursdagen.`,
                    riktig: svar
                }
            },
            svarFunc: function () {
                if ($("#svarboks1").val() == oppgave.riktig) {
                    riktig();
                } else {
                    feil();
                }
            }
        }],
        ganging: [{
            func: function () {
                person = randomPerson();

                penger1 = random(1, 10) * 10;
                personer1 = random(2, 10);

                svar = penger1 * personer1;

                return {
                    text: `${person.navn} skal gi penger til ${personer1} personer.<br/>Alle får ${penger1} kr hver.<br/>Hvor mange penger gir ${person.pronomen}?`,
                    svar: `${cfl(person.pronomen)} gir ${svarboks} kr.`,
                    riktig: svar
                }
            },
            svarFunc: function () {
                if ($("#svarboks1").val() == oppgave.riktig) {
                    riktig();
                } else {
                    feil()
                }
            }
        }]
        // finnDenUkjentePluss: [],
        // finnDenUkjenteMinus: [],
        // finnDenUkjenteGanging: [],
        // klokke: [],
        // tid: [],
        // fart: [],
        // lengde: [],
        // volum: [],
        // areal: [],
        // overflate: [],
        // omkrets: []
    },
    vanskelig: {
        ganging: [{
            func: function () {
                person = randomPerson();

                penger1 = random(1, 20);
                personer1 = random(2, 10);

                svar = penger1 * personer1;

                return {
                    text: `${person.navn} skal gi penger til ${personer1} personer.<br/>Alle får ${penger1} kr hver.<br/>Hvor mange penger gir ${person.pronomen}?`,
                    svar: `${cfl(person.pronomen)} gir ${svarboks} kr.`,
                    riktig: svar
                }
            },
            svarFunc: function () {
                if ($("#svarboks1").val() == oppgave.riktig) {
                    riktig();
                } else {
                    feil()
                }
            }
        }],
        "brøk": [{
            func: function () {
                tallTest0 = random(1, 9);
                tallTest1 = random(1, 9);
                tallTest2 = random(1, 9);
                tallTest3 = random(1, 9);

                if (tallTest0 > tallTest1) {
                    tall0 = tallTest1;
                    tall1 = tallTest0;
                } else {
                    tall0 = tallTest0;
                    tall1 = tallTest1;
                }

                if (tallTest2 > tallTest3) {
                    tall2 = tallTest3;
                    tall3 = tallTest2;
                } else {
                    tall2 = tallTest2;
                    tall3 = tallTest3;
                }

                var nevner = [],
                    teller = [];

                for (var i = tall1 * tall3; i >= 0; i--) {
                    if ((tall1 * tall3) % i == 0 && (tall0 * tall2) % i == 0) {
                        nevner.push((tall1 * tall3) / i);
                        teller.push((tall0 * tall2) / i);
                    }
                }

                // console.log("teller", teller);
                // console.log("nevner", nevner);

                return {
                    text: `Hva er <brøk ekte><span>${tall0}</span><span>—</span><span>${tall1}</span></brøk> · <brøk ekte><span>${tall2}</span><span>—</span><span>${tall3}</span></brøk>`,
                    svar: `Det er <brøk ekte><span>${svarboks}</span><span>—</span><span>${svarboks2}</span></brøk>`,
                    riktig: {
                        teller: teller,
                        nevner: nevner
                    }
                }
            },
            svarFunc: function () {
                // console.log("teller", oppgave.riktig["teller"], oppgave.riktig["teller"].includes(eval($("#svarboks1").val())), $("#svarboks1").val());
                // console.log("nevner", oppgave.riktig["nevner"], oppgave.riktig["nevner"].includes(eval($("#svarboks2").val())), $("#svarboks2").val());
                if (oppgave.riktig["teller"].includes(eval($("#svarboks1").val())) && oppgave.riktig["nevner"].includes(eval($("#svarboks2").val()))) {
                    riktig();
                } else {
                    feil();
                }
            }
        }]
    },
    vanskeligere: {
        ganging: [{
            func: function () {
                person = randomPerson();

                penger1 = random(0, 20);
                personer1 = random(2, 10);

                svar = penger1 * personer1;

                return {
                    text: `${person.navn} skal gi penger til ${personer1} personer.<br/>Alle får ${penger1} kr hver.<br/>Hvor mange penger gir ${person.pronomen}?`,
                    svar: `${cfl(person.pronomen)} gir ${svarboks} kr.`,
                    riktig: svar
                }
            },
            svarFunc: function () {
                if ($("#svarboks1").val() == oppgave.riktig) {
                    riktig();
                } else {
                    feil()
                }
            }
        }]
    }
}

var oppgave, oppgaveSvar;

function velgOppgave() {
    if ($(".checked")[0] || $(".checked").length) {
        $("#svarknapp").removeClass("hide");
        // let oppgaveObj = randomFromArr(randomFromObj(tekstoppgaver.middels));
        let randFromOppgArr = randomFromArr(vanskArray);
        let oppgaveObj = randomFromArr(tekstoppgaver[randFromOppgArr][randomFromArr(oppgObj[randFromOppgArr])]);

        oppgave = oppgaveObj.func();
        oppgaveSvar = oppgaveObj.svarFunc;

        let oppgavTxt = oppgave["text"].split("<br/>");
        let oppgavArr = [];

        for (var i = 0; i < oppgavTxt.length; i++) {
            oppgavArr.push('<span class="oppgaveTxt">' + oppgavTxt[i] + '</span>');
        }

        let oppgavText = oppgavArr.join("");
        oppgave["text"] = oppgavText;

        //--\\

        let oppgavSvar = oppgave["svar"].split("<br/>");
        let oppgavSvarArr = [];
        for (var i = 0; i < oppgavSvar.length; i++) {
            oppgavSvarArr.push('<span class="oppgaveSvar">' + oppgavSvar[i] + '</span>');
        }

        let oppgavSvaret = oppgavSvarArr.join("");
        oppgave["svar"] = oppgavSvaret;

        $(".text").html(oppgave.text);
        $(".svar").html(oppgave.svar);
        // resizeText();

        // if (isMobile.any || isMobile.phone || isMobile.tablet) {
        //     $(".svarboks").attr("data-role", "keypad").addClass("keypadMetro");
        // }

        if (!$(".openDiv").hasClass("showOpenDiv")) {
            $("#svarboks1").focus();
        }
    } else {
        // alert("Du må velge minst en oppgavetype!");
        $(".text").html('<span class="oppgaveTxt">Du må velge minst en oppgavetype!</span>');
        $(".svar").html('');
        $("#svarknapp").addClass("hide");
        return;
    }
}

$("#svarknapp").click(function () {
    oppgaveSvar();
});

var timeout;

function shake(el, times = 1) {
    clearTimeout(timeout);
    el.addClass("shake");
    timeout = setTimeout(function () {
        el.removeClass("shake");
    }, times * 500);
}

var showSnackbarTime;

function showSnackbar() {
    clearTimeout(showSnackbarTime);
    $("#snackbar").addClass("show");
    showSnackbarTime = setTimeout(function () {
        $("#snackbar").removeClass("show");
    }, 1500);
}

function feil() {
    $("#snackbar").text("Feil");
    $("#snackbar").removeClass("riktig");
    $("#snackbar").addClass("feil");
    // shake($("#svarknapp"), 2);
    animateCSS('.appdiv', 'shakeX');
    showSnackbar();
}

function riktig() {
    $("#snackbar").text("Riktig");
    $("#snackbar").removeClass("feil");
    $("#snackbar").addClass("riktig");
    animateCSS(".appdiv", "heartBeat")
    showSnackbar();
    setTimeout(function () {
        animateCSS(".appdiv", "pulse");
        velgOppgave();
    }, 1500);
}

const animateCSS = (element, animation, prefix = 'animate__') => {
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        const node = document.querySelector(element);

        node.classList.add(`${prefix}animated`, animationName);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, {
            once: true
        });
    });
}

$(".openBtn").click(function () {
    $(".openBtn").toggleClass("rot180");
    $(".openDiv").toggleClass("showOpenDiv");
    animateCSS(".openDiv", "backInDown");
    if (!$(".openDiv").hasClass("showOpenDiv")) {
        $("#svarboks1").focus();
    }
});

$(function () {
    animateCSS(".appdiv", "zoomIn");
    animateCSS("#svarknapp", "fadeInRight");
    animateCSS(".openBtn", "backInDown");
});

function optgroup(txt = "add text") {
    return `<li class="group-title">${txt}</li>`;
}

function option(txt = "add text", val = "add value") {
    return `<li data-text="${txt}" data-value="${val}"><a>${txt}</a></li>`;
}

var optList = ".option-list";

$(function () {
    oppgArr = Object.keys(tekstoppgaver);
    // console.log(oppgArr);

    for (var i = 0; i < oppgArr.length; i++) {
        let ee = tekstoppgaver;
        // console.log("ee", ee);
        let eee = ee[oppgArr[i]];
        // console.log("eee", eee);
        let eeee = Object.keys(eee);
        // console.log("eeee", eeee);
        let oppgArray = eeee;
        // console.log(tekstoppgaver[oppgArr[i]]);
        // console.log("oppgArray", oppgArray);
        for (var o = 0; o < oppgArray.length; o++) {
            //$(`.${oppgArr[i]}`).append(`<li class="li"><input class="cbox" type="checkbox" id="${ids}" value="${oppgArr[i]}_${oppgArray[o]}"><label class="label" for="${ids}">${oppgArray[o]}</label></li>`);
            $(`.${oppgArr[i]}`).append(`<label class="tgl"><input type="checkbox" class="cbox checked" checked id="${oppgArr[i]}_${oppgArray[o]}" onclick="$(this).toggleClass('checked');clickCbox()" /><span>${cfl(oppgArray[o])}</span></label>`)
            // console.log(oppgArray[o]);
        }
        // console.log(oppgArr[i]);
    }

    clickCbox();

    $("#svarboks1").focus();
});

function clickCbox() {
    oppgObj = {};
    vanskArray = [];

    for (var i = 0; i < oppgArr.length; i++) {
        oppgObj[oppgArr[i]] = [];
    }

    $(".cbox").each(function (index) {
        if ($(".checked").eq(index).attr("id") !== undefined) {
            let splitTxt = $(".checked").eq(index).attr("id").split("_")
            // oppgArray.push(splitTxt[1]);
            oppgObj[splitTxt[0]].push(splitTxt[1]);
            vanskArray.push(splitTxt[0]);
        }
    });
    // console.log("Vanskelighetsgrader:", vanskArray, "Oppgavetyper:", oppgObj);

    velgOppgave();
}