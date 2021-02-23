<template>
    <view @touchstart="handleTouchStart" @touchend="handleTouchEnd">
        <slot></slot>
    </view>
</template>

<script>
export default {
    data () {
        return {
            startTime:0,
            endTime:0,
            startX:0,
            startY:0,
            endTime:0,
            endX:0,
            endY:0,
            //滑动方向
            direction:""

        }
    },
    methods: {
        //手指触屏事件
        handleTouchStart(event) {
            //开始时间
            this.startTime = Date.now();
            //开始距离x坐标
            this.startX = event.changedTouches[0].clientX;
            //开始距离的y坐标
            this.startY = event.changedTouches[0].clientY;
        },
        //手指离屏事件
        handleTouchEnd(event) {
            //结束时间
            this.endTime = Date.now();
            //结束距离x
            this.endX = event.changedTouches[0].clientX;
            //结束距离y
            this.endY = event.changedTouches[0].clientY;
            //时间计算[容器时间停留太久不合法]
            if(this.endTime - this.startTime > 3000) {
                return;
            }
            if(Math.abs(this.endX - this.startX) > 10 && Math.abs(this.endY - this.startY) < 10) {
                this.direction = this.endX - this.startX > 0 ? "right" : "left";
            } else {
               return;
            }
            //向父组件传递滑动方向的值
            this.$emit("swiper",{direction:this.direction});
        }
    }
}
</script>

<style>

</style>