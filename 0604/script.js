const pages = document.querySelectorAll(".page");

function showPage(pageId) {
    pages.forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");
}

async function register() {

    const user = {
        id: document.getElementById("reg-id").value,
        password: document.getElementById("reg-password").value,
        name: document.getElementById("reg-name").value,
        major: document.getElementById("reg-major").value,
        interest: document.getElementById("reg-interest").value,
        goal: document.getElementById("reg-goal").value,
        intro: document.getElementById("reg-intro").value
    };

    const passwordCheck = document.getElementById("reg-password-check").value;

    if (user.password !== passwordCheck) {
        document.getElementById("register-message").innerText = "비밀번호가 일치하지 않습니다.";
        return;
    }

    try {
        const response =
            await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

        const result = await response.json();

        if (result.success) {
            alert("회원가입 성공");
            showPage("login-page");
        }
    }
    catch (error) {
        console.error(error);

    }
}

async function login() {

    const id = document.getElementById("login-id").value;
    const password = document.getElementById("login-password").value;

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, password })
        });

        const result = await response.json();

        if (result.success) {
            loadProfile(id);
        } else {
            document.getElementById("login-message").innerText = "로그인 실패";
        }

    }
    catch (error) {
        console.error(error);
    }
}

async function loadProfile(id) {

    const response = await fetch(`http://localhost:3000/profile/${id}`);
    const user = await response.json();

    document.getElementById("profile-name").innerText = user.name;
    document.getElementById("profile-major").innerText = user.major;
    document.getElementById("profile-goal").innerText = user.goal;
    document.getElementById("profile-intro").innerText = user.intro;

    const interestDiv = document.getElementById("profile-interest");
    interestDiv.innerHTML = "";

    user.interest.split(",").forEach(item => {
        const tag = document.createElement("span");
        tag.className = "tag";
        tag.innerText = item.trim();
        interestDiv.appendChild(tag);
    });
    showPage("profile-page");
}

function logout() {
    showPage("home-page");
}