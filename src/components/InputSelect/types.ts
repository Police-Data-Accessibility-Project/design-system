export interface PdapSelectOption {
	value: string;
	label: string;
}

export interface PdapInputSelectProps {
	id: string;
	label?: string;
	name: string;
	placeholder?: string;
	position?: 'top' | 'bottom';
	options: PdapSelectOption[];
	combobox?: boolean;
	filter?: (
		searchText: string,
		options: PdapSelectOption[]
	) => PdapSelectOption[];
}
