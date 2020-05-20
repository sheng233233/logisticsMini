/**
 * 获得地区信息
 */
function get_locations_data() {
  var data = null;
  data = [
    ['龙湖校区南苑', '龙湖校区北苑', '中原校区', '西三环校区'],
    [
      ['图书馆', '3#组团楼', '南苑1号公寓', '南苑2号公寓', '南苑3号公寓', '南苑4号公寓'],
      ['1#国教楼', '北苑1号宿舍楼', '北苑2号宿舍楼', '北苑3号宿舍楼', '北苑4号宿舍楼'],
      ['图书馆', '亚太楼', '1号公寓', '2号公寓', '3号公寓', '4号公寓'],
      ['图书馆', '1号教学楼', '1号公寓(男)', '1号公寓(女)', '2号公寓', '学生餐厅']
    ]
  ]
  // data = [{
  //     'name': '龙湖校区南苑',
  //     'sub_area': [
  //       '图书馆', '3#组团楼', '南苑1号公寓', '南苑2号公寓', '南苑3号公寓', '南苑4号公寓'
  //     ]
  //   }, {
  //     'name': '龙湖校区北苑',
  //     'sub_area': [
  //       '1#国教楼', '北苑1号宿舍楼', '北苑2号宿舍楼', '北苑3号宿舍楼', '北苑4号宿舍楼'
  //     ]
  //   }, {
  //     'name': '中原校区',
  //     'sub_area': [
  //       '图书馆', '亚太楼', '1号公寓', '2号公寓', '3号公寓', '4号公寓'
  //     ]
  //   },
  //   {
  //     'name': '西三环校区',
  //     'sub_area': [
  //       '图书馆', '1号教学楼', '1号公寓(男)', '1号公寓(女)', '2号公寓', '学生餐厅'
  //     ]
  //   }
  // ]
  return data;
}

/**
 * 获得分类信息
 */
function get_sorts_data() {
  var data = null;
  data = [
    [{
      'ID': 1,
      'name': '水',
      'pid': 0
    }, {
      'ID': 2,
      'name': '电',
      'pid': 0
    }, {
      'ID': 3,
      'name': '土建',
      'pid': 0
    }, {
      'ID': 4,
      'name': '木工',
      'pid': 0
    }, {
      'ID': 5,
      'name': '暖气',
      'pid': 0
    }],
    [
      [{
        'ID': 1001,
        'name': '水龙头类',
        'pid': 1
      }, {
        'ID': 1002,
        'name': '上下水管类',
        'pid': 1
      }, {
        'ID': 1003,
        'name': '阀门类',
        'pid': 1
      }, {
        'ID': 1004,
        'name': '厕所洁具类',
        'pid': 1
      }, {
        'ID': 1005,
        'name': '下水疏通类',
        'pid': 1
      }, {
        'ID': 1006,
        'name': '其他',
        'pid': 1
      }],
      [{
        'ID': 2001,
        'name': '室内照明类',
        'pid': 2
      }, {
        'ID': 2002,
        'name': '开关插座类',
        'pid': 2
      }, {
        'ID': 2003,
        'name': '公共照明类',
        'pid': 2
      }, {
        'ID': 2004,
        'name': '电风扇类',
        'pid': 2
      }, {
        'ID': 2005,
        'name': '空调类',
        'pid': 2
      }, {
        'ID': 2006,
        'name': '其他',
        'pid': 2
      }],
      [{
        'ID': 3001,
        'name': '地板砖,踢脚线',
        'pid': 3
      }, {
        'ID': 3002,
        'name': '吊顶天花板',
        'pid': 3
      }, {
        'ID': 3003,
        'name': '墙体漆面,墙砖',
        'pid': 3
      }, {
        'ID': 3004,
        'name': '防盗网',
        'pid': 3
      }, {
        'ID': 3005,
        'name': '其他',
        'pid': 3
      }],
      [{
        'ID': 4001,
        'name': '门窗类',
        'pid': 4
      }, {
        'ID': 4002,
        'name': '床铺',
        'pid': 4
      }, {
        'ID': 4003,
        'name': '柜子桌椅',
        'pid': 4
      }, {
        'ID': 4004,
        'name': '玻璃类',
        'pid': 4
      }, {
        'ID': 4005,
        'name': '高低床铁梯',
        'pid': 4
      }, {
        'ID': 4006,
        'name': '其他',
        'pid': 4
      }],
      [{
        'ID': 5001,
        'name': '暖气不热',
        'pid': 5
      }, {
        'ID': 5002,
        'name': '暖气片漏水',
        'pid': 5
      }, {
        'ID': 5003,
        'name': '暖气片针阀门漏水',
        'pid': 5
      }, {
        'ID': 5004,
        'name': '暖气管漏水',
        'pid': 5
      }, {
        'ID': 5005,
        'name': '其他',
        'pid': 5
      }]
    ]
  ]
  return data;
}

