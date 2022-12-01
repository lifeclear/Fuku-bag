//const db=wx.cloud.database()
let  fileIDlist=[];
var idddd=""
let tempFilePaths=[]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yuanjia:99,
    xianjia:9.9,
    spmc:"",
    xxjs:"",
    lx:"",
    yj:"",
    xj:"",
    addre:"",
    tempFilePathslist:[],
    photos:[]
  },
  //原、现价加减号
  yuanjiajian(){
    this.setData({
      yuanjia:this.data.yuanjia - 10,
    })
  },
  yuanjiajia(){
    this.setData({
      yuanjia:this.data.yuanjia + 10,
    })
  },
  xianjiajian(){
    this.setData({
      xianjia:this.data.xianjia - 10,
    })
  },
  xianjiajia(){
    this.setData({
      xianjia:this.data.xianjia + 10,
    })
  },

  upload(){ //上传图片
    wx.chooseImage({
      count: 6,
      success:res=>{
        this.setData({
          tempFilePaths:res.tempFilePaths,
          tempFilePathslist:res.tempFilePaths
        })
        wx.uploadFile({
          url: 'http://43.142.99.39:99/api/upload',
          filePath: res.tempFilePaths[0],
          name: 'file',
          success:(result)=>{
            var records=JSON.parse(result.data);
            var filepath=records.item.filePath
            // console.log(result.data);
            console.log(filepath);
            console.log('success');
            this.setData({
              photos:this.data.photos.concat(filepath)
            })
          },
          fail(){
            console.log('fail')
          }
        });
      }
    })
  },
  deleteImage: function (e) {  //删除图片
    var that = this;
    var tempFilePaths = that.data.tempFilePaths;
    var index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('确定');
          tempFilePaths.splice(index, 1);
        } else if (res.cancel) {
          console.log('取消');
          return false;
        }
        that.setData({
          tempFilePaths
        });
      }
    })
  },
  listenerButtonPreviewImage: function (e) {  //预览图片
    let index = e.target.dataset.index;
    let that = this;
    wx.previewImage({
      current: that.data.tempFilePaths[index],
      urls: that.data.tempFilePaths,
    })
  },
  dup(){  //清空内容
   this.setData({
     tempFilePaths:[]
   })
 },

  
  post(res){
    var btnval = res.detail.value
    var photos=this.data.photos
    console.log(btnval.Tradename)
    const that = this;
    wx.request({
      url:'http://43.142.99.39:99/idle-goods/insert', //必填，其他的都可以不填
      data:{  
        goodsName:btnval.Tradename,
        description: btnval.Tradename1,
        label: btnval.Tradename2,
        //地址Tradename3: btnval.Tradename3,
        price:btnval.xj,
        //原价yj: btnval.yj,
        pictures:photos
        /*content:content, 
        workplace:deliveryAddress,
        endTime:endDate,
        label:label,
        rewarded:rewarded,
        remarks:remark,
        startTime:startTime,
        jobRequirements:jobRequirements*/
      },
      header:{  
         'content-type':'application/json',
         'Access-Token':'1'
      },
      method:'post',  
      dataType:'JSON',  
      responseType:'text', 
      success(res){
        console.log(res.data);
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 1000//持续的时间
          });
          setTimeout(()=>{wx.reLaunch({
            url: 'releasee?id=1'
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
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    
  },

  //生命周期函数--监听页面初次渲染完成
  onReady: function () {
    
  },

  // 生命周期函数--监听页面显示
  onShow: function () {
    
  },

  //生命周期函数--监听页面隐藏
  onHide: function () {
    
  },

  //生命周期函数--监听页面卸载
  onUnload: function () {
    
  },

  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    
  },

  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    
  },

  //用户点击右上角分享
  onShareAppMessage: function () {
    
  }
})