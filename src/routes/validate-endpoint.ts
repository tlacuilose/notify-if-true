import type { RequestHandler } from '@sveltejs/kit';

// GET /validate-endpoint
export const post: RequestHandler<null, FormData> = async (request) => {
    let endpoint = request.body.get('endpoint');

    const fields = await fetch(endpoint, {
        method: 'get',
        headers: {
            'content-type': 'application/json'
        }
    });

    if (fields.ok) {
        return {
            status: 200,
            body: endpoint
        }
    } else {
        return {
            status: 400,
            body: 'fields.response.body'
            
        }
    }
}