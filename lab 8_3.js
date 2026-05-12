class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
    }
}

async function loadJson(url) {
    const response = await fetch(url);

    if (response.status === 200) {
        return response.json();
    } else {
        throw new HttpError(response);
    }
}

async function getGithubUser() {
    const out = document.getElementById("task3-output");

    while (true) {
        const name = prompt("Введите логин?", "iliakan");

        try {
            const user = await loadJson(`https://api.github.com/users/${name}`);
            out.innerHTML = `Полное имя: ${user.name}`;
            return user;

        } catch (err) {
            if (err instanceof HttpError && err.response.status === 404) {
                alert("Такого пользователя не существует, повторите ввод.");
            } else {
                throw err;
            }
        }
    }
}