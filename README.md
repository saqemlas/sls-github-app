# Serverless GitHub App

## Info 

This stack deploy an Api Gateway and Lambda function; the lambda function is a triggered by webhooks from Github API, if the event is an opened Pull Request, then it will sends a reaction and write a comment. Deploy the stack first to create an endpoint to be used later on.

GitHub Apps allow you to create applications, where it needs an endpoint to send webhooks (recommend using a secret & enabling ssl verification). Permissions need to be set for the App on github as to what it is allowed to access. Subscriptions are made for events, such as Pull Requests or Security advisories. Once all set, install the app.

Once created add the application ID and application (webhook) secret to serverless.yml custom section, then download the "private key" pem file to the root of this directory as "private-key.pem" (DO NOT LOSE, DO NOT SHARE, DO NOT COMMIT this private key with permissions to Github). Redeploy the stack with updated config to integrate with Github.


### References

- [Guide - Setting up Github App](https://docs.github.com/en/apps/creating-github-apps/guides/setting-up-your-development-environment-to-create-a-github-app)
- [Download an App Private Key](https://docs.github.com/en/apps/creating-github-apps/guides/setting-up-your-development-environment-to-create-a-github-app#step-3-save-your-private-key-and-app-id)
- [Responding to Github Webhooks](https://docs.github.com/en/apps/creating-github-apps/guides/building-a-github-app-that-responds-to-webhook-events)
- [Authenticating Installations](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation)

## Usage 

### Credentials:
```bash
export AWS_PROFILE=<profile_name>
```

### Install Dependencies:

```bash
yarn run install
```

### Deploy:

```bash
yarn run deploy
```

### Remove:

```bash
yarn run remove
```
