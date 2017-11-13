function Car(par1, par2) {
    let owner = par1 || 'rich gay';
    let brand = par2 || 'Mazda';
    let power;

    this.getOwner = function() {
        return owner;
    };

    this.getBrand = function () {
        return brand;
    };

    this.setPower = function (par3) {
        power = par3;
        return power;
    };
    this.setBrand = function (newBrand) {
        brand = newBrand;
        return brand;
    };

}

mazdaSix = new Car('Mazda');

console.log(mazdaSix.getOwner());
console.log(mazdaSix.getBrand());
console.log(mazdaSix.setPower(123));
console.log(mazdaSix.setBrand('Mercedes'));

