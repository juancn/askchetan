var stemmer = (function(){
    var step2list = {
            "ational" : "ate",
            "tional" : "tion",
            "enci" : "ence",
            "anci" : "ance",
            "izer" : "ize",
            "bli" : "ble",
            "alli" : "al",
            "entli" : "ent",
            "eli" : "e",
            "ousli" : "ous",
            "ization" : "ize",
            "ation" : "ate",
            "ator" : "ate",
            "alism" : "al",
            "iveness" : "ive",
            "fulness" : "ful",
            "ousness" : "ous",
            "aliti" : "al",
            "iviti" : "ive",
            "biliti" : "ble",
            "logi" : "log"
        },

        step3list = {
            "icate" : "ic",
            "ative" : "",
            "alize" : "al",
            "iciti" : "ic",
            "ical" : "ic",
            "ful" : "",
            "ness" : ""
        },

        c = "[^aeiou]",          // consonant
        v = "[aeiouy]",          // vowel
        C = c + "[^aeiouy]*",    // consonant sequence
        V = v + "[aeiou]*",      // vowel sequence

        mgr0 = "^(" + C + ")?" + V + C,               // [C]VC... is m>0
        meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",  // [C]VC[V] is m=1
        mgr1 = "^(" + C + ")?" + V + C + V + C,       // [C]VCVC... is m>1
        s_v = "^(" + C + ")?" + v;                   // vowel in stem

    return function (w) {
        var 	stem,
            suffix,
            firstch,
            re,
            re2,
            re3,
            re4,
            origword = w;

        if (w.length < 3) { return w; }

        firstch = w.substr(0,1);
        if (firstch == "y") {
            w = firstch.toUpperCase() + w.substr(1);
        }

        // Step 1a
        re = /^(.+?)(ss|i)es$/;
        re2 = /^(.+?)([^s])s$/;

        if (re.test(w)) { w = w.replace(re,"$1$2"); }
        else if (re2.test(w)) {	w = w.replace(re2,"$1$2"); }

        // Step 1b
        re = /^(.+?)eed$/;
        re2 = /^(.+?)(ed|ing)$/;
        if (re.test(w)) {
            var fp = re.exec(w);
            re = new RegExp(mgr0);
            if (re.test(fp[1])) {
                re = /.$/;
                w = w.replace(re,"");
            }
        } else if (re2.test(w)) {
            var fp = re2.exec(w);
            stem = fp[1];
            re2 = new RegExp(s_v);
            if (re2.test(stem)) {
                w = stem;
                re2 = /(at|bl|iz)$/;
                re3 = new RegExp("([^aeiouylsz])\\1$");
                re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");
                if (re2.test(w)) {	w = w + "e"; }
                else if (re3.test(w)) { re = /.$/; w = w.replace(re,""); }
                else if (re4.test(w)) { w = w + "e"; }
            }
        }

        // Step 1c
        re = /^(.+?)y$/;
        if (re.test(w)) {
            var fp = re.exec(w);
            stem = fp[1];
            re = new RegExp(s_v);
            if (re.test(stem)) { w = stem + "i"; }
        }

        // Step 2
        re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
        if (re.test(w)) {
            var fp = re.exec(w);
            stem = fp[1];
            suffix = fp[2];
            re = new RegExp(mgr0);
            if (re.test(stem)) {
                w = stem + step2list[suffix];
            }
        }

        // Step 3
        re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
        if (re.test(w)) {
            var fp = re.exec(w);
            stem = fp[1];
            suffix = fp[2];
            re = new RegExp(mgr0);
            if (re.test(stem)) {
                w = stem + step3list[suffix];
            }
        }

        // Step 4
        re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
        re2 = /^(.+?)(s|t)(ion)$/;
        if (re.test(w)) {
            var fp = re.exec(w);
            stem = fp[1];
            re = new RegExp(mgr1);
            if (re.test(stem)) {
                w = stem;
            }
        } else if (re2.test(w)) {
            var fp = re2.exec(w);
            stem = fp[1] + fp[2];
            re2 = new RegExp(mgr1);
            if (re2.test(stem)) {
                w = stem;
            }
        }

        // Step 5
        re = /^(.+?)e$/;
        if (re.test(w)) {
            var fp = re.exec(w);
            stem = fp[1];
            re = new RegExp(mgr1);
            re2 = new RegExp(meq1);
            re3 = new RegExp("^" + C + v + "[^aeiouwxy]$");
            if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
                w = stem;
            }
        }

        re = /ll$/;
        re2 = new RegExp(mgr1);
        if (re.test(w) && re2.test(w)) {
            re = /.$/;
            w = w.replace(re,"");
        }

        // and turn initial Y back to y

        if (firstch == "y") {
            w = firstch.toLowerCase() + w.substr(1);
        }

        return w;
    }
})();

