<script lang="ts">
	export let messageType: string;
	export let message: string;
</script>

<div class={messageType}>
	{#if messageType === 'info-msg'}
		<img src="/icons/info-circle.svg" alt="info icon" />
	{:else if messageType === 'success-msg'}
		<img src="/icons/check-circle.svg" alt="success icon" />
	{:else if messageType === 'warning-msg'}
		<img src="/icons/exclamation-circle.svg" alt="exclamation icon" />
	{:else if messageType === 'error-msg'}
		<img src="/icons/x-circle.svg" alt="error icon" />
	{/if}
	{message}
</div>

<style>
	.info-msg,
	.success-msg,
	.warning-msg,
	.error-msg {
		margin: 10px 0;
		padding: 10px;
		border-radius: 3px 3px 3px 3px;
	}
	.info-msg {
		color: #059;
		background-color: #bef;
	}
	.success-msg {
		color: #270;
		background-color: #dff2bf;
	}
	.warning-msg {
		color: #9f6000;
		background-color: #feefb3;
	}
	.error-msg {
		color: #d8000c;
		background-color: #ffbaba;
	}
</style>
