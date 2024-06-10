import { ComponentPublicInstance } from 'vue';

export interface PdapErrorEmitted {
	error: Error;
	vm: ComponentPublicInstance | null;
	info?: string;
}

export interface PdapErrorBoundaryProps {
	component: string;
	onError?: (
		error: Error,
		target?: ComponentPublicInstance | null | undefined,
		info?: string
	) => void;
	params?: Record<string, string>;
}
