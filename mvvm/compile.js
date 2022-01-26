import _ from 'lodash';

class Compile {
    constructor(vm) {
        const rootContainer = document.querySelector(vm.$el);
        let child = rootContainer.firstChild;
        while (child !== rootContainer.lastChild) {
            let textContent = child.textContent;
            const re = /{{(.*)}}/gi;
            if (re.test(textContent)) {
                let matchRes = RegExp.$1;
                let val = vm.$data;
                if (matchRes) {
                    matchRes = matchRes.split('.');
                    matchRes.forEach(item => {
                        val = val[item];
                    })
                }

                textContent = textContent.replace(re, val);
                
                child.textContent = textContent;
            }
            child = child.nextSibling;
        }
    }
};

export default Compile;