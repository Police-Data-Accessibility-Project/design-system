export interface PdapAsyncTypeaheadProps<T> {
	id: string;
	placeholder?: string;
	items: T[] | undefined;
	formatItemForDisplay?: (item: T) => string;
	error?: string;
	position?: 'top' | 'bottom';
}