/**
 * 提交维修工单
 */
function to_do_create(orderform) {
  var data = null;
  console.log(orderform);
  data = {
    'status': 200,
    'msg': '申请成功',
    'data': null
  }
  return data;
}

/**
 * 报修人员获得历史工单列表
 */
function get_orderform_list() {
  var user = wx.getStorageSync('user');
  var data = null;
  data = {
    "status": 200,
    "msg": "OK",
    "data": [{
      "ID": "1",
      "sort": {
        "ID": "5",
        "name": "门窗"
      },
      "description": "阳台门把手缺失螺丝一颗，导致松动",
      "repair_date": "2020/3/25 20:09:00",
      "status": "评价完成"
    }, {
      "ID": "2",
      "sort": {
        "ID": "5",
        "name": "门窗"
      },
      "description": "阳台门把手缺失螺丝一颗，导致松动",
      "repair_date": "2020/3/25 20:09:00",
      "status": "审核通过,未接单"
    }, {
      "ID": "3",
      "sort": {
        "ID": "5",
        "name": "门窗"
      },
      "description": "阳台门把手缺失螺丝一颗，导致松动",
      "repair_date": "2020/3/25 20:09:00",
      "status": "审核未通过"
      }, {
        "ID": "4",
        "sort": {
          "ID": "5",
          "name": "门窗"
        },
        "description": "阳台门把手缺失螺丝一颗，导致松动",
        "repair_date": "2020/3/25 20:09:00",
        "status": "已接单,维修中"
      }, {
        "ID": "5",
        "sort": {
          "ID": "5",
          "name": "门窗"
        },
        "description": "阳台门把手缺失螺丝一颗，导致松动",
        "repair_date": "2020/3/25 20:09:00",
        "status": "维修完成待评价"
      }]
  }

  // wx.request({
  //   url: 'http://x.x.x.x:8080/list/show/repair/'+user.ID+'/1/5',
  //   data: {
  //     page: page,
  //     condition: that.data.condition
  //   },
  //   success: (res) => {
  //     console.log(res.data.data);
  //     var data = res.data.data;
  //     wx.hideLoading();
  //     if (data.length > 0) {
  //       var orderform_list = that.data.orderform_list;
  //       for (var i = 0; i < data.length; i++) {
  //         orderform_list.push(data[i]);
  //       }
  //       that.setData({ orderform_list: orderform_list });
  //       page++;
  //     } else {
  //       isfinish = true;
  //     }
  //     wx.stopPullDownRefresh();
  //   }
  // })
  return data;
}

/**
 * 根据ID获得工单详情
 */
