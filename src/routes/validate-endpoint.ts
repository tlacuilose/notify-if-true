import type { RequestHandler } from '@sveltejs/kit';

// GET /validate-endpoint
export const post: RequestHandler<null, FormData> = async (request) => {
	let endpoint = request.body.get('endpoint');

	const response = await fetch(endpoint, {
		method: 'get',
		headers: {
			'content-type': 'application/json'
		}
	});

	if (!response.ok) {
		return {
			status: 400,
			body: endpoint
		};
	}

	const json = await response.json();
	let fields = squashFields('', json);

	return {
		status: 200,
		body: {
			endpoint: endpoint,
			fields: fields
		}
	};
};

function squashFields(prefix: string, obj: any): string {
	if (Array.isArray(obj)) {
		let res = '';
		for (const [i, val] of obj.entries()) {
			const _prefix = prefix + '[' + i + ']:';
			res += squashFields(_prefix, val);
		}
		return res;
	} else if (typeof obj === 'object') {
		const keys = Object.keys(obj);
		let res = '';
		for (const k of keys) {
			let _prefix = prefix + k + ':';
			res += squashFields(_prefix, obj[k]);
		}
		return res;
	} else {
		return prefix + typeof obj + ',';
	}
}
