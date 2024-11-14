import * as validators from '@vuelidate/validators';
import {
	PdapFormValidator,
	PdapFormValidators,
	PdapLengthRules,
} from 'src/components/Form/types.ts';

// Custom rules
export const password = validators.helpers.regex(
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
);

export function isPdapVuelidateValidator(
	s: string
): s is keyof PdapFormValidators {
	return s in validators;
}

export function isLengthRule(s: string): s is PdapLengthRules {
	return ['maxLength', 'minLength'].includes(s);
}

export function isRequiredRule(s: string): s is 'required' {
	return s === 'required';
}

export function isEmailRule(s: string): s is 'email' {
	return s === 'email';
}

export function isUrlRule(s: string): s is 'url' {
	return s === 'url';
}

export function isPasswordRule(s: string): s is 'password' {
	return s === 'password';
}

export function makeLengthRule(rule: PdapLengthRules, value: number) {
	return {
		[rule]: validators[rule](value),
	};
}

export function makeLengthRuleWithCustomMessage(
	rule: PdapLengthRules,
	value: number,
	message: string
) {
	return {
		[rule]: validators.helpers.withMessage(message, validators[rule](value)),
	};
}

export function makeRequiredRule() {
	return { required: validators.required };
}

export function makeRequiredRuleWithCustomMessage(message: string) {
	return {
		required: validators.helpers.withMessage(message, validators.required),
	};
}

export function makeEmailRule() {
	return { email: validators.email };
}

export function makeEmailRuleWithCustomMessage(message: string) {
	return {
		email: validators.helpers.withMessage(message, validators.email),
	};
}

export function makeURLRule() {
	return { email: validators.url };
}

export function makeURLRuleWithCustomMessage(message: string) {
	return {
		email: validators.helpers.withMessage(message, validators.url),
	};
}

export function makePasswordRule() {
	return { password };
}

export function makePasswordRuleWithCustomMessage(message: string) {
	return {
		password: validators.helpers.withMessage(message, password),
	};
}

// TODO: update call signatures so that TS is happy with the delimited return type (see errors in ./vuelidate.test.ts)
export function createRule<T extends PdapFormValidator<number | boolean>>(
	rule: string,
	validator: T
) {
	if (
		isLengthRule(rule) &&
		typeof validator.message === 'string' &&
		typeof validator.value === 'number'
	) {
		return makeLengthRuleWithCustomMessage(
			rule,
			validator.value,
			validator.message
		);
	} else if (
		isLengthRule(rule) &&
		typeof validator.message === 'undefined' &&
		typeof validator.value === 'number'
	) {
		return makeLengthRule(rule, validator.value);
	} else if (isUrlRule(rule) && typeof validator.message === 'string') {
		return makeURLRuleWithCustomMessage(validator.message);
	} else if (isUrlRule(rule) && typeof validator.message === 'undefined') {
		return makeURLRule();
	} else if (isEmailRule(rule) && typeof validator.message === 'string') {
		return makeEmailRuleWithCustomMessage(validator.message);
	} else if (isEmailRule(rule) && typeof validator.message === 'undefined') {
		return makeEmailRule();
	} else if (isPasswordRule(rule) && typeof validator.message === 'string') {
		return makePasswordRuleWithCustomMessage(validator.message);
	} else if (isPasswordRule(rule) && typeof validator.message === 'undefined') {
		return makePasswordRule();
	} else if (isRequiredRule(rule) && typeof validator.message === 'string') {
		return makeRequiredRuleWithCustomMessage(validator.message);
	} else if (isRequiredRule(rule) && typeof validator.message === 'undefined') {
		return makeRequiredRule();
	}
	throw new Error('No valid rule detected');
}
