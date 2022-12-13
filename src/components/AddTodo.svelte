<script>
	import { createEventDispatcher } from 'svelte';
	import CardComponent from './ui/CardComponent.svelte';

	export let inputTodo;
	const dispatch = createEventDispatcher();

	const clickHandler = () => dispatch('addNewTodo');
</script>

<CardComponent additionalClasses="mb-2 w-full inline-flex">
	<input placeholder="Add todo" class="outline-0 w-11/12" type="text" bind:value={inputTodo} />
	<button
		class="bg-blue-500 px-3 py-1 rounded font-bold text-gray-100 hover:bg-lime-500"
		on:click={clickHandler}>Add</button
	>
</CardComponent>
