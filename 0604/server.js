const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

const users = [{
    id: "admin",
    password: "1234",
    name: "관리자",
    major: "소프트웨어학부",
    interest: "웹 개발, 백엔드, AI",
    goal: "풀스택 개발자",
    intro: "안녕하세요, 관리자 계정입니다."
}]

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "서버 실행중" });
});

app.post("/register", (req, res) => {
    const { id, password, name, major, interest, goal, intro } = req.body;

    if (!id || !password || !name) {
        return res.json({ 
            success: false, 
            message: "필수 정보가 누락되었습니다." 
        });
    }

    if (users.some(u => u.id === id)) {
        return res.json({ 
            success: false, 
            message: "이미 존재하는 아이디입니다." 
        });
    }

    const newUser = { id, password, name, major, interest, goal, intro };
    users.push(newUser);

    res.json({ 
        success: true, 
        message: "회원가입 성공" 
    });
});

app.post("/login", (req, res) => {
    const { id, password } = req.body;
    const user = users.find(u => u.id === id && u.password === password);

    if (!user) {
        return res.json({ 
            success: false, 
            message: "아이디 또는 비밀번호가 틀렸습니다."
        });
    }

    res.json({ 
        success: true, 
        message: "로그인 성공"
    });
});

app.get("/profile/:id", (req, res) => {
    const id = req.params.id;
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }
    
    const { name, major, interest, goal, intro } = user;
    res.json({ name, major, interest, goal, intro });
});  

app.get("/users", (req, res) => {
    res.json(users.map(u => ({ id: u.id, name: u.name, major: u.major })));
});

app.get("/count", (req, res) => {
    res.json({ count: users.length });
});

app.listen(PORT, () => {
    console.log(`서버 실행 : http://localhost:${PORT}`);
});