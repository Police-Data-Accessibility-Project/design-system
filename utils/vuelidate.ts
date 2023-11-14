import * as validators from '@vuelidate/validators';
import { PdapFormValidators } from 'src/components/Form/PdapForm.vue';
import { Ref } from 'vue';

const validValidators = ['maxLength', 'minLength', 'required'];
type PdapLengthRules = 'maxLength' | 'minLength';

// TODO: Add tests

/**
 * Type predicate to ensure the passed validator is a valid one.
 * @param s string to check against keys of the vuelidate validators object
 */
export function isPdapVuelidateValidator(
	s: string
): s is keyof PdapFormValidators {
	return s in validators && validValidators.includes(s);
}

export function isLengthRule(s: string): s is PdapLengthRules {
	return ['maxLength', 'minLength'].includes(s);
}

export function makeLengthRule(
	rule: PdapLengthRules,
	value: number | Ref<number>
) {
	return {
		[rule]: validators[rule](value),
	};
}

export function makeLengthRuleWithCustomMessage(
	rule: PdapLengthRules,
	value: number | Ref<number>,
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

export function createRule<T extends number | boolean>(key: string, val: T) {
	return isLengthRule(key) && typeof val === 'number'
		? makeLengthRule(key, val)
		: key === 'required' && typeof val === 'boolean'
		? makeRequiredRule()
		: { [key]: val };
}
