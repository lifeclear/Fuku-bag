
Page({
  //与wxml中的数据一一对应，在具体函数中修改time、multiArray、multiIndex等值，进行页面的呈现
  data: {
    index: null,
    imgList: [],
    voteOptionVOList:[],
  },
  Publish:function(data){
    console.log(data.detail.value)
    // console.log(data.detail.value.title)
   // console.log(data.detail.value.endtime)
    // console.log(data.detail.value.privacy)
    // console.log(data.detail.value.money)
    // console.log(data.detail.value.phonenumber)
    // console.log(data.detail.value.address)
    var title=data.detail.value.title
    var content=data.detail.value.content
    var option = data.detail.value.option
    var label=data.detail.value.label
    var choice = JSON.stringify(option)
    /*if (!content || !deliveryAddress || !rewarded || !endDate || !phone) {
      wx.showToast({
        title: '不能为空！',
        icon: 'error',
        duration: 1000,
      })
    }
    else{*/
      wx.request({
      url:'http://43.142.99.39:99/vote/insert', //必填，其他的都可以不填
      data:{  
        content:content, 
        label:label,
        title:title,
        voteOptionVOList:choice,
      },
      header:{  
         'content-type':"application/x-www-form-urlencoded",
         'Access-Token':'1',
         
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
            url: 'release?id=1'
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
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
    wx.uploadFile({
      filePath: this.data.imgList,
      name: 'photofiles',
      url: 'http://43.142.99.39:99//api/upload',
      success(res){
        console.log(res)
      },
      fail(){
        console.log('fail')
      }
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '确认',
      content: '确定要删除这张照片吗？',
      cancelText: '取消',
      confirmText: '删除',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  textareaBInput(e) {
    this.setData({
      textareaBValue: e.detail.value
    })
  }
  
})
