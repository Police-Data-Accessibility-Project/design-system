export enum PdapDropdownTriggerType {
	PRESS = 'press',
	HOVER = 'hover',
}

export interface PdapDropdownProps {
	defaultOpen?: boolean;
	disabled?: boolean;
	triggerOn?: PdapDropdownTriggerType;
}