function get_orderform_data(ID) {
  var data = null;
  switch (ID) {
    case '1':
      {
        data = {
          "status": 200,
          "msg": "OK",
          "data": {
            "ID": ID,
            "RID": "1",
            "MID": "1",
            "sort": {
              "ID": "5",
              "name": "门窗"
            },
            "maintainer": { //状态为审核通过之前都为null
              "ID": "1",
              "username": "李四",
              "phone": "15964648553"
            },
            "comment": { //状态为评价完成之前都为null
              "ID": "1",
              "level": "5",
              "details": "维修师傅接单迅速,维修质量高,好评"
            },
            "location": "北苑6号宿舍楼a座111",
            "description": "阳台门把手缺失螺丝一颗，导致松动",
            "remarks": "无",
            "repair_image": "http://123.57.141.90/repair/2020/03/25/a3s53d2f1a.jpg",
            "maintain_image": "http://123.57.141.90/maintain/2020/03/25/adfafaffs.jpg",
            "contact_person": "张三",
            "contact_number": "15290964840",
            "repair_date": "2020/3/25 10:38:55",
            "status": "已评价"
          }
        }
      }
      break;
    case '2':
      {
        data = {
          "status": 200,
          "msg": "OK",
          "data": {
            "ID": ID,
            "RID": "1",
            "MID": "1",
            "sort": {
              "ID": "5",
              "name": "门窗"
            },
            "maintainer": null,
            "comment": null,
            "location": "北苑6号宿舍楼a座111",
            "description": "阳台门把手缺失螺丝一颗，导致松动",
            "remarks": "无",
            "repair_image": "http://123.57.141.90/repair/2020/03/25/a3s53d2f1a.jpg",
            "maintain_image": null,
            "contact_person": "张三",
            "contact_number": "15290964840",
            "repair_date": "2020/3/25 10:38:55",
            "status": "审核通过,未接单"
          }
        }
      }
      break;
    case '3':
      {
        data = {
          "status": 200,
          "msg": "OK",
          "data": {
            "ID": ID,
            "RID": "1",
            "MID": "1",
            "sort": {
              "ID": "5",
              "name": "门窗"
            },
            "maintainer": null,
            "comment": null,
            "location": "北苑6号宿舍楼a座111",
            "description": "阳台门把手缺失螺丝一颗，导致松动",
            "remarks": "无",
            "repair_image": "http://123.57.141.90/repair/2020/03/25/a3s53d2f1a.jpg",
            "maintain_image": null,
            "contact_person": "张三",
            "contact_number": "15290964840",
            "repair_date": "2020/3/25 10:38:55",
            "status": "审核未通过"
          }
        }
      }
      break;
    case '4':
      {
        data = {
          "status": 200,
          "msg": "OK",
          "data": {
            "ID": ID,
            "RID": "1",
            "MID": "1",
            "sort": {
              "ID": "5",
              "name": "门窗"
            },
            "maintainer": { //状态为审核通过之前都为null
              "ID": "1",
              "username": "李四",
              "phone": "15964648553"
            },
            "comment": null,
            "location": "北苑6号宿舍楼a座111",
            "description": "阳台门把手缺失螺丝一颗，导致松动",
            "remarks": "无",
            "repair_image": "http://123.57.141.90/repair/2020/03/25/a3s53d2f1a.jpg",
            "maintain_image": null,
            "contact_person": "张三",
            "contact_number": "15290964840",
            "repair_date": "2020/3/25 10:38:55",
            "status": "已接单,维修中"
          }
        }
      }
      break;
    case '5':
      {
        data = {
          "status": 200,
          "msg": "OK",
          "data": {
            "ID": ID,
            "RID": "1",
            "MID": "1",
            "sort": {
              "ID": "5",
              "name": "门窗"
            },
            "maintainer": { //状态为审核通过之前都为null
              "ID": "1",
              "username": "李四",
              "phone": "15964648553"
            },
            "comment": null,
            "location": "北苑6号宿舍楼a座111",
            "description": "阳台门把手缺失螺丝一颗，导致松动",
            "remarks": "无",
            "repair_image": "http://123.57.141.90/repair/2020/03/25/a3s53d2f1a.jpg",
            "maintain_image": "http://123.57.141.90/maintain/2020/03/25/adfafaffs.jpg",
            "contact_person": "张三",
            "contact_number": "15290964840",
            "repair_date": "2020/3/25 10:38:55",
            "status": "维修完成待评价"
          }
        }
      }
      break;
    default:
      {
        data = {
          "status": 200,
          "msg": "OK",
          "data": {
            "ID": ID,
            "RID": "1",
            "MID": "1",
            "sort": {
              "ID": "5",
              "name": "门窗"
            },
            "maintainer": { //状态为审核通过之前都为null
              "ID": "1",
              "username": "李四",
              "phone": "15964648553"
            },
            "comment": { //状态为评价完成之前都为null
              "ID": "1",
              "level": "5",
              "details": "维修师傅接单迅速,维修质量高,好评"
            },
            "location": "北苑6号宿舍楼a座111",
            "description": "阳台门把手缺失螺丝一颗，导致松动",
            "remarks": "无",
            "repair_image": "http://123.57.141.90/repair/2020/03/25/a3s53d2f1a.jpg",
            "maintain_image": "http://123.57.141.90/maintain/2020/03/25/adfafaffs.jpg",
            "contact_person": "张三",
            "contact_number": "15290964840",
            "repair_date": "2020/3/25 10:38:55",
            "status": "已评价"
          }
        }
      }
  }
  return data;
}

