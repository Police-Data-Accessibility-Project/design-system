export interface PdapSelectOption {
	value: string;
	label: string;
}

export interface PdapInputSelectProps {
	id: string;
	label?: string;
	name: string;
	placeholder?: string;
	options: PdapSelectOption[];
}