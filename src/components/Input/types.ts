export enum PdapInputTypes {
	CHECKBOX = 'checkbox',
	TEXT = 'text',
}

export interface PdapInputBaseProps {
	id: string;
	label: string;
	name: string;
	error: string;
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
