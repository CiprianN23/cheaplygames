<script lang="ts">
	export let messageType: string;
	export let message: string;
</script>

<div class={messageType}>
	{#if messageType === 'info-msg'}
		<div class="i-bi-info-circle"></div>
	{:else if messageType === 'success-msg'}
		<div class="i-bi-check-circle"></div>
	{:else if messageType === 'warning-msg'}
		<div class="i-bi-exclamation-circle"></div>
	{:else if messageType === 'error-msg'}
		<div class="i-bi-x-circle"></div>
	{/if}
	<div class="message">{message}</div>
</div>

<style>
	.info-msg,
	.success-msg,
	.warning-msg,
	.error-msg {
		display: flex;
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

	.message {
		margin-left: 7px;
	}
</style>
