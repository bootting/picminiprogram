<template>
    <view>
        <!-- 分类列表 开始 -->
        <view class="category_wrap">
            <navigator :url="`/pages/imgCategory/index?id=${item.id}`" class="category_item" v-for="item in category" :key="item.id">
                <image mode="aspectFill" :src="item.cover"></image>
                <text class="category_name">{{item.name}}</text>
            </navigator>
        </view>
        <!-- 分类列表 结束 -->
    </view>
</template>

<script>
export default {
    data () {
        return {
           //获取到的分类数据
           category:[] 
        }
    },
    mounted () {
        //修改页面标题
        uni.setNavigationBarTitle({title:"分类"});
        this.getList();
    },
    methods: {
        getList() {
            this.request({url:"http://157.122.54.189:9088/image/v1/vertical/category"})
                .then(result => {
                    this.category = result.res.category;
                })
        }
    }
    
}
</script>

<style lang="scss" scoped>
.category_wrap {
    display: flex;
    flex-wrap: wrap;
    .category_item {
        position: relative;
        width: 33.33%;
        border: 5rpx solid #fff;
        image {
            height: 240rpx;
        }
        .category_name {
            width: 100%;
            height: 50rpx;
            position: absolute;
            bottom: 0;
            left: 0;
            padding-left: 20rpx;
            color: #fff;
            font-size: 40rpx;
        }
    }
    
}
</style>
