<template>
    <scroll-view scroll-y class="scrollView" @scrolltolower="handleScrollToLower">
        <!-- 轮播图 开始 -->
        <swiper autoplay indicator-dots circular>
            <swiper-item v-for="item in banner" :key="item.id">
                <image mode="widthFix" :src="item.thumb"></image>
            </swiper-item>
        </swiper>
        <!-- 轮播图 结束 -->

        <!-- 专辑列表 开始 -->
        <view class="album_wrap">
            <navigator :url="`/pages/album/index?id=${item.id}`"  class="album_item" v-for="item in album" :key="item.id">
                <view class="album_img">
                    <image mode="aspectFill" :src="item.cover"></image>
                </view>
                <view class="album_content">
                    <view class="album_con">
                        <view class="album_title">{{item.name}}</view>
                        <view class="album_desc">{{item.desc}}</view>
                    </view>
                    <view class="album_attention">
                        <view>关注</view>
                    </view>
                </view>
            </navigator>
        </view>
        <!-- 专辑列表 结束 -->
    </scroll-view>
</template>

<script>
export default {
    data () {
        return {
            //接口所需参数
            params: {
                limit:30,
                order:"new",
                skip:0
            },
            //banner
            banner:[],
            //album 
            album: [],
            //是否有更多数据
            hasMore:true
        }
    },
    mounted () {
        //修改页面标题
        uni.setNavigationBarTitle({title:"专辑"});
        //获取专辑数据
        this.getList();
    },
    methods: {
        getList() {
            this.request({url:"http://157.122.54.189:9088/image/v1/wallpaper/album",data:this.params})
                .then(result => {
                    // console.log(result);
                    if(this.banner.length === 0) {
                        this.banner = result.res.banner;
                    }
                    if(result.res.album.length === 0) {
                        this.hasMore = false;
                        uni.showToast({title:"没有更多数据了哦~",icon:"none"})
                        return;
                    }
                    this.album = [...this.album,...result.res.album];
                    console.log(this.album );
                })
        },
        //滚动功能
        handleScrollToLower() {
            if(this.hasMore) {
                this.params.skip += this.params.limit;
                this.getList();
            } else {
                uni.showToast({title:"没有更多数据了哦~",icon:"none"})
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    //滚动 样式
    .scrollView {
        height: calc(100vh - 36px);
    } 
    // 轮播图 样式
    swiper {
        height: calc(100vw * 284 / 640);
        swiper-item {
            image {}
        }
    }
    //专辑列表 样式
    .album_wrap {
        .album_item {
             display: flex;
            //  padding: 20rpx;
             border-bottom: 1rpx solid #ccc;
            .album_img {
                flex:2;
                padding: 20rpx;
                image {
                    width: 200rpx;
                    height: 200rpx;
                }
            }

            .album_content {
                flex:5;
                padding: 20rpx;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .album_con {
                    .album_title {
                       font-size: 32rpx;
                       color:#000;
                    }

                    .album_desc {
                        padding: 10rpx 0;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
              

              .album_attention {
                  display: flex;
                  justify-content: flex-end;
                  margin-top: 20rpx;
                  view {
                      width: 80rpx;
                      height: 60rpx;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      color: $color;
                      border: 1rpx solid $color;
                  }
              }
            }
        }
        
    }
</style>
