<template>
	<FlexContainer
		alignment="center"
		component="div"
		class="pdap-quick-search-form"
	>
		<Form
			id="quick-search-form"
			class="small"
			:error="error"
			:schema="formSchema"
			name="quickSearchForm"
			@submit="handleSubmit"
		>
			<Button type="submit">Search Data Sources</Button>
		</Form>
	</FlexContainer>
</template>

<script setup lang="ts">
// Globals
import { useRouter } from 'vue-router';
// Components
import Button from '../Button/PdapButton.vue';
import FlexContainer from '../FlexContainer/FlexContainer.vue';
import Form from '../Form/PdapForm.vue';

// Types
import { PdapInputTypes } from '../Input/types';
import { ref } from 'vue';

const router = useRouter();

const props = withDefaults(defineProps<{ mode: 'dev' | 'prod' }>(), {
	mode: 'prod',
});

const formSchema = [
	{
		id: 'search-term',
		name: 'searchTerm',
		label: 'What are you looking for?',
		type: PdapInputTypes.TEXT,
		placeholder: "Enter a keyword, or 'all'",
		value: '',
	},
	{
		id: 'location',
		name: 'location',
		label: 'From where?',
		type: PdapInputTypes.TEXT,
		placeholder: "Enter a place, or 'all'",
		value: '',
	},
];

const error = ref<string | undefined>(undefined);

function handleSubmit(values: { location: string; searchTerm: string }) {
	/**  Extra validation - backend expects 1 form value to be filled in.
	 *   The other input will be set to 'all'
	 */
	if (Object.values(values).every((val) => !val)) {
		error.value = 'Either a search term or a location is required.';
		return;
	}

	let { location, searchTerm } = values;

	location = location && location.length > 0 ? location : 'all';
	searchTerm = searchTerm && searchTerm.length > 0 ? searchTerm : 'all';

	// If search route exists, route to it
	if (router.getRoutes().some((route) => route.path.includes('/search/'))) {
		router.push(`/search/${searchTerm}/${location}`);
	} else {
		// Otherwise navigate via window
		const baseUrl =
			props.mode === 'prod'
				? 'https://data-sources.pdap.io'
				: 'https://data-sources.pdap.dev';

		window.location.assign(`${baseUrl}/search/${searchTerm}/${location}`);
	}
}
</script>

<style>
@tailwind components;

@layer components {
	.pdap-quick-search-form {
		@apply h-full max-h-[75-vh] p-0;
	}

	.pdap-quick-search-form .pdap-form {
		@apply flex flex-wrap;

		column-gap: 1rem;
	}

	.pdap-quick-search-form .pdap-button {
		@apply flex-grow-0 flex-shrink-0 basis-full max-w-[unset] mt-4;
	}

	.pdap-quick-search-form .pdap-input {
		@apply flex-col flex-grow flex-shrink-0 basis-[45%];

		row-gap: 0;
	}

	.pdap-quick-search-form .pdap-input-label {
		@apply justify-start;
	}
}
</style>
