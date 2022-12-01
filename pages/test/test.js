// pages/test/test.js
// logs.js
//引入事先写好的日期设置util.js文件
var app=getApp()
var datePicker = require('../../utils/dateSetting.js')
const FormData=require('../../utils/formData.js')
//设定当前的时间，将其设定为常量
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
let formData = new FormData();
const token=app.globalData.Token;
const user=app.globalData.user;
Page({
  data: {
    photonum:0,
    max: 245, //最多字数 (根据自己需求改变) 
    currentWordNumber:0,
    flag:true,
    time: '',
    multiArray: [],
    multiIndex: [0, 0, 0, 0, 0],
    choose_year: "",
    photos:[]
  },
  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    this.setData({
      currentWordNumber: len //当前字数  
    });
  },
  onChangeTap:function(event){
    let photonum=this.data.photonum
    let photopath=event.detail.all[photonum]
    let photop=event.detail.current[0]
    console.log(photop)
    // let photo=this.data.photo
    // let photop=photopath
    // formData.appendFile(photo,photopath,photop)
    // console.log(photopath)
    this.setData({
      flag:false,
      photonum:photonum+1,
    })
    wx.uploadFile({
      url: 'http://43.142.99.39:99/api/upload',
      filePath: event.detail.current[0],
      name: 'file',
      // header: {
      //   "Content-Type": 'application/text',
      //   // 'accept': 'application/json',
      // },
      // formData: {
      //   'filename': 'img', //参数名
      //   'method':'post'
      // },
      success: (result) => {
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
        console.log('fail');
      }
    })
    // let data = formData.getData()
    // wx.request({
    //   url: 'http://43.142.99.39:99/api/upload',
    //   // data:data.buffer,
    //   method:'POST',
    //   headers:{
    //     'Content-Type': 'multipart/form-data',
    //     // 'content-type':data.contentType,
    //   },
    //   data:{
    //   },
    //   // dataType:'JSON',  
    //   // responseType:'text',
    //   success(res){
    //     console.log(res.data)
    //   },
    //   fail(){
    //     console.log('fail')
    //   }
    // })
  },
  removeTap(event){
    let num=event.detail.index
    // console.log(num)
    this.data.photos.splice(num,1)
    // console.log(this.data.photos)
  },
  onLoad: function () {
    this.setData({
      multiArray:
        [
          [year, year + 1, year + 2],
          datePicker.determineMonth(),
          datePicker.determineDay(year, month),
          datePicker.determineHour(),
          datePicker.determineMinute()
        ],
    })
  },
  //最后呈现时间的函数。
  bindMultiPickerChange: function (e) {
    //年
    var dateStr = this.data.multiArray[0][this.data.multiIndex[0]] +"-";
    //月
    if(this.data.multiArray[1][this.data.multiIndex[1]]<10)
    {
      dateStr=dateStr+"0"+this.data.multiArray[1][this.data.multiIndex[1]] +"-";
    }
    else{
      dateStr=dateStr+this.data.multiArray[1][this.data.multiIndex[1]] +"-";
    }
    //日
    if(this.data.multiArray[2][this.data.multiIndex[2]]<10)
    {
      dateStr=dateStr+"0"+this.data.multiArray[2][this.data.multiIndex[2]]+" ";
    }
    else{
      dateStr=dateStr+this.data.multiArray[2][this.data.multiIndex[2]]+" ";
    }
    //时
    if(this.data.multiArray[3][this.data.multiIndex[3]]<10)
    {
      dateStr=dateStr+"0"+this.data.multiArray[3][this.data.multiIndex[3]]+":";
    }
    else
    {
      dateStr=dateStr+this.data.multiArray[3][this.data.multiIndex[3]]+":";
    }
    if(this.data.multiArray[4][this.data.multiIndex[4]]<10)
    {
      dateStr=dateStr+"0"+this.data.multiArray[4][this.data.multiIndex[4]];
    }
    else{
      dateStr=dateStr+this.data.multiArray[4][this.data.multiIndex[4]];
    }
    this.setData({
      time: dateStr
    })
  },
  //当时间选择器呈现并进行滚动选择时间时调用该函数。
  bindMultiPickerColumnChange: function (e) {
    //e.detail.column记录哪一行发生改变，e.detail.value记录改变的值（相当于multiIndex）
    switch (e.detail.column) {
      //这里case的值有0/1/2/3/4,但除了需要记录年和月来确定具体的天数外，其他的都可以暂不在switch中处理。
      case 0:
        //记录改变的年的值
        let year = this.data.multiArray[0][e.detail.value];
        this.setData({
          choose_year: year.substring(0, year.length - 1)
        })
        break;
      case 1:
        //根据选择的年与月，确定天数，并改变multiArray中天的具体值
        let month = this.data.multiArray[1][e.detail.value];
        let dayDates = datePicker.determineDay(this.data.choose_year, month.substring(0, month.length - 1));
        //这里需要额外注意，改变page中设定的data，且只要改变data中某一个值，可以采用下面这种方法
        this.setData({
          ['multiArray[2]']: dayDates
        })
        break;
    }
    //同上，上面改变的是二维数组中的某一个一维数组，这个是改变一个一维数组中某一个值，可供参考。
    this.setData({
      ["multiIndex[" + e.detail.column + "]"]: e.detail.value
    })
  },
  Publish:function(data){
    // console.log(data.detail.value)
    // console.log(data.detail.value.title)
    // console.log(data.detail.value.endtime)
    // console.log(data.detail.value.privacy)
    // console.log(data.detail.value.money)
    // console.log(data.detail.value.phonenumber)
    // console.log(data.detail.value.address)
    var remark=data.detail.value.remark
    var content=data.detail.value.details
    var deliveryAddress=data.detail.value.address
    var endDate=data.detail.value.endtime
    var label=data.detail.value.label
    var rewarded=data.detail.value.money
    var phone=data.detail.value.phonenumber
    var title=data.detail.value.title
    var photos=this.data.photos
    if (!content || !deliveryAddress || !rewarded || !endDate || !phone || !title) {
      wx.showToast({
        title: '不能为空！',
        icon: 'error',
        duration: 1000,
      })
    }
    else{
      wx.request({
      url:'http://43.142.99.39:99/errand/insert', //必填，其他的都可以不填
      data:{  
        title:title,
        content:content, 
        deliveryAddress:deliveryAddress,
        endDate:endDate,
        label:label,
        rewarded:rewarded,
        remark:remark,
        phone:phone,
        pictures:photos,
      },
      header:{  
         'content-type':'application/json',
         'Access-Token':token
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
            url: 'test?id=1'
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
  }
  }
})