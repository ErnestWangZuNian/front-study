// //  这样写的好处是 matg.floor.call或者  matg.floor.apply被更改以后不影响
// Function.prototype.call.call(Math.floor, undefined, 1.75)
// Function.prototype.apply.call(Math.floor, undefined, [1.75])
// Function.prototype.call.apply(Math.floor, [undefined, 1.75])
// Function.prototype.apply.apply(Math.floor, [undefined, [1.75]])


// // console.log(Math.floor.apply(undefined, [2.75]));
// Math.floor(2.78);
// Math.floor.call(undefined, 2.78);



// Function.prototype.call = function (context) {
//     let newContwxt = context || window;
//     const args = [];
//     if (arguments.length > 1) {
//         for (let i = 0; i < arguments.length; i++) {
//             if (i > 0) {
//                 args.push(arguments[i])
//             }
//         }
//     }
//     newContwxt.fn = this;
//     eval('newContwxt.fn(args.join())');
//     delete newContwxt;
// }


Function.prototype.call = function (context) {
    let newContwxt = context || window;
    const args = [];
    if (arguments.length > 1) {
        for (let i = 0; i < arguments.length; i++) {
            if (i > 0) {
                args.push(arguments[i])
            }
        }
    }
    newContwxt.fn = this;
    newContwxt.fn(...args);
    delete newContwxt;
}

Function.prototype.apply = function (context) {
    let newContwxt = context || window;
    let args = [];
    if (arguments.length > 1) {
        args = arguments[1];
    }
    newContwxt.fn = this;
    newContwxt.fn(...args);
    delete newContwxt;
}


var value = 'global';

const foo = {
    value: 'foo'
};

const bar = function (name, age, height, weight) {
    console.log(name, age, height, weight, this.value);
}

// bar.call(undefined);
bar.apply(foo, ['小王', '27', '174', '75']);




// var value = 'global';

// function foo() {
//     console.log(this.value);
// }

// var object = {
//     value: 'object',
//     foo
// }

// var test;

// window.foo();
// object.foo();
// test = object.foo;
// test();


// const fn = () => {
//     console.log(this.value);
// };


// function fn1() {
//     console.log(this.value);
// }

// var value = 'global';


// const obj = {
//     value: 'object',
//     fn: function () {
//         const fn2 = () => {
//             console.log(this.value);
//         }
//         fn2();
//     },
//     fn1,
// }

// obj.fn();
// obj.fn1();


// const fn = () => {
//     console.log(arguments)
// }
// fn(1, 2,3,4);

// function fn1() {
//     console.log(arguments)
// }
// fn1(1, 2,3,4);