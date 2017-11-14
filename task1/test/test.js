const chai = require('chai');
const expect = require('chai').expect;
const chaiAsPromised = require('chai-as-promised');
const getFibonachi = require('../modulePatern');

chai.use(chaiAsPromised);

describe("Testing promise", function() {

    describe("Entering number should return number of Fibonachi", function() {
        it('3 should be equal 2', function () {
            const result = getFibonachi.fibonachiWithPromice(3);
            return expect(result).to.eventually.equal(2).and.to.be.finite;
        });

        it('6 should be equal 8', function () {
            const result = getFibonachi.fibonachiWithPromice(6);
            return expect(result).to.eventually.equal(8);
        });
    });

    describe("Entering a negative number, should return NaN", function() {
        it('-6 should be return NaN', function () {
            const result = getFibonachi.fibonachiWithPromice(-6);
            return expect(result).to.be.NaN;
        });
    });

    describe("Entering a fractional number, should return NaN", function() {
        it('6.5 should be return NaN', function () {
            const result = getFibonachi.fibonachiWithPromice(6.5);
            return expect(result).to.be.NaN;
        });
    });
});


describe("Testing function", function() {

    describe("Entering number should return number of Fibonachi", function() {
        it('3 should be equal 2', function () {
            const result = getFibonachi.fibonachiWithRecurtion(3);
            return expect(result).to.be.equal(2).and.to.be.finite;
        });

        it('6 should be equal 8', function () {
            const result = getFibonachi.fibonachiWithRecurtion(6);
            return expect(result).to.be.equal(8);
        });
    });

    describe("Entering a negative number, should return NaN", function() {
        it('-6 should be return NaN', function () {
            const result = getFibonachi.fibonachiWithRecurtion(-6);
            return expect(result).to.be.NaN;
        });
    });

    describe("Entering a fractional number, should return NaN", function() {
        it('6.5 should be return NaN', function () {
            const result = getFibonachi.fibonachiWithRecurtion(6.5);
            return expect(result).to.be.NaN;
        });
    });
});
