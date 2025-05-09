<template>
	<main class="pdap-flex-container relative">
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
			<h2 class="col-span-full">Breadcrumbs</h2>
			<div
				class="col-span-full lg:col-span-2 pdap-flex-container flex-row justify-between w-full"
			>
				Click to navigate:
				<router-link to="/"> Home </router-link>
				<router-link to="/foo"> Foo </router-link>
				<router-link to="/foo/bar"> FooBar </router-link>
				<router-link to="/foo/bar/baz"> FooBarBaz </router-link>
			</div>

			<Breadcrumbs class="col-span-full" />

			<h2 class="col-span-full">Loading</h2>
			<h3 class="col-span-full">
				The <code>loading-shimmer</code> class (which is just a wrapper around
				the TailwindCSS <code>animate-pulse</code> class) can be applied to
				anything.
			</h3>
			<div>
				<h4>Like this:</h4>
				<div class="loading-shimmer h-48 bg-neutral-500" />
			</div>
			<div>
				<h4>Or this:</h4>
				<div
					class="loading-shimmer h-48 bg-brand-gold flex flex-col justify-center items-center text-neutral-50"
				>
					<Spinner :show="true" text="Hello from the loading div" />
				</div>
			</div>
			<div>
				<h4>Or this:</h4>
				<div class="loading-shimmer h-48 from-current bg-gradient-to-tr" />
			</div>
			<div>
				<h4>Or this:</h4>
				<div class="loading-shimmer h-48 from-brand-wine bg-gradient-to-r" />
			</div>

			<h3 class="col-span-full">Loading spinner:</h3>

			<Spinner
				class="col-span-full"
				:show="true"
				:size="48"
				:text="loadingText"
			/>

			<Spinner class="col-span-full" :show="true" :size="128" />

			<Spinner class="col-span-full" :show="true" :size="64" />

			<Spinner class="col-span-full" :show="true" :size="32" />

			<Spinner class="col-span-full" :show="true" :size="16" />

			<h2 class="col-span-full mb-0">Buttons</h2>
			<p class="col-span-full max-w-none">
				These are all contained within a grid container, defined by using the
				custom TailwindCSS @components class <code>.pdap-grid-container</code>.
				We have also added a <code>.col-span-full</code> class for headings and
				other grid items that should span the full width (like this paragraph).
			</p>
			<div>
				<h3>Button primary</h3>
				<Button @click="() => buttonAlert('hello from primary button')">
					Primary button
				</Button>
			</div>
			<div>
				<h3>Button secondary</h3>
				<Button
					intent="secondary"
					@click="() => buttonAlert('hello from secondary button')"
				>
					Secondary button
				</Button>
			</div>
			<div>
				<h3>Button tertiary</h3>
				<Button
					intent="tertiary"
					@click="() => buttonAlert('hello from tertiary button')"
				>
					Tertiary button
				</Button>
				<p>
					This is an unstyled button meant to take any styling (see the
					clickable pills in current data sources search results)
				</p>
			</div>
		</div>

		<h2>Dropdown: click or press to open</h2>
		<!-- Dropdown emits an update:open event we can use to apply state-based classes to slot elements... -->
		<Dropdown
			dropdown-id="demo-press"
			@update:open="(isOpen: boolean) => (dropDownPressIsOpen = isOpen)"
		>
			<template #trigger>
				<span
					:class="{
						// ...like this
						'font-semibold': dropDownPressIsOpen,
					}"
				>
					Press to toggle dropdown open/closed</span
				>
			</template>
			<template #content>
				<Button
					intent="tertiary"
					@click="buttonAlert('Apples dropdown button clicked')"
				>
					Apples
				</Button>

				<Button
					intent="tertiary"
					@click="buttonAlert('Oranges dropdown button clicked')"
				>
					Oranges
				</Button>

				<a href="https://pdap.io" target="_blank" rel="noreferrer">
					Go to pdap.io
				</a>

				<a href="https://pdap.dev" target="_blank" rel="noreferrer">
					Go to pdap.dev
				</a>
			</template>
		</Dropdown>

		<h2>
			Dropdown: hover or focus to open (with alternate press on top-level
			button)
		</h2>
		<!-- Dropdown emits an update:open event we can use to apply state-based classes to slot elements... -->
		<Dropdown
			dropdown-id="demo-hover"
			:trigger-on="PdapDropdownTriggerType.HOVER"
			@update:open="(isOpen: boolean) => (dropDownHoverIsOpen = isOpen)"
			@press="() => buttonAlert('Hello from top-level button')"
		>
			<template #trigger>
				<span
					:class="{
						// ...like this
						'font-semibold': dropDownHoverIsOpen,
					}"
				>
					Hover or focus to toggle dropdown open/closed</span
				>
			</template>
			<template #content>
				<Button
					intent="tertiary"
					@click="buttonAlert('Apples dropdown button clicked')"
				>
					Apples
				</Button>

				<Button
					intent="tertiary"
					@click="buttonAlert('Oranges dropdown button clicked')"
				>
					Oranges
				</Button>

				<a href="https://pdap.io" target="_blank" rel="noreferrer">
					Go to pdap.io
				</a>
			</template>
		</Dropdown>

		<h2>Form</h2>
		<Form
			id="test"
			ref="formRef"
			name="test"
			:schema="mockFormSchema"
			@change="change"
			@submit="submit"
		>
			<Button type="submit"> Say hello </Button>
		</Form>

		<h2>Quick Search Form</h2>
		<QuickSearchForm />

		<h2>Error Boundary</h2>
		<ErrorBoundary
			class="col-span-full items-start"
			component="div"
			@on-error="({ error, vm, info }) => console.debug({ error, vm, info })"
		>
			<div class="col-span-full">
				<p>
					This is the content that will render inside the error boundary if
					there is no error
				</p>
				<Button @click="triggerError">Click here to trigger error</Button>
			</div>
		</ErrorBoundary>
	</main>
