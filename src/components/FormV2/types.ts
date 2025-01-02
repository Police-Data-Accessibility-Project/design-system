// TODO: remove the V2 from all of these types when Form is removed and FormV2 -> Form

import useVuelidate from '@vuelidate/core';
import { makeRules } from './util';
import { Ref } from 'vue';

import * as validators from '@vuelidate/validators';

export interface PdapFormValidatorV2<T> {
	message?: string;
	value?: T;
	predicate?: (value: T) => boolean;
}

export type PdapFormValidatorsV2 = Record<
	keyof typeof validators,
	PdapFormValidatorV2<string | number | boolean>
>;

export type ValidationSchemaV2 = {
	name: string;
	validators: Partial<PdapFormValidatorsV2>;
}[];
/**
 * PDAP Form props interface.
 */
export interface PdapFormPropsV2 {
	defaultValues?: Record<PropertyKey, unknown>;
	error?: string | undefined | null;
	// Adds id and name in order to make required
	id: string;
	name: string;
	schema: ValidationSchemaV2;
}

export interface PdapFormProvideV2 {
	values: Ref<Record<PropertyKey, unknown>>;
	setValues: (values: Record<PropertyKey, unknown>) => void;
	rules: ReturnType<typeof makeRules>;
	v$: ReturnType<typeof useVuelidate>;
}
