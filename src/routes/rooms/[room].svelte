<script>
    import { page } from '$app/stores';
    import { browser } from '$app/env';

	if (browser) {
        let uuid = window.localStorage.getItem('userUUID');
		if (uuid  == undefined) {
			uuid = crypto.randomUUID();
            window.localStorage.setItem('userUUID', uuid);
		}

		const ws = new WebSocket(`ws://localhost:5000/${$page.params.room}?client_id=${uuid}`);

  		ws.addEventListener("message", (message) => {
            console.log(message);
		});
	}
</script>