// ==UserScript==
// @name       Kikora
// @namespace  http://mustafaa.org
// @version    0.1
// @description  Kikora cheats
// @match      https://feide-castor.kikora.no/*
// @require	   http://code.jquery.com/jquery.min.js
// @copyright  2014+, Mustafa
// ==/UserScript==

// Initializing functions
function addOptions(){
    $("#header").before("<b>Kikora cheetah v0.1</b><br /> \
						Laget av: Mustafa Gezen");
    $(".marginMenu").append('<li class="li_tab"> \
								<a href="javascript:void(0)" title="fuck with them exercises"> \
                                    <span class="tab_text" id="recheck_roman">Sjekk romerske tall</span> \
							    </a> \
						    </li> \
							<li class="li_tab"> \
                            	<a href="javascript:void(0)" title="fuck with them exercises"> \
                                    <span class="tab_text" id="check_primes_between">Sjekk primtall</span> \
							    </a> \
							</li> \
							<li class="li_tab"> \
                            	<a href="javascript:void(0)" title="fuck with them exercises"> \
                                    <span class="tab_text" id="check_whole_numbers">Sjekk hele tall</span> \
							    </a> \
							</li> \
							<li class="li_tab"> \
                            	<a href="javascript:void(0)" title="fuck with them exercises"> \
                                    <span class="tab_text" id="check_natural_numbers">Sjekk naturlige tall</span> \
							    </a> \
							</li> \
							<li class="li_tab"> \
                            	<a href="javascript:void(0)" title="fuck with them exercises"> \
                                    <span class="tab_text" id="check_paired_numbers">Sjekk partall</span> \
							    </a> \
							</li> \
							<li class="li_tab"> \
                            	<a href="javascript:void(0)" title="fuck with them exercises"> \
                                    <span class="tab_text" id="check_odd_numbers">Sjekk oddetall</span> \
							    </a> \
							</li> \
							<li class="li_tab"> \
                            	<a href="javascript:void(0)" title="fuck with them exercises"> \
                                    <span class="tab_text" id="check_math">Sjekk mattestykker</span> \
							    </a> \
							</li>');
    
    $("#recheck_roman").click(function() {
        console.log("[Kikora] Recheck Roman");
        sjekkRomersk();
    });
    
    $("#check_primes_between").click(function() {
       	console.log("[Kikora] Check primes");
        sjekkPrim();
    });
    
    $("#check_whole_numbers").click(function() {
		console.log("[Kikora] Check whole numbers");
		sjekkHeleTall();
    });
    
    $("#check_natural_numbers").click(function() {
    	console.log("[Kikora] Check natural numbers");
        sjekkNaturligeTall();
    });
    
    $("#check_paired_numbers").click(function() {
    	console.log("[Kikora] Check paired numbers");
        sjekkParTall();
    });
    
    $("#check_odd_numbers").click(function() {
    	console.log("[Kikora] Check odd numbers");
        sjekkOddeTall();
    });
    
    $("#check_math").click(function() {
        console.log("[Kikora] Check math strings");
        sjekkMatteStykker();
    });
}

// Document ready, add options
$(document).ready(function() {
   addOptions(); 
});

function sjekkRomersk() {
	var question = $(".kikora-question-clause").text().trim().replace(/ /g,'');
    var deromanized = deromanize(question);
    
    if (deromanized != false) {
    	$(".kikora-question-clause").text(deromanized);
    }
    
    $("span").each(function(index) {
    	var tmp = $(this).text().trim().replace(/ /g,'');
        var tmp_deromanized = deromanize(tmp);
        if (tmp_deromanized != false) {
        	$(this).text(tmp_deromanized);   
        }
    });   
}

// Core functions
function sjekkPrim() {
	var minst = window.prompt("Minst", "");
    var maks = window.prompt("Maks", "");
    
    console.log(getPrimes(minst,maks));
}

function sjekkHeleTall() {
	$(".questionClause").each(function(index) {
    	var tmp = $(this).children("span").text().trim().replace(/ /g,'');
        
        if (tmp == Math.round(tmp)) {
        	$(this).children("span").text(tmp + " (Helt tall)");   
        }
    });
}

function sjekkNaturligeTall() {
    $(".questionClause").each(function(index) {
    	var tmp = $(this).children("span").text().trim().replace(/ /g,'');
        
        if (isNaturalNumber(tmp) && tmp != 0) {
        	$(this).children("span").text(tmp + " (Naturlig tall)");   
        }
    });
}

function sjekkParTall() {
	$(".questionClause").each(function(index) {
    	var tmp = $(this).children("span").text().trim().replace(/ /g,'');
        
        if (isPaired(tmp)) {
        	$(this).children("span").text(tmp + " (Partall)");   
        }
    });
}

function sjekkOddeTall() {
	$(".questionClause").each(function(index) {
    	var tmp = $(this).children("span").text().trim().replace(/ /g,'');
        
        if (isOdd(tmp)) {
        	$(this).children("span").text(tmp + " (Oddetall)");   
        }
    });
}

function sjekkMatteStykker() {
    $(".mrow").each(function(index) {
       var tmp = $(this).text();
        if (parseInt(tmp) != NaN) {
        	$(this).text(eval(tmp));   
        }
    });
}

// Critical core functions
function isNaturalNumber(n) {
    n = n.toString();
    var n1 = Math.abs(n),
        n2 = parseInt(n, 10);
    return !isNaN(n1) && n2 === n1 && n1.toString() === n;
}

function deromanize (str) {
    var str = str.toUpperCase();
    var validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/;
    var token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g;
    var key = {
        M:  1000,
        CM: 900,
        D:  500,
        CD: 400,
        C:  100,
        XC: 90,
        L:  50,
        XL: 40,
        X:  10,
        IX: 9,
        V:  5,
        IV: 4,
        I:  1
    };
    var num = 0, m;
    
    if (!(str && validator.test(str))) return false;
    while (m = token.exec(str)) {
        num += key[m[0]];
    }
    
    return num;
}

function getPrimes(min, max) {
    var sieve = [], i, j, primes = [];
    for (i = 2; i <= max; ++i) {
        if (!sieve[i]) {
            if (i >= min) {
                primes.push(i);
            }
            for (j = i << 1; j <= max; j += i) {
                sieve[j] = true;
            }
        }
    }
    return primes;
}

function isPaired(n) {
	var tmp = n / 2;
    if (tmp == Math.round(tmp)) {
    	return true;   
    } else {
    	return false;   
    }
}

function isOdd(n) {
  return n == parseFloat(n) && !!(n % 2);     
}
