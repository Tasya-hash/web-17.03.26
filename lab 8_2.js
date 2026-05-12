function delay(N) {
    return new Promise(resolve => {
        setTimeout(resolve, N * 1000);
    });
}

async function promiseCounter(n) {
    const out = document.getElementById("promise-counter");
    out.innerHTML = "";

    for (let i = n; i >= 0; i--) {
        out.innerHTML += i + "<br>";
        await delay(1);
    }
}

async function loadFirstRepo() {
    const username = document.getElementById("gh-user").value.trim();
    const out = document.getElementById("repo-output");

    if (!username) {
        out.innerHTML = "Введите имя пользователя!";
        return;
    }

    try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();

        const reposResponse = await fetch(userData.repos_url);
        const repos = await reposResponse.json();

        if (repos.length === 0) {
            out.innerHTML = "У пользователя нет репозиториев.";
        } else {
            out.innerHTML = "Первый репозиторий: " + repos[0].name;
        }

    } catch (e) {
        out.innerHTML = "Ошибка: " + e;
    }
}