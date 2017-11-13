let getFibonachi = (function () {
    return {
        defaults: function fibonachi(n) {
            return n <= 1 ? n : fibonachi(n - 2) + fibonachi(n - 1);
        },


        defaults2: function (n) {
            let a = 0,
                b = 1;
            for (let i = 2; i <= n; i++) {
                let c = a + b;
                a = b;
                b = c;
            }
            return b;
        },

        defaults3: function fibonachi(n) {
            return new Promise(function (resolve, reject) {
                let a = 0,
                    b = 1;
                for (let i = 2; i <= n; i++) {
                    let c = a + b;
                    a = b;
                    b = c;
                }
                resolve(b);
            }).then(b => console.log(b));
        }
    }
}());

let er = getFibonachi.defaults3(6);
console.log(er);
