describe("getFibonachi.fibonachiWithIteration", function() {

    describe("возвращает число Фибоначи, номер которого был передан", function() {
        it("возвращает 8 если переть 6", function() {
            assert.equal(getFibonachi.fibonachiWithIteration(6), 8);
        });

        it("возвращает 2 если переть 3", function() {
            assert.equal(getFibonachi.fibonachiWithIteration(3), 2);
        });
    });

    describe("возвращает NaN если передать дробное число", function() {
        it("возвращает NaN если передать 6.5", function() {
            assert(isNaN(getFibonachi.fibonachiWithIteration(-6.5)));
        });
    });

});

describe("getFibonachi.fibonachiWithPromise", function() {

    describe("возвращает число Фибоначи, номер которого был передан", function() {
        it("возвращает 8 если передать 6", function() {
            getFibonachi.fibonachiWithPromice(6).then(number => assert.equal(number, 8))
        });

        it("возвращает 2 если передать 3", function() {
            getFibonachi.fibonachiWithPromice(3).then(number => assert.equal(number, 2))
        });
    })

    describe("возвращает NaN если передать дробное число", function() {
        it("возвращает NaN если передать 6.5", function() {
            getFibonachi.fibonachiWithPromice(3).then(number => assert(isNaN(number)));
        });
    });

});

describe("getFibonachi.fibonachiWithRecurtion", function() {

    describe("возвращает число Фибоначи, номер которого был передан", function() {
        it("возвращает 8 если переть 6", function() {
            assert.equal(getFibonachi.fibonachiWithRecurtion(6), 8);
        });

        it("возвращает 2 если переть 3", function() {
            assert.equal(getFibonachi.fibonachiWithRecurtion(3), 2);
        });
    })

    describe("возвращает NaN если передать дробное число", function() {
        it("возвращает NaN если передать 6.5", function() {
            assert(isNaN(getFibonachi.fibonachiWithRecurtion(6.5)));
        });
    });

    describe("возвращает NaN если передать отрицательное число", function() {
        it("возвращает NaN если передать -6", function() {
            assert(isNaN(getFibonachi.fibonachiWithRecurtion(-6)));
        });
    });
})
