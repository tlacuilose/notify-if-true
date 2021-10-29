<script lang="ts">
	import { sendForm } from '$lib/form';

	export let fields: string;
	export let endpoint: string;

	export let showEmail: boolean = false;
    export let validatedFields: string = '';
</script>

<div class="form-container">
	<form
		action="/validate-fields"
		method="post"
		use:sendForm={{
			result: async (res, form) => {
				let json = await res.json();
				endpoint = json.endpoint;
				validatedFields = json.validated_fields;
				if (validatedFields !== '') {
					showEmail = true;
				}
			}
		}}
	>
		<div class="form-box">
			<div class="form-fields-container">
                    <input type="text" name="endpoint" id="endpoint" class="hidden" value={endpoint} />
                    <input type="text" name="fields" id="fields" class="hidden" value={fields} />
				{#each fields.split(',').slice(0, -1) as field}
					<div class="form-field">
						<label for="endpoint" class="form-label">{field.split('<')[0]}</label>
						<div class="form-input">
							<input
								type="text"
								name={field}
								id={field}
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
