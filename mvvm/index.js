import Nue from './nue';

new Nue({
    el: '#app',
    data: {
        name: '小王',
        age: '27',
        relation: {
            student: {
                dx: '大学',
                gz: '高中'
            },
            friend: {
                n: '朋友'
            }
        }
    }
});