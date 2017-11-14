let getFibonachi = (function () {

    function iterationFibonachi(n) {
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
            if (n < 0 || Math.round(n) != n) return NaN;
            return n <= 1 ? n : fibonachi(n - 2) + fibonachi(n - 1);
        },

        fibonachiWithIteration: function (n) {
            checkinEntry(n);
            return iterationFibonachi(n)
        },

        fibonachiWithPromice: function fibonachi(n) {
            if (n < 0 || Math.round(n) != n) return NaN;
            return Promise.resolve(iterationFibonachi(n));
        },

    }

}());

module.exports = getFibonachi;