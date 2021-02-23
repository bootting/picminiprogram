<template>
    <view class="videoPlay_box">
        <!-- 背景模糊 -->
        <image class="bg" :src="video.img"></image>
        <view class="videoPlay_wrap">
            <view class="video_tool">
                <view :class="['iconfont', isMuted ? 'iconjingyin' : 'iconshengyin']" @click="handleMuted"></view>
                <view class="iconfont iconzhuanfa">
                    <button open-type="share"></button>
                </view>
            </view>
            <view class="video_bf">
                <video :src="video.video" objectFit="fill" :muted="isMuted"></video>
            </view>
            <view class="download_wrap">
                <view class="download" @click="handleDownLoad">下载高清视频</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data () {
        return {
            video:{},
            isMuted:false      
        }
    },
    onLoad() {
        this.video = getApp().globalData.video;
        console.log(this.video);
    },
    methods: {
        //静音切换功能
        handleMuted() {
            this.isMuted = !this.isMuted;
        },
        //下载视频
        async handleDownLoad() {
            //下载等待提示
            await uni.showLoading({title:"下载中.."})
            const result1 = await uni.downloadFile({
                url:this.video.video
            });
            const {tempFilePath} = result1[1];
            await uni.saveVideoToPhotosAlbum({
                filePath:tempFilePath
            });
            uni.hideLoading();
            await uni.showToast({title:"下载成功"})
            
        }
    }
}
</script>

<style lang="scss" scoped>
.videoPlay_box {
      .bg {
        position: absolute;
        width: 100vw;
        height: 100vh;
        filter: blur(20rpx);
        z-index: -1;
    }

    .videoPlay_wrap {
      
      .video_tool {
        display: flex;
        justify-content: flex-end;
        margin-top: 20rpx;
        margin-right: 20rpx;
        .iconfont {
            position: relative;
            width: 80rpx;
            height: 80rpx;
            margin-right: 20rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 40rpx;
            color:#fff;
            font-size: 40rpx;
            font-weight: 600;
            background-color: #ccc;
           button {
                   position: absolute;
                   width: 100%;
                   height: 100%;
                   opacity: 0;
                }
           
        }

       
      }

      .video_bf {
          display: flex;
          justify-content: center;
         
        video {
          width: 360rpx;
          height: 600rpx;
            
        }
      }

      .download_wrap {
          display: flex;
          justify-content: center;
          margin-top: 20rpx;
        .download {
            width: 360rpx;
            height: 90rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 40rpx;
            border: 1px solid #fff;
            font-size: 34rpx;
            color:#fff;
            background-color: rgba(0,0,0,.6);
        }
      }
    }
}
  
</style>