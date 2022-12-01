// pages/test/test.js
// logs.js
//引入事先写好的日期设置util.js文件
var datePicker = require('../../utils/dateSetting.js')
//设定当前的时间，将其设定为常量
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
var app=getApp()
// const token=app.globalData.Token;
// const user=app.globalData.user;
Page({
  data: {
    token:'',
    photonum:0,
    max: 245, //最多字数 (根据自己需求改变) 
    currentWordNumber:0,
    flag:true,
    starttime: '',
    endtime:'',
    multiArray: [],
    multiIndex1: [0, 0, 0, 0, 0],
    choose_year1: "",
    multiIndex2: [0, 0, 0, 0, 0],
    choose_year2: "",
    groupId:'',
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
  // onChangeTap:function(event){
  //   let photonum=this.data.photonum
  //   let photopath=event.detail.all[photonum]
  //   console.log(photopath)
  //   this.setData({
  //     flag:false,
  //     photonum:photonum+1,
  //   })
  //   wx.request({
  //     url: 'http://43.142.99.39:99/api/upload',
  //     headers:{
  //       'content-type': 'multipart/form-data',
  //     },
  //     data:{
  //       photopath:photopath
  //     },
  //     method:'POST',
  //     dataType:'JSON',  
  //     responseType:'text',
  //     success(res){
  //       console.log(res.data)
  //     },
  //     fail(){
  //       console.log('fail')
  //     }
  //   })
  // },
  onLoad: function (e) {
    //此时需要判断全局数据是否获取到
	  var that=this
	  //如果已经获取到，则直接使用
	  if(app.globalData.Token){
      console.log(app.globalData.Token)
		  //如果此处的逻辑较多可以提炼为一个函数
		  that.setData({
			  token:app.globalData.Token
		  })
	  }else{
	  //如果还未请求到数据，则创建一个回调函数，等待数据获取完成后调用
		  app.userInfoCallback = res => {
			  that.setData({
			  	token:app.globalData.Token
        })
        console.log(that.data.token)
		  }
	  }
    var groupId=e.groupId
    console.log(groupId)
    this.setData({
      groupId:groupId
    })
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
  bindMultiPickerChange1: function (e) {
    //年
    var dateStr = this.data.multiArray[0][this.data.multiIndex1[0]] +"-";
    //月
    if(this.data.multiArray[1][this.data.multiIndex1[1]]<10)
    {
      dateStr=dateStr+"0"+this.data.multiArray[1][this.data.multiIndex1[1]] +"-";
    }
    else{
      dateStr=dateStr+this.data.multiArray[1][this.data.multiIndex1[1]] +"-";
    }
    //日
    if(this.data.multiArray[2][this.data.multiIndex1[2]]<10)
    {
      dateStr=dateStr+"0"+this.data.multiArray[2][this.data.multiIndex1[2]]+" ";
    }
    else{
      dateStr=dateStr+this.data.multiArray[2][this.data.multiIndex1[2]]+" ";
    }
    //时
    if(this.data.multiArray[3][this.data.multiIndex1[3]]<10)
    {
      dateStr=dateStr+"0"+this.data.multiArray[3][this.data.multiIndex1[3]]+":";
    }
    else
    {
      dateStr=dateStr+this.data.multiArray[3][this.data.multiIndex1[3]]+":";
    }
    if(this.data.multiArray[4][this.data.multiIndex1[4]]<10)
    {
      dateStr=dateStr+"0"+this.data.multiArray[4][this.data.multiIndex1[4]];
    }
    else{
      dateStr=dateStr+this.data.multiArray[4][this.data.multiIndex1[4]];
    }
    this.setData({
      starttime: dateStr
    })
  },
  //当时间选择器呈现并进行滚动选择时间时调用该函数。
  bindMultiPickerColumnChange1: function (e) {
    //e.detail.column记录哪一行发生改变，e.detail.value记录改变的值（相当于multiIndex）
    switch (e.detail.column) {
      //这里case的值有0/1/2/3/4,但除了需要记录年和月来确定具体的天数外，其他的都可以暂不在switch中处理。
      case 0:
        //记录改变的年的值
        let year = this.data.multiArray[0][e.detail.value];
        this.setData({
          choose_year1: year.substring(0, year.length - 1)
        })
        break;
      case 1:
        //根据选择的年与月，确定天数，并改变multiArray中天的具体值
        let month = this.data.multiArray[1][e.detail.value];
        let dayDates = datePicker.determineDay(this.data.choose_year1, month.substring(0, month.length - 1));
        //这里需要额外注意，改变page中设定的data，且只要改变data中某一个值，可以采用下面这种方法
        this.setData({
          ['multiArray[2]']: dayDates
        })
        break;
    }
    //同上，上面改变的是二维数组中的某一个一维数组，这个是改变一个一维数组中某一个值，可供参考。
    this.setData({
      ["multiIndex1[" + e.detail.column + "]"]: e.detail.value
    })
  },
  bindMultiPickerChange2: function (e) {
    //年
    var dateStr = this.data.multiArray[0][this.data.multiIndex2[0]] +"-";
    //月
    if(this.data.multiArray[1][this.data.multiIndex2[1]]<10)
    {
      dateStr=dateStr+"0"+this.data.multiArray[1][this.data.multiIndex2[1]] +"-";
    }
    else{
      dateStr=dateStr+this.data.multiArray[1][this.data.multiIndex2[1]] +"-";
    }
    //日
    if(this.data.multiArray[2][this.data.multiIndex2[2]]<10)
    {
      dateStr=dateStr+"0"+this.data.multiArray[2][this.data.multiIndex2[2]]+" ";
    }
    else{
      dateStr=dateStr+this.data.multiArray[2][this.data.multiIndex2[2]]+" ";
    }
    //时
    if(this.data.multiArray[3][this.data.multiIndex2[3]]<10)
    {
      dateStr=dateStr+"0"+this.data.multiArray[3][this.data.multiIndex2[3]]+":";
    }
    else
    {
      dateStr=dateStr+this.data.multiArray[3][this.data.multiIndex2[3]]+":";
    }
    if(this.data.multiArray[4][this.data.multiIndex2[4]]<10)
    {
      dateStr=dateStr+"0"+this.data.multiArray[4][this.data.multiIndex2[4]];
    }
    else{
      dateStr=dateStr+this.data.multiArray[4][this.data.multiIndex2[4]];
    }
    this.setData({
      endtime: dateStr
    })
  },
  //当时间选择器呈现并进行滚动选择时间时调用该函数。
  bindMultiPickerColumnChange2: function (e) {
    //e.detail.column记录哪一行发生改变，e.detail.value记录改变的值（相当于multiIndex）
    switch (e.detail.column) {
      //这里case的值有0/1/2/3/4,但除了需要记录年和月来确定具体的天数外，其他的都可以暂不在switch中处理。
      case 0:
        //记录改变的年的值
        let year = this.data.multiArray[0][e.detail.value];
        this.setData({
          choose_year2: year.substring(0, year.length - 1)
        })
        break;
      case 1:
        //根据选择的年与月，确定天数，并改变multiArray中天的具体值
        let month = this.data.multiArray[1][e.detail.value];
        let dayDates = datePicker.determineDay(this.data.choose_year2, month.substring(0, month.length - 1));
        //这里需要额外注意，改变page中设定的data，且只要改变data中某一个值，可以采用下面这种方法
        this.setData({
          ['multiArray[2]']: dayDates
        })
        break;
    }
    //同上，上面改变的是二维数组中的某一个一维数组，这个是改变一个一维数组中某一个值，可供参考。
    this.setData({
      ["multiIndex2[" + e.detail.column + "]"]: e.detail.value
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
    var token=this.data.token
    var content=data.detail.value.details
    var endDate=data.detail.value.endtime
    var title=data.detail.value.title
    var startTime=data.detail.value.startTime
    var groupId=this.data.groupId
    if (!content || !endDate || !startTime || !title) {
      wx.showToast({
        title: '不能为空！',
        icon: 'error',
        duration: 1000,
      })
    }
    else{
      wx.request({
      url:'https://www.web4j.top/attendance-task/insert', //必填，其他的都可以不填
      data:{  
        description:content, 
        endTime:endDate,
        title:title,
        startTime:startTime,
        groupId:groupId
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
            url: 'add_roll_call?id=1'
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
  },
})