// pages/repair/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    can_register: false,
    username: false,
    phone: false,
    password: false,
    check: false
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
    this.setData({
      phone: phone
    });
    return true;
  },

  check_password: function(e) {
    // console.log(e.detail.value);
    var password = e.detail.value;
    if (password == '' || password == null) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return false;
    } else {
      this.setData({
        password: password
      });
    }
    return true;
  },

  check_check: function(e) {
    // console.log(e.detail.value);
    var check = e.detail.value;
    if (check == '' || check == null) {
      wx.showToast({
        title: '确认密码不能为空',
        icon: 'none'
      })
      return false;
    } else if (this.data.password != check) {
      wx.showToast({
        title: '密码输入不一致',
        icon: 'none'
      })
      return false;
    }
    return true;
  },



  get_check_username: function(event) {
    let that = this;
    var username = event.detail.value;
    if (username == null || username == '') {
      return
    }

    //检查用户名是否可用
    //向后端发送请求
    wx.request({ //使用ajax请求服务
      url: wx.getStorageSync('host') + "/"+wx.getStorageSync('user_type')+"/check/" + username + "/1", //url
      method: 'GET', //请求方式
      header: {
        'Content-Type': 'application/json',
      },
      data: {},
      success: function(res) {
        if (res.data.status == 200) {
          var useable = res.data.data;
          if (!useable) {
            wx.showToast({
              title: '该用户名已被使用',
              icon: 'none'
            });

            return false;
          } else {
            that.setData({
              username: username,
              can_register: true
            })
          }

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

  register: function() {
    let that = this;
    var username = that.data.username;
    var password = that.data.password;
    var phone = that.data.phone;

    if (username == null || password == null || phone == null) {
      wx.showToast({
        title: '请完整填写信息！',
        icon: 'none',
        duration: 1500
      });
      return false;
    }
    if (username == '' || password == '' || phone == '') {
      wx.showToast({
        title: '请完整填写信息！',
        icon: 'none',
        duration: 1500
      });
      return false;
    }
    //注册
    //向后端发送请求
    wx.request({ //使用ajax请求服务
      url: wx.getStorageSync('host') + "/repair/register", //url
      method: 'POST', //请求方式
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        "username": username,
        "phone": phone,
        "password": password
      },
      success: function(res) {
        if (res.data.status == 200) {
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            success: function() {
              setTimeout(function() {
                wx.redirectTo({
                  url: '/pages/login/login',
                })
              }, 1000)
            }
          })

        } else {
          wx.showToast({
            title: '注册失败,请稍后重试',
            icon: 'none'
          })
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



  formSubmit: function(e) {

    let that = this;

    var username = e.detail.value.username;
    var password = e.detail.value.password;
    var check = e.detail.value.check;
    var phone = e.detail.value.phone;

    if (username == null || password == null || check == null || phone == null) {
      wx.showToast({
        title: '请完整填写信息！',
        icon: 'none',
        duration: 1500
      });
      return false;
    }
    if (username == '' || password == '' || check == '' || phone == '') {
      wx.showToast({
        title: '请完整填写信息！',
        icon: 'none',
        duration: 1500
      });
      return false;
    }

    if (check != password) {
      wx.showToast({
        title: '两次输入密码不一致！',
        icon: 'none',
        duration: 1500
      });
      return false;
    }



    //检查用户名是否可用
    //向后端发送请求
    wx.request({ //使用ajax请求服务
      url: wx.getStorageSync('host') + "/repair/check/" + username + "/1", //url
      method: 'GET', //请求方式
      header: {
        'Content-Type': 'application/json',
      },
      data: {},
      success: function(res) {
        if (res.data.status == 200) {
          var useable = res.data.data;
          if (!useable) {
            wx.showModal({
              title: '错误',
              content: '该用户名已被使用,请重新注册',
              confirmColor: '#b02923',
              showCancel: false
            });
            return false;
          } else {

          }


        } else {
          wx.showToast({
            title: '注册失败,请稍后重试',
            icon: 'none'
          })
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
  goToLogin: function() {
    wx.redirectTo({
      url: '/pages/login/login',
    })
  }
})