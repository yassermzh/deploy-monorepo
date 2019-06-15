# Deploy a Monorepo with Jenkins and Gitlab webhooks

- The monorepo is managed by [Lerna](https://github.com/lerna/lerna).
- As you push to Gitlab, it triggers a Jenkins job.
- This job checkouts the repository, and loads the `tasks` package Jenkinsfile at: `packages/tasks/Jenkinsfile`. There we list all deployable packages. Mostly the packages are not deployable and used as dependencies.
- Each deployable package has one Jenkinsfile at `packages/PACKAGE/scripts/Jenkinsfile` that knows how to deploy itself.
- The `tasks` package Jenkinsfile compares this commit with last successful deploy and find all changed packages and only load Jenkisnfile of those packages.

The structure of the monorepo is as follows:

```
  |
  |-- packages/
  |           /tasks/Jenkinsfile
  |           /notify/
  |                  /scripts/Jenkinsfile
  |           /email/
```
in which the `notify` package is a deployable one, and `email` package is a dependency for `notify`.


## Development flow

### To run locally

- install dependencies
  ```bash
  lerna bootstrap --hoist
  ```
- add dependencies
  Here adding `@company/email` to notify `@company/package`. As you notice, it uses `@company` to scope npm packages.
  ```bash
  lerna add @company/email --scope @company/notify
  ```
- run only one package
  ```bash
  cd packages/notify
  npm start
  ```

- run all packages
  ```bash
  lerna run start
  ```

### To deploy

```bash
lerna publish --registry http://registry.company.com
```