<script lang="ts">
    export let title: String;
    export let description: String;
</script>
<div class="md:col-span-1">
    <div class="px-4 sm:px-0">
        <h3 class="text-lg font-medium leading-6 text-gray-900">{title}</h3>
        <p class="mt-1 text-sm text-gray-600">
            {description}
        </p>
    </div>
</div>