<script lang="ts">
export let goods
export let reward
</script>
<main>
    <div class="store-card" on:click>
        <div class="card-title" >{goods}</div>
        <div class="card-rewards">{reward} </div>

    </div>
</main>
<style>
    .store-card {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 80vw;
        margin-top: 2vh;
        background-color: #f1b7cd;
        border-radius: 10px;
        box-shadow: 0 0 10px #df8640;
        height: 100px;
        font-size: 18px;
    }

</style>
