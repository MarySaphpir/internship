describe("sum", function() {

    describe("возвращает сумму трех чисел", function() {

        it("возвращает 2 + 2 + 2 = 6", function() {
            assert.equal(sum(2)(2)(2), 6);
        });

        it("возвращает 2 + 6 + 8 = 16", function() {
            assert.equal(sum(2)(6)(8), 16);
        });
    })

    describe("возвращает сумму трех дробных чисел", function() {

        it("возвращает 2.5 + 2 + 2 = 6.5", function() {
            assert.equal(sum(2.5)(2)(2), 6.5);
        });

        it("возвращает 2 + 6.3 + 8.8 = 17.1", function() {
            assert.equal(sum(2)(6.3)(8.8), 17.1);
        });
    })

    describe("если передана строка в качесте аргумента вернет NaN", function() {

        it("возвращает 2.5 + 2 + 2 = 6.5", function() {
            assert(isNaN(sum(2.5)('2')(2)));
        });

    })

});

