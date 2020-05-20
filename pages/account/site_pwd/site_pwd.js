// pages/account/site_pwd/site_pwd.js
Page({

  /**
    * 页面的初始数据
    */
  data: {

  },

  form_submit: function (e) { //修改默认密码
    var password = e.detail.value.password;
    wx.request({
      url: wx.getStorageSync('host') + "/" + wx.getStorageSync('user_type') + "/sitePwd/" + wx.getStorageSync('user').id, //url
      method: 'put',
      data:{
        'password':password
      },
      success:function (res){
        // console.log(res.data);
        if (res.data.status == 200) {
          wx.request({  //查询修改之后的用户信息
            url: wx.getStorageSync('host') + "/" + wx.getStorageSync('user_type') + "/get/" + wx.getStorageSync('user').id,
            method: 'GET',
            success: function (res) {
              if (res.data.status == 200) {
                wx.setStorage({
                  key: 'user',
                  data: res.data.data,
                });
              }
            }
          });

          wx.showToast({
            title: '修改成功',
            icon: 'success',
            success: function () {
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/orderform/orderform',
                })
              }, 2000);
            }
          });
        }
      }
    })


  }

})