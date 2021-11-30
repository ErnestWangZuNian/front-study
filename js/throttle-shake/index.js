const shake = (fn, options = {
    wait: 2000,
}) => {
    let timer = null;

    return (...args) => {
        const {
            wait
        } = options;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, wait)
    }
}


document.querySelector('#input').oninput = shake((e) => {
    console.log(e.target.value)
})

const a = shake((value) => {
    console.log(value)
})

a(22222);
a(22222);
a(22222);
a(22222);