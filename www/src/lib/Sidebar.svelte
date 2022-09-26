<script>
	import { user } from '../stores/user.ts';

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
	class="fixed overflow-hidden top-0 right-0 m-6 border rounded-2xl border-transparent h-16 w-16 bg-none hover:border-gray-300 hover:bg-gray-200 hover:dark:border-gray-600 hover:dark:bg-gray-700 [&.show]:h-[calc(100%-3rem)] [&.show]:w-96 [&.show]:border [&.show]:border-gray-300 [&.show]:bg-gray-200 [&.show]:dark:border-gray-600 [&.show]:dark:bg-gray-700 z-40"
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
				class="picture-wrapper relative mb-8 box-border border-8 border-gray-200 rounded-2xl w-40 h-40 cursor-pointer dark:border-gray-700"
				on:click={() => {
					pictureInput.click();
				}}
			>
				<img class="user-picture clickable" src={$user.picture} alt="User profile" />
				<div
					class="edit-icon absolute bottom-[-0.5rem] right-[-0.5rem] flex justify-center items-center box-border border-8 border-gray-200 rounded-full w-14 h-14 bg-green-400 dark:border-gray-700"
				>
					<i class="fa-solid fa-pencil" />
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

			i {
				@apply text-xl text-gray-800;
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
