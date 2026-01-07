import { FOOTER_LINK_ICONS } from './constants';

export interface PdapFooterSocialLinks {
	href?: string;
	path?: string;
	text: string;
	icon?: FooterIconName;
}

export interface PdapFooterProps {
	/**
	 * Collapses the footer on first render when `true` and viewport is sticky
	 */
	collapseOnFirstRender?: boolean;
}
export type FooterIconName =
	(typeof FOOTER_LINK_ICONS)[keyof typeof FOOTER_LINK_ICONS];
