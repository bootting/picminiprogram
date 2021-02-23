<template>
   <view>
      <!-- 背景图 开始 -->
      <view class="bg_wrap">
         <image mode="widthFix" :src="album.cover"></image>
          <view class="bg_content">
             <view class="bg_title">{{album.name}}</view>
             <view class="bg_attention">关注专辑</view>
          </view>
      </view>
      <!-- 背景图 结束 -->

      <!-- 用户信息 开始 -->
      <view class="userInfo_wrap">
         <view class="user_info">
            <image mode="widthFix" :src="album.user.avatar"></image>
            <view class="user_name">{{album.user.name}}</view>
         </view>
         <view class="user_desc">
            <text>{{album.desc}}</text>
         </view>
      </view>
      <!-- 用户信息 结束 -->

      <!-- 专辑列表 开始 -->
      <view class="wallpaper_wrap">
         <view class="wallpaper_item" v-for="(item,index) in wallpaper" :key="item.id">
            <go-Detail :list="wallpaper" :index="index">
                <image mode="aspectFill" :src="item.thumb + item.rule.replace('$<Height>',360)"></image>
            </go-Detail>
         </view>
      </view>
      <!-- 专辑列表 结束 -->
   </view>
</template>

<script>
//引入图片详情组件
import {goDetail} from "../../components/goDetail";
export default {
   data () {
      return {
         //请求参数
         params: {
            limit:30,
            order:"new",
            skip:0,
            first:1
         },
         //获取专辑详情所需的id
         id:-1,
         //专辑数据
         album:{},
         //专辑列表数据
         wallpaper:[],
         //是否还有更多数据   
         hasMore:true
      }
   },
   onLoad(options) {
      this.id = options.id;
      // this.id = "5d5f8e45e7bce75ae7fb8278";
      this.getList();
   },
   methods: {
      //获取专辑详情数据
      getList() {
         this.request({
            url:`http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
            data:this.params
         })
            .then(result => {
               console.log(result);
               //优化
               if(Object.keys(this.album).length === 0) {
                  this.album = result.res.album;
               }
               if(result.res.wallpaper.length === 0) {
                  this.hasMore = false;
                  uni.showToast({
                     title:"没有更多数据了哦~",
                     icon:"none"
                  });
                  return
               }
               
               this.wallpaper = [...this.wallpaper,...result.res.wallpaper];
            })
      }
   },
   //滚动事件
   onReachBottom() {
     if(this.hasMore) {
        this.params.skip += this.params.limit;
        this.params.first = 0;
        this.getList();
     } else {
         uni.showToast({
            title:"没有更多数据了哦~",
            icon:"none"
         });
     }
   },
    components: {
        goDetail
   }
  
}
</script>

<style lang="scss" scoped>
   //背景图 样式
   .bg_wrap {
      image {
      
      }

      .bg_content {
         display: flex;
         position: relative;
        .bg_title {
           position: absolute;
           bottom: 30rpx;
           left: 12rpx;
           font-size: 40rpx;
           color:#fff;
        }

        .bg_attention {
           position: absolute;
           bottom: 30rpx;
           right: 12rpx;
           width: 162rpx;
           height: 60rpx;
           display: flex;
           justify-content: center;
           align-items: center;
           border-radius: 10rpx;
           background-color: $color;
           color: #fff;
        }
      }
   }
   //用户信息 样式
   .userInfo_wrap {
      padding: 20rpx;
      .user_info {
         display: flex;
        image {
           width: 50rpx;
           border-radius: 50%;
        }

        .user_name {
           margin-left: 20rpx;
           font-size: 32rpx;
           color:#666;
        }
      }

      .user_desc {
         margin-top: 10rpx;
        text {
           font-size: 30rpx;
           color:#999;
        }
      }
   }
   //专辑列表 样式
   .wallpaper_wrap {
       display: flex;
       flex-wrap: wrap;
       margin-top: 20rpx;
      .wallpaper_item {
         width: 33.33%;
         border: 3rpx solid #fff;
         image {
            height: 200rpx;
         }
      }
   }
</style>
