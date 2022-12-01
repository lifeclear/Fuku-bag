// pages/person/task/task.js
Page({
    data: {
        show_index:0,
        List_my_sent:[ [] , [] , [] , [] ],
        List_my_accept:[ [] , [] , [] , [] ],
        sponsorId_local:1,
        recipientId_local:1,
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
            url:'http://43.142.99.39:99/errand/findPage', //必填，其他的都可以不填
            data:{  
              sponsorId:this.data.sponsorId_local
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
              console.log("获取我发布的任务成功，1:",that.data.List_my_sent);
          },
          fail:function(res){  
              console.log(res)
          },
          complete:function(){   
               console.log('sent1 complete')   
          }
        }),
        
        wx.request({
          url:'http://43.142.99.39:99/errand/findPage', //必填，其他的都可以不填
          data:{  
            sponsorId:this.data.sponsorId_local,
            status:0
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
            console.log("获取我发布的任务成功，2:",that.data.List_my_sent);
        },
        fail:function(res){  
            console.log(res)
        },
        complete:function(){   
             console.log('sent2 complete')   
        }
        }),

        wx.request({
        url:'http://43.142.99.39:99/errand/findPage', //必填，其他的都可以不填
        data:{  
          sponsorId:this.data.sponsorId_local,
          status:1
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
          console.log("获取我发布的任务成功，3:",that.data.List_my_sent);
      },
      fail:function(res){  
          console.log(res)
      },
      complete:function(){   
           console.log('sent3 complete')   
      }
        }),

        wx.request({
          url:'http://43.142.99.39:99/errand/findPage', //必填，其他的都可以不填
          data:{  
            sponsorId:this.data.sponsorId_local,
            status:2
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
            console.log("获取我发布的任务成功，4:",that.data.List_my_sent);
        },
        fail:function(res){  
            console.log(res)
        },
        complete:function(){   
             console.log('sent4 complete')   
        }
          }),
        //我发布的四种类型 end

        //我接受的四种类型 start
        wx.request({
            url:'http://43.142.99.39:99/errand/findPage', //必填，其他的都可以不填
            data:{  
              recipientId:this.data.recipientId_local
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
                 "List_my_accept[0]" : records
              })
              console.log("获取我接受的任务成功，1:",that.data.List_my_accept);
          },
          fail:function(res){  
              console.log(res)
          },
          complete:function(){   
               console.log('acc1 complete')   
          }
        }),

        wx.request({
            url:'http://43.142.99.39:99/errand/findPage', //必填，其他的都可以不填
            data:{  
              recipientId:this.data.recipientId_local,
              status:0
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
                 "List_my_accept[1]" : records
              })
              console.log("获取我接受的任务成功，2:",that.data.List_my_accept);
          },
          fail:function(res){  
              console.log(res)
          },
          complete:function(){   
               console.log('acc2 complete')   
          }
        }),

        wx.request({
            url:'http://43.142.99.39:99/errand/findPage', //必填，其他的都可以不填
            data:{  
              recipientId:this.data.recipientId_local,
              status:1
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
                 "List_my_accept[2]" : records
              })
              console.log("获取我接受的任务成功，2:",that.data.List_my_accept);
          },
          fail:function(res){  
              console.log(res)
          },
          complete:function(){   
               console.log('acc3 complete')   
          }
        }),

        wx.request({
            url:'http://43.142.99.39:99/errand/findPage', //必填，其他的都可以不填
            data:{  
              recipientId:this.data.recipientId_local,
              status:2
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
                 "List_my_accept[3]" : records
              })
              console.log("获取我接受的任务成功，3:",that.data.List_my_accept);
          },
          fail:function(res){  
              console.log(res)
          },
          complete:function(){   
               console.log('acc3 complete')   
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