<script lang="ts">
    export let type = 'primary'
    export let size = 'small'
    export  let style
    // export let click :Function = () => {console.log("Click")}

</script>
<main class="btn">
    <button on:click class="btn-container {type} {size} " style="{style}">
        <slot/>
    </button>
</main>
<style>
    .btn {
        display: inline-block;

    }
    .btn-container{
        border: none;
        color: white;
    }

    .primary {
        background-color: #6f6fff;
    }

    .error {
        background-color: brown;
    }
    .simple{
        background-color: #6ac5f2;
    }

    .small {
        padding: 4px 10px;
        border-radius: 5px;
        font-size:small;
    }

    .medium {
        padding: 6px 22px;
        border-radius: 10px;
        font-size:medium;
    }
</style>
