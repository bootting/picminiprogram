<template>
    <view>
        <!-- 分段器 开始 -->
         <view class="tab_wrap">
         <view class="tab">
          <!-- 分段器 开始 -->
            <uni-segmented-control :current="current" :values="items.map(i=>i.title)" @clickItem="onClickItem" style-type="text"
		       active-color="#7202E2"></uni-segmented-control>
         <!-- 分段器 结束 -->
         </view>
         <view class="search_wrap">
            <view class="iconfont iconsearch"></view>
         </view>
      </view>
      <view class="tab_content">
		    <view v-if="current === 0">
		    	<home-recommend></home-recommend>
		    </view>
		    <view v-if="current === 1">
		    	<home-category></home-category>
		    </view>
		 </view>
        <!-- 分段器 结束 -->
        <!-- 分类详情列表 开始 -->
        <scroll-view scroll-y enable-flex @scrolltolower="handleScrollToLower" class="cateImg_wrap">
            <view class="cateImg_item" v-for="item in cateList" :key="item.id ">
                <image mode="widthFix" :src="item.thumb"></image>
            </view>
        </scroll-view>
        <!-- 分类详情列表 结束 -->
    </view>
</template>

<script>
import {uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
    data () {
        return {
            items:[{
            title:"最新",
            order:"new"
            },{
               title:"热门",
               order:"hot"
            }],
         current:0,
         id:0,
         //请求参数
         params: {
             limit:30,
             skip:0,
             order:"new"
         },
         //分类详情数据
         cateList:[],
         //是否还有更多数据
         hasMore:true
        }
    },
    onLoad(options) {
        this.id = options.id;
        // console.log(id);
        this.getList();
    },
    components: {
        uniSegmentedControl
    },
    methods: {
        onClickItem(e) {
                //点击的是不同的tab选项
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
                }
                this.params.order = this.items[e.currentIndex].order;
                //重置
                this.params.skip = 0;
                this.cateList = [];
                this.getList();

		},
        getList() {
            this.request({url:`http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,data:this.params})
                .then(result => {
                    if(result.res.vertical.length === 0) {
                        this.hasMore = false;
                        uni.showToast({title:"没有更多数据了哦~",icon:"none"});
                        return
                    }
                   this.cateList = [...this.cateList,...result.res.vertical];
                })
        },
        //滚动加载更多 功能
        handleScrollToLower() {
            if(this.hasMore) {
                this.params.skip += this.params.limit;
                this.getList();
            } else {
                uni.showToast({title:"没有更多数据了哦~",icon:"none"});
            }
        }

    }
}
</script>

<style lang="scss" scoped>
     //  tab样式
   .tab_wrap {
      display: flex;
      position: relative;
      .tab {
         width: 60%;
         margin: 0 auto;
      }
      .search_wrap {
         position: absolute;
         top: 50%;
         right: 5%;
         transform: translateY(-50%);
         .iconfont {}
      }
   }
   .tab_content {}
   //分类详情列表 样式
   .cateImg_wrap {
       display: flex;
       flex-wrap: wrap;
       height: calc(100vh  - 36px);
       .cateImg_item {
           width: 33.33%;
           border: 5rpx solid #fff;
           image {

           }
       }
   }
</style>