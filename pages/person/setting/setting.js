Page({
    goTo1:function(){
        wx.navigateTo({
          url: '../addressList/addressList',
        })
      },
    /**
     * 页面的初始数据
     */
    data: {
        select: false,
        tihuoWay: '学校',
     
        date:'2021-01-01',
    
         
          
    },
    bindDateChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          date: e.detail.value
        })
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
 
    },
    bindShowMsg() {
         this.setData({
             select:!this.data.select
         })
    },
    mySelect(e) {
        var name = e.currentTarget.dataset.name
        this.setData({
            tihuoWay: name,
            select: false
        })
    },
 
 
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
 
    }
})