window.addEventListener('load', (e) => {
    getScores();
});


async function getScores() {
    const res = await fetch('/scores');
    const { scores } = await res.json()

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
};
    // leaderboard.appendChild(ul);


export async function postScore(score) {
    console.log('hefeaafedaf')
    const body = { score };

    const res = await fetch('/scores', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    console.log(res);

    if (!res.ok) console.log('something went wrong');
};
