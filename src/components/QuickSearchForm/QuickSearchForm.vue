<template>
	<FlexContainer class="p-0">
		<h2 class="mt-0">Search our database</h2>
		<p class="pb-4 md:pb-8">
			If you are looking for something specific, we may already be tracking it.
			<a href="https://pdap.io/data">Learn more about the data here.</a>
		</p>
	</FlexContainer>
	<FlexContainer
		alignment="center"
		class="pdap-quick-search-form h-full max-h-[75-vh] justify-start p-0"
	>
		<Form
			id="quick-search-form"
			class="flex flex-wrap gap-x-4"
			:error="error"
			:schema="formSchema"
			name="quickSearchForm"
			@change="handleChange"
			@submit="handleSubmit"
		>
			<Button
				type="submit"
				class="flex-grow-0 flex-shrink-0 basis-full max-w-[unset] mt-4"
				>Search Data Sources</Button
			>
		</Form>

		<p class="max-w-[unset] text-med">
			For example, you could search for
			<RouterLink v-if="hasSearchRoute" to="/search/stops/pittsburgh">
				stops in Pittsburgh
			</RouterLink>
			<a
				v-else
				target="_blank"
				rel="noreferrer"
				:href="`${props.baseUrlForRedirect}/search/stops/pittsburgh`"
			>
				stops in Pittsburgh
			</a>

			or
			<RouterLink v-if="hasSearchRoute" to="/search/complaints/all">
				complaints everywhere
			</RouterLink>
			<a
				v-else
				target="_blank"
				rel="noreferrer"
				:href="`${props.baseUrlForRedirect}/search/complaints/all`"
			>
				complaints everywhere
			</a>
			.
		</p>
	</FlexContainer>
</template>

<script setup lang="ts">
// Globals
import { useRouter } from 'vue-router';
// Components
import Button from '../Button/PdapButton.vue';
import FlexContainer from '../FlexContainer/FlexContainer.vue';
import Form from '../Form/PdapForm.vue';
import { RouterLink } from 'vue-router';

// Types
import { PdapInputTypes } from '../Input/types';
import { ref } from 'vue';

const router = useRouter();

const props = withDefaults(defineProps<{ baseUrlForRedirect: string }>(), {
	baseUrlForRedirect: 'https://data-sources.pdap.io',
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
const hasSearchRoute = router
	.getRoutes()
	.some((route) => route.path.includes('/search/'));

function handleChange(values: { location: string; searchTerm: string }) {
	// Reset error on form change
	if (error.value) {
		if (Object.values(values).some(Boolean)) {
			error.value = undefined;
		}
	}
}

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
	if (hasSearchRoute) {
		router.push(`/search/${searchTerm}/${location}`);
	} else {
		window.location.assign(
			`${props.baseUrlForRedirect}/search/${searchTerm}/${location}`
		);
	}
}
</script>

<style>
@tailwind components;

@layer components {
	.pdap-quick-search-form .pdap-input {
		@apply flex-col flex-grow flex-shrink-0 basis-[45%] gap-y-0;
	}

	.pdap-quick-search-form .pdap-input-label {
		@apply justify-start;
	}
}
</style>
