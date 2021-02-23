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
		      	<view v-if="current === 0">
		      		<home-recommend></home-recommend>
		      	</view>
		      	<view v-if="current === 1">
		      		<home-category></home-category>
		      	</view>
		      	<view v-if="current === 2">
		      		<home-new></home-new>
		      	</view>
                <view v-if="current === 3">
		          		<home-album></home-album>
		        </view>
		 </view>
   </view>
</template>

<script>
import {homeRecommend} from "./home-recommend";
import {homeCategory} from "./home-category";
import {homeNew} from "./home-new";
import {homeAlbum} from "./home-album";
import {uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
   components: {
      homeRecommend,
      homeCategory,
      homeNew,
      homeAlbum,
      uniSegmentedControl
   },
   data () {
      return {
         items:[{
            title:"推荐"
         },{
            title:"分类"
         },{
            title:"最新"
         },{
            title:"专辑"
         }],
         current:0
      }
   },
   methods: {
      onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
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
</style>