import * as validators from '@vuelidate/validators';
import { PdapFormValidator } from 'src/components/Form/types.ts';
import { isKey } from './isKey';
import { PdapFormValidatorV2 } from 'src/components/FormV2/types';

// Custom rules
export const password = validators.helpers.regex(
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
);

export function isPasswordRule(s: string): s is 'password' {
	return s === 'password';
}

export function isCustomRule(s: string): s is 'custom' {
	return s === 'custom';
}

export function makePasswordRule() {
	return { password };
}

export function makePasswordRuleWithCustomMessage(message: string) {
	return {
		password: validators.helpers.withMessage(message, password),
	};
}

export function createRule<T>(
	rule: string,
	validator: PdapFormValidatorV2<T> | PdapFormValidator<T>
) {
	// Exists on validators object, return that.
	if (isKey(validators, rule)) {
		const val = validators[rule];

		if (typeof validator.message === 'string') {
			return {
				[rule]: validators.helpers.withMessage(
					validator.message,
					validator.value && typeof validator.value !== 'boolean'
						? // @ts-expect-error
						  val(validator.value)
						: val
				),
			};
		}

		return {
			[rule]:
				validator.value && typeof validator.value !== 'boolean'
					? // @ts-expect-error
					  val(validator.value)
					: val,
		};
	} else {
		// Custom rules
		if (isCustomRule(rule) && validator.predicate) {
			if (typeof validator.message === 'string') {
				return {
					[rule]: validators.helpers.withMessage(
						validator.message,
						validator.predicate
					),
				};
			}
			return {
				[rule]: validator.predicate,
			};
			// Including passwords
		} else if (isPasswordRule(rule)) {
			if (validator.message) {
				return makePasswordRuleWithCustomMessage(validator.message);
			}

			return makePasswordRule();
		}
	}
}
