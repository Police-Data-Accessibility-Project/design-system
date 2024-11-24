import { PdapInputProps } from '../Input/types';
import * as validators from '@vuelidate/validators';

export interface PdapFormValidator<T> {
	message?: string;
	value?: T;
	predicate?: (value: T) => boolean;
}

export type PdapFormValidators = Record<
	keyof typeof validators,
	PdapFormValidator<boolean | string | number>
>;

export type PdapFormInputProps = PdapInputProps & {
	validators?: Partial<PdapFormValidators>;
};
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
	resetOn?: 'submit' | boolean;
}
