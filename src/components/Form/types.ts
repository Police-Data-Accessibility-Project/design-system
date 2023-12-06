import { PdapInputBaseProps } from '../Input/types';

export type PdapLengthRules = 'maxLength' | 'minLength';

export interface PdapFormValidator<T> {
	message?: string;
	value: T;
}

/**
 * Keyed by currently used validators.
 * Add any Vuelidate validators or custom ones here as we need them.
 * See https://vuelidate-next.netlify.app/validators.html#using-builtin-validators for more.
 *
 */
export interface PdapFormValidators {
	maxLength: PdapFormValidator<number>;
	minLength: PdapFormValidator<number>;
	required: PdapFormValidator<boolean>;
}

export interface PdapFormInputProps
	extends Exclude<PdapInputBaseProps, 'error'> {
	validators?: Partial<PdapFormValidators>;
}
export type PdapFormSchema = PdapFormInputProps[];
export type PdapFormData = Record<string, unknown>;

/**
 * PDAP Form props interface.
 */
export interface PdapFormProps {
	error?: string | undefined | null;
	id: string;
	name: string;
	schema: PdapFormSchema;
}
