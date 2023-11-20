export interface PdapGridContainerProps {
	className?: string;
	columns?: 1 | 2 | 3 | 'auto';
	component?: string;
	rows?: number | 'auto';
	templateColumns?: string;
	templateRows?: string;
}
