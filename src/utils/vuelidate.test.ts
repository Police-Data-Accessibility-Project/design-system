// import * as validators from '@vuelidate/validators';
import { describe, expect, test } from 'vitest';
import {
	createRule,
	makePasswordRule,
	makePasswordRuleWithCustomMessage,
} from './vuelidate';
import { ValidationRuleWithParams } from '@vuelidate/core';

// vi.mock('@vuelidate/validators', () => ({
// 	helpers: {
// 		withMessage: vi.fn((message, predicate) => ({
// 			$message: message,
// 			$validator: predicate,
// 		})),
// 		regex: vi.fn((regex) => (value: string) => regex.test(value)),
// 	},
// }));

// Utils
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateMax(max: any, length: any) {
	expect(max).toHaveProperty('maxLength');
	expect(max.maxLength.$params).toStrictEqual({
		max: length,
		type: 'maxLength',
	});
}

describe('Vuelidate utils', () => {
	test('makePasswordRule', () => {
		const password = makePasswordRule();
		expect(typeof password.password).toBe('function');
	});

	test('makePasswordRuleWithCustomMessage', () => {
		const password = makePasswordRuleWithCustomMessage('error message');
		expect(typeof password.password.$validator).toBe('function');
		expect(password.password.$message).toBe('error message');
	});

	describe('createRule', () => {
		test('creates length rules', () => {
			const max = createRule('maxLength', { value: 3 });
			validateMax(max, 3);
			const maxWithMessage = createRule('maxLength', {
				message: 'error message',
				value: 3,
			});
			validateMax(maxWithMessage, 3);
			expect(
				(maxWithMessage as { maxLength: ValidationRuleWithParams }).maxLength
					.$message
			).toBe('error message');
		});

		test('creates required rules', () => {
			const required = createRule('required', { value: true });
			expect(required).toHaveProperty('required');
			// @ts-expect-error
			expect(required?.required.$params).toStrictEqual({
				type: 'required',
			});

			const requiredWithMessage = createRule('required', {
				value: true,
				message: 'error message',
			});
			expect(requiredWithMessage).toHaveProperty('required');

			// @ts-expect-error
			expect(requiredWithMessage?.required.$params).toStrictEqual({
				type: 'required',
			});

			// @ts-expect-error
			expect(requiredWithMessage.required.$message).toBe('error message');
		});

		test('creates email rules', () => {
			const email = createRule('email', { value: true });
			expect(email).toHaveProperty('email');
			// @ts-expect-error
			expect(email?.email.$params).toStrictEqual({
				type: 'email',
			});

			const emailWithMessage = createRule('email', {
				value: true,
				message: 'error message',
			});
			expect(emailWithMessage).toHaveProperty('email');

			// @ts-expect-error
			expect(emailWithMessage?.email.$params).toStrictEqual({
				type: 'email',
			});

			// @ts-expect-error
			expect(emailWithMessage.email.$message).toBe('error message');
		});

		test('creates url rules', () => {
			const url = createRule('url', { value: true });
			expect(url).toHaveProperty('url');
			// @ts-expect-error
			expect(url?.url.$params).toStrictEqual({
				type: 'url',
			});

			const urlWithMesage = createRule('url', {
				value: true,
				message: 'error message',
			});
			expect(urlWithMesage).toHaveProperty('url');

			// @ts-expect-error
			expect(urlWithMesage?.url.$params).toStrictEqual({
				type: 'url',
			});

			// @ts-expect-error
			expect(urlWithMesage.url.$message).toBe('error message');
		});

		test('creates password rules', () => {
			const password = createRule('password', { value: true });
			expect(password).toHaveProperty('password');
			expect(typeof (password as { password: () => void }).password).toBe(
				'function'
			);

			const passwordWithMessage = createRule('password', {
				value: true,
				message: 'error message',
			});
			// @ts-expect-error
			expect(typeof passwordWithMessage.password.$validator).toBe('function');
			// @ts-expect-error
			expect(passwordWithMessage.password.$message).toBe('error message');
		});
	});

	test('creates custom rules', () => {
		const customPredicate = (value: string) => value.length > 0;
		const custom = createRule('custom', {
			predicate: customPredicate,
		});

		expect(custom).toHaveProperty('custom');
		// @ts-expect-error
		expect(custom.custom).toBe(customPredicate);

		const customWithMessage = createRule('custom', {
			predicate: customPredicate,
			message: 'error message',
		});

		expect(customWithMessage).toHaveProperty('custom');
		// @ts-expect-error
		expect(customWithMessage.custom.$message).toBe('error message');
		// @ts-expect-error
		expect(customWithMessage.custom.$validator).toBe(customPredicate);
	});
});
