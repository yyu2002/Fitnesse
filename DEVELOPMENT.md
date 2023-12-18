# Development Documentation
Some resources and things to keep in mind while contributing to this project. 

## Checks to Make Before Creating a PR
1. Run `git pull --rebase` to pull any changes from the remote branch. Alternatively, you can run `git config --global pull.rebase true` to auto rebase when running `git pull`.
2. Run `pnpm run lint` to perform lint checks then run  `pnpm run lint --fix` to fix them if there are any, or else pipeline checks will fail on GitHub actions when the PR is made.