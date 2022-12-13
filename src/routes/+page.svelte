<script lang="ts">
	import TodoHeader from '../components/TodoHeader.svelte';
	import TodosList from '../components/TodosList.svelte';
	import AddTodo from '../components/AddTodo.svelte';
	import type { Todo } from '../interfaces';

	import { onMount } from 'svelte';

	let allTodos: Todo[] = [];
	let addTodoValue;

	Array.prototype.sortArrayOfObjects = function (asc = true, sortBy) {
		return this.sort((itemA: unknown, itemB: unknown) => {
			if (itemA[sortBy] > itemB[sortBy]) {
				return asc ? 1 : -1;
			} else {
				return asc ? -1 : 1;
			}
		});
	};

	onMount(() => {
		const todosFromStorage = JSON.parse(localStorage.getItem('todos'));

		if (!todosFromStorage) return;

		allTodos = sortTodos(todosFromStorage);
	});

	const addTodoHandler = () => {
		if (!addTodoValue) return;

		const newAddTodo = {
			created_at: new Date().toISOString(),
			completed_at: '',
			id: self.crypto.randomUUID(),
			value: addTodoValue,
			isActive: true
		};
		allTodos = sortTodos([...allTodos, newAddTodo]);
		updateLocalstorage(allTodos);
		addTodoValue = '';
	};

	const deleteHandler = (e): void => {
		const newArray = allTodos.filter((todo: Todo) => todo.id !== e.detail.id);
		allTodos = sortTodos([...newArray]);
		updateLocalstorage(newArray);
	};

	const updateHandler = (e): void => {
		const newArray = allTodos.map((todo: Todo) => {
			if (todo.id === e.detail.id) {
				const newTodo = todo;
				newTodo.isActive = !todo.isActive;
				newTodo.completed_at = new Date().toISOString();

				return newTodo;
			} else {
				return todo;
			}
		});

		allTodos = sortTodos([...newArray]);
		updateLocalstorage(newArray);
	};

	const sortTodos = (arrayToSort) => {
		const activeTodos = arrayToSort
			.filter((todo: Todo) => todo.isActive)
			.sortArrayOfObjects(true, 'created_at');
		const inactiveTodos = arrayToSort
			.filter((todo: Todo) => !todo.isActive)
			.sortArrayOfObjects(true, 'completed_at');

		return [...activeTodos, ...inactiveTodos];
	};

	const updateLocalstorage = (newTodos: Todo[]): void => {
		localStorage.setItem('todos', JSON.stringify(newTodos));
	};
</script>

<div class="App container max-w-md mx-auto pt-8">
	<TodoHeader />
	<AddTodo bind:inputTodo={addTodoValue} on:addNewTodo={addTodoHandler} />
	<TodosList on:deleteItem={deleteHandler} on:updateTodo={updateHandler} todos={allTodos} />
</div>
