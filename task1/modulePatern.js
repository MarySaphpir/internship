let getFibonachi = (function () {

    function iterationFibonachi(n){
        let firstNumber = 0;
        let secondNumber = 1;
        for (let i = 2; i <= n; i++) {
            let sum = firstNumber + secondNumber;
            firstNumber = secondNumber;
            secondNumber = sum;
        }
        return secondNumber;
    }

    return {
        fibonachiWithRecurtion: function fibonachi(n) {
            return n <= 1 ? n : fibonachi(n - 2) + fibonachi(n - 1);
        },

        fibonachiWithIteration: function (n) {
            return iterationFibonachi(n)
        },

        fibonachiWithPromice: function fibonachi(n) {
            Promise.resolve(iterationFibonachi(n)).then(b => console.log(b));
        }
    }
}());

let fibonachiWithPromice = getFibonachi.fibonachiWithPromice(6);

console.log(fibonachiWithPromice);