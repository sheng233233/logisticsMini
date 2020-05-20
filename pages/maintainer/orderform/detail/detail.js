// pages/maintainer/orderform/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderform: null,     //页面数据
    can_accept: false,   //是否显示接受选项
    can_done: false,      //是否显示完成维修
    star: 0,//点亮的星星数
    star_g: 5,//没有点亮的星星数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.ID);
    var oid = options.ID;
    console.log(oid)
    let that = this;
    //向后端发送请求
    wx.request({ //使用ajax请求服务
      url: wx.getStorageSync('host') + "/orderform/details/" + oid, //url
      method: 'GET', //请求方式
      header: {
        'Content-Type': 'application/json',
      },
      data: {},
      success: function (res) {
        if (res.data.status == 200) {
          var orderform_result = res.data;
          var level = orderform_result.data.comment != null ? Number(orderform_result.data.comment.level) : 0;
          that.setData({
            orderform: orderform_result.data,
            star: level,
            star_g: 5 - level
          })
          var orderform_status = orderform_result.data.status;
          switch (orderform_status) {
            case "未审核":
            case "审核未通过":
            case "审核通过": {
              that.setData({
                can_accept: false,
                can_done: false
              })
            } break;
            case "审核通过,未接单": {
              that.setData({  //显示接受按钮
                can_accept: true,
                can_done: false
              })
            } break;
            case "已接单,维修中": {
              that.setData({  //显示维修完成按钮
                can_accept: false,
                can_done: true
              })
            } break;
          }
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  accept_orderform: function () {
    let that = this;
    var oid = this.data.orderform.ID;

    //向后端发送请求
    wx.request({ //使用ajax请求服务
      url: wx.getStorageSync('host') + "/orderform/receipt/" + that.data.orderform.ID, //url
      method: 'PUT', //请求方式
      header: {
        'Content-Type': 'application/json',
      },
      data: {},
      success: function (res) {
        if (res.data.status == 200) {
          wx.showToast({
            title: '成功接单!',
            icon: 'success'
          })
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/orderform/orderform',
            })
          }, 1000);

        } else {
          wx.showToast({
            title: '接单失败\n请稍后重试',
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


  to_done_orderform: function () {
    wx.navigateTo({
      url: '../done/done?ID=' + this.data.orderform.ID,
    })
  }

})