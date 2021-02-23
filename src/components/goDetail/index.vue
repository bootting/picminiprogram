<template>
    <view @click="handleClick">
        <slot></slot>
    </view>
    
</template>

<script>
export default {
    //子组件接收的参数
    props: {
        list:Array,
        index:Number
    },
    methods: {
        handleClick() {
            //将数据设置成全局数据
            getApp().globalData.imgList = this.list;
            getApp().globalData.imgIndex = this.index;
            //实现跳转
            uni.navigateTo({
                url:"/pages/imgDetail/index"
            })

        }
    }
}
</script>

<style>

</style>