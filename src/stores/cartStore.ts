import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./userStore";
import { insertCartAPI, findNewCartListAPI, delCartAPI, updateCartItem } from "@/apis/cart";

export const useCartStore = defineStore(
    'cart',
    () => {
        const cartList = ref([])

        const userStore = useUserStore()
        const isLogin = computed(() => userStore.userInfo.token)

        // 获取登录后最新购物车列表action
        const updateNewList = async () => {
            const res = await findNewCartListAPI()
            cartList.value = res.result
        }

        // addCart 加入购物车
        const addCart = async (goods) => {
            // 判断商品是否在购物车
            if (isLogin.value) {
                await insertCartAPI(goods)
                await updateNewList()
            } else {// 未登录
                const finkItem = cartList.value.find(item => goods.skuId === item.skuId)
                if (finkItem) {
                    finkItem.count += goods.count
                } else {
                    cartList.value.push(goods)
                }
            }
        }

        // 删除购物车
        const delCart = async (skuId) => {
            if (isLogin.value) {
                // 登录之后加入购物车逻辑
                console.log([skuId])
                await delCartAPI([skuId])
                await updateNewList()
                // updateNewList()
            } else {// 未登录
                // 思路：
                // 1. 找到要删除项的下标值 - splice
                // 2. 使用splice删除找到的项，原数组改变
                const idx = cartList.value.findIndex((item) => skuId === item.skuId)
                cartList.value.splice(idx, 1)
            }
        }

        // 计算属性
        // 1. 总的数量 所有项的count之和
        const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
        // 2. 总价 所有项的count*price之和
        const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
        // 3. 是否全选计算属性
        const isAll = computed(() => cartList.value.every(item => item.selected))
        // 4. 已选择的数量
        const selectedCount = computed(() => cartList.value.filter(item => item.selected).
            reduce((a, c) => a + c.count, 0))
        // 5. 已选择的价格
        const selectedPrice = computed(() => cartList.value.filter(item => item.selected).
            reduce((a, c) => a + c.count * c.price, 0))
        // 全选
        const checkAll = (selected) => {
            cartList.value.forEach(item => item.selected = selected)
        }

        // 清除购物车
        const clearCart = () => {
            cartList.value = []
        }

        // //修改购物项
        // const updateCartItem = async (goods) => {
        //     const { skuId, count, selected } = goods
        //     if (isLogin.value) {
        //         await updateCartItem(skuId, { count, selected })
        //     }
        // }
        //修改购物项
        const updateCart = async (goods) => {
            const { skuId, count, selected } = goods
            if (isLogin.value) {
                await updateCartItem(skuId, { count, selected })
            }
        }

        return {
            // 暴露属性
            allCount,
            allPrice,
            cartList,
            isAll,
            selectedCount,
            selectedPrice,

            // 暴露方法
            addCart,
            delCart,
            checkAll,
            updateNewList,
            clearCart,
            updateCart,
        }
    },
    {
        persist: true
    }
)


