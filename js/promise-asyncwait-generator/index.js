const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
    }, 2000)
});

const test = async () => {
    await p1.then(res => {
        return res;
    });
}

const test2 = async () => {
    const res1 = await test();
    console.log(res1, 'res1')
    const res2 = await test();
    console.log(res2, 'res2')
    console.log('---ddd---');
}

test2();