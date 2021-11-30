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

let dId = 0;

let watchId = 0;
class Dep {
    constructor() {
        this.subs = [];
        this.id = dId++;
    }
    depend() {
        if (Dep.target) {
            Dep.target.addDep(this);
        }
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


let stack = [];

let pushWatcherTarget = (watcher) => {
    Dep.target = watcher;
    stack.push(watcher)
};

let popWatherTarget = () => {
    stack.pop();
    Dep.target = stack[stack.length - 1]
}
class Watcher {
    constructor(vm, exportfn, cb, options) {
        this.vm = vm;
        this.getter = exportfn || null;
        this.cb = cb;
        this.options = options;
        this.id = watchId++;
        this.deps = [];
        this.depId = new Set();
        this.value = this.activeRun();
    }

    addDep(dep) {
        if (!this.depId.has(dep.id)) {
            this.depId.add(dep.id);
            this.deps.push(dep)
            dep.addSub(this);
        }
    }

    update() {
        this.activeRun();
    }

    activeRun() {
        const {
            vm
        } = this;
        pushWatcherTarget(this);
        const value = this.getter ? this.getter.call(vm, vm) : null;
        popWatherTarget();
        return value;
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
                        Dep.target.addDep(dep);
                    }
                    return currentValue;
                },
                set(newValue) {
                    console.log(`set_${key}_${newValue}`);
                    currentValue = newValue;
                    dep.notify();
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

        function proxy(vm, source, key) {
            Object.defineProperty(vm, key, {
                get() {
                    return vm[source][key] // this.name 等同于  this._data.name
                },
                set(newValue) {
                    return vm[source][key] = newValue
                }
            })
        }
        Object.keys(this.$data).forEach(key => {
            proxy(this, '$data', key)
        })
        new Watcher(this, () => {
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
    vm.name = '小张'
    vm.age = '27'
    vm.baseInfo.career = '会计'
}, 5000)