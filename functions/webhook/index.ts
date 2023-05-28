import { Context, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { logger } from '../common/logger';
import { checkRequest } from './utils';
import { commentOnPR, reactToComment } from './github';
import { PullRequestEvent } from '@octokit/webhooks-types';

const botComment = 'Hello!';
const botReaction = 'rocket';

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    logger.addContext(context);
    logger.info('event', { event });

    if (!event.body) {
        throw new Error('Request has no body');
    }

    checkRequest(event.headers, event.body);

    const parsed = JSON.parse(event.body) as PullRequestEvent;
    // const comment = parsed.pull_request.body;

    if (parsed.action === 'opened') {
        await commentOnPR(parsed, botComment);
        await reactToComment(parsed, botReaction);

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: 'Success'
        }
    } else {
        return {
            statusCode: 400,
            headers: { 'Content-Type': 'application/json' },
            body: `Action type ${parsed.action} not 'opened'`
        }
    }
};

export { handler };
