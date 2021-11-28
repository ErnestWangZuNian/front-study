// 总结  reflect是个静态方法 把对象的内部方法部署到reflect上


//   reflect.get方法   Reflect.get(target, name, receiver)


const myObject = {
    name: '小王',
    age: '26',
    get info() {
        return this.name + this.age
    },
    set setInfo(value) {
        this.name = value
    }
};

const name = Reflect.get(myObject, 'name');
const age = Reflect.get(myObject, 'age');
const receiverObject = {
    name: '小张',
    age: '27',
}

const receiverInfo = Reflect.get(myObject, 'info', receiverObject);


console.log(receiverInfo, name, 'Reflect.get');


//   reflect.set方法   Reflect.set(target, name,value, receiver)

Reflect.set(myObject, 'setInfo', '修改以后的小张名字', receiverObject);

console.log(myObject, receiverObject, 'Reflect.set');


//  Reflect.deleteProperty(obj, name)


Reflect.deleteProperty(myObject, "info");

console.log(myObject, 'Reflect.delete');


//  Reflect.has(obj, name)

console.log(Reflect.has(myObject, "info"), 'Reflect.has');