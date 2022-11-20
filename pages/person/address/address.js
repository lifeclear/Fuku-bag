// pages/address/address.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    addaddress:function(data){
        // console.log(data)
        // console.log(data.detail.value)
        // console.log(data.detail.value.title)
        //console.log(data.detail.value.endtime)
        // console.log(data.detail.value.privacy)
        // console.log(data.detail.value.money)
        // console.log(data.detail.valu//e.phonenumber)
        // console.log(data.detail.value.address)
        var name=data.detail.value.name
        var phone=data.detail.value.phone
        var address=data.detail.value.address
        // if (!content || !deliveryAddress || !rewarded || !endDate || !phone) {
        //   wx.showToast({
        //     title: '不能为空！',
        //     icon: 'error',
        //     duration: 1000,
        //   })
        // }
        // else{
          wx.request({
          url:'http://43.142.99.39:99/user/insert', //必填，其他的都可以不填
          data:{  
            // content:content, 
            // deliveryAddress:deliveryAddress,
            // endDate:endDate,
            // label:label,
            // rewarded:rewarded,
            // remark:remark,
            // phone:phone,
            name:name,
            phone:phone,
            address:address
          },
          header:{  
             'content-type':'application/json',
             'Access-Token':'1'
          },
          method:'post',  
          dataType:'JSON',  
          responseType:'text', 
          success(res){
            console.log(res);
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 1000//持续的时间
              });
              setTimeout(()=>{wx.reLaunch({
                url: 'address?id=1'
                })
              },600 );
          },
          fail(){  
              console.log('fail')
          },
          complete(){   
               console.log('complete')   
          }
        })
      //}
      },    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})