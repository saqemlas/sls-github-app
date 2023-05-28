import { createHmac } from 'crypto';
import { APIGatewayProxyEventHeaders } from 'aws-lambda';
import { appId, appSecret } from './config';

function checkRequest(headers: APIGatewayProxyEventHeaders, _body: string): void {
    // const signature = headers?.['X-Hub-Signature-256'];
    const eventType = headers?.['X-GitHub-Event'];
    const userAgent = headers?.['User-Agent'];
    const installId = headers?.['X-GitHub-Hook-Installation-Target-ID'];

    if (!eventType || !userAgent || !installId) {
        throw new Error('Missing Headers');
    }

    if (!userAgent.includes('GitHub-Hookshot')) {
        throw new Error('User Agent not from Github');
    }

    if (eventType !== 'pull_request') {
        throw new Error('Event not Pull Request');
    }

    if (installId !== appId) {
        throw new Error('Request App ID does not match App ID');
    }

    // if (!isSignatureCorrect(signature, body)) {
    //     throw new Error('Request Signature does not match App Signature');
    // }

    return;
};

function isSignatureCorrect(requestSignature: string, body: string) {
    const reconstructuredSignature = `sha256=${createHmac('sha256', appSecret).update(body, 'utf8').digest('hex')}`;
    return requestSignature === reconstructuredSignature;
};

export { checkRequest };
