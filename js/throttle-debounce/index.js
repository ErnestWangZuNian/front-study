import _ from 'loadsh';
const debounce = (fn, options = {}) => {
    let timer = null;
    let isFirst = false;
    let firstTime = 0;
    const wait = options.wait || 2000;
    const immediate = options.immediate || false;

    return (...args) => {
        if (!immediate) {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                fn.apply(this, args);
            }, wait)
        } else {
            const immediateFn = () => {
                fn.apply(this, args);
                isFirst = true;
                firstTime = Date.now();
            };
            if (!isFirst) {
                immediateFn();
            } else if (Date.now() - firstTime > wait) {
                fn.apply(this, args);
                firstTime = Date.now();
            }

        }


    }
}


// document.querySelector('#input').oninput = debounce((e) => {
//     console.log(e.target.value)
// });

document.querySelector('#input').oninput = _.debounce((e) => {
    console.log(e.target.value)
}, 250, {
    'maxWait': 100000
});

const p1 = () => {
    const test = new Promise((resolve) => {
        setTimeout(() => {
            resolve('ok')
        }, 2000)
    });
    return test;
}

document.querySelector('.btn').onclick = async () => {
    await p1();
    window.print();
}

// document.querySelector('.btn').onclick = _.debounce(() => {
//     console.log('我特么被点击了_')
// }, 2000, {
//     leading: true,
// });


const a = debounce((value) => {
    console.log(value)
})

a(22222);
a(22222);
a(22222);
a(22222);