<script lang="ts">
    import {createEventDispatcher, onMount} from 'svelte';

    const dispatch = createEventDispatcher();
    import {fade} from 'svelte/transition';
    import close from "../assets/x.png"
    import Button from "./Button.svelte";

    export let showModal: boolean = false
    export let title: string = "modal title"
    export let cancelText: string = "返回"
    export let okText: string = "确定"

    $:{
        if(showModal) {
            document.body.style.overflow = "hidden"
        }else{
            document.body.style.overflowY = "scroll"
        }
    }


    const closeModal = () => {
        showModal = false
        dispatch('close', {
            text: "closeText"
        })
    }
    const ok = () => {
        dispatch('ok', {

        })
    }
    const scroll = () => {
        return
    }

</script>

{#if showModal}
    <main class="modal" transition:fade="{{delay: 20, duration: 250}}">
        <div class="modal_container">
            <div class="modal_header">
                <div class="modal_close" on:click={closeModal}>
                    <img src={close} alt="" class="modal_close_img"/>
                </div>
                <p class="modal_title">{title}</p>
            </div>
            <div class="modal_body"
            >
                <slot />
            </div>
            <div class="modal_footer">
                <span class="modal_btn_ok"><Button size="small" on:click={ok}>{okText}</Button></span>
                <span class="modal_btn_cancel"><Button size="small" on:click={closeModal}>{cancelText}</Button></span>
            </div>
        </div>
    </main>
{/if}
<style>
    .preventScroll{
        overflow-y: hidden
    }
    .modal {
        position: fixed;
        /*top: 30vh;*/
        top:0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height:100%;
        background: rgba(255, 233, 240, 0.5);
        /*display: flex;*/
        /*justify-content: center;*/
    }
    .modal_container{
        box-shadow: 0 0 10px gainsboro;
        position: relative;
        width: 70vw;
        top: 30vh;
        margin: 0 auto;
        border: none;
        border-radius: 10px;
    }
    .modal_header {
        background-color: #ffffff;
        border-radius: 10px 10px 0 0;
    }

    .modal_title {
        padding: 10px;
    }

    .modal_close {
        float: right
    }

    .modal_close_img {
        width: 20px;
        margin-right: 10px;
        margin-top: 10px;
    }


    .modal_body {
        padding: 20px;
        background-color: #ffffff;
        max-height: 200px;
        overflow: scroll;
    }

    .modal_footer {
        padding: 12px;
        background-color: #ffffff;
        border-radius: 0 0 10px 10px;
        display: flex;
        justify-content: right;
    }

    .modal_btn_ok {
        display: inline-block;
        margin: 0 10px;
    }

    .modal_btn_cancel {
        display: inline-block;
        margin: 0 10px;
    }
</style>
