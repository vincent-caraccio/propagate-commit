'use strict';

const core = require('@actions/core');
const github = require('@actions/github');

(async function () {
  try {
    const token = core.getInput('token');
    const destOwner = core.getInput('dest_owner');
    const destRepo = core.getInput('dest_repo');
    const destBranch = core.getInput('dest_branch');

    const octokit = github.getOctokit(token);
    const commitMessage = github.context.payload.head_commit.message;

    await pushEmptyCommit(octokit, destOwner, destRepo, destBranch, commitMessage);
  } catch (error) {
    core.setFailed(error.message);
  }
})().catch(error => core.setFailed(error.message));

async function pushEmptyCommit(octokit, destOwner, destRepo, destBranch, commitMessage) {
  const { sha, parents } = await getLatestSha(octokit, destOwner, destRepo, destBranch);
  console.log('latestSha', sha, 'parents', parents);
  const newCommitSha = await createCommit(octokit, destOwner, destRepo, commitMessage, sha, parents);
  console.log('newCommitSha', newCommitSha);
  return updateRef(octokit, destOwner, destRepo, destBranch, newCommitSha);
}

async function getLatestSha(octokit, owner, repo, branch) {
  const { data } = await octokit.request(
    'GET /repos/{owner}/{repo}/commits',
    { owner, repo, sha: branch, per_page: 1 }
  );
  return { sha: data[0].commit.tree.sha, parents: data[0].parents.map(p => p.sha) };
}

async function createCommit(octokit, owner, repo, message, tree, parents) {
  const { data } = await octokit.request(
    'POST /repos/{owner}/{repo}/git/commits',
    { owner, repo, message, tree, parents }
  );
  console.log(data);
  return data.sha;
}

async function updateRef(octokit, owner, repo, branch, sha) {
  const { data } = await octokit.request(
    'PATCH /repos/{owner}/{repo}/git/refs/{ref}',
    { owner, repo, sha, ref: `heads/${branch}` }
  );
  console.log(data);
}
