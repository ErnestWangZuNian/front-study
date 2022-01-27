const jsonp = (url, callbackName, callbackFn) => {
    const body = document.body;
    const script = document.createElement('script');
    script.src = `${url}?callback=${callbackName}`;
    script.async = true;
    script.type = 'text/javascript'
    window[callbackName] = function (data) {
        callbackFn(data)
    };
    body.appendChild(script);
}

jsonp('http:xx', 'callback', function (data) {
    console.log(data)
})