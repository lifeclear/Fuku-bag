// pages/svote/svote.js
var app = getApp();
Page({
  data: {
  vote_list:""
  },
  onShow:function(){
    const that = this;
    setTimeout(function(){
      that.setData({
      vote_list : app.globalData.List_vote,
    })
    console.log(vote_list)
  },350);
},
   onVoteDetail:function(event){
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url:"../detail/detail?id="+id,
      success:function(){
        console.log(event.currentTarget.dataset.id)
        console.log("jump success")
     },
      fail:function(){
        console.log("jump failed")
      },
      complete:function(){
        console.log("jump complete")
      }
    })
}
  })