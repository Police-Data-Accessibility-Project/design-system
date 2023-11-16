/* eslint-disable @typescript-eslint/no-explicit-any */
/* c8 ignore next 30 */
import { print as _print } from 'jest-serializer-vue-tjw';

// TODO:
// 1. Write tests
// 2. Fix typescript -- any type is not safe

const helpers = {
	isHtmlString: function (received: any) {
		return (
			typeof received === 'string' &&
			(received.startsWith('<') || received.startsWith('"<'))
		);
	},
	isVueWrapper: function (received: any) {
		return typeof received === 'object' && typeof received.html === 'function';
	},
};

function test(received: any) {
	return helpers.isHtmlString(received) || helpers.isVueWrapper(received);
}
function print(received: any) {
	// force to a string
	received = (received?.html && received?.html()) || received;
	return _print(received);
}

export default {
	print,
	test,
};
// TODO: Devise a test for this, so that we don't need to add c8 declaration ignoring it (code is more or less boilerplate from c8 - https://github.com/tjw-lint/jest-serializer-vue-tjw/#using-with-vitest)
