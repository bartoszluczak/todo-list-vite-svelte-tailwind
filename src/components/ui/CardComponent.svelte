<script lang="ts">
	import { fade } from 'svelte/transition';

	export let additionalClasses = '';
</script>

<div class={`border-2 rounded-md p-2 ${additionalClasses}`} transition:fade={{ duration: 200 }}>
	<slot />
</div>
