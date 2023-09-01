function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
    return document.querySelector('#iframeautoheight').contentWindow.document.body.innerHTML;
}