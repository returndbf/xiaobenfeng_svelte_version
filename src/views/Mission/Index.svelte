<script lang="ts">
    // 路由跳转
    import {useNavigate} from "svelte-navigator";
    // ui组件
    import MissionCard from "../../components/MissionCard.svelte";
    import Toast from "../../components/Toast.svelte";
    import Button from "../../components/Button.svelte";
    //interface
    import type IMission from "../../types/IMission";
    import type IResult from "../../types/IResult";
    // 公共方法网络请求
    import {fetchData} from "../../utils/fetch";
    //公共方法获取当前日期
    //生命周期
    // 引入图片
    import missionPic from "../../assets/mission.png"
    import Modal from "../../components/Modal.svelte";
    import {getDateFormat} from "../../utils/data_format";





    let showToast :boolean = false
    let toastMessage :string= ""
    let toastType :string= 'success'
    let showMissionModal :boolean= false
    let needCompleteMission :IMission= null
    let missionModalTitle :string= "完成任务了吗"

    //为了完成任务之后刷新任务列表,因为getMissions函数对这个变量有依赖之后才会刷新任务列表
    let getOk = 1

    const getMissions = async (refresh: number): Promise<IMission[]> => {
        const res = await fetchData("mission/getDayMissions", {date: getDateFormat()}, "GET")
        return await res.data as IMission[]
    }

    $: awaitMissions = getMissions(getOk);


    // 卡片点击事件
    const cardClick = (mission: IMission) => {
        console.log(mission, "mission")
        if (mission?.is_complete === 1) {
            showToast = true
            toastMessage = "任务已经完成"
            return
        }
        showMissionModal = true
        needCompleteMission = mission
    }
    // 完成任务
    const completeMission = () => {
        return new Promise((resolve, reject) => {
            fetchData('mission/completeMission', {
                ...needCompleteMission,
                is_complete: 1
            }, 'PUT').then((res: IResult<string>) => {
                toastMessage = res.data
                showToast = true
                ++getOk
                resolve()
            }).catch(() => {
                // showToast('请求失败', 'error')
                reject()
            })
        })

    }
    // modal 关闭时回调
    const modalClosed = (e) => {
        console.log(e.detail)
    }
    // modal 确认事件,不会主动关闭modal
    const ok = () => {
        completeMission().then(() => {
            showMissionModal = false

        }).catch(() => {
            toastMessage = '完成失败'
            showToast = true
            toastType = 'error'
            showMissionModal = false
        })
    }
</script>


<main class="mission_main">
    <div class="mission_topic">
        <img class="mission_topic_img"
             src={missionPic}>
    </div>
    <div class="missions">
        {#await awaitMissions}
            <p>loading...</p>
        {:then missionsData}
            {#each missionsData as mission}
                <MissionCard {...mission} on:click={()=>cardClick(mission)}></MissionCard>
            {/each}
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    </div>

    <Toast message={toastMessage} bind:showToast={showToast} type={toastType}></Toast>
    <Modal bind:showModal={showMissionModal} title={missionModalTitle}  on:ok={ok}>
        <p>再次提问：完成任务了吗？</p>
    </Modal>

</main>

<style>
    .mission_main {
        width: 100%;
        height:100vh;
        display: flex;
        align-items: center;
        flex-direction: column;
        background: #faf5fa;
    }

    .mission_topic {
        margin-top: 10vh;
        display: flex;
        justify-content: center;
    }

    .mission_topic_img {
        width: 80vw;
    }

    .missions {
        /*display: flex;*/
        /*justify-content: center;*/
    }
</style>
