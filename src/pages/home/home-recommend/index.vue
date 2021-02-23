<template>
    <scroll-view class="scrollView" @scrolltolower="handleScrollToLower" scroll-y v-if="recommendlist.length > 0">
        <!-- 推荐模块 开始-->
        <view class="recommend_wrap">
            <navigator class="recommend_item" v-for="item in recommendlist" :key="item.id" :url="`/pages/album/index?id=${item.target}`">
                <image mode="widthFix" :src="item.thumb"></image>
            </navigator>
        </view>
        <!-- 推荐模块 结束 -->

       <view class="today_box">
            <!-- 今日推荐头部 开始 -->
            <view class="month_wrap">
                <view class="today_wrap">
                    <text class="day">{{monthes.DD}}</text>
                    <text class="month"> /{{monthes.MM}}月</text>
                </view>
                <view class="desc">{{monthes.title}}</view>
                <view class="more">更多 ></view>
            </view>
            <!-- 今日推荐头部结束 -->

            <!-- 今日推荐列表 开始 -->
           <view class="todayList_Wrap">
                <view class="today_item" v-for="(item,index) in monthes.items" :key="item.id">
                    <go-Detail :list="monthes.items" :index="index">
                        <image  mode="aspectFill" :src="item.thumb + item.rule.replace('$<Height>',360)"></image>
                    </go-Detail>
                </view>
           </view>
            <!-- 今日推荐列表 结束 -->


       </view>
       
       <!-- 热门 开始 -->
       <view class="hot_wrap">
           <view class="hot_title">
               <text>热门</text>
           </view>
           <view class="hot_content">
                <view class="hot_item" v-for="(item,index) in vertical" :key="item.id">
                    <go-Detail :list="vertical" :index="index">
                        <image mode="widthFix" :src="item.thumb"></image>
                    </go-Detail>
                </view>
           </view>
       </view>
       <!-- 热门 结束 -->
    </scroll-view>
</template>

<script>
//引入时间处理插件
import moment from "moment";
//引入图片详情组件
import goDetail from "../../../components/goDetail";
export default {
    data () {
        return {
            //请求所需的参数
            params: {   
                limit:30,
                order:"hot",
                skip:0
            },
            //recommendlist 数据
            recommendlist:[],
            //时间数据
            monthes:{},
            //热门数据
            vertical:[],
            //是否还能加载更多数据
            hasMore:true
                  
        }
    },
     mounted () {
        //修改页面标题
        uni.setNavigationBarTitle({title:"推荐"});
        this.getList();
    },
    methods: {
        getList() {
            this.request({url:"http://service.picasso.adesk.com/v3/homepage/vertical",data:this.params})
                .then(result => {
                    console.log(result);
                    //优化
                    if(this.recommendlist.length === 0) {
                        this.recommendlist = result.res.homepage[1].items;
                        this.monthes = result.res.homepage[2];
                       
                        this.monthes.MM = moment(this.monthes.stime).format("MM");
                        this.monthes.DD = moment(this.monthes.stime).format("DD");
                    }
                   
                    if(result.res.vertical.length === 0) {
                        this.hasMore = false;
                        uni.showToast({title:"没有更多的数据了~",icon:"none"});
                        return
                    }
                    this.vertical = [...this.vertical,...result.res.vertical];
                    
                })
        },
        //滚动功能
        handleScrollToLower() {
            if(this.hasMore) {
                this.params.skip += this.params.limit;
                //重新发送请求
                this.getList();
            } else {
                uni.showToast({title:"没有更多的数据了~",icon:"none"});
            }
        }
    },
    components: {
        goDetail
    }
}
</script>

<style lang="scss" scoped>
    .scrollView {
        height: calc(100vh - 36px);
    }
    //推荐 样式
    .recommend_wrap {
        display: flex;
        flex-wrap: wrap;
      .recommend_item {
          width: 50%;
          border: 5rpx solid #fff;
        image {}
      }
    }
    //今日推荐 样式
    .today_box {
        .month_wrap {
         display: flex;
         padding: 20rpx;
         align-items: center;
        .today_wrap {
            flex:2;
            color:$color;
            font-weight: 600;
            font-size: 30rpx;
          .day {
              font-size: 34rpx;
              margin-right: 10rpx;
          }
          .month {
             
          }
        }
   
        .desc { 
             flex:5;
             font-weight: 600;
             color:#666;
        }
   
        .more {
            flex:1;
            color:$color;
        }
        }
        .todayList_Wrap {
            display: flex;
            flex-wrap: wrap;
            .today_item {
                width: 33.33%;
                border: 5rpx solid #fff;
            image {

            }
        }
        }
        
    }
    //热门 样式
    .hot_wrap {
      .hot_title {
          padding: 20rpx;
         text {
            border-left: 10rpx solid $color;
            font-size: 34rpx;
            color:#666;
            padding-left: 20rpx;
         }
      }
      .hot_content {
          display: flex;
          flex-wrap: wrap;
          .hot_item {
            width:33.33%;
            border:5rpx solid #fff;
          image {
             
         }
      }
      }
    }
   
</style>