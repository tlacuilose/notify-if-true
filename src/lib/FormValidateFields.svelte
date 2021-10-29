<script lang="ts">
	import { sendForm } from '$lib/form';

	export let fields: string;
	export let endpoint: string;

    // DO something on loiad.

	export let showEmail: boolean = false;
</script>

<div class="form-container">
	<form
		action="/validate-fields"
		method="post"
		use:sendForm={{
			result: async (res, form) => {
				let json = await res.json();
				endpoint = json.endpoint;
				fields = json.fields;
				console.log(json.fields);
				if (fields !== '') {
					showEmail = true;
				}
			}
		}}
	>
		<div class="form-box">
			<div class="form-fields-container">
                {#each fields.split(',').slice(0,-1) as field}
				<div class="form-field">
					<label for="endpoint" class="form-label">{field.split('<')[0]}</label>
					<div class="form-input">
						<input
							type="text"
							name="endpoint"
							id="endpoint"
							class="form-text-input"
							placeholder={field.split(':')[field.split(':').length - 1]}
						/>
					</div>
				</div>
                {/each}
			</div>
			<div class="form-actions-container">
				<button type="submit" class="form-submit-button"> Validate endpoint </button>
			</div>
		</div>
	</form>
</div>
