// pages/person/task/task.js
Page({
    data: {
        show_index:1,
        List_my_sent:[ [] , [] , [] , [] ],
        List_my_accept:[ [] , [] , [] , [] ],
        sponsorId_local:1,
        recipientId_local:1,
        user_id:1,
        Ac_id:0,
        Sent_id:0
    },
    onChangeIndex:function(event){
        const id = event.currentTarget.dataset.id;
        this.setData({
            show_index:1-id
        })
    },
    onShow(){
        const that = this;
        //我发布的四种类型 start
        wx.request({
            url:'http://43.142.99.39:99/vote/findPage', //必填，其他的都可以不填
            data:{  
              user_id:that.data.user_id,
              label:"生活"
         },
          header:{  
             'content-type':'application/json',
             'Access-Token':'1'
          },
          method:'post',
          dataType:'JSON',
          responseType:'text', 
          success:function(res){
              let tmp = JSON.parse(res.data);
              let records = tmp.item.page.records;
              that.setData({
                 "List_my_sent[0]" : records
              })
              console.log("获取我发布的投票成功，1:",that.data.List_my_sent);
          },
          fail:function(res){  
              console.log(res)
          },
          complete:function(){   
               console.log('sent1 complete')   
          }
        }),
        
        wx.request({
            url:'http://43.142.99.39:99/vote/findPage', //必填，其他的都可以不填
            data:{  
              user_id:this.data.user_id,
              label:"情感"
         },
          header:{  
             'content-type':'application/json',
             'Access-Token':'1'
          },
          method:'post',
          dataType:'JSON',
          responseType:'text', 
          success:function(res){
              let tmp = JSON.parse(res.data);
              let records = tmp.item.page.records;
              that.setData({
                 "List_my_sent[1]" : records
              })
              console.log("获取我发布的投票成功，2:",that.data.List_my_sent);
          },
          fail:function(res){  
              console.log(res)
          },
          complete:function(){   
               console.log('sent2 complete')   
          }
        }),

        wx.request({
            url:'http://43.142.99.39:99/vote/findPage', //必填，其他的都可以不填
            data:{  
              user_id:this.data.user_id,
              label:"学习"
         },
          header:{  
             'content-type':'application/json',
             'Access-Token':'1'
          },
          method:'post',
          dataType:'JSON',
          responseType:'text', 
          success:function(res){
              let tmp = JSON.parse(res.data);
              let records = tmp.item.page.records;
              that.setData({
                 "List_my_sent[2]" : records
              })
              console.log("获取我发布的投票成功，3:",that.data.List_my_sent);
          },
          fail:function(res){  
              console.log(res)
          },
          complete:function(){   
               console.log('sent3 complete')   
          }
        }),

        wx.request({
            url:'http://43.142.99.39:99/vote/findPage', //必填，其他的都可以不填
            data:{  
              user_id:this.data.user_id,
              label:"其他"
         },
          header:{  
             'content-type':'application/json',
             'Access-Token':'1'
          },
          method:'post',
          dataType:'JSON',
          responseType:'text', 
          success:function(res){
              let tmp = JSON.parse(res.data);
              let records = tmp.item.page.records;
              that.setData({
                 "List_my_sent[3]" : records
              })
              console.log("获取我发布的投票成功，3:",that.data.List_my_sent);
          },
          fail:function(res){  
              console.log(res)
          },
          complete:function(){   
               console.log('sent3 complete')   
          }
        }),
        //我发布的四种类型 end

        //我参与的四种类型 start
        wx.request({
            url:'http://43.142.99.39:99/vote/myVoted' ,//必填，其他的都可以不填
            data:{  
                userId:"1",
                label:"生活"
         },
          header:{  
             'content-type':'application/json',
             'Access-Token':'1'
          },
          method:'POST',
          dataType:'JSON',
          responseType:'text', 
          success:function(res){
              let tmp = JSON.parse(res.data);

              that.setData({
                 "List_my_accept[0]" : tmp.item.voted
              })
              console.log("🎉获取我参与的投票成功，1:",that.data.List_my_accept);
          },
          fail:function(res){  
              console.log(res)
          },
          complete:function(){   
               console.log('in1 complete')   
          }
        }),
        wx.request({
            url:'http://43.142.99.39:99/vote/myVoted' ,//必填，其他的都可以不填
            data:{  
                userId:that.data.user_id,
                label:"情感"
         },
          header:{  
             'content-type':'application/json',
             'Access-Token':'1'
          },
          method:'POST',
          dataType:'JSON',
          responseType:'text', 
          success:function(res){
              let tmp = JSON.parse(res.data);
              that.setData({
                 "List_my_accept[1]" : tmp.item.voted
              })
              console.log("🎉获取我参与的投票成功，2:",that.data.List_my_accept);
          },
          fail:function(res){  
              console.log(res)
          },
          complete:function(){   
               console.log('in2 complete')   
          }
        }),
        wx.request({
            url:'http://43.142.99.39:99/vote/myVoted' ,//必填，其他的都可以不填
            data:{  
                userId:that.data.user_id,
                label:"学习"
         },
          header:{  
             'content-type':'application/json',
             'Access-Token':'1'
          },
          method:'POST',
          dataType:'JSON',
          responseType:'text', 
          success:function(res){
              let tmp = JSON.parse(res.data);
              that.setData({
                 "List_my_accept[2]" : tmp.item.voted
              })
              console.log("🎉获取我参与的投票成功，3:",that.data.List_my_accept);
          },
          fail:function(res){  
              console.log(res)
          },
          complete:function(){   
               console.log('in3 complete')   
          }
        }),
        wx.request({
            url:'http://43.142.99.39:99/vote/myVoted' ,//必填，其他的都可以不填
            data:{  
                userId:that.data.user_id,
                label:"其他"
         },
          header:{  
             'content-type':'application/json',
             'Access-Token':'1'
          },
          method:'POST',
          dataType:'JSON',
          responseType:'text', 
          success:function(res){
              let tmp = JSON.parse(res.data);
              that.setData({
                 "List_my_accept[3]" : tmp.item.voted
              })
              console.log("🎉获取我参与的投票成功，4:",that.data.List_my_accept);
          },
          fail:function(res){  
              console.log(res)
          },
          complete:function(){   
               console.log('in4 complete')   
          }
        })
        //我接受的四种类型 end
    },
    onChange_Ac_id:function(res){
        let id = res.currentTarget.dataset.id;
        this.setData({
            Ac_id:id
        })
    },
    onChange_Sent_id:function(res){
        let id = res.currentTarget.dataset.id;
        this.setData({
            Sent_id:id
        })
    }
})