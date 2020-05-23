// pages/repair/orderform/detail/detail.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    repair_image: [],
    maintain_image: [],
    orderform: null,
    can_edit_delete: false,
    can_comment: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options.ID);
    var oid = options.ID;
    // console.log(oid)
    let that = this;
    //向后端发送请求
    wx.request({ //使用ajax请求服务
      url: wx.getStorageSync('host') + "/orderform/details/"+ oid, //url
      method: 'GET', //请求方式
      header: {
        'Content-Type': 'application/json',
      },
      data: {},
      success: function(res) {
        if (res.data.status == 200) {
          // console.log(res.data.data)
          var repair_image = res.data.data.repair_image;
          var maintain_image = res.data.data.maintain_image;

          that.setData({
            repair_image: [{ url: repair_image}],
            maintain_image: [{ url: maintain_image }],
            orderform: res.data.data
          });

          var orderform_status = res.data.data.status;

          switch (orderform_status) {
            case "未审核":
            case "审核未通过":
              {
                that.setData({
                  can_edit_delete: true,
                  can_comment: false
                })
              }
              break;
            case "审核通过":
            case "审核通过,未接单":
            case "已接单,维修中":
            case "已评价":
              {
                that.setData({
                  can_edit_delete: false,
                  can_comment: false
                })
              }
              break;
            case "维修完成待评价":
              {
                that.setData({
                  can_edit_delete: false,
                  can_comment: true
                })
              }
              break;
          }


        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
        }

      },
      fail: function() {
        app.consoleLog("请求数据失败");
      },
      complete: function() {
        // complete 
      }
    })


  },

  listenerButtonPreviewImage: function(event){
    var url = event.target.dataset.url;
    let that = this;
    wx.previewImage({
      urls: [url],
    })
  },

  toEditOrderform: function() {
    wx.navigateTo({
      url: '../edit/edit?ID=' + this.data.orderform.ID,
    })
  },

  toDeleteOrderform: function() {

    //向后端发送请求
    wx.request({ //使用ajax请求服务
      url: wx.getStorageSync('host') + "/orderform/" + this.data.orderform.ID, //url
      method: 'DELETE', //请求方式
      header: {
        'Content-Type': 'application/json',
      },
      data: {},
      success: function (res) {
        if (res.data.status == 200) {
          wx.showToast({
            title: '删除成功!',
            icon: 'success',
            success: function () {
              setTimeout(function () {
                wx.redirectTo({
                  url: '/pages/repair/orderform/history/history'
                })
              }, 1000)
            }
          });

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
        }

      },
      fail: function () {
        app.consoleLog("请求数据失败");
      },
      complete: function () {
        // complete 
      }
    })
  },

  toComment: function() {
    wx.navigateTo({
      url: '../comment/comment?ID=' + this.data.orderform.ID,
    })
  }

})