// import * as validators from '@vuelidate/validators';
import { describe, expect, test } from 'vitest';
import {
	createRule,
	isLengthRule,
	isPdapVuelidateValidator,
	// TODO: tests for url
	// isUrlRule,
	// makeURLRule,
	// makeURLRuleWithCustomMessage,
	makeEmailRule,
	makeEmailRuleWithCustomMessage,
	makeLengthRule,
	makeLengthRuleWithCustomMessage,
	makePasswordRule,
	makePasswordRuleWithCustomMessage,
	makeRequiredRule,
	makeRequiredRuleWithCustomMessage,
} from './vuelidate';
import { ValidationRuleWithParams } from '@vuelidate/core';

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
	test('isPdapVuelidateValidator', () => {
		expect(isPdapVuelidateValidator('maxLength')).toBe(true);
		expect(isPdapVuelidateValidator('minLength')).toBe(true);
		expect(isPdapVuelidateValidator('required')).toBe(true);
		expect(isPdapVuelidateValidator('foo')).toBe(false);
	});

	test('isLengthRule', () => {
		expect(isLengthRule('maxLength')).toBe(true);
		expect(isLengthRule('minLength')).toBe(true);
		expect(isLengthRule('required')).toBe(false);
		expect(isLengthRule('foo')).toBe(false);
	});

	test('makeLengthRule - max', () => {
		const max = makeLengthRule('maxLength', 1);
		validateMax(max, 1);
	});

	test('makeLengthRuleWithCustomMessage - max', () => {
		const maxWithMessage = makeLengthRuleWithCustomMessage(
			'maxLength',
			1,
			'error message'
		);
		expect(maxWithMessage).toHaveProperty('maxLength');
		expect(maxWithMessage.maxLength.$params).toStrictEqual({
			max: 1,
			type: 'maxLength',
		});
		expect(maxWithMessage.maxLength.$message).toBe('error message');
	});

	test('makeRequiredRule', () => {
		const required = makeRequiredRule();
		expect(required).toHaveProperty('required');
		expect(
			(required['required'] as unknown as ValidationRuleWithParams).$params
		).toStrictEqual({
			type: 'required',
		});
	});

	test('makeRequiredRuleWithCustomMessage', () => {
		const requiredWithMessage =
			makeRequiredRuleWithCustomMessage('error message');
		expect(requiredWithMessage).toHaveProperty('required');
		expect(
			(requiredWithMessage['required'] as unknown as ValidationRuleWithParams)
				.$params
		).toStrictEqual({
			type: 'required',
		});
		expect(requiredWithMessage['required'].$message).toBe('error message');
	});

	test('makeEmailRule', () => {
		const email = makeEmailRule();
		expect(email).toHaveProperty('email');
		expect(
			(email.email as unknown as ValidationRuleWithParams).$params
		).toStrictEqual({
			type: 'email',
		});
	});

	test('makeEmailRuleWithMessage', () => {
		const emailWithMessage = makeEmailRuleWithCustomMessage('error message');
		expect(emailWithMessage).toHaveProperty('email');
		expect(
			(emailWithMessage.email as unknown as ValidationRuleWithParams).$params
		).toStrictEqual({
			type: 'email',
		});
		expect(emailWithMessage.email.$message).toBe('error message');
	});

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

		test('Throw error with unsuppored rule', () => {
			expect(() => createRule('foo', { value: true })).toThrow();
		});
	});
});
