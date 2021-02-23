<template>
    <view>
        <!-- 用户信息 开始 -->
        <view class="user_wrap">
            <view class="user_avatar">
                <image mode="widthFix" :src="imgDetail.hasOwnProperty('user') ? imgDetail.user.avatar : default_avatar"></image>
            </view>
            <view class="user_info">
                <view class="user_name">{{imgDetail.hasOwnProperty('user') ? imgDetail.user.name : "user"}}</view>
                <view class="user_time">{{imgDetail.cTime}}</view>
            </view>
        </view>
        <!-- 用户信息 结束 -->

        <!-- 图片展示 开始 -->
        <view class="img_wrap">
            <swiper-action @swiper="handleSwiper">
                <image mode="widthFix" :src="imgDetail.thumb"></image>
            </swiper-action>
        </view>
        <!-- 图片展示 结束 -->
        
        <!-- 用户点赞&收藏 开始 -->
        <view class="like_wrap">
            <view class="good_wrap">
                <text class="iconfont icondianzan"></text>
                <text>{{imgDetail.rank}}</text>
            </view>
            <view class="collect">
                <text class="iconfont iconshoucang"></text>
                <text>收藏</text>
            </view>
        </view>
        <!-- 用户点赞&收藏 结束 -->

        <!-- 相关 开始 -->
        <view class="related_wrap" v-if="album.length > 0">
            <view class="related_title">相关</view>
            <view class="related_content" v-for="item in album" :key="item.id"> 
                <view class="img_wrap">
                    <image mode="widthfix" :src="item.cover"></image>
                </view>
                <view class="info">
                    <view class="album">专辑</view>
                    <view class="desc_wrap">
                        <view class="desc">{{item.name}}</view>
                        <view class="right">
                            <text class="iconfont iconiconfontjiantou4"></text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 相关 结束 -->

        <!-- 最热评论 开始 -->
        <view class="hot_wrap" v-if="hot.length > 0">
            <view class="hot_title">
                <text class="iconfont iconhot"></text>
                <text class="hot">最热评论</text>
            </view>
            <view class="user_wrap" v-for="item in hot" :key="item.id">
                <view class="avatar">
                    <image mode="aspectFill" :src="item.user.avatar"></image>
                </view>
                <view class="user_info">
                    <view class="user_name">{{item.user.name}}</view>
                    <view class="hot_time">{{item.cTime}}</view>
                    <view class="hot_info">
                        <view class="hot_content">{{item.content}}</view>
                        <view class="like">
                            <text class="iconfont icondianzan"></text>
                            <text class="like_num">{{item.size}}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <!-- 最新评论 开始 -->
        <view class="new_wrap" v-if="comment.length > 0">
            <view class="new_title">
                <text class="iconfont iconpinglun"></text>
                <text class="new">最新评论</text>
            </view>
            <view class="user_wrap" v-for="item in comment" :key="item.id">
                <view class="avatar">
                    <image mode="aspectFill" :src="item.user.avatar"></image>
                </view>
                <view class="user_info">
                    <view class="user_name">{{item.user.name}}</view>
                    <view class="new_time">{{item.cTime}}</view>
                    <view class="new_info">
                        <view class="new_content">{{item.content}}</view>
                        <view class="like">
                            <text class="iconfont icondianzan"></text>
                            <text class="like_num">{{item.size}}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 最新评论 结束 -->

        <!-- 图片下载 开始 -->
        <view class="downLoad_wrap">
            <view class="down" @click="handleDownLoad">下载高清图片</view>
        </view>
        <!-- 图片下载 结束 -->
    </view>
</template>

<script>
//引入时间插件
import moment from "moment";
moment.locale("zh-cn")
//引入手势滑动插件
import swiperAction from "../../components/swiperAction"
export default {
    data () {
        return {
            //图片信息对象
            imgDetail:{},
            //专辑数据
            album:[],
            //最新评论
            comment:[],
            //最热评论
            hot:[],
            //当前专辑详情的index
            imgIndex:0,
            //默认头像
            default_avatar:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2389998747,3300817372&fm=26&gp=0.jpg",
           
        }
    },
    onLoad() {
        // const {imgList,imgIndex} = getApp().globalData;
        const {imgIndex} = getApp().globalData;
        this.imgIndex = imgIndex;
        this.getList();
    },
    methods: {
        //获取全局数据
        getList() {
            const {imgList} = getApp().globalData;
            this.imgDetail = imgList[this.imgIndex];
            console.log(this.imgDetail);
            //处理时间格式
            this.imgDetail.cTime = moment(this.imgDetail.atime * 1000).fromNow();
            this.getComments(this.imgDetail.id)
        },
        //获取专辑详情数据
        getComments(id) {
            this.request({url:`http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`})
                .then(result => {
                    console.log(result);
                    this.album = result.res.album;
                    this.comment = result.res.comment;
                    this.hot = result.res.hot;
                    result.res.comment.forEach(v => {
                        (v.cTime = moment(v.atime * 1000).fromNow())
                    });
                     result.res.hot.forEach(v => {
                        (v.cTime = moment(v.atime * 1000).fromNow())
                    })
                })
        },
        //手势滑动
        handleSwiper(e) {
            //获取全局数据中的图片列表数据
            const {imgList} = getApp().globalData;
            if(e.direction === "left" && imgList.length -1 > this.imgIndex)  {
                this.imgIndex++;
                this.getList();
            } else if(e.direction === "right" && this.imgIndex > 0) {
                this.imgIndex--;
                this.getList();
            } else {
                uni.showToast({title:"没有更多数据了哦~",icon:"none"});
                
            }
           
        },
        //下载图片功能
        async handleDownLoad() {
            //下载中提示用户
            await uni.showLoading({title:"下载中.."})
            //将远程下载到小程序内存中
            const result1 = await uni.downloadFile({
                url: this.imgDetail.img
            });
            const {tempFilePath} = result1[1];
            //将小程序内存中下载到本地
            await uni.saveImageToPhotosAlbum({
                filePath:tempFilePath
            })
            //下载成功
            uni.hideLoading();
            //下载成功提示用户
            await uni.showToast({title:"下载成功"});
        }
    },
    components: {
        swiperAction
    }
}
</script>

