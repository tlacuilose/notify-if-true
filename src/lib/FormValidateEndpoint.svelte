<script lang="ts">
    import { sendForm } from "$lib/form";

    export let showFields: boolean = false;
    export let fields: string = '';
    export let endpoint: string = '';
</script>

<div class="form-container">
    <form
        action="/validate-endpoint"
        method="post"
        use:sendForm = {{
            result: async (res, form) => {
                let json = await res.json();
                endpoint = json.endpoint;
                fields = json.fields;
                console.log(json.fields);

                if (fields !== '') {
                    showFields = true;
                }
            }
        }}
    >
        <div class="form-box">
            <div class="form-fields-container">
                <div class="form-field">
                    <label for="endpoint" class="form-label">
                        API Endpoint
                    </label>
                    <div class="form-input">
                        <span
                            class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
                        >
                            url:
                        </span>
                        <input
                            type="text"
                            name="endpoint"
                            id="endpoint"
                            class="form-text-input"
                            placeholder="www.example.com/endpoint"
                        />
                    </div>
                </div>

            </div>
            <div class="form-actions-container">
                <button
                    type="submit"
                    class="form-submit-button"
                >
                    Validate endpoint
                </button>
            </div>
        </div>
    </form>
</div>