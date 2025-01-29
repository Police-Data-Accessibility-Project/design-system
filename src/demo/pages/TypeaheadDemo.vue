<template>
	<main>
		<h1>Typeahead test</h1>

		<AsyncTypeahead
			id="typeahead"
			ref="typeaheadRef"
			class="md:col-span-2"
			:error="typeaheadError"
			:format-item-for-display="getFullText"
			:items="items"
			placeholder="Search for a person"
			@select-item="
				(item) => {
					if (item) {
						selectedItems = [...selectedItems, item];
						items = [];
					}
				}
			"
			@on-input="fetchTypeaheadResults"
		>
			<!-- Item to render passed as scoped slot -->
			<template #item="item">
				<span v-html="typeaheadRef?.boldMatchText(getFullText(item))" />
				<span class="select">Select</span>
			</template>
			<template #not-found>
				<span>
					We can't find the person you're looking for. Is their name spelled
					correctly? If our database is missing something, please reach us at
					<a href="mailto:contact@pdap.io">contact@pdap.io</a>
				</span>
			</template>
		</AsyncTypeahead>
	</main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AsyncTypeahead } from '../../components/AsyncTypeahead';

const stuff = [
	{
		name: 'John',
		age: 20,
		occupation: 'Developer',
	},
	{
		name: 'Joshua',
		age: 30,
		occupation: 'Developer',
	},
	{
		name: 'Sarah',
		age: 28,
		occupation: 'Designer',
	},
	{
		name: 'Michael',
		age: 35,
		occupation: 'Manager',
	},
	{
		name: 'Emily',
		age: 25,
		occupation: 'Engineer',
	},
	{
		name: 'David',
		age: 32,
		occupation: 'Architect',
	},
	{
		name: 'Jessica',
		age: 29,
		occupation: 'Analyst',
	},
	{
		name: 'Robert',
		age: 41,
		occupation: 'Director',
	},
	{
		name: 'Lisa',
		age: 27,
		occupation: 'Developer',
	},
	{
		name: 'James',
		age: 33,
		occupation: 'Designer',
	},
];

const typeaheadRef = ref();
const items = ref<typeof stuff | undefined>([]);
const selectedItems = ref<typeof stuff>([]);
const typeaheadError = ref();

function getFullText(item: (typeof stuff)[number]) {
	return `${item.name} (${item.age}), ${item.occupation}`;
}

const fetchTypeaheadResults = async (e: InputEvent) => {
	const val = (e.target as HTMLInputElement)?.value;
	if (typeof val === 'string' && val.length > 1) {
		items.value =
			stuff.filter((item) =>
				item.name.toLowerCase().includes(val.toLowerCase())
			) ?? undefined;
	} else {
		items.value = [];
	}
};
</script>
