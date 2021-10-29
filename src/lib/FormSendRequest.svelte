<script lang="ts">
	import { sendForm } from '$lib/form';

	export let endpoint: string;
	export let validatedFields: string;

	export let showCompleted: boolean = false;
	export let transactionId: string = '';
</script>

<div class="form-container">
	<form
		action="/request"
		method="post"
		use:sendForm={{
			result: async (res, form) => {
				let json = await res.json();
				transactionId = json.transaction_id;
				if (transactionId !== '') {
					showCompleted = true;
				}
			}
		}}
	>
		<div class="form-box">
			<div class="form-fields-container">
				<div class="form-field">
					<label for="email" class="form-label">Endpoint:<br />{endpoint}</label>
					<input type="text" name="endpoint" id="endpoint" class="hidden" value={endpoint} />
				</div>
				<div class="form-field">
					<label for="email" class="form-label">Field comparisons:<br />{validatedFields}</label>
					<input
						type="text"
						name="validated_fields"
						id="fields"
						class="hidden"
						value={validatedFields}
					/>
				</div>
				<div class="form-field">
					<label for="email" class="form-label">Email to be notified to</label>
					<div class="form-input">
						<input
							type="email"
							name="email"
							id="email"
							class="form-text-input"
							placeholder="Enter your email."
						/>
					</div>
				</div>
			</div>
			<div class="form-actions-container">
				<button type="submit" class="form-submit-button form-button-send">Send request</button>
			</div>
		</div>
	</form>
</div>
