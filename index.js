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
  const sha = await getLatestSha(octokit, destOwner, destRepo, destBranch);
  console.log(sha, commitMessage);
}

async function getLatestSha(octokit, owner, repo, branch) {
  const refList = await octokit.request(
    'GET /repos/{owner}/{repo}/git/ref/{ref}',
    { owner, repo, ref: `heads/${branch}` }
  );
  console.log(refList);
  return refList.object.sha;
}
