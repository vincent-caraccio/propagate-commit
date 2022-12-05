# Propagate commit

This action get the last commit message from the current repo and commits it to another (just the message)

## Inputs

## `token`

**Required** The github token to query the list of artifacts.

## `dest_owner`

**Required** The github owner of the repository to propapgate the commit to.

## `dest_repo`

**Required** The repository name to propapgate the commit to.

## `dest_branch`

**Required** The branch name to propapgate the commit to.

## Example usage

```
- name: Propagate commit
  uses: vincent-caraccio/propagate-commit@v0.0.11
  with:
    token: ${{ secrets.TOKEN }} # Personal acces token with write permission on the dest_repo
    dest_owner: my-org
    dest_repo: my-other-repo
    dest_branch: master
```
