function Car(carOwner, carBrand) {
    let owner = carOwner || 'rich gay';
    let brand = carBrand || 'Mazda';
    let power;

    this.getOwner = function() {
        return owner;
    };

    this.getBrand = function () {
        return brand;
    };

    this.setPower = function (newPower) {
        power = newPower;
    };

    this.setBrand = function (newBrand) {
        brand = newBrand;
    };

}

mazdaSix = new Car('', 'Audi');

console.log(mazdaSix.getOwner());
console.log(mazdaSix.getBrand());
console.log(mazdaSix.setPower(123));
console.log(mazdaSix.setBrand('Mercedes'));

