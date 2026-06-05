const express = require('express');

const app = express();
const PORT = 3000;

// 루트
app.get('/', (req, res) => {
  res.send('태그팀 서버입니다.');
});

// 멤버 목록
app.get('/members', (req, res) => {
  res.json({
    members: ['김철수', '박영희', '이민수'],
  });
});

// 팀장 정보
app.get('/leader', (req, res) => {
  res.json({
    name: '홍길동',
    part: 'backend',
  });
});

// 스터디 정보
app.get('/study', (req, res) => {
  res.json({
    title: 'node.js',
    week: 1,
  });
});

// 즐기는 게임 목록
app.get('/game', (req, res) => {
  res.json({
    games: ['league of legends', 'overwatch', 'valorant'],
  });
});

// 팀 정보
app.get('/team', (req, res) => {
  res.json({
    팀명: '태그',
    인원수: '5',
    파트: 'backend',
  });
});

// 활동 장소
app.get('/place', (req, res) => {
  res.json({
    장소: '1116-1',
  });
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
