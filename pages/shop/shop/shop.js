var app = getApp();

Page({
  data: {
    userpost:[],Find:"",swiper:[],goods:[],
    spmc:"",xj:"10",lx:"",xxjs:"",idd:"",
    shop_list:{}
  },

  onDetail:function(event){
    var id = event.currentTarget.dataset.id;
    wx.redirectTo({
      url:"../detail/detail?id="+id,
      success:function(){
        console.log(event.currentTarget.dataset.id)
        console.log("成功跳转到商品详情页")
     },
      fail:function(res){
        console.log("跳转到商品详情页失败,失败信息如下：\n",res)
      },
      complete:function(){
        console.log("跳转到商品详情页动作完成")
      }
    })
},
    onShow:function(){
        const that = this;
        setTimeout(function(){
             that.setData({
                shop_list : app.globalData.List_shop,
         })
        },350);
    }
})

