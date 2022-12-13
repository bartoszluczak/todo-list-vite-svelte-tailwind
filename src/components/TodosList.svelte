<script lang="ts">
	import CardComponent from './ui/CardComponent.svelte';
	import type { Todo } from '../interfaces';
	import TodoItem from './TodoItem.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let todos: Todo[];

	const deleteHandler = (e) => {
		dispatch('deleteItem', e.detail);
	};

	const updateHandler = (e) => {
		dispatch('updateTodo', e.detail);
	};
</script>

{#if todos.length > 0}
	<CardComponent>
		<ul>
			{#each todos as todo}
				<TodoItem on:deleteItem={deleteHandler} on:updateTodo={updateHandler} {todo} />
			{/each}
		</ul>
	</CardComponent>
{/if}
