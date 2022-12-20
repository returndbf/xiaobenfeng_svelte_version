<script lang="ts">
    import Modal from "../../components/Modal.svelte";

    let show = false
</script>
<main>
    <Modal bind:showModal={show} ></Modal>
    <button on:click={()=>show = true} >show</button>
</main>
<style>

</style>