<style lang="scss" scoped>  
    // 用户信息 样式
    .user_wrap {
        display: flex;
        padding: 20rpx;
      .user_avatar {
          flex:1;
        image {
          width: 88rpx;
          height: 88rpx;
          border-radius: 44rpx;
        }
      }
      
      .user_info {
          flex:5;
          display: flex;
          flex-direction: column;
        .user_name {
          color:#000;
          font-weight: 600;
        }

        .user_time {
          color:#999;
        }
      }
    }
    //图片展示 样式
    .img_wrap {
        margin-top: 10rpx;
        image {

        }
    }
    //用户点赞收藏 样式
    .like_wrap {
        display: flex;
        height: 80rpx;
        font-size: 30rpx;
        border-bottom: 2rpx solid #eee;
        .good_wrap {
            flex:1;
            display: flex;
            justify-content: center;
            align-items: center;
          .iconfont {
            
          }
        
          text {
             margin-left: 10rpx;
          }
        }
        
        .collect {
            flex:1;
            display: flex;
            justify-content: center;
            align-items: center;
          .iconfont {
            
          }
        
          text {
            margin-left: 10rpx;
          }
        }
    }
    //相关 样式
    .related_wrap {
        .related_title {
            padding: 20rpx;
            height: 80rpx;
        }

        .related_content {
            display: flex;
            padding: 0 10rpx;
          .img_wrap {
              flex:1;
            image {
                width: 180rpx;
                height: 180rpx;
            }
          }

          .info {
              flex:4;
              margin-left: 10rpx;
              padding-top: 10rpx;
            .album {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 90rpx;
                height: 50rpx;
                border-radius: 10rpx;
                color:#fff;
                background-color: $color;

            }
            .desc_wrap {
                display: flex;
                justify-content: space-between;
                margin-top: 20rpx;
                .desc {
                    font-size: 32rpx;
                    color:#000
                }
                .right {
                    margin-right: 40rpx;
                    text {}
                }
            }
           
          }

         
        }
    }
    //最热评论 样式
    .hot_wrap {
        .hot_title {
          padding: 20rpx;
          .iconfont {
              font-size: 50rpx;
              font-weight: 600;
              color: red;
          }

          .hot {
              margin-left: 10rpx;
              font-size: 32rpx;
              font-weight: 600;
              color:#666;
          }
        }

        .user_wrap {
            display: flex;
            border-bottom: 15rpx solid #eee;
          .avatar {
              flex:1;
            image {
                width: 80rpx;
                height: 80rpx;
            }
          }

          .user_info {
              flex:5;
              display: flex;
              justify-content: space-between;
            .user_name {    
                color:#666;
                font-size: 32rpx;
            }
            .hot_time {
                color:#999;
            }
            .hot_info {
                display: flex;
                justify-content: space-between;
                padding: 30rpx 0;
              .hot_content {
                  color:#000;
              }

              .like {
                .iconfont {
                
                }

                .like_num {
                
                }
              }
            }
          }
        }
    }
    //最新评论 样式
    .new_wrap {
        .new_title {
          padding: 20rpx;
          .iconfont {
              font-size: 50rpx;
              font-weight: 600;
              color: $color;
          }

          .new {
              margin-left: 10rpx;
              font-size: 32rpx;
              font-weight: 600;
              color:#666;
          }
        }

        .user_wrap {
            display: flex;
            border-bottom: 15rpx solid #eee;
          .avatar {
              flex:1;
            image {
                width: 80rpx;
                height: 80rpx;
            }
          }

          .user_info {
              flex:5;
              display: flex;
              justify-content: space-between;
            .user_name {    
                color:#666;
                font-size: 32rpx;
            }
            .new_time {
                color:#999;
            }
            .new_info {
                display: flex;
                justify-content: space-between;
                padding: 30rpx 0;
              .new_content {
                  color:#000;
              }

              .like {
                .iconfont {
                
                }

                .like_num {
                
                }
              }
            }
          }
        }
    }
    //下载图片 样式
    .downLoad_wrap {
       margin-top: 40rpx;
       height: 90rpx;
        .down {
            width:90%;
            height: 100%;
            padding: 0 20rpx;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
            color:#fff;
            font-size: 34rpx;
            font-weight: 600;
            background-color: $color;
        }
    }
</style>