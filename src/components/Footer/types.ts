import { FOOTER_LINK_ICONS } from './constants';

export interface PdapFooterSocialLinks {
	href?: string;
	path?: string;
	text: string;
	icon?: FooterIconName;
}
export type FooterIconName =
	(typeof FOOTER_LINK_ICONS)[keyof typeof FOOTER_LINK_ICONS];

export interface PdapFooterProps {
	fundraisingData: {
		raised: number;
		goal: number;
	};
}
