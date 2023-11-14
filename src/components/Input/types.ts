// import * as vuelidateValidators from '@vuelidate/validators';
// import { Validation } from '@vuelidate/core';
// import { PdapFormData } from '../Form/PdapForm.vue';
// import { Ref } from 'vue';

export enum PdapInputTypes {
	CHECKBOX = 'checkbox',
	TEXT = 'text',
}

// eslint-disable-next-line @typescript-eslint/ban-types
// export type VuelidateInstance = Ref<Validation<{}, Record<string, unknown>>>;

export interface PdapInputBaseProps {
	errorMessage: string | undefined | null;
	id: string;
	label: string;
	name: string;
}

export interface PdapInputTextProps extends PdapInputBaseProps {
	placeholder?: string;
	type: PdapInputTypes.TEXT;
	value: string;
}

export interface PdapInputCheckboxProps extends PdapInputBaseProps {
	defaultChecked: boolean;
	type: PdapInputTypes.CHECKBOX;
	value: string;
}
