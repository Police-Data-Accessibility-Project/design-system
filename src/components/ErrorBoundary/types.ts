import { ComponentPublicInstance } from 'vue';

export interface PdapErrorBoundaryProps {
	component: string;
	onError?: (
		error: Error,
		target?: ComponentPublicInstance | null | undefined
	) => void;
	params?: Record<string, string>;
	stopPropagation?: boolean;
}
