//  这样写的好处是 matg.floor.call或者  matg.floor.apply被更改以后不影响
Function.prototype.call.call(Math.floor, undefined, 1.75)
Function.prototype.apply.call(Math.floor, undefined, [1.75])
Function.prototype.call.apply(Math.floor, [undefined, 1.75])
Function.prototype.apply.apply(Math.floor, [undefined, [1.75]])


// console.log(Math.floor.apply(undefined, [2.75]));
Math.floor(2.78);
Math.floor.call(undefined, 2.78)