<script lang="ts">
    import missionIcon from "../assets/doraemon.png"
    import storeIcon from "../assets/hellokitty.png"
    import {useNavigate} from "svelte-navigator";
    const navigation = useNavigate()

</script>
<main class="tabbar-main">
        <div class="container">
            <div class="mission-tab" on:click={()=>navigation('/index')}>
                <img src={missionIcon} class="icon"/>
            </div>
            <div class="store-tab" on:click={()=>navigation('store')}>
                <img src={storeIcon} class="icon"/>
            </div>
        </div>
</main>

<style>
    .tabbar-main {
        position: fixed;
        bottom: 0;
    }
    .container {
        height: 8vh;
        width: 100vw;
        background-color: #ffabbc;
        display: flex;
    }
    .mission-tab, .store-tab {
        flex:1;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .icon {
        height: 80%;
    }

</style>
