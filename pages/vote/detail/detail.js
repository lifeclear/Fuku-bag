// pages/vote/vote.js
var app = getApp();
Page({
  data: {
    isChecked: false ,
    vote:[],
    comment_list:[],
    editTrue: false,
    showModalStatus: false,
    isdisabled2:false,
    isdisabled1:false,
    vote_A:0,
    vote_B:0,
    A_id:"",
    B_id:"",
    editTextA:'选项A',
    editTextB:'选项B',
      //评论数据
      comment_list: [
      {
        comment_id: 1, //评论id
        comment_pr_id: 1, //评论文章所属id
        comment_user_avatar: '/image/36.jpg', //评论用户头像(路径替换为你的图片路径)
        comment_user_name: '高飞', //评论人昵称
        comment_text: '选A选A选A', //评论内容
        comment_time: '2020.8.18', //评论时间
        reply_id: 0, //回复谁的评论，默认为0
        parent_id: 0, //评论所属评论id，默认为0
        reply_name: '' //回复评论用户的昵称 默认为''
      },
      {
        comment_id: 2,
        comment_pr_id: 1,
        comment_user_avatar: '/image/36.jpg',
        comment_user_name: '张维默',
        comment_text: '两个我觉得都可以',
        comment_time: '2020.8.18',
        reply_id: 0,
        parent_id: 0,
        reply_name: ''
      },
      {
        comment_id: 3,
        comment_pr_id: 1,
        comment_user_avatar: '/image/36.jpg',
        comment_user_name: '张剑锋',
        comment_text: 'B选项更好吧！',
        comment_time: '2020.8.18',
        reply_id: 0,
        parent_id: 0,
        reply_name: ''
      }
      ],
   
      //回复数据
      comment_list2: [
      {
        comment_id: 4,
        comment_pr_id: 1,
        comment_user_name: '张剑锋',
        comment_user_avatar: '/image/36.jpg',
        comment_text: "大家有什么想法吗？",
        comment_time: '2020.8.18',
        reply_id: 3,
        parent_id: 3,
        reply_name: ''
      },
      {
        comment_id: 5,
        comment_pr_id: 1,
        comment_user_name: '沈非隆',
        comment_user_avatar: '/image/36.jpg',
        comment_text: "个人更喜欢B",
        comment_time: '2020.8.18',
        reply_id: 3,
        parent_id: 3,
        reply_name: '张剑锋'
      }
      ],
    
      /*定义一些数据*/
      focus: false, //输入框是否聚焦
      placeholder: '说点什么...', //底部输入框占字符
      placeholder2: '发表一下你的看法吧~', //顶部输入框占字符
      value: null, //顶部输入框内容
      comment_text: null, //底部评论框内容
    
      /*
       *以下初始化数据是用户点击任意一条评论或回复时需要设置的数据
       *然后将设置好的数据传递给评论时新创建的评论数据对象
      */
      now_reply_name: null, //当前点击的评论或回复评论的用户昵称
      now_reply_type: 0, //当前回复类型 默认为0 1为回复评论 2为回复回复
      now_parent_id: 0, //当前点击的评论或回复评论的所属评论id
      now_reply: 0, //当前点击的评论或回复评论的id
    
      //模拟用户信息
      userinfo: {
        nickName: '马飞', //用户昵称
        avatarUrl: '/image/36.jpg' //用户头像
      }
    },
 
    onLoad:function(options){
      console.log(options.id+10000);
      let pos = -1;
      for(let i=0;i<100;i++)
      {
          if(app.globalData.vote_list[i].id==options.id)
          {
               pos=i;
               break;
          }
      }
      console.log(app.globalData.vote_list[pos])
      this.setData({
        vote: app.globalData.vote_list[pos],
        vote_A:app.globalData.vote_list[pos].voteOptionVOList[0].agreeNum,
        vote_B:app.globalData.vote_list[pos].voteOptionVOList[1].agreeNum,
        A_id:app.globalData.vote_list[pos].voteOptionVOList[0].id,
        B_id:app.globalData.vote_list[pos].voteOptionVOList[1].id,
      })
  },

  
    
    //点击用户评论或回复时触发
    replyComment(e) {
      var cid = e.currentTarget.dataset.cid; //当前点击的评论id
      var name = e.currentTarget.dataset.name; //当前点击的评论昵称
      var pid = e.currentTarget.dataset.pid; //当前点击的评论所属评论id
      var type = e.currentTarget.dataset.type; //当前回复类型
      this.setData({
          focus: true, //输入框获取焦点
          placeholder: '回复' + name + '：', //更改底部输入框占字符
          now_reply: cid, //当前点击的评论或回复评论id
          now_reply_name: name, //当前点击的评论或回复评论的用户名
          now_parent_id: pid, //当前点击的评论或回复评论所属id
          now_reply_type: type, //获取类型(1回复评论/2回复-回复评论)
      })
    },
    
    //底部输入框提交内容时触发
    confirm(e){
      //获取输入框输入的内容
      var comment_text = e.detail.value;
      //判断用户是否输入内容为空
      if (comment_text == '') {   //用户评论输入内容为空时弹出
        wx.showToast({
          title: '请输入内容', //提示内容
          icon: 'none' //提示图标
        })
      } 
      else {
        var date = new Date(); //创建时间对象
        var year = date.getFullYear(); //获取年      
        var month = date.getMonth() + 1; //获取月      
        var day = date.getDate(); //获取日      
        var hour = date.getHours(); //获取时      
        var minute = date.getMinutes(); //获取分      
        var second = date.getSeconds(); //获取秒      
        var time = `${year}.${month}.${day} ${hour}:${minute}:${second}`; //当前时间
        var comment_list = this.data.comment_list; //获评论数据
        var comment_list2 = this.data.comment_list2; //获取回复数据
        var comment_list_length = comment_list.length; //获取当前评论数组的长度
        var last_id = comment_list[comment_list_length - 1].comment_id; //获取最后一个评论的id
        var comment_list2_length = comment_list2.length; //获取回复数组的长度
        var last_id2 = comment_list2[comment_list2_length - 1].comment_id; //获取最后回复的id
        var new_id = last_id > last_id2 ? last_id + 1 : last_id2 + 1; //当前将要发表的评论的id
        var userinfo = this.data.userinfo; //获取当前的用户信息      
        var comment_user_name = userinfo.nickName //用户昵称      
        var comment_user_avatar = userinfo.avatarUrl //用户头像
        var reply_name = null; //回复评论用户的昵称
        var parent_id = 0; //评论所属哪个评论的id
        var reply_id = this.data.now_reply; //回复谁的评论id
        var comment_pr_id = this.data.vote.id;
        console.log(comment_pr_id);
        //通过回复谁的评论id判断现在是评论还是回复
        if(reply_id != 0) {   //现在是回复
          var reply_type = this.data.now_reply_type; //回复类型
          //通过回复类型判断是回复评论还是回复回复
          if (reply_type == 1) {  //回复评论
            parent_id = this.data.now_reply; //回复评论所属评论id
            reply_name = this.data.now_reply_name; //回复评论用户昵称
          } 
          else {
          //回复回复
            parent_id = this.data.now_parent_id; //回复评论所属评论id
            reply_name = this.data.now_reply_name; //回复评论用户昵称
          }
        } 
        else {
          //现在是评论
        }
        var comment_detail = {} //评论/回复对象
        comment_detail.comment_id = new_id; //评论Id      
        comment_detail.comment_user_name = comment_user_name; //用户昵称      
        comment_detail.comment_user_avatar = comment_user_avatar; //用户头像      
        comment_detail.comment_text = comment_text; //评论内容      
        comment_detail.comment_time = time; //评论时间      
        comment_detail.reply_id = reply_id; //回复谁的评论的id      
        comment_detail.parent_id = parent_id; //评论所属哪个评论id      
        comment_detail.reply_name = reply_name; //回复评论人的昵称
        //判断parent_id是否为0 为0就是评论 不为0就是回复
        if(comment_detail.parent_id > 0) {
          //回复
          comment_list2.unshift(comment_detail);
        }
        else {
          //评论
          comment_list.unshift(comment_detail);
        }
        wx.request({
          url:'http://43.142.99.39:99/comments/insert', //必填，其他的都可以不填
          data:{  
          id : new_id, //评论id
          area_id : comment_pr_id, //评论文章所属id
          content : comment_text, //评论内容
          create_time : time, //评论时间
          user_id : reply_id, //回复谁的评论，默认为0
          parent_id : parent_id, //评论所属评论id，默认为0
          },
        //动态渲染
        header:{  
          'content-type':"application/json",
          'Access-Token':'1',  
       },
       method:'post',  
       dataType:'JSON',  
       responseType:'text', 
       success(res){
         console.log(res);
        /*   setTimeout(()=>{wx.reLaunch({
             url: 'release?id=1'
             })
           },600 );*/
       },
       fail(){  
           console.log('fail')
       },
       complete(){   
            console.log('complete')   
       }
     })
   //}

        this.setData({
          //发表评论后将以下数据初始化 为下次发表评论做准备
          comment_text: null, //评论内容        
          now_reply: 0, //当前点击的评论id        
          now_reply_name: null, //当前点击的评论的用户昵称        
          now_reply_type: 0, //评论类型        
          now_parent_id: 0, //当前点击的评论所属哪个评论id        
          placeholder: "说点什么...", //输入框占字符
          //将加入新数据的数组渲染到页面        
          comment_list, //评论列表        
          comment_list2 //回复列表
        })
      }
    },
    //下面的方法可以绑定在输入框的bindblur属性上
    //输入聚焦
  
  
  
    blur(e) {
      const text = e.detail.value.trim();
      if( text == ''){
        this.setData({
          now_reply: 0, //当前点击的评论或回复评论的id        
          now_reply_name:null, //当前点击的评论或回复评论的用户昵称        
          now_reply_type:0, //当前回复类型        
          now_parent_id:0, //当前点击的评论或回复评论的所属评论id        
          placeholder: "说点什么...", //占字符        
          focus:false //输入框获取焦点
        })
      }
  
      
    },
  
    //顶部评论框提交内容时触发  
    bindconfirm(e) {    
      var comment_text = e.detail.value   //判断用户是否输入内容为空
      if (comment_text == ''){    //用户评论输入内容为空      
        wx.showToast({        
          title: '请输入内容', //提示内容
          icon: 'none'      
        })    
      } 
      else {     
        var date = new Date(); //创建时间对象
        var year = date.getFullYear(); //获取年
        var month = date.getMonth() + 1; //获取月
        var day = date.getDate(); //获取日
        var hour = date.getHours(); //获取时
        var minute = date.getMinutes(); //获取分
        var second = date.getSeconds(); //获取秒
        var time = `${year}.${month}.${day} ${hour}:${minute}:${second}`; //当前时间
        var comment_list = this.data.comment_list; //获取data中的评论列表
        var comment_list2 = this.data.comment_list2; //获取data中的回复列表
        var userinfo = this.data.userinfo; //获取当前的用户信息
        var comment_user_name = userinfo.nickName //用户昵称      
        var comment_user_avatar = userinfo.avatarUrl //用户头像       
        var reply_id = this.data.reply_id //获取当前输入评论的id      
        var comment_list_length = comment_list.length; //获取当前评论数组的长度      
        var last_id = comment_list[comment_list_length - 1].comment_id; //获取最后一个评论的id      
        var comment_list2_length = comment_list2.length; //获取回复数组的长度      
        var last_id2 = comment_list2[comment_list2_length - 1].comment_id; //获取最后回复的id
        var new_id = last_id > last_id2 ? last_id + 1 : last_id2 + 1; //赋值当前评论的id
        var reply_name = null;      
        var parent_id = 0;      
        var reply_id = this.data.now_reply; //获取当前输入评论的id
        var comment_pr_id = this.data.vote.id;
        console.log(comment_pr_id);
        var comment_detail = {} //声明一个评论/回复对象
        comment_detail.comment_id = new_id; //评论Id
        comment_detail.comment_user_name = comment_user_name; //用户昵称
        comment_detail.comment_user_avatar = comment_user_avatar; //用户头像
        comment_detail.comment_text = comment_text; //评论内容
        comment_detail.comment_time = time; //评论时间
        comment_detail.reply_id = reply_id; //回复谁的评论的id
        comment_detail.parent_id = parent_id; //评论所属哪个评论id
        comment_detail.reply_name = reply_name; //回复评论人的昵称
        comment_list.unshift(comment_detail);
        wx.request({
          url:'http://43.142.99.39:99/comments/insert', //必填，其他的都可以不填
          data:{  
          id : new_id, //评论id
          area_id : comment_pr_id, //评论文章所属id
          content : comment_text, //评论内容
          create_time : time, //评论时间
          user_id : reply_id, //回复谁的评论，默认为0
          parent_id : parent_id, //评论所属评论id，默认为0
          },
        //动态渲染
        header:{  
          'content-type':"application/json",
          'Access-Token':'1',  
       },
       method:'post',  
       dataType:'JSON',  
       responseType:'text', 
       success(res){
         console.log(res);
         /*  setTimeout(()=>{wx.reLaunch({
             url: 'vote?id=1'
             })
           },600 );*/
       },
       fail(){  
           console.log('fail')
       },
       complete(){   
            console.log('complete')   
       }
     })
   //}
        this.setData({        
          value: null, /*评论内容*/        
          now_reply: 0, /*当前点击的评论id*/
          now_reply_name: null, /*当前点击的评论的用户昵称  */      
          now_reply_type: 0, /*评论类型 */
          now_parent_id: 0, /*当前点击的评论所属哪个评论id */       
          placeholder2: "发表一下自己的意见吧~", /*输入框占字符        */
          comment_list /*评论列表 */     
        })
      }
    },
    /*匿名*/
    switch2Change: function (e){
      console.log('switch2 发生 change 事件，携带值为', e.detail.value)
    },

    /*选项A*/
    show1:function(){
      var numberA = this.data.vote_A +1;
      var A_id=this.data.A_id;
      wx.request({
        url: 'http://43.142.99.39:99/vote-option/agree/'+A_id,
        method:'GET',
        header:{
          "Access-Tokon":'1'
        },
        success:(res)=>{
          console.log('success')
        },
        fail(){
          console.log('fail')
        }
      })
      /*if(this.data.isdisabled2 == true){
       this.setData({
          isdisabled2: false,
          isdisabled1: false,
        })
      }
      else{*/
        this.setData({
          vote_A:numberA,
          isdisabled2: true,
          isdisabled1: true,
          isChecked:true,
        })
      //}
      var that = this;
      if(that.data.editTrue == false){
        that.setData({
          editTrue: true,
editTextA: '已投票',
        })
      }
      // else{
      //   that.setData({
      //       editTrue: false,
      //   })
      // } 
      },

       /*选项B*/
    show2:function(){
      var numberB = this.data.vote_B +1;
      var B_id=this.data.B_id;
      wx.request({
        url: 'http://43.142.99.39:99/vote-option/agree/'+B_id,
        method:'GET',
        header:{
          "Access-Tokon":'1'
        },
        success:(res)=>{
          console.log('success')
        },
        fail(){
          console.log('fail')
        }
      })
     /* if(this.data.isdisabled1 == true){
        this.setData({
           isdisabled1: false,
         })
       }
       else{*/
         this.setData({
           vote_B:numberB,
           isdisabled1: true,
           isdisabled2: true,
         })
      // }
      var that = this;
      if(that.data.editTrue == false)
        that.setData({
          editTrue: true,
          editTextB: '已投票',
        })
        // else {
        //   that.setData({
        //     editTrue: false,
        //   })
        // }
    }
  
  })
  







