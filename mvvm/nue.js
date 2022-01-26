import Observe from './observe';

import Compile from './compile';

class Nue {
    constructor(option = {}) {
        const {
            el,
            data
        } = option;

        this.$option = option;
        this.$el = el;
        this.$data = new Observe(data).data;

        Object.keys(this.$data).forEach(key => {
            Object.defineProperty(this, key, {
                configurable: true,
                enumerable: true,
                get: () => {
                    return this.$data[key];
                },
                set: (newValue) => {
                    this.$data[key] = newValue;
                }
            })
        });

         this.relation.student.dx = '测试';

        new Compile(this);
    }
};

export default Nue;