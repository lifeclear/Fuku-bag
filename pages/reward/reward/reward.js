var app = getApp();

Page({
 data:{
   task_list :""
 },
//  function
   onDetail:function(event){
   
     var id = event.currentTarget.dataset.id;
     wx.redirectTo({
       url:"../../reward/detail/detail?id="+id,
       success:function(){
         console.log("成功地从悬赏列表页面跳转到悬赏详情页")
      },
       fail:function(){
         console.log("失败地从悬赏列表页面跳转到悬赏详情页")
       },
       complete:function(){
         console.log("成功地从悬赏列表页面跳转到悬赏详情页")
       }
     })
 },
 onShow:function(){
   var app = getApp();
   this.setData({
     task_list : app.globalData.List_reward
   })
 }
})