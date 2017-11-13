function sum(a) {
    return function someFunc(b) {
        if (b) {
            a += b;
            return someFunc;
        } else {
            return a;
        }
    };
}
console.log(sum(1)(2)(3)());