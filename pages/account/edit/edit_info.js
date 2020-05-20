// pages/account/edit/edit_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    user_type: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this;
    that.setData({
      user: wx.getStorageSync('user')
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  formSubmit: function(e) { //修改信息
    let that = this;

    var id = wx.getStorageSync('user').id;
    var password = wx.getStorageSync('user').password;
    var username = e.detail.value.username;
    var phone = e.detail.value.phone;
    var user_type = wx.getStorageSync('user_type')

    //修改信息
    //向后端发送请求
    wx.request({ //使用ajax请求服务
      url: wx.getStorageSync('host') + "/" + wx.getStorageSync('user_type') + "/update/" + id, //url
      method: 'POST', //请求方式
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        "username": username,
        "phone": phone
      },
      success: function (res) {
        if (res.data.status == 200) {
          console.log(res.data.data);
          wx.setStorage({
            key: 'user',
            data: res.data.data, //将修改后的用户信息存入
          });

          wx.showToast({
            title: '修改成功',
            icon: 'success',
            success: function () {
              setTimeout(function () {
                wx.switchTab({
                  url: '../account',
                })
              }, 1000)
            }
          });
        } else {
          wx.showToast({
            title: '修改失败,请稍后重试',
            icon: 'none'
          })
        }
      },
    })





    // //检查用户名是否可用
    // //向后端发送请求
    // wx.request({ //使用ajax请求服务
    //   url: wx.getStorageSync('host') + "/repair/check/" + username + "/1", //url
    //   method: 'GET', //请求方式
    //   header: {
    //     'Content-Type': 'application/json',
    //   },
    //   data: {},
    //   success: function(res) {
    //     if (res.data.status == 200) {
    //       var useable = res.data.data;
    //       if (!useable) {
    //         wx.showModal({
    //           title: '错误',
    //           content: '该用户名已被使用',
    //           confirmColor: '#b02923',
    //           showCancel: false
    //         });
    //         return false;
    //       } else {
            
    //       }
    //     }
    //   },
    //   fail: function() {
    //     app.consoleLog("请求数据失败");
    //   },
    //   complete: function() {
    //     // complete 
    //   }
    // })





  },


  check_username: function(e) {
    // console.log(e.detail.value);
    var username = e.detail.value;
    if (username == '' || username == null) {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none'
      })
      return false;
    }
    return true;
  },

  check_phone: function(e) {
    // console.log(e.detail.value);
    var phone = e.detail.value;
    if (phone == '' || phone == null) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(phone)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    return true;
  },
});