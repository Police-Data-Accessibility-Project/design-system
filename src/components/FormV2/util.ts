import { createRule } from '../../utils/vuelidate';
import { PdapFormProvideV2, ValidationSchemaV2 } from './types';
import { InjectionKey } from 'vue';

export function makeRules(
	schema: ValidationSchemaV2
): Record<string, ReturnType<typeof createRule>> {
	return schema.reduce((acc, { name, validators }) => {
		const toAdd = Object.entries(validators ?? {}).reduce((acc, [key, val]) => {
			return {
				...acc,
				...createRule(key, val),
			};
		}, {});

		return {
			...acc,
			[name]: {
				...toAdd,
			},
		};
	}, {});
}

export const provideKey = Symbol() as InjectionKey<PdapFormProvideV2>;
