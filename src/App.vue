<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 引入初始化样式文件 */
	@import "./style/base.wxss";
	/* 引入字体图标样式文件 */
	@import "./style/iconfont.wxss"
</style>
