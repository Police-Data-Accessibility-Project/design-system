export enum PdapInputTypes {
	CHECKBOX = 'checkbox',
	TEXT = 'text',
	PASSWORD = 'password',
}

export interface PdapInputBaseProps {
	error?: string;
	id: string;
	label: string;
	name: string;
	placeholder?: string;
	value?: string;
}

export interface PdapInputTextProps extends PdapInputBaseProps {
	type: PdapInputTypes.TEXT | PdapInputTypes.PASSWORD;
}

export interface PdapInputCheckboxProps extends PdapInputBaseProps {
	defaultChecked?: boolean;
	type: PdapInputTypes.CHECKBOX;
}

export type PdapInputProps = PdapInputTextProps | PdapInputCheckboxProps;
