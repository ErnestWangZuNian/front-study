import _ from 'lodash';

class Observe {
    constructor(data) {
        this.data = this.observe(data);
    }

    observe(data) {
        let newData = _.cloneDeep(data);
        if (_.isObject(data)) {
            Object.keys(data).forEach(key => {
                Object.defineProperty(newData, key, {
                    enumerable: true,
                    configurable: true,
                    get: () => {
                        if (_.isObject(data[key])) {
                            data[key] = this.observe(data[key]);
                        }
                        return data[key]
                    },
                    set: (newVal) => {
                        data[key] = newVal;
                    }
                })
            });
        }
        return newData;

    }
}

export default Observe;