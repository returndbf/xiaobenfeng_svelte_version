<script lang="ts">
    import {fly} from 'svelte/transition';

    export let message = "Hello"
    export let showToast = false
    export let type = 'success'
    export let duration = 3000

    $: show = showToast

    $: {
        if (showToast) {
            setTimeout(() => {
                showToast = false;
            }, duration);
        } else {

        }
    }

</script>

<main>
    {#if show}
        <div class="toast {type}" transition:fly="{{ y: -200, duration: 1000 }}" >
            {message}
        </div>
    {/if}
</main>

<style>
    .toast {
        position: fixed;
        z-index: 99999;
        top: 10vh;
        left: 50%;
        transform: translate(-50%, 0);
        padding: 13px 20px;
        border-radius: 15px;
    }
    .success {
        background-color: #f0f9eb;
        color: #67c23a;
    }
    .error{
        background-color: #ffffff;
        color: #ff71f1;
    }
</style>