</template>

<script setup lang="ts">
import { PdapInputTypes } from '../../components/Input/types';
import {
	Breadcrumbs,
	Button,
	Dropdown,
	ErrorBoundary,
	Form,
	QuickSearchForm,
	Spinner,
} from '../../components';
import { onMounted, ref } from 'vue';
import { PdapDropdownTriggerType } from '../../components/Dropdown/types';

const mockFormSchema = [
	{
		autocomplete: 'given-name',
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
		autocomplete: 'family-name',
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
		id: 'likes-ice-cream',
		defaultChecked: true,
		name: 'iceCream',
		label: 'Do you like ice cream?',
		type: PdapInputTypes.CHECKBOX,
		value: '',
	},
];

const formRef = ref();
const dropDownPressIsOpen = ref(false);
const dropDownHoverIsOpen = ref(false);
const loadingText = ref('customizable, with optional text...');

function buttonAlert(msg: string) {
	alert(msg);
}

function updateLoadingText() {
	let index = 0;
	const text = [
		'that can even update, like so:',
		'loading...',
		'still loading...',
		'we might be here a while...',
		'seriously, go get a coffee or something...',
		"but wait, there's more... loading",
		'refresh to see the text change again.',
	];

	const interval = setInterval(() => {
		if (index === text.length) {
			clearInterval(interval);
			return;
		}

		loadingText.value = text[index];
		index++;
		console.debug({ loadingText: loadingText.value });
	}, 3 * 1000);
}

function triggerError() {
	throw new Error('Trigger error fallback');
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

function change(
	values: Record<'firstName' | 'lastName' | 'iceCream', string>,
	event: Event
) {
	if (formRef.value) {
		console.debug({ ref: formRef.value });
	}
	console.debug('onChange', { values, event });
}

onMounted(updateLoadingText);
</script>
