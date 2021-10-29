<script lang="ts">
	import FormDivider from '$lib/FormDivider.svelte';
	import FormTitle from '$lib/FormTitle.svelte';
	import FormValidateEndpoint from '$lib/FormValidateEndpoint.svelte';
	import FormValidateFields from '$lib/FormValidateFields.svelte';
	import FormSendRequest from '$lib/FormSendRequest.svelte';
	import type { TitleData } from '$lib/types';

	const endpointFormTitle: TitleData = {
		title: 'API Endpoint Validation',
		description: 'First, lets validate the endpoint that calls the API.'
	};

	const fieldsFormTitle: TitleData = {
		title: 'API Fields Validation',
		description: `Second, lets validate which fields we want to NOTIFY IF the comparison is TRUE.

					Explanation: 
					-	Fields are squashed into their full route in a JSON.
					- 	Comparisons should be established in the following way: <op>(<value>).
					
					For example, setting field: 'amount' to '<=(100)', will evaluate if amount is less or equal to 100. 
					
					Available operators: '>', '<', '>=', '<=', '=', '!='.`
	};

	const sendFormTitle: TitleData = {
		title: 'Send Request',
		description:
			'Lastly, we have validated the api endpoint and decided which field comparisons we want to be true, now we can request to be notified when our conditions are TRUE.'
	};

	const completedFormTitle: TitleData = {
		title: 'Request sent!',
		description: 'The request has been sent, please consider the following transaction id.'
	};

	let showFields: boolean;
	let endpoint: string;
	let fields: string;
	let showEmail: boolean;
	let validatedFields: string;
	let showCompleted: boolean;
	let transactionId: string;
</script>

<div>
	<div class="form-section">
		<FormTitle data={endpointFormTitle} />
		<FormValidateEndpoint bind:showFields bind:endpoint bind:fields />
	</div>
</div>

{#if showFields}
	<FormDivider />
	<div class="form-section">
		<FormTitle data={fieldsFormTitle} />
		<FormValidateFields {endpoint} {fields} bind:showEmail bind:validatedFields />
	</div>
{/if}

{#if showEmail}
	<FormDivider />
	<div class="form-section">
		<FormTitle data={sendFormTitle} />
		<FormSendRequest {endpoint} {validatedFields} bind:showCompleted bind:transactionId />
	</div>
{/if}

{#if showCompleted}
	<FormDivider />
	<div class="form-section">
		<FormTitle data={completedFormTitle} />
		<div>TRANSACTION ID: {transactionId}</div>
	</div>
{/if}
