<script>
	import user from '../stores/user';

	let show = false;
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

<aside
	class:show
	class="fixed overflow-hidden top-0 right-0 m-6 border rounded-2xl border-transparent h-16 w-16 bg-none hover:border-gray-300 hover:bg-gray-200 hover:dark:border-gray-600 hover:dark:bg-gray-700 [&.show]:h-[calc(100%-3rem)] [&.show]:w-96 [&.show]:border [&.show]:border-gray-300 [&.show]:bg-gray-200 [&.show]:dark:border-gray-600 [&.show]:dark:bg-gray-700"
>
	<button
		id="settings-button"
		on:click={() => (show = !show)}
		class="absolute right-0 p-4 cursor-pointer z-50"
	>
		<i class="fa-solid fa-gear text-3xl text-gray-800 leading-none dark:text-gray-50" />
	</button>
	<section>
		{#if user}
			<div
				class="picture-wrapper relative mb-8 box-border border-8 border-gray-200 rounded-full w-40 h-40 cursor-pointer dark:border-gray-700"
				on:click={() => {
					pictureInput.click();
				}}
			>
				<img class="user-picture clickable" src={$user.picture} alt="User profile" />
				<div
					class="edit-icon absolute bottom-0 right-0 flex justify-center items-center box-border border-8 border-gray-200 rounded-full w-14 h-14 bg-green-400 dark:border-gray-700"
				>
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
			<input
				class="name-input outline-none border-none rounded-2xl p-2 w-auto w-64 text-3xl font-semibold text-center text-gray-800 bg-gray-300 dark:text-gray-50 dark:bg-gray-800"
				bind:value={$user.name}
			/>
		{/if}
	</section>
</aside>

<style lang="scss">
	aside {
		transition: width 0.3s, height 0.3s, background-color 0.3s, border 0.3s;

		#settings-button {
			i {
				transition: transform 0.3s;
			}
			&:hover i {
				transform: rotate(30deg);
			}
		}
	}

	section {
		@apply absolute right-0 p-8 w-96 flex flex-col justify-center items-center;

		img {
			@apply w-full rounded-[inherit];
		}
		input {
			@apply block;
		}
	}

	.picture-wrapper {
		transition: border-color 0.3s;

		.edit-icon {
			transition: transform 0.3s;

			svg {
				@apply w-5 fill-gray-800;
			}
		}

		&:hover .edit-icon {
			transform: scale(125%);
		}
	}

	.name-input {
		transition: border-width 0.1s;
	}
</style>
