<script lang="ts">
	import type { TitleData } from '$lib/types';
	export let data: TitleData;
</script>

<div class="md:col-span-1">
	<div class="px-4 sm:px-0">
		<h3 class="text-lg font-medium leading-6 text-gray-900">{data.title}</h3>
		<p class="mt-1 text-sm text-gray-600">
			{data.description}
		</p>
	</div>
</div>
