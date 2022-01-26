import Dep from './Dep';

class Watcher {
    constructor(vm, property, fn) {
        console.log(property, 'property');
        this.fn = fn;
        this.property = property;
        this.vm = vm;
        let val = this.vm;
        let matchRes = this.property;
        Dep.target = this;
        if (matchRes) {
            matchRes = matchRes.split('.');
            matchRes.forEach(item => {
                val = val[item];
            })
        };
        Dep.target = null;
    }

    update() {
        let matchRes = this.property;
        let val = this.vm;
        if (matchRes) {
            matchRes = matchRes.split('.');
            matchRes.forEach(item => {
                val = val[item];
            })
        };
        this.fn(val);
        
    }
};

export default Watcher;