const { Octokit } = require('@octokit/rest');
const config = require('./config.json');
//set values for commit
const commitOwner = config.owner;
const commitRepo = config.repo;
const commitMessage = config.commit_message;
const commitContent = config.file_content;

function randomletters(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

(async () => {
    const octokit = new Octokit({
        auth: config.personal_token
    });

    setInterval(async () => {
        await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: commitOwner,
            repo: commitRepo,
            path: `${randomletters(10)}.txt`,
            message: commitMessage,
            content: Buffer.from(commitContent).toString('base64')
        }).then(res => {
            console.log(res.data.commit.url);
        }).catch(err => console.log(err));
    }, config.interval);
})();