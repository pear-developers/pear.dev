<script>
	import { browser } from '$app/env';
	import { fly } from 'svelte/transition';

	export let show = false;

	let width;

	let user;
	let pictureInput;

	if (browser) {
		user = window.localStorage.getItem('user');
		if (user == undefined) {
			user = {
				uuid: crypto.randomUUID(),
				picture:
					'data:image/png;base64,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',
				name: 'Anonymous'
			};
			window.localStorage.setItem('user', JSON.stringify(user));
		} else {
			user = JSON.parse(user);
		}
	}

	const handleNameInput = () => {
		window.localStorage.setItem('user', JSON.stringify(user));
	};

	const onPictureSelected = (event) => {
		let image = event.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (event) => {
			user.picture = event.target.result;
			window.localStorage.setItem('user', JSON.stringify(user));
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
				<img class="user-picture clickable" src={user.picture} alt="User profile" />
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
							fill="#3F3838"
						/>
					</svg>
				</div>
			</div>
			<input
				style="display:none"
				type="file"
				accept=".jpg, .jpeg, .png"
				on:change={(e) => onPictureSelected(e)}
				bind:this={pictureInput}
			/>
			<input on:change={handleNameInput} class="name-input" bind:value={user.name} />
		</section>
	</aside>
{/if}

<style>
	aside {
		position: fixed;
		overflow-y: auto;
		top: 0;
		right: 0;

		height: 100%;
		min-width: 300px;
		width: 20vw;
		max-width: 400px;
		border-left: 1px solid #cddde4;

		background: #fff;
	}

	header {
		padding: 2.5rem;
		border-bottom: 1px solid #bfbfbf;

		display: flex;
		align-items: center;
	}
	header h1 {
		margin: 0 auto;

		color: #3f3838;

		font-family: 'Josefin Sans', sans-serif;
		font-weight: 400;
		font-size: 32px;
		line-height: 0;
	}
	header button {
		border: none;
		padding: 0;

		background-color: transparent;

		cursor: pointer;
	}
	header button svg {
		height: 32px;

		fill: #3f3838;
	}

	section {
		padding: 2rem;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	section .picture-wrapper {
		position: relative;
		margin-bottom: 2rem;

		box-sizing: border-box;
		border: 10px solid #fff;
		border-radius: 100px;
		width: 150px;
		height: 150px;

		transition: border-color 0.5s;
		cursor: pointer;
	}
	section .picture-wrapper:hover {
		border-color: #c9ffb5;
	}
	section .picture-wrapper:hover .edit-icon {
		transform: scale(125%);
	}
	section .picture-wrapper .edit-icon {
		position: absolute;
		bottom: 0;
		right: 0;

		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		border: 7px solid #fff;
		border-radius: 100px;
		width: 53px;
		height: 53px;

		background-color: #83cc69;

		transition: transform 0.3s;
	}
	section .picture-wrapper .edit-icon svg {
		fill: #3f3838;
		width: 18px;
	}
	section img {
		width: 100%;
		border-radius: inherit;

		transform: border 0.3s;
	}
	section input {
		display: block;
	}

	.name-input {
		outline: 0;
		border: none;
		border-bottom: 2px solid #3f3838;
		width: auto;
		width: 250px;

		color: #3f3838;

		font-family: 'Poppins', sans-serif;
		font-size: 32px;
		font-weight: 600;
		text-align: center;

		transition: border-width 0.1s;
	}
	.name-input:focus {
		border-width: 4px;
	}
</style>
