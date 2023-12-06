export enum PdapInputTypes {
	CHECKBOX = 'checkbox',
	TEXT = 'text',
}

export interface PdapInputBaseProps {
	error?: string;
	id: string;
	label: string;
	name: string;
	placeholder?: string;
	type: PdapInputTypes;
	value?: string;
	defaultChecked?: boolean;
}

export interface PdapInputTextProps extends PdapInputBaseProps {
	type: PdapInputTypes.TEXT;
}

export interface PdapInputCheckboxProps extends PdapInputBaseProps {
	type: PdapInputTypes.CHECKBOX;
}
