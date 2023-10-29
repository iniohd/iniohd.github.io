/*
* (c) inioHD 2020 - 2023
*/

function getGithubRespositoryRelease(repoName, showAtMost, callback) {
    if ("string" !== typeof repoName) {
        throw new Error("Repository's name mustn't be empty");
    }
    showAtMost = ("number" === typeof showAtMost) ? showAtMost : 5;

    const url = `https://api.github.com/repos/iniohd/${repoName}/releases?per_page=${showAtMost}&uncache=${(new Date()).getTime()}`,
    options = {
        headers: {
            Accept: "application/vnd.github.v3+json"
        }
    }

    fetch(url, options)
    .then((res) => {
        if (!res.ok) {
            callback("")
            return
        }
        if (!callback) {
            return
        }
        return res.json()
    })
    .then((res) => {
        callback(res);
    })
    .catch((error) => {
        if (!callback) {
            return;
        }
        callback(`An error occured. Please check your internet connection and try again: ${error}`)
    })
}