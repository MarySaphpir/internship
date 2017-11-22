const obj = {
    a: 1,
    b: 2,
    c: 8,
    h: {
        i: 'here we are',
        g: [4, 5, {
            k: true,
            l: 12
        }]
    }
};

function myAwesomeRecursion(obj) {
    return Object
        .keys(obj)
        .forEach(key => typeof obj[key] === 'object'
            ? myAwesomeRecursion(obj[key])
            : obj[key]
        );
}

obj[Symbol.iterator] = function () {
    let nextIndex = 0;
    return {
        next() {
            if (nextIndex <= Object.keys(obj).length - 1) {
                return {
                    done: false,
                    value: (typeof Object.values(obj)[nextIndex] === 'object')
                        ? Object.values(Object.values(obj)[nextIndex++])
                        : Object.values(obj)[nextIndex++]
                }
            } else {
                return {
                    done: true
                };
            }
        }

    }
};
console.log([...obj]);
