import { PdapInputCheckboxProps, PdapInputTextProps } from '../Input/types';

/**
 * Keyed by currently used validators.
 * Add any Vuelidate validators or custom ones here as we need them.
 * See https://vuelidate-next.netlify.app/validators.html#using-builtin-validators for more.
 *
 */
export interface PdapFormValidators {
	maxLength: number;
	minLength: number;
	required: boolean;
}

export interface PdapFormSchemaEntryInputCheckbox
	extends PdapInputCheckboxProps {
	validators?: Partial<PdapFormValidators>;
}
export interface PdapFormSchemaEntryInputText extends PdapInputTextProps {
	validators?: Partial<PdapFormValidators>;
}
export type PdapFormSchemaEntry =
	| PdapFormSchemaEntryInputCheckbox
	| PdapFormSchemaEntryInputText;
export type PdapFormSchema = PdapFormSchemaEntry[];
export type PdapFormData = Record<string, unknown>;

/**
 * PDAP Form props interface.
 */
export interface PdapFormProps {
	className?: string;
	error?: string | undefined | null;
	id: string;
	name: string;
	schema: PdapFormSchema;
}
