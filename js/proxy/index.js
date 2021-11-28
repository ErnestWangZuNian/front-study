//  数据劫持 Object.defineProperty 

let arr = [1, 2, 3];
const obj = {};
Object.defineProperty(obj, 'arr', {
    get() {
        console.log(`get arr`)
        return arr
    },
    set(newVal) {
        console.log('set arr')
        arr = newVal;
    }
})

let bValue = 2;

Object.defineProperty(obj, 'b', {
    get() {
        console.log(`get b`);
        return bValue;
    },
    set(newVal) {
        console.log('set b')
        bValue = newVal;
    }
})
obj.b = 4;

obj.arr = obj.arr.filter(item => item > 2);

console.log(obj.arr, 'arr');

// const arr = ['a', 'b', 'c'];

// const proxy = new Proxy(arr, {
//     get(target, prop, receiver) {
//         console.log(prop, 'prop');
//         return Reflect.get(target, prop, receiver)
//     }
// });


// window.double = n => n * 2;
// window.pow = n => n * n;
// window.reverseInt = n => n.toString().split("").reverse().join("") | 0;

// console.log(window, 'window11')

// var pipe = function (value) {
//     var funcStack = [];
//     var oproxy = new Proxy({}, {
//         get: function (pipeObject, fnName) {
//             console.log(pipeObject, fnName, funcStack, 'fnName');
//             if (fnName === 'get') {
//                 return funcStack.reduce(function (val, fn) {
//                     return fn(val);
//                 }, value);
//             }
//             funcStack.push(window[fnName]);
//             return oproxy;
//         }
//     });

//     return oproxy;
// }


// pipe(3).double.pow.reverseInt.get;

// export var test = '22222';