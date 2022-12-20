import type {IGoods} from "./IGoods";

export  interface IGetGoods{
  id:string
  goods_id:string
  today:string
  is_get:number
}
export interface IGetGoodsInfo extends IGoods{
  today : string
  is_get : number
}
