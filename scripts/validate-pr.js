const { Octokit } = require('@octokit/rest');
const fs = require('fs');
const path = require('path');

const token = process.env.GITHUB_TOKEN;
const owner = process.env.REPO_OWNER;
const repo = process.env.REPO_NAME;
const pull_number = process.env.GITHUB_REF.split('/').pop();

console.log({pull_number})

const octokit = new Octokit({ auth: token });

async function validatePullRequest() {
  try {
    const { data: pullRequest } = await octokit.pulls.get({
      owner,
      repo,
      pull_number,
    });

    const title = pullRequest.title;
    const files = await octokit.pulls.listFiles({
      owner,
      repo,
      pull_number,
    });

    await validateTitle(title);
    await verifyChangesOnCriticalFiles(files, pullRequest.head.sha);

    console.log('Pull request title and files are valid.');
  } catch (error) {
    console.error('Validation failed:', error.message);
    await sendErrorMsg(error.message);
    process.exit(1);
  }
}

async function validateTitle(title) {
  const packageJsonPath = path.join(__dirname, '../package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const version = packageJson.version;
  const versionPattern = new RegExp(`\\[${version}\\]`);

  // Add your validation logic here
  if (!title || title.length < 10) {
    throw new Error('O título do PR é muito curto');
  }

  if (!versionPattern.test(title)) {
    throw new Error(`O título do PR deve conter a versão definida em package.json [${version}].`);
  }
}

async function verifyChangesOnCriticalFiles(files, head_commit_id) {
  const criticalFiles = ['package.json', 'angular.json'];

  const promises = files.data.map(async (file) => {
    const filename = file.filename;

    if (criticalFiles.includes(filename)) {
      await sendReviewComment('Revise as alterações com atenção', 'RIGHT', 1, filename, head_commit_id);
    }
  });

  return Promise.all(promises);
}

async function sendErrorMsg(message) {
  await octokit.pulls.createReview({
    owner,
    repo,
    pull_number,
    event: 'REQUEST_CHANGES',
    body: message,
  });
}

async function sendReviewComment(body, side, line, path, head_commit_id) {
  await octokit.pulls.createReviewComment({
    owner,
    repo,
    pull_number,
    body,
    side,
    line,
    path,
    commit_id: head_commit_id,
  });
}

validatePullRequest();
