<script lang="ts">
    // 全局变量
    import {miaomiaoReward} from "../../store";
    // 网络请求
    import {fetchData} from "../../utils/fetch";
    //type类型约束
    import type IResult from "../../types/IResult";
    import type {IReward} from "../../types/IReward";
    import type {IGoods} from "../../types/IGoods";
    import type {IGetGoods, IGetGoodsInfo} from "../../types/IGetGoods";
    //生命周期
    import {onMount} from "svelte";
    // 卡片组件
    import StoreCard from "../../components/StoreCard.svelte";
    //toast组件
    import Toast from "../../components/Toast.svelte";
    //button组件
    import Button from "../../components/Button.svelte";
    //弹窗组件
    import Modal from "../../components/Modal.svelte";
    // 顶部banner
    import storePic from "../../assets/store.png"
    //公共函数
    import {getDateFormat} from "../../utils/data_format";


    let showToast: boolean = false
    let toastType = 'success'
    let toastMessage: string = ""

    let needExchangeGoods: IGoods = null
    let showExchangeModal: boolean = false
    let exchangeModalTitle: string = '兑换确认'

    let goodsList: IGoods[] = []
    let getList: IGetGoodsInfo[] = []

    let showMiaoMiaoGoodsList: boolean = false


    const getReward = () => {
        fetchData("user/queryReward", null, "GET").then((res: IResult<IReward>) => {
            miaomiaoReward.set(res.data.reward)
        })

    }

    const getGoodsList = async (): Promise<IGoods[]> => {
        const res = await fetchData("store/getStoreList", null, "GET")
        goodsList = res.data
        return goodsList
    }

    const showMiaoMiaoGetList = () => {
        getList = []
        fetchData('getGoods/queryGetGoods', null, "GET").then((res: IResult<IGetGoods[]>) => {
            res.data.forEach(item => {
                getList.push(
                    {
                        ...goodsList.find(i => {
                            return i.id == item.goods_id
                        }), today: item.today, is_get: item.is_get
                    }
                )
            })
            showMiaoMiaoGoodsList = true
        })
    }


    $: awaitGoodsList = getGoodsList()

    const exchangeGoods = async (goods: IGoods) => {
        await fetchData('store/exchangeGoods', {
            ...goods,
            today: getDateFormat()
        }, "PUT").then((res: IResult<string>) => {
            if (res.code === 1) {
                showToast = true
                toastMessage = res.data
                showExchangeModal = false
            } else {
                showToast = true
                toastType = 'error'
                toastMessage = res.data
            }
        })
        getReward()
    }


    onMount(() => {
        getReward()

    })
    //卡片点击事件
    const goodsClick = (goods: IGoods) => {
        if ($miaomiaoReward < goods.reward) {
            showToast = true
            toastMessage = '积分不够哦猪猪'
            toastType = 'error'
            return
        }
        showExchangeModal = true
        needExchangeGoods = goods
    }
    //    确认兑换
    const ok = () => {
        exchangeGoods(needExchangeGoods)
    }

</script>

<main>
    <div class="container">
        <div class="rewards">
            <span class="rewards-text"> 渺渺的积分：{$miaomiaoReward}</span>
        </div>
        <span class="get_goods_btn">
            <Button type="simple" size="medium" style="background: #eeb4a2" on:click={showMiaoMiaoGetList}>已兑换</Button>
        </span>
        <div class="store_topic">
            <img class="store_topic_img"
                 src={storePic}>
        </div>
        <div class="goods">
            {#await awaitGoodsList}
                <p>loading....</p>
            {:then goodsList}
                {#each goodsList as goods }
                    <StoreCard goods={goods.goods} reward={goods.reward} on:click={()=>goodsClick(goods)}></StoreCard>
                {/each}
            {:catch error}
                <p style="color: red">{error.message}</p>
            {/await}
        </div>
    </div>
    <Toast message={toastMessage} bind:showToast={showToast} type={toastType}></Toast>
    <Modal bind:showModal={showExchangeModal} title={exchangeModalTitle} on:ok={ok}>
        <p>确认兑换{needExchangeGoods.goods}吗？</p>
    </Modal>
    <Modal bind:showModal={showMiaoMiaoGoodsList} title='已兑换' on:ok={()=>showMiaoMiaoGoodsList = false}>
        <div>
            <div class="get_list">
                {#each getList as getGoods}
                    <div class="get_goods">
                    <div> {getGoods.goods}</div>
                    <div> {getGoods.is_get? '已获得':'未获得'}</div>
                    </div>
                {/each}
            </div>
        </div>
    </Modal>

</main>

<style>
    .container {
        background: #fff3f3;
        margin-bottom: 12vh
    }

    .rewards {
        position: fixed;
        background-color: #f190b2;
        height: 40px;
        width: 100%;
        line-height: 40px;
        border-radius: 5px;
        top: 0;
        color: #f0f9eb;
        z-index: 999
    }

    .get_goods_btn {
        position: relative;
        top: 80px;
        right: 0;
        left: 70%;
    }

    .rewards-text {
        margin-left: 10px;
    }

    .store_topic {
        padding-top: 10vh;
        display: flex;
        justify-content: center;

    }

    .store_topic_img {
        width: 80vw;
    }

    .goods {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        position: relative;
        padding-bottom: 12vh;
    }

    .getList {


    }
    .get_goods{
        display: flex;
        justify-content: space-between;
    }
</style>