function Chetan() {}
Chetan.prototype.phrases = [ "ah I see",
    "anyhow I think we will deploy the case as is for now and fix this is in future",
    "call USA is good",
    "chatting with DLove",
    "css classes are hyphenated. ",
    "css classes exclusively used for javascript selector purposes are camel case and prefixed with 'js'",
    "default is true",
    "Did that and reverted it back.",
    "dont see any other differences",
    "easy targets",
    "great.. let me know if you need any help.. I am in a hiding",
    "Hey! I'm feeling good. how are you?",
    "hi",
    "hmm",
    "hmm.. does it throw any exceptions?",
    "hmm.. there are couple of options",
    "I am going to use their api to auto-hide Santiago's complaints.",
    "I can't find in the the google code style, but we really like to add curly braces for if, even if it encloses a single statement.",
    "I dont think we need to do that",
    "I like to blame the css guys for all my misery",
    "I think I have a patch for it",
    "I took it out.",
    "I'll look at it right away",
    "I'm not sure if thats what you meant",
    "ids should be camel case",
    "if it is not express, don't worry about it too much",
    "if it works there, it should work with the app too",
    "if not cached, it will actually make those requests",
    "is there a qa instance where I can see this?",
    "it is never really meant to do that",
    "it is not the most awesome thing out there",
    "it is quite tiny and simple",
    "it is ugly anyway",
    "it is very fast now but there is still some room for improvement",
    "it is weird explaining new guys that we need to run functional tests to run js unit tests",
    "it will probably go away soon",
    "it worked fine during the conference",
    "Just adding a comment there should be sufficient to understand",
    "just to keep in mind I will create a case for future",
    "Let's not use hyphenated file names for javascript. No reason in particular, but we've been using camel-case lately",
    "my opinion is to not fix it",
    "node has jsdom, which is again some sort of hack",
    "not sure, but based on the current experience so far, it would be great if we have...",
    "now I'm \"ok\"",
    "ok, but where do you need to use it?",
    "second option takes some extra work to make it work with functional runner",
    "so....",
    "so each dropdown makes its own request for json right?",
    "some of them are same URLs",
    "someone messed up Poland",
    "something using jquery.deferred",
    "Sorcery, magic and arcane arts can't be taught by PPTs",
    "sorry got disconnected.. we'll chat later",
    "Thanks for pitching in!",
    "that didn't happen before",
    "that's my question",
    "that's the only suspect code as far as I can tell",
    "The preferred way of creating a new object is '{}'.",
    "there are no events",
    "There isn't anything for user-agent, but maybe add a method and replace all other occurrences?",
    "There won't be an error other than a catastrophic failure ",
    "These were added for server side paging, no longer necessary. Please remove them.",
    "try rhino rather than node easier to use with java",
    "umm.. ok",
    "umm.. yeah it works for pie",
    "wait.. say haha after a minute",
    "we can always add features",
    "We had a similar problem (slow pump) that was solved by running ANALYZE.",
    "we need something that looks at the md5 before making the ajax call and not do it if a call is in progress",
    "we should do the simplest thing possible",
    "We talked about this, but sending this so others may have ideas",
    "We will have this documented someplace soon.",
    "what do you mean specifically?",
    "what's the result? do you have a bug?",
    "why do you need it?",
    "yeah I thought so",
    "yeah, it is a parameter or something similar",
    "yeah, thats reasonable",
    "yes, but only if we have a justification",
    "you should tell David, he makes the rules :)",
    "does it matter in terms of resources?",
    "I can't ssh either",
    "works if you're already logged in",
    "probably a DNS issue",
    "sounds dangerous",
    "do we trust it?",
    "ah, the infamous foo pool",
    "only in dashboards",
    "we use IE7, but we need ponies",
    "hopefully it all goes away soon :)",
    "uh.. should it be styled by you?",
    "I don't remember fixing anything with jquery",
    "wait for 10 mins or so :)",
    "most likely internal admin",
    "is there something obviously slow?",
    "I agree it is confusing",
    "my productivity is up 200%, thank you email disruption angel!",
    "time to sacrifice a goat",
    "IHAVENOIDEA=1",
    "it is broken for sure, but not sure who build it that way",
    "if the cleaner is in Northern hemisphere, is it still spring cleaning?",
    "are we assuming git will solve all our problems? :)",
    "I saw Ted running really fast, so I'm guessing it is being fixed :D",
    "To the hive!",
    "we need a isitdownforeveryoneorjustme.medallia.com",
    "what's this wifi-connection spam detector overlord?",
    "Uncaught ReferenceError: Chetan is not defined",
    "Let's start an agrarian society. Medallia co-op",
    "Matt is fixing that",
    "bad network = higher productivity!",
    "weird",
    "Today is merging day, so I'd imaging there would be some disruption",
    "electrons on strike?",
    "we need a REST api for askchetan",
    "A spy!",
    "runs on amazon.. so hint hint",
    "so that's how the apocalypse starts",
    "holy numberchecks queue!",
    "na.. today is my \"happy day\"",
    "oh, sure.. but that's an orthogonal problem",
    "it depends on how \"graphy\" you want it to be",
    "I personally dont think it is worth wasting verical space for that",
    "hmm. in Setup, we \"just do it\" and then beg for forgiveness :D",
    "Jared may have a better answer",
    "thats how it is in xml",
    "reddit has ruined by internet experience",
    "yeah just reload",
    "ha.. is that a Spanish word?",
    "right.. you're not a \"setup\" user yet",
    "this is what you get for following a standard",
    "hopefully everything should \“just work\”",
    "oh I remember we implemented the bare minimum",
    "we should write a script to answer all questions on the hive with askchetan.com",
    "http://i.imgur.com/jacoj.jpg"
];

Chetan.prototype.ask = function(question) {
    return this.phrases[Math.floor(this.phrases.length*Math.random())];
};
