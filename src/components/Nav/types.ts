export interface PdapLinkData {
	href?: string;
	path?: string;
	text: string;
}

export interface PdapNavProps {
	className?: string;
	topPosition?: number;
}

export interface PdapNavState {
	isExpanded: boolean;
	isMobile: boolean | undefined;
}
