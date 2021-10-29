<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import '../styles/tailwind-output.css';
</script>

<main>
	<div class="sm:px-6 lg:px-8 bg-gray-100 font-sans min-h-screen pb-6">
		<Navbar />
		<div class="max-w-4xl mx-auto bg-gray-50 shadow overflow-hidden sm:rounded-lg px-4 py-5">
			<slot />
		</div>
	</div>
</main>
