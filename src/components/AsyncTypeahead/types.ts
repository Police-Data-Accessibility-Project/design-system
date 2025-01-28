export interface PdapAsyncTypeaheadProps<T> {
	id: string;
	placeholder?: string;
	items?: T[];
	formatItemForDisplay?: (item: T) => string;
	error?: string;
}
