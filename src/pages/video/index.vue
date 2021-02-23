<template>
    <view>
         <!-- tab栏部分 开始 -->
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
       <!-- tab栏部分 结束 -->
       <view class="tab_content">
		      	<view v-if="current < 4">
		      		<video-main :urlobj = {url:items[current].url,params:items[current].params}></video-main>
		      	</view>
                <view v-if="current === 4">
		      		<video-cate></video-cate>
		      	</view>
	   </view>

    </view>
</template>

<script>
//引入两个视频组件
import videoMain from "./video-main";
import videoCate from "./video-cate";
//引入分段器组件
import {uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
    components: {
        videoMain,
        videoCate,
        uniSegmentedControl
    },
    data () {
      return {
         items:[{
            title:"推荐",
            url:"http://157.122.54.189:9088/videoimg/v1/videowp/featured",
            params: {
                limit:30,
                skip:0,
                order:'hot'
            }
         },{
            title:"娱乐",
            url:'http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a',
            params: {
                limit:30,
                skip:0,
                order:'new'
            }
         },{
            title:"最新",
            url:'http://157.122.54.189:9088/videoimg/v1/videowp/videowp',
            params: {
                limit:30,
                skip:0,
                order:''
            }
         },{
            title:"热门",
            url:'http://157.122.54.189:9088/videoimg/v1/videowp/videowp',
            params: {
                limit:30,
                skip:0,
                order:'hot'
            }
         },{
            title:"分类",
            url:'http://157.122.54.189:9088/videoimg/v1/videowp/category',
            params: {}
         }],
         current:0
      }
   },
   methods: {
      onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
                }
                this.request()
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
</style>