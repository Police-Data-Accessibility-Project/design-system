// TODO: remove the V2 from all of these types when Form is removed and FormV2 -> Form

import useVuelidate from '@vuelidate/core';
import { makeRules } from './util';
import { Ref } from 'vue';

export interface PdapFormValidatorV2<T> {
	message?: string;
	value: T;
}

/**
 * Keyed by currently used validators.
 * Add any Vuelidate validators or custom ones here as we need them.
 * See https://vuelidate-next.netlify.app/validators.html#using-builtin-validators for more.
 *
 */
export interface PdapFormValidatorsV2 {
	maxLength: PdapFormValidatorV2<number>;
	minLength: PdapFormValidatorV2<number>;
	required: PdapFormValidatorV2<boolean>;
	email: PdapFormValidatorV2<boolean>;
	password: PdapFormValidatorV2<boolean>;
}

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
