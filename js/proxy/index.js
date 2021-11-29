//  数据劫持 Object.defineProperty   改变原数组的方法不会出发set  要循环遍历key   嵌套需要递归调用

// let arr = [1, 2, 3];
// const obj = {};
// Object.defineProperty(obj, 'arr', {
//     get() {
//         console.log(`get arr`)
//         return arr
//     },
//     set(newVal) {
//         console.log('set arr')
//         arr = newVal;
//     }
// })

// let bValue = 2;

// Object.defineProperty(obj, 'b', {
//     get() {
//         console.log(`get b`);
//         return bValue;
//     },
//     set(newVal) {
//         console.log('set b')
//         bValue = newVal;
//     }
// })
// obj.b = 4;

// obj.arr = obj.arr.filter(item => item > 2);

// console.log(obj.arr, 'arr');

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



class Dep {
    constructor() {
        this.subs = [];
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    removeSub(sub) {
        this.subs = this.subs.filter(item => item !== sub)
    }

    notify() {
        this.subs.forEach(watcher => {
            watcher.update();
        })
    }

}
class Watcher {
    constructor(fn) {
        this.watcherCallback = fn;
        this.activeRun();
    }

    update() {
        if (this.watcherCallback) {
            this.watcherCallback()
        }
    }

    activeRun() {
        Dep.target = this;
        this.watcherCallback();
    }

}



const getReactiveData = function (
    data
) {
    if (typeof data === 'object') {
        Object.keys(data).forEach(key => {
            let currentValue = data[key];
            const dep = new Dep();
            Object.defineProperty(data, key, {
                get() {
                    console.log(Dep.target, `get_${key}`);
                    if (Dep.target) {
                        dep.addSub(Dep.target)
                    }
                    return currentValue;
                },
                set(newValue) {
                    console.log(`set_${key}_${newValue}`);
                    currentValue = newValue;
                    if (Dep.target) {
                        dep.notify();
                    }
                }
            })
            if (typeof currentValue === "object") {
                getReactiveData(currentValue)
            }
        })
    }
    return data;
}

class MVVM {
    constructor(config) {
        const {
            data,
            el
        } = config;
        this.$el = el;
        this.root = document.querySelector(this.$el);
        this.originHTML = this.root.innerHTML;
        this.$data = JSON.parse(JSON.stringify(data));
        this.$data = getReactiveData(this.$data);
        new Watcher(() => {
            var html = String(this.originHTML || '').replace(/"/g, '\\"').replace(/\s+|\r|\t|\n/g, ' ')
                .replace(/\{\{(.)*?\}\}/g, function (value) {
                    return value.replace("{{", '"+(').replace("}}", ')+"');
                })
            html = `var targetHTML = "${html}";return targetHTML;`;
            var parsedHTML = new Function(...Object.keys(this.$data), html)(...Object.values(this.$data));
            this.root.innerHTML = parsedHTML;
        })
    }

}



var vm = new MVVM({
    el: "#app",
    data: {
        name: '小王',
        age: '26',
        baseInfo: {
            career: '板砖',
            address: {
                city: '重庆',
                detail: '蔡家'
            },
            interest: ['篮球', '羽毛球']
        }
    }
});


setTimeout(() => {
    vm.$data.name = '小张'
    vm.$data.age = '27'
    vm.$data.baseInfo.career = '会计'
}, 5000)