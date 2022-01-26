import _ from 'lodash';

import Dep from './Dep';


class Observe {
    constructor(data) {
        this.data = this.observe(data);
    }

    observe(data) {
        let newData = _.cloneDeep(data);
        let dep = new Dep();
        if (_.isObject(data)) {
            Object.keys(data).forEach(key => {
                let val = data[key];
                if (_.isObject(val)) {
                    val = this.observe(val);
                }
                Object.defineProperty(newData, key, {
                    enumerable: true,
                    configurable: true,
                    get: () => {
                        if (Dep.target) {
                            dep.addSub(Dep.target);
                        }
                        return val;
                    },
                    set: (newVal) => {
                        if (!_.isEqual(newVal, val)) {
                            newVal = this.observe(newVal);
                            val = newVal;
                            dep.notify();
                        }

                    }
                })
            });
        }
        return newData;

    }
}

export default Observe;