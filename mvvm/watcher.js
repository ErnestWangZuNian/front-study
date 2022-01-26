class Watcher {
    constructor(data, fn) {
        this.fn = fn;
        this.data = data;

    };

    update() {
        console.log(this.data, '更新');
    }
};

export default Watcher;