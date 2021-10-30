<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/get-pending');

		if (res.ok) {
            let json = await res.json();
            let transactions = json.transactions;
            console.log(transactions);
			return {
				props: { transactions }
			};
		}

		return {
			error: new Error('Error getting pending')
		};
	};
</script>

<script lang="ts">

    type Transaction = {
        _id: any;
        endpoint: string;
        fields: string;
        id: string;
    }

    export let transactions: Transaction[];

    async function requestCheck() {
        const res = await fetch('/check-pending');
    }

</script>
<div class="py-2 grid grid-cols-2 align-middle">
    <div>
        <h1 class="text-2xl font-mono font-semibold resize-none">Pending</h1>
    </div>
    <div class="grid place-items-end align-botton">
        <button class="form-button-send" on:click={requestCheck}>Toggle checker</button>
    </div>
</div>
<div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ENDPOINT
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    FIELDS
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            {#each transactions as transaction}
              <tr>
                <td class="px-6 py-4 text-sm text-gray-500">
                    {transaction._id}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                    {transaction.endpoint}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">
                    {transaction.fields}
                </td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
    </div>
    </div>
</div>