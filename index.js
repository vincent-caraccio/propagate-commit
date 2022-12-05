'use strict';

const core = require('@actions/core');
const github = require('@actions/github');
(async function () {
  try {
    const token = core.getInput('token');
    const destOwner = core.getInput('dest_owner');
    const destRepo = core.getInput('dest_repo');
    const octokit = github.getOctokit(token);

    const commitMessage = github.event.head_commit.message;
    await pushEmptyCommit(octokit, destOwner, destRepo, commitMessage);
  } catch (error) {
    core.setFailed(error.message);
  }
})().catch(error => core.setFailed(error.message));

async function pushEmptyCommit(octokit, destOwner, destRepo, commitMessage) {
  console.log(destOwner, destRepo, commitMessage);
  return Promise.resolve();
}
