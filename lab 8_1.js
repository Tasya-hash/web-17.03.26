function counter(n) {
    const output = document.getElementById("counter-output");
    output.innerHTML = "";

    let current = n;

    const timer = setInterval(() => {
        output.innerHTML += current + "<br>";

        if (current === 0) {
            clearInterval(timer);
        }

        current--;
    }, 1000);
}

function createCounter(n) {
    let current = n;
    let timer = null;

    const output = document.getElementById("create-counter-output");

    function render() {
        output.innerHTML = current;
    }

    return {
        start() {
            if (timer !== null) return; // уже идёт

            timer = setInterval(() => {
                render();

                if (current === 0) {
                    this.stop();
                    return;
                }

                current--;
            }, 1000);
        },

        pause() {
            clearInterval(timer);
            timer = null;
        },

        stop() {
            clearInterval(timer);
            timer = null;
            current = n;
            render();
        }
    };
}