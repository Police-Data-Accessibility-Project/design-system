import * as validators from '@vuelidate/validators';
import {
	PdapFormValidator,
	PdapFormValidators,
	PdapLengthRules,
} from 'src/components/Form/types.ts';

/**
 * Type predicate to ensure the passed validator is a valid one.
 * @param s string to check against keys of the vuelidate validators object
 */
export function isPdapVuelidateValidator(
	s: string
): s is keyof PdapFormValidators {
	return s in validators;
}

export function isLengthRule(s: string): s is PdapLengthRules {
	return ['maxLength', 'minLength'].includes(s);
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
	} else if (rule === 'required' && typeof validator.message === 'string') {
		return makeRequiredRuleWithCustomMessage(validator.message);
	} else if (rule === 'required' && typeof validator.message === 'undefined') {
		return makeRequiredRule();
	}
	throw new Error('No valid rule detected');
}
