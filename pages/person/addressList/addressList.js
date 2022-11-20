// pages/addressList/addressList.js
Page({
   data: {

    },
    goTo1:function(){
        wx.navigateTo({
          url: '../address/address',
        })
      },
    delAddr:function(){
        wx.request({
            url:'http://43.142.99.39:99/errand/findPage', //必填，其他的都可以不填
            data:{  
          },
          header:{  
             'content-type':'application/json',
             'Access-Token':'1'
          },
          method:'post',dataType:'JSON',responseType:'text', 
          success:function(res){
              console.log(res.data);
              
              // let tmp = JSON.parse(res.data);
              // let records = tmp.item.page.records;
              // console.log(records);
              // that.globalData.task_list = records;
              // console.log("change",that.globalData.task_list)
          },
          fail:function(){  
              console.log('fail')
          },
          complete:function(){   
               console.log('complete')   
          }
        })
    },






















    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },

    /**
     * 生命周期函数--监听页面显示
     */

})
