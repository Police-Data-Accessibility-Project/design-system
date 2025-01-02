import { VueDatePickerProps } from '@vuepic/vue-datepicker';

export interface PdapDatePickerProps extends VueDatePickerProps {
	id: string;
	label?: string;
	name: string;
}
