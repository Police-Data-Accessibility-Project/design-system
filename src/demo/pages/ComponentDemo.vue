<template>
	<main class="pdap-flex-container">
		<h1>PDAP component library demo. This is a top-level heading.</h1>
		<p>
			And this is a paragraph. By default it has a max width of 45ch. <br />
			The entire page is wrapped in a flex container. These are defined by using
			the custom TailwindCSS @components classes
			<code>.pdap-flex-container</code> or
			<code>.pdap-flex-container-center</code>
		</p>
		<h2>This is a second-level heading</h2>
		<h3>This is a third-level heading</h3>
		<h4>This is a fourth-level heading</h4>
		<h5>This is a fifth-level heading</h5>
		<h6>This is a sixth-level heading</h6>

		<div class="pdap-grid-container mt-5">
			<h2 class="col-span-full mb-0">Buttons</h2>
			<p class="col-span-full max-w-none">
				These are all contained within a grid container, defined by using the
				custom TailwindCSS @components class <code>.pdap-grid-container</code>.
				We have also added a <code>.col-span-full</code> class for headings and
				other grid items that should span the full width (like this paragraph).
			</p>
			<div>
				<h3>Button primary</h3>
				<Button @click="() => buttonAlert('hello from primary button')"
					>Primary button</Button
				>
			</div>
			<div>
				<h3>Button secondary</h3>
				<Button
					intent="secondary"
					@click="() => buttonAlert('hello from secondary button')"
					>Secondary button</Button
				>
			</div>
			<div>
				<h3>Button tertiary</h3>
				<Button
					intent="tertiary"
					@click="() => buttonAlert('hello from tertiary button')"
					>Tertiary button</Button
				>
				<p>
					This is an unstyled button meant to take any styling (see the
					clickable pills in current data sources search results)
				</p>
			</div>
		</div>

		<h2>Here is a form using the <code>Form</code> component directly</h2>
		<Form
			id="test"
			name="test"
			:schema="mockFormSchema"
			@change="change"
			@submit="submit"
		>
			<Button type="submit">Say hello</Button>
		</Form>

		<h2>And here is the Quick Search Form component</h2>
		<QuickSearchForm />
	</main>
</template>

<script setup lang="ts">
import { PdapInputTypes } from '../../components/Input/types';
import { Button, Form, QuickSearchForm } from '../../components';

const mockFormSchema = [
	{
		id: 'first-name',
		name: 'firstName',
		label: 'What is your first name?',
		type: PdapInputTypes.TEXT,
		placeholder: 'John',
		value: '',
		validators: {
			required: {
				value: true,
			},
		},
	},
	{
		id: 'last-name',
		name: 'lastName',
		label: 'What is your last name?',
		type: PdapInputTypes.TEXT,
		placeholder: 'Doe',
		value: '',
		validators: {
			required: {
				value: true,
			},
		},
	},
	{
		id: 'password',
		name: 'password',
		label: 'Password',
		type: PdapInputTypes.PASSWORD,
		placeholder: 'Password',
		value: '',
		validators: {
			password: {
				message: 'Please enter a valid password',
				value: true,
			},
			required: {
				message: 'Please enter a valid password',
				value: true,
			},
		},
	},
	{
		id: 'likes-ice-cream',
		defaultChecked: true,
		name: 'iceCream',
		label: 'Do you like ice cream?',
		type: PdapInputTypes.CHECKBOX,
		value: '',
	},
];

function buttonAlert(msg: string) {
	alert(msg);
}

function submit(values: Record<'firstName' | 'lastName' | 'iceCream', string>) {
	console.debug({ values });
	const alertString = `Howdy, ${values.firstName} ${values.lastName}\n${
		values.iceCream === 'true'
			? 'We like ice cream, too'
			: "Who doesn't like ice cream?"
	}`;
	alert(alertString);
}

function change(values: Record<'firstName' | 'lastName' | 'iceCream', string>) {
	console.log('onChange', { values });
}
</script>
