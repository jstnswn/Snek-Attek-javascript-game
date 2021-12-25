import { getSnakeLength } from "./snake.js";

window.addEventListener('load', (e) => {
    getScores();
    const button = document.querySelector('button');
    button.addEventListener('click', async (e) => {
        e.preventDefault()
        await postUser(e);
        window.location = '/';
    });
});

async function getScores() {
    let called = false
    const res = await fetch('/scores');
    const { scores } = await res.json()

    if (!called) displayScores(scores);
    called = true;
};

function displayScores(scores) {
    const leaderboard = document.querySelector('.leaderboard-box');
    scores.forEach((score, i) => {
        const rankDiv = document.createElement('div');
        rankDiv.className = 'user-score';
        rankDiv.innerText = i + 1;
        leaderboard.children[0].append(rankDiv);
        const scoreDiv = document.createElement('div');
        scoreDiv.className = 'user-score';
        scoreDiv.innerText = score.score;
        leaderboard.children[1].append(scoreDiv);
        const nameDiv = document.createElement('div');
        nameDiv.className = 'user-score';
        nameDiv.innerText = score.User.username;
        leaderboard.children[2].append(nameDiv);
    })
}

export async function postScore(userId) {
    const body = { score: getSnakeLength(), userId };

    const res = await fetch('/scores', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (!res.ok) console.log('something went wrong');
};

export async function compareLeaderboard(newScore) {
    const res = await fetch('/scores');
    const { scores } = await res.json();
    let isHighScore = false;
    if (scores.length < 1) isHighScore = true;

    scores.forEach(({ score }) => {
        if (newScore > score) {
            isHighScore = true;
        }
    })

    return isHighScore;
};

export function displayTopScoreForm() {
    const userForm = document.getElementById('user-form');
    userForm.style.display = 'block';
};

async function postUser(e) {
    e.preventDefault();
    const form = document.getElementById('user-form');
    const formData = new FormData(form);
    const username = formData.get('username');
    const body = { username };

    const res = await fetch('/users', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    if (!res.ok) console.log('something went wrong')
    else {
        const newUser = await res.json();
        postScore(newUser.newUser.id);
    }
}
