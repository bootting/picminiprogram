export default (params) => {
    uni.showLoading({ title: "加载中" })
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            success: (result) => {
                resolve(result.data);
            },
            fail: (error) => {
                reject(error);
            },
            complete: () => {
                uni.hideLoading();
            }
        });

    })
}