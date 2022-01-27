class Dep {

    constructor() {
        this.subs = [];
    }

    addSub(sub) {
        this.subs.push(sub);
        console.log(this.subs, 'subs-222');
    }

    notify() {
        console.log(this.subs, 'subs-3333');
        this.subs.forEach(sub => sub.update());
    }

}

export default Dep;