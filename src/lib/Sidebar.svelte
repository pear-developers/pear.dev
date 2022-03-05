<script>
	import { fly } from 'svelte/transition';
	import user from '../stores/user';

	export let show = false;

	let width;
	let pictureInput;

	const onPictureSelected = (event) => {
		let image = event.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (event) => {
			$user.picture = event.target.result;
		};
	};
</script>

{#if show}
	<aside bind:clientWidth={width} transition:fly={{ x: width, duration: 500, opacity: 1 }}>
		<header>
			<button
				on:click={() => {
					show = false;
				}}
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
					><!--! Font Awesome Free 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path
						d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"
					/></svg
				>
			</button>
			<h1>SETTINGS</h1>
		</header>
		<section>
			<div
				class="picture-wrapper"
				on:click={() => {
					pictureInput.click();
				}}
			>
				<img class="user-picture clickable" src={$user.picture} alt="User profile" />
				<div class="edit-icon">
					<svg
						width="18"
						height="18"
						viewBox="0 0 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11.608 0.998576C12.9387 -0.332859 15.0982 -0.332859 16.4289 0.998576L17.002 1.5725C18.3327 2.90407 18.3327 5.06291 17.002 6.39354L7.66319 15.7364C7.25118 16.1436 6.74446 16.4419 6.18565 16.6029L1.44997 17.9572C1.05217 18.0709 0.625961 17.9572 0.332349 17.6258C0.0434725 17.3748 -0.0701842 16.9486 0.0434722 16.5508L1.39788 11.8155C1.55889 11.2567 1.85724 10.7501 2.26451 10.3381L11.608 0.998576ZM14.7809 2.60575C14.3784 2.16205 13.6586 2.16205 13.2134 2.60575L11.8353 3.98326L14.0185 6.16625L15.3966 4.74565C15.8417 4.34314 15.8417 3.62337 15.3966 3.17967L14.7809 2.60575ZM3.58576 12.4406L2.79017 15.2107L5.56054 14.4152C5.74997 14.3631 5.91572 14.2637 6.05305 14.1263L12.4131 7.77153L10.2299 5.58854L3.87464 11.9481C3.73731 12.0854 3.63786 12.2512 3.58576 12.4406Z"
							fill="$dark-text"
						/>
					</svg>
				</div>
			</div>
			<input
				style="display:none"
				type="file"
				accept=".jpg, .jpeg, .png"
				on:change={(event) => onPictureSelected(event)}
				bind:this={pictureInput}
			/>
			<input class="name-input" bind:value={$user.name} />
		</section>
	</aside>
{/if}

<style lang="scss">
	aside {
		position: fixed;
		overflow-y: auto;
		top: 0;
		right: 0;

		height: 100%;
		min-width: 300px;
		width: 20vw;
		max-width: 400px;
		border-left: 1px solid $border-light;

		background: $light-background;
	}

	header {
		padding: 2.5rem;
		border-bottom: 1px solid $border-dark;

		display: flex;
		align-items: center;

		h1 {
			margin: 0 auto;

			color: $dark-text;

			font-family: 'Josefin Sans', sans-serif;
			font-weight: 400;
			font-size: 32px;
			line-height: 0;
		}

		button {
			border: none;
			padding: 0;

			background-color: transparent;

			cursor: pointer;

			svg {
				height: 32px;

				fill: $dark-text;
			}
		}
	}

	section {
		padding: 2rem;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		img {
			width: 100%;
			border-radius: inherit;

			transform: border 0.3s;
		}
		input {
			display: block;
		}
	}
		
	.picture-wrapper {
		position: relative;
		margin-bottom: 2rem;

		box-sizing: border-box;
		border: 10px solid $light-background;
		border-radius: 100px;
		width: 150px;
		height: 150px;

		transition: border-color 0.5s;
		cursor: pointer;

		.edit-icon {
			position: absolute;
			bottom: 0;
			right: 0;

			display: flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			border: 7px solid $light-background;
			border-radius: 100px;
			width: 53px;
			height: 53px;

			background-color: $primary-text;

			transition: transform 0.3s;

			svg {
				fill: $dark-text;
				width: 18px;
			}
		}
		
		&:hover {
			border-color: $primary-border;

			.edit-icon {
				transform: scale(125%);
			}
		}
	}

	.name-input {
		outline: 0;
		border: none;
		border-bottom: 2px solid $dark-text;
		width: auto;
		width: 250px;

		color: $dark-text;

		font-family: 'Poppins', sans-serif;
		font-size: 32px;
		font-weight: 600;
		text-align: center;

		transition: border-width 0.1s;

		&:focus {
			border-width: 4px;
		}
	}
</style>
