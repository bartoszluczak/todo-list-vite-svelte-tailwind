<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import CustomCheckbox from './ui/CustomCheckbox.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { Todo } from '../interfaces';

	const dispatch = createEventDispatcher();

	export let todo: Todo;

	let deleteBtnIsVisible = false;
	let isToDoVisible = true;
</script>

{#if isToDoVisible}
	<li
		class={`rounded-md p-2 inline-flex w-full items-center mb-2 last:mb-0 transition duration-100 ${
			!todo.isActive ? 'bg-slate-200' : 'bg-blue-500'
		}`}
		on:mouseenter={() => (deleteBtnIsVisible = true)}
		on:mouseleave={() => (deleteBtnIsVisible = false)}
		transition:fly={{ y: -500, duration: 200 }}
		on:click={dispatch('updateTodo', todo)}
	>
		<CustomCheckbox isChecked={!todo.isActive} />
		<span class={`font-medium text-white w-full`} class:line-through={!todo.isActive}
			>{todo.value}</span
		>
		{#if deleteBtnIsVisible}
			<button
				transition:fade={{ duration: 100 }}
				class="font-bold bg-rose-500 px-2 text-white rounded-sm right-0 transition hover:bg-rose-900 ease-in-out duration-500"
				on:click={dispatch('deleteItem', todo)}>X</button
			>
		{/if}
	</li>
{/if}
