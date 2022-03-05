<script>
	import { page } from '$app/stores';
	import roomName from '../stores/roomName';

	export let show_sidebar = false;

	let copyButtonSize = 1;
	let copyButtonText = 'Copy link';

	const handleCopyRoomLink = () => {
		navigator.clipboard.writeText($page.url.href);
	};
</script>

<header>
	<a href="/" class="brand">
		<img src="/type-logo.svg" alt="Pear logo with pear.dev text." />
	</a>
	{#if $roomName}
		<div class="room-name">
			<h1>{$roomName}</h1>
			<button
				id="copy-room-name-button"
				on:click={handleCopyRoomLink}
				on:mousedown={() => { copyButtonSize += 0.2; copyButtonText = 'Copied!'; }}
				on:mouseup={() => copyButtonSize -= 0.2}
				on:mouseenter={() => (copyButtonText = 'Copy link')}
				style="transform: scale({copyButtonSize});"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"
					><!--! Font Awesome Free 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path
						d="M172.5 131.1C228.1 75.51 320.5 75.51 376.1 131.1C426.1 181.1 433.5 260.8 392.4 318.3L391.3 319.9C381 334.2 361 337.6 346.7 327.3C332.3 317 328.9 297 339.2 282.7L340.3 281.1C363.2 249 359.6 205.1 331.7 177.2C300.3 145.8 249.2 145.8 217.7 177.2L105.5 289.5C73.99 320.1 73.99 372 105.5 403.5C133.3 431.4 177.3 435 209.3 412.1L210.9 410.1C225.3 400.7 245.3 404 255.5 418.4C265.8 432.8 262.5 452.8 248.1 463.1L246.5 464.2C188.1 505.3 110.2 498.7 60.21 448.8C3.741 392.3 3.741 300.7 60.21 244.3L172.5 131.1zM467.5 380C411 436.5 319.5 436.5 263 380C213 330 206.5 251.2 247.6 193.7L248.7 192.1C258.1 177.8 278.1 174.4 293.3 184.7C307.7 194.1 311.1 214.1 300.8 229.3L299.7 230.9C276.8 262.1 280.4 306.9 308.3 334.8C339.7 366.2 390.8 366.2 422.3 334.8L534.5 222.5C566 191 566 139.1 534.5 108.5C506.7 80.63 462.7 76.99 430.7 99.9L429.1 101C414.7 111.3 394.7 107.1 384.5 93.58C374.2 79.2 377.5 59.21 391.9 48.94L393.5 47.82C451 6.731 529.8 13.25 579.8 63.24C636.3 119.7 636.3 211.3 579.8 267.7L467.5 380z"
					/></svg
				>
				{copyButtonText}
			</button>
		</div>
	{/if}
	<button
		class="settings-button"
		on:click={() => {
			show_sidebar = true;
		}}
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
			><!--! Font Awesome Free 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path
				d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z"
			/></svg
		>
	</button>
</header>

<style lang="scss">
	header {
		padding: 1.5rem;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.room-name {
		display: flex;
		align-items: center;

		h1 {
			margin: 0 1rem 0 0;

			color: $primary-text;

			font-family: 'Poppins', sans-serif;
			font-weight: 500;
			font-size: 48px;
		}
	}

	#copy-room-name-button {
		padding: 0.5rem 0.7rem;

		display: flex;
		align-items: center;
		border: none;
		border-radius: 50px;
		height: fit-content;
		width: 7rem;

		background-color: $primary-background;
		color: $primary-text;

		font-family: 'Poppins', sans-serif;
		font-weight: 600;
		font-size: 12px;

		cursor: pointer;
		transition: 0.3s;
		transition-property: transform background-color color;

		svg {
			margin-right: 0.4rem;
			width: 20px;
			fill: $primary-text;

			transition: fill 0.3s;
		}

		&:hover {
			background-color: $primary-text;
			color: $primary-background;

			svg {
				fill: $primary-background;
			}
		}
	}

	.brand img {
		height: 64px;
	}

	.settings-button {
		border: none;
		padding: 0;
		margin-right: 1rem;

		background: transparent;

		cursor: pointer;
		transition: transform 0.3s;

		svg {
			vertical-align: middle;
			width: 32px;

			fill: $dark-text;
		}

		&:hover {
			transform: rotate(60deg);
		}
	}
</style>
