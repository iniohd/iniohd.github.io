/*
* (c) inioHD 2020
*/

function getGHRR(repoName, showAtMost, callback){
    if("string" !== typeof repoName)
        throw new Error("Repository's name mustn't be empty");

    showAtMost = ("number" === typeof showAtMost) ? showAtMost : 5;

    var x = new XMLHttpRequest(), y, d;

    x.onreadystatechange = function(){
        if(x.readyState == 4 && x.status == 200){
            if(callback)
                callback(JSON.parse(x.response));
                
        }
    }

    x.onerror = function(){
        if(callback)
            callback("An error occured. Please check your internet connection and try again.");
    }

    x.onabort = function(){
        if(callback)
            callback("Operation canceled.");
    }

    x.ontimeout = function(){
        if(callback)
            callback("The opeartion is take to long. Please try again.");
    }

    d = new Date();

    y = "https://api.github.com/repos/iniohd/"+ repoName + "/releases?per_page="+
    showAtMost + "&uncache="+ d.getTime();

    x.open("get", y);
    x.setRequestHeader("Accept", "application/vnd.github.v3+json");
    x.send(null);
}