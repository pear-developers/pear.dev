<script lang="ts">
	import { user } from '$lib/stores/user.store';

	let userName = $user.name;
</script>

<input bind:value={userName} on:change={(e) => user.setName(e.currentTarget.value)} />
<img src={$user.picture} alt="User profile" />

<style lang="sass">
    input
        background: none
        border: none
        text-align: center
        border-bottom: 2px solid black
        font-weight: bold

    img
        width: 96px
        aspect-ratio: 1

</style>
