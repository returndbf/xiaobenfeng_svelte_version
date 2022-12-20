<script lang="ts">

    export let mission_name
    export let reward
    export let icon
    export let is_complete
    //const completeMission :IMission = {mission_name, reward, icon, id,today, is_special,is_complete}

    let backgroundColor = is_complete ? 'none' : '#ffddc65c'
</script>
<main>
    <div class="mission_card" on:click style="background:{backgroundColor}">
        <div class="mission-text-info">
            <span class="mission_name">{mission_name}</span>
            <span class="mission_reward">({reward}积分)</span>
        </div>
        <div class="mission-icon">
            <img src={icon}   class="icon-detail"/>
        </div>

    </div>
</main>
<style>
    .mission_card {
        margin-top: 5vh;
        height: 15vh;
        box-shadow: 0 0 10px #ff000063;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        width:70vw
    }
    .mission-text-info{
        display: flex;
        flex-direction: column;
        align-items: center;
    }


    /*.mission_name {*/
    /*    vertical-align:middle;*/
    /*    display: inline-block;*/
    /*    word-break: break-all;*/
    /*    margin-left: 30px;*/
    /*    font-size: 4vw;*/
    /*    line-height:15vh*/
    /*}*/

    .mission_reward {
        color: #6f6f6f
    }

    .icon-detail {
        width: 10vh;
        margin-top: 2vh
    }
</style>
