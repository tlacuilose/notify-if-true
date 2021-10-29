import type { RequestHandler } from '@sveltejs/kit';

interface Comparison {
    op: string,
    val: string
}

const AVAILABLE_OP = new Set(['>', '<', '>=', '<=', '=', '!=']);

// GET /validate-fields
export const post: RequestHandler<null, FormData> = async (request) => {
    const endpoint = request.body.get('endpoint');

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
    const squashed = request.body.entries();
    // Skip endpoint
    squashed.next();
    // Skip fields
    squashed.next();
	let validatedFields = compareSquashed(squashed, json);

    if (!validatedFields) {
        return {
            status: 400,
            body: 'no'
        }
    }

	return {
		status: 200,
		body: {
            'endpoint': endpoint,
            'validated_fields': validatedFields
        }
	};
};

function compareSquashed(squashed: Generator<[string, string]>, obj: any): string {
    let res = '';
    for (const [field, value] of squashed) {
        if (value) {
            let realValue = findValue(field, obj);
            let comparison = extractComparison(value);
            if (realValue && comparison) {
                 res += field + '|' + value + ',';
            }
        }
    }
    return res;
}

function findValue(squashedKey: string, obj: any): string {
    let first = squashedKey.split(':')[0];
	if (Array.isArray(obj)) {
        if (first[0] === '[') {
            let rest = squashedKey.split(/:(.+)/ )[1];
            let i = first[1];
            return findValue(rest, obj[i]);
        }
        return null;
	} else if (typeof obj === 'object') {
        if (obj[first]) {
            let rest = squashedKey.split(/:(.+)/ )[1];
            return findValue(rest, obj[first]);
        }
        return null;
	} else {
		return obj;
	}
}

function extractComparison(comparingValue: string): Comparison {
    let inparens = comparingValue.split(/[()]/);
    let op = inparens[0];
    let val = inparens[1];

    if (!op || !val || !AVAILABLE_OP.has(op)) {
        return null;
    }

    return {
        op: op,
        val: val
    };
}