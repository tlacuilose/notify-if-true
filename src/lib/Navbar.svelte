<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="max-w-2xl mx-auto py-6 sticky top-0 font-mono">
	<div class="bg-white p-1 rounded-md shadow grid grid-cols-3 gap-2 text-center items-center">
		<div class="px-2 hover:text-yellow-300 grid place-items-end">
			<a href="/" class:underline={$page.path !== '/'}>request-new</a>
		</div>
		<div
			class="p-2 rounded-md text-white bg-gradient-to-r from-yellow-300 to-red-300 hover:from-purple-300 hover:to-green-300"
		>
			<a href="/" class="uppercase">notify-if-true</a>
		</div>
		<div class="px-2 hover:text-red-300 grid place-items-start">
			<a href="pending" class:underline={$page.path !== '/pending'}>all-pending</a>
		</div>
	</div>
</div>
