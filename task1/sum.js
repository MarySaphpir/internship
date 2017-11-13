function sum(a){
    return function(b){
        return function (c) {
            return a + b +c;
        }
    }
}

console.log(sum(4)(4)(4));

let sum2 = a => b => c => a + b + c;

console.log(sum2(4)(4)(4));
