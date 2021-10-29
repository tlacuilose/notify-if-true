function extractComparison(comparing) {
	const available = new Set(['>', '<', '>=', '<=', '=', '!=']);

	let inparens = comparing.split(/[()]+/);
	let op = inparens[0];
	let val = inparens[1];

	if (!op || !val) {
		return null;
	}

	if (!available.has(op)) {
		return null;
	}

	return [op, val];
}

let a = '>(23)';

console.log(extractComparison(a));
