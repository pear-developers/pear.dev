<script lang="ts">
	import UserPanel from '$lib/components/UserPanel.svelte';
	import { fly } from 'svelte/transition';

	let showUserPanel = false;
</script>

{#if showUserPanel}
	<aside transition:fly={{ x: 200 }}>
		<UserPanel />
	</aside>
{/if}

<main>
	<button on:click={() => (showUserPanel = !showUserPanel)}>
		<span class="material-icons"> menu_open </span>
	</button>
	<slot />
</main>

<style lang="sass">
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap')
    
    :global(body, input, button) 
        font-family: 'Poppins', sans-serif
        margin: 0

    aside
        position: fixed
        height: 100vh
        width: 20vw
        right: 0
        border-left: 1px solid white
        display: flex
        flex-direction: column
        align-items: center
        gap: 1em

    main
        height: 100vh
        margin-right: 20vw
        position: relative

    button
        position: absolute
        right: 0
        aspect-ratio: 1
        border-radius: 50%
        border: none
        display: flex
        justify-content: center
        align-items: center
        width: 40px
        cursor: pointer
        background: none

</style>
