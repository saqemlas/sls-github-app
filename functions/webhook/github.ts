import { App } from '@octokit/app';
import { OctokitResponse } from '@octokit/types'
import { PullRequestEvent } from '@octokit/webhooks-types';
import { appId, appSecret, privateKey } from './config';

const app = new App({
    privateKey: privateKey,
    appId: appId,
    webhooks: {
        secret: appSecret
    }
});

async function commentOnPR(event: PullRequestEvent, message: string): Promise<OctokitResponse<any>> {
    if (!event.installation) {
        throw new Error('Installation not included in request');
    }

    return await (await app.getInstallationOctokit(event.installation.id))
        .request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
            owner: event.repository.owner.login,
            repo: event.repository.name,
            issue_number: event.number,
            body: message
        });
};

async function reactToComment(event: PullRequestEvent, reaction: '+1' | '-1' | 'laugh' | 'confused' | 'heart' | 'hooray' | 'rocket' | 'eyes'): Promise<OctokitResponse<any>> {
    if (!event.installation) {
        throw new Error('Installation not included in request');
    }

    return await (await app.getInstallationOctokit(event.installation.id))
        .request('POST /repos/{owner}/{repo}/issues/{issue_number}/reactions', {
            owner: event.repository.owner.login,
            repo: event.repository.name,
            issue_number: event.number,
            content: reaction,
        });
};

export { commentOnPR, reactToComment };
