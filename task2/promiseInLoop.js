let promise = Promise.resolve();
const array = [1, 2, 3];
for (let i in array) {
    promise = promise
        .then(result => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log(array[i]);
                    resolve();
                }, 1000);
            });
        })
}
