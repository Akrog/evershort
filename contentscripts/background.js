EVERNOTE_REGEX = new RegExp("https:\/\/(.+\.)?(evernote|yinxiang)\.com\/(u/.*?\/)?Home\.action.*")

chrome.browserAction.onClicked.addListener(function(tab) {
    if (EVERNOTE_REGEX.test(tab.url))
        code = "toggle_help();";
    else
        code = "window.alert(\"EverShort only works when you are on EverNote's website and logged in: https://www.evernote.com or https://www.yinxiang.com\");";
    chrome.tabs.executeScript(null, {code: code});
});
