import { Component } from 'node_modules/vue-demi/lib';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface PdapLinkData {
	href?: string;
	path?: string;
	text?: string;
	icon?: Component | IconDefinition;
}
export interface PdapNavState {
	isExpanded: boolean;
	isMobile: boolean | undefined;
}
