<script>
    let room = "";
</script>

<main>
    <header>
        <figure>
            <img src="/type-logo.svg" alt="Pear logo with the text pair.dev">
        </figure>
        <h1>
            <span>Start</span>
            <span class="words">
                <span>pair</span>
                <span>mob</span>
            </span>
            <span>programming!</span>
        </h1>
        <div class="input-group">
            <input type="text" placeholder="room" bind:value={room}><a href="/rooms/{room}">create</a>
        </div>
    </header>
</main>

<style>
    :root {
        background-color: #F6FCFF;
    }

    header {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 4rem;
        width: 100vw;
    }

    img {
        width: 20vw;
    }

    input {
		font-family: 'Poppins', sans-serif;
        font-weight: 500;
        font-size: 24px;
        background-color: #ECFDE6;
        padding: 1rem;
        border-radius: 10px;
        border: 1px solid #83CC69;
        width: 15vw;
    }
    input:focus {
        outline: none;
    }
    input::placeholder {
        color: #9DCF8A;
    }

    a {
        display: inline-block;
		font-family: 'Poppins', sans-serif;
        font-weight: 500;
        font-size: 24px;
        text-decoration: none;
        background-color: #83CC69;
        color: #597C4C;
        padding: 1rem;
        border-radius: 10px;
        border: 1px solid #83CC69;
        cursor: pointer;
    }

    .input-group {
        margin-top: 10px;
        padding: 0.3rem;
        border-radius: 15px;
        border: 2px solid #83CC69;
    }
    .input-group :nth-child(1) {
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
    }
    .input-group :nth-child(2) {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
    }

    h1 {
		font-family: 'Poppins', sans-serif;
        font-weight: 500;
        color: #3F3838;
        height: 48px;
        width: auto;
        overflow: hidden;
    }

    .words {
        display: inline-flex;
        flex-direction: column;
        animation: flip-words 6s infinite;
        text-align: center;
        font-weight: 700;
    }

    @keyframes flip-words {
        0% {transform: translateY(0%);}
        25% {transform: translateY(-50%);}
        50% {transform: translateY(-50%);}
        75% {transform: translateY(0%);}
        100% {transform: translateY(0%);}
    }
</style>