/**
 * 修改工单
 */
function to_do_update(orderform) {
  var data = null;
  console.log(orderform);
  data = {
    'status': 200,
    'msg': '修改成功',
    'data': null
  }
  return data;
}


/**
 * 删除工单
 */
function delete_orderform(LID) {
  var data = null;
  data = {
    status: 200,
    msg: '删除成功',
    data: null
  }
  return data;
}


/**
 * 评价维修
 */
function create_comment(LID, comment) {
  var data;
  console.log(LID + '  ' + comment);
  data = {
    status: 200,
    msg: '删除成功',
    data: null
  }
  return data;
}

module.exports.get_locations_data = get_locations_data;
module.exports.get_orderform_data = get_orderform_data;
module.exports.get_sorts_data = get_sorts_data;
module.exports.to_do_create = to_do_create;
module.exports.get_orderform_list = get_orderform_list;
module.exports.to_do_update = to_do_update;
module.exports.delete_orderform = delete_orderform;
module.exports.create_comment = create_comment;


/**
 * 维修人员被分配的工单列表
 */
function get_maintain_orderform_list(status) {
  var user = wx.getStorageSync('user');
  var data;
  switch (status) {
    case "allocated":
      {
        data = {
          "status": 200,
          "msg": "OK",
          "data": [{
            "ID": "2",
            "sort": {
              "ID": "5",
              "name": "门窗"
            },
            "description": "阳台门把手缺失螺丝一颗，导致松动",
            "repair_date": "2020/3/25 20:09:00",
            "status":"审核通过,未接单"
          }]
        };
      }
      break;
    case "accept":
      {
        data = {
          "status": 200,
          "msg": "OK",
          "data": [{
            "ID": "4",
            "sort": {
              "ID": "5",
              "name": "门窗"
            },
            "description": "阳台门把手缺失螺丝一颗，导致松动",
            "repair_date": "2020/3/25 20:09:00",
            "status": "已接单,维修中"
          }]
        };
      }
      break;
    case "all":
      {
        data = {
          "status": 200,
          "msg": "OK",
          "data": [{
            "ID": "5",
            "sort": {
              "ID": "5",
              "name": "门窗"
            },
            "description": "阳台门把手缺失螺丝一颗，导致松动",
            "repair_date": "2020/3/25 20:09:00",
            "status":"维修完成待评价"
          },{
              "ID": "1",
              "sort": {
                "ID": "5",
                "name": "门窗"
              },
              "description": "阳台门把手缺失螺丝一颗，导致松动",
              "repair_date": "2020/3/25 20:09:00",
              "status": "评价完成"
            }]
        };
      }
      break;
      default :{
      data = {
        "status": 200,
        "msg": "OK",
        "data": [{
          "ID": "2",
          "sort": {
            "ID": "5",
            "name": "门窗"
          },
          "description": "阳台门把手缺失螺丝一颗，导致松动",
          "repair_date": "2020/3/25 20:09:00",
          "status": "审核通过,未接单"
        }]
      };
      }break;
  }
  
  return data;
}



/**
 * 发送请求,接受订单
 */
function accept_orderform(OID) {
  console.log(OID);
  var data;
  data = {
    status: 200,
    msg: '成功接单',
    data: {
      'status': '已接单,维修中'
    }
  }

  return data;

}

/**
 * 更新维修完成图片路径
 */
function after_img(OID, maintain_image){
  console.log(OID+' '+maintain_image);
  var data;
  data = {
    status: 200,
    msg: 'OK',
    data: {
      'status': '已完成维修,报送配件中'
    }
  }
  return data;
}

/**
 * 报送配件
 */
function upload_parts(OID, parts){
  console.log(OID + ' ' + parts);
  var data;
  data = {
    status: 200,
    msg: 'OK',
    data: {
      'status': '维修完成待评价'
    }
  }
  return data;
}


module.exports.get_maintain_orderform_list = get_maintain_orderform_list;
module.exports.accept_orderform = accept_orderform;
module.exports.after_img = after_img;
module.exports.upload_parts = upload_parts;
