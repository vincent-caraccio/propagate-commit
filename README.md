# Propagate commit

This action get the last commit message from the current repo and commits it to another (just the message)

## Inputs

## `token`

**Required** The github token to query the list of artifacts.

## `dest_owner`

**Required** The github owner of the repository to propapgate the commit to.

## `dest_repo`

**Required** The repository name to propapgate the commit to.

## Example usage

```
- name: Propagate commit
  uses: vincent-caraccio/propagate-commit@v0.0.1
  with:
    token: ${{ secrets.TOKEN }} # No need to create it
    dest_owner: my-org
    dest_repo: my-other-repo
```