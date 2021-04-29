const menuItems = [{
    "id": 1,
    "parentId": 0,
    "childNodes": [

    ],
    "name": "首页",
    "icon": "&#xe61f;",
    "sort": 0,
    "hidden": 0,
    "path": "/home"
  },

  // {
  //   "id": 50,
  //   "name": "库存管理",
  //   "code": "inventoryManagement",
  //   "path": "/inventoryManagement",
  //   "parentId": 0,
  //   "sort": 0,
  //   "hidden": 0,
  //   "icon": "&#xe7d3;",
  //   "childNodes": [{
  //       "id": 51,
  //       "parentId": 50,
  //       "childNodes": [],
  //       "name": "仓库管理",
  //       "icon": "",
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/warehouseManagement"
  //     },
  //     {
  //       "id": 58,
  //       "parentId": 50,
  //       "childNodes": [],
  //       "name": "直进直出",
  //       "icon": "",
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/outAndIn"
  //     },
  //     {
  //       "id": 584,
  //       "parentId": 50,
  //       "childNodes": [],
  //       "name": "直进直出-编辑",
  //       "icon": "",
  //       "sort": 0,
  //       "hidden": 1,
  //       "path": "/outAndIn/edit"
  //     },
  //     {
  //       "id": 584,
  //       "parentId": 50,
  //       "childNodes": [],
  //       "name": "直进直出-编辑",
  //       "icon": "",
  //       "sort": 0,
  //       "hidden": 1,
  //       "path": "/outAndIn/edit"
  //     },
  //     {
  //       "id": 54,
  //       "parentId": 50,
  //       "childNodes": [],
  //       "name": "物资领用",
  //       "icon": "",
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/materialRequisition"
  //     },
  //     {
  //       "id": 541,
  //       "parentId": 50,
  //       "childNodes": [],
  //       "name": "物资领用审批",
  //       "icon": "",
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/materialRequisition/examinelist"
  //     },
  //     {
  //       "id": 55,
  //       "parentId": 50,
  //       "childNodes": [],
  //       "name": "物资退库",
  //       "icon": "",
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/materialWithdrawal"
  //     },
  //     {
  //       "id": 542,
  //       "parentId": 50,
  //       "childNodes": [],
  //       "name": "物资退库审批",
  //       "icon": "",
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/materialWithdrawal/examineList"
  //     },
  //     {
  //       "id": 51,
  //       "parentId": 50,
  //       "childNodes": [],
  //       "name": "库存查询",
  //       "icon": "",
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/inventoryInfo"
  //     },
  //     {
  //       "id": 52,
  //       "parentId": 50,
  //       "childNodes": [],
  //       "name": "库存明细帐查询",
  //       "icon": "",
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/inventoryQuery"
  //     },
  //     {
  //       "id": 53,
  //       "parentId": 50,
  //       "childNodes": [],
  //       "name": "库存调拨",
  //       "icon": "",
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/allocate"
  //     },
  //     {
  //       "id": 54,
  //       "parentId": 50,
  //       "childNodes": [],
  //       "name": "库存调拨确认",
  //       "icon": "",
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/allocatesure"
  //     },
  //     {
  //       "id": 55,
  //       "parentId": 50,
  //       "childNodes": [],
  //       "name": "库存盘点",
  //       "icon": "",
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/warehouseCheck"
  //     },
  //     {
  //       "id": 56,
  //       "parentId": 50,
  //       "childNodes": [],
  //       "name": "物料消耗分析报表",
  //       "icon": "",
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/analysisReport"
  //     },
  //   ]
  // },

  // {
  //   "id": 2,
  //   "parentId": 0,
  //   "name": "采购业务",
  //   "icon": "",
  //   "sort": 0,
  //   "hidden": 0,
  //   "path": "/procurementBusiness",
  //   "childNodes": [{
  //       "id": 3,
  //       "parentId": 2,
  //       "name": "采购申请",
  //       "icon": "&#xe625;",
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/purchaseRequisition",
  //       "childNodes": [],
  //     },

  //     {
  //       "id": 4,
  //       "parentId": 2,
  //       "childNodes": [],
  //       "name": "采购申请审批",
  //       "icon": "&#xe632;",
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/purchaseApproval"
  //     },
  //     {
  //       "id": 532,
  //       "parentId": 2,
  //       "childNodes": [],
  //       "name": "采购订单",
  //       "icon": "&#xe623;",
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/purchaseOrder"
  //     },
  //     {
  //       "id": 533,
  //       "parentId": 2,
  //       "childNodes": [],
  //       "name": "采购订单审批",
  //       "icon": "&#xe623;",
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/purchaseOrderApproval"
  //     },
  //     {
  //       "id": 5,
  //       "parentId": 2,
  //       "childNodes": [],
  //       "name": "采购收货",
  //       "icon": "&#xe623;",
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/purchaseReceipt"
  //     },
  //     {
  //       "id": 8,
  //       "parentId": 2,
  //       "childNodes": [],
  //       "name": "采购退货",
  //       "icon": "",
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/purchaseReturns"
  //     },
  //     {
  //       "id": 11,
  //       "parentId": 2,
  //       "childNodes": [],
  //       "name": "采购退货审批",
  //       "icon": "",
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/returnApproval"
  //     },
  //     {
  //       "id": 33,
  //       "parentId": 2,
  //       "childNodes": [],
  //       "name": "采购发票维护",
  //       "icon": "",
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/purchaseInvoice"
  //     },
  //     {
  //       "id": 33,
  //       "parentId": 2,
  //       "childNodes": [],
  //       "name": "维护",
  //       "icon": "",
  //       "sort": 0,
  //       "hidden": 1,
  //       "path": "/purchaseInvoice/setting"
  //     },
  //   ]
  // },
  // {
  //   "id": 30,
  //   "parentId": 0,
  //   "name": "维修业务",
  //   "icon": "&#xe634;",
  //   "sort": 0,
  //   "hidden": 0,
  //   "path": "/repairRegister",
  //   "childNodes": [{
  //       "id": 31,
  //       "parentId": 30,
  //       "childNodes": [],
  //       "name": "报修登记",
  //       "icon": null,
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/repairRegister"
  //     },
  //     {
  //       "id": 32,
  //       "parentId": 30,
  //       "childNodes": [],
  //       "name": "工单受理",
  //       "icon": null,
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/workAccept"
  //     },
  //     {
  //       "id": 33,
  //       "parentId": 30,
  //       "childNodes": [],
  //       "name": "任务派发",
  //       "icon": null,
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/taskSell"
  //     },
  //     {
  //       "id": 34,
  //       "parentId": 30,
  //       "childNodes": [],
  //       "name": "工单派工",
  //       "icon": null,
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/taskWorker"
  //     },
  //     {
  //       "id": 35,
  //       "parentId": 30,
  //       "childNodes": [],
  //       "name": "服务评价",
  //       "icon": null,
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/serveEvaluate"
  //     },
  //     {
  //       "id": 36,
  //       "parentId": 30,
  //       "childNodes": [],
  //       "name": "工单综合查询",
  //       "icon": null,
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/workSearch"
  //     },
  //     {
  //       "id": 37,
  //       "parentId": 30,
  //       "childNodes": [],
  //       "name": "我的维修",
  //       "icon": null,
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/myRepair"
  //     },
  //     {
  //       "id": 38,
  //       "parentId": 30,
  //       "childNodes": [],
  //       "name": "维修工管理",
  //       "icon": null,
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/workerManage"
  //     },
  //     {
  //       "id": 39,
  //       "parentId": 30,
  //       "childNodes": [],
  //       "name": "班组任务表",
  //       "icon": null,
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/teamTask"
  //     },
  //     {
  //       "id": 40,
  //       "parentId": 30,
  //       "childNodes": [],
  //       "name": "电子屏显示",
  //       "icon": null,
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/ledShow"
  //     },
  //   ]
  // },
  // {
  //   "id": 12,
  //   "parentId": 0,
  //   "name": "意见反馈",
  //   "icon": "&#xe615;",
  //   "sort": 0,
  //   "hidden": 0,
  //   "path": "/feedback",
  //   "childNodes": [{
  //     "id": 13,
  //     "parentId": 12,
  //     "childNodes": [],
  //     "name": "意见反馈",
  //     "icon": null,
  //     "sort": 0,
  //     "hidden": 0,
  //     "path": "/customerFeedback"
  //   }, ]
  // },
  // {
  //   "id": 43,
  //   "parentId": 0,
  //   "name": "后勤设备管理",
  //   "icon": "&#xe655;",
  //   "sort": 0,
  //   "hidden": 0,
  //   "path": "/logisticsEquipment",
  //   "childNodes": [{
  //     "id": 13,
  //     "parentId": 43,
  //     "childNodes": [],
  //     "name": "设备分类",
  //     "icon": null,
  //     "sort": 0,
  //     "hidden": 0,
  //     "path": "/equipmentClass"
  //   }, {
  //     "id": 14,
  //     "parentId": 43,
  //     "childNodes": [],
  //     "name": "设备档案",
  //     "icon": null,
  //     "sort": 0,
  //     "hidden": 0,
  //     "path": "/equipmentRecord"
  //   }, {
  //     "id": 15,
  //     "parentId": 43,
  //     "childNodes": [],
  //     "name": "设备参数",
  //     "icon": null,
  //     "sort": 0,
  //     "hidden": 0,
  //     "path": "/equipmentParameter"
  //   }, {
  //     "id": 16,
  //     "parentId": 43,
  //     "childNodes": [],
  //     "name": "设备报表",
  //     "icon": null,
  //     "sort": 0,
  //     "hidden": 0,
  //     "path": "/equipmentReport"
  //   }]
  // },
  // {
  //   "id": 60,
  //   "parentId": 0,
  //   "name": "陪检运送",
  //   "icon": "&#xe64f;",
  //   "sort": 0,
  //   "hidden": 0,
  //   "path": "/transport",
  //   "childNodes": [{
  //       "id": 601,
  //       "parentId": 60,
  //       "name": "任务登记",
  //       "icon": null,
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/projectRegister",
  //       "childNodes": [],
  //     },
  //     {
  //       "id": 602,
  //       "parentId": 60,
  //       "name": "任务受理",
  //       "icon": null,
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/projectAccept",
  //       "childNodes": [],
  //     },
  //     {
  //       "id": 603,
  //       "parentId": 60,
  //       "name": "任务派工",
  //       "icon": null,
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/projectDispatch",
  //       "childNodes": [],
  //     },
  //     {
  //       "id": 604,
  //       "parentId": 60,
  //       "name": "任务完工",
  //       "icon": null,
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/projectComplete",
  //       "childNodes": [],
  //     },
  //     {
  //       "id": 605,
  //       "parentId": 60,
  //       "name": "我的任务",
  //       "icon": null,
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/myProject",
  //       "childNodes": [],
  //     },
  //     {
  //       "id": 606,
  //       "parentId": 60,
  //       "name": "班组任务表",
  //       "icon": null,
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/taskList",
  //       "childNodes": [],
  //     },
  //     {
  //       "id": 607,
  //       "parentId": 60,
  //       "name": "陪检嘱托",
  //       "icon": null,
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/entrust",
  //       "childNodes": [],
  //     },
  //     {
  //       "id": 608,
  //       "parentId": 60,
  //       "name": "护工管理",
  //       "icon": null,
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/nursing",
  //       "childNodes": [],
  //     },
  //     {
  //       "id": 609,
  //       "parentId": 60,
  //       "name": "负责病区",
  //       "icon": null,
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/inchargeWard",
  //       "childNodes": [],
  //     },
  //     {
  //       "id": 610,
  //       "parentId": 60,
  //       "name": "综合查询",
  //       "icon": null,
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/compreInquiry",
  //       "childNodes": [],
  //     },
  //     {
  //       "id": 701,
  //       "parentId": 60,
  //       "name": "科室报表",
  //       "icon": null,
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/departmentReport",
  //       "childNodes": [],
  //     },
  //     {
  //       "id": 702,
  //       "parentId": 60,
  //       "name": "电子屏显示",
  //       "icon": null,
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/screenShow",
  //       "childNodes": [],
  //     },
  //     {
  //       "id": 703,
  //       "parentId": 60,
  //       "name": "陪检运送功能设置",
  //       "icon": null,
  //       "sort": 0,
  //       "hidden": 0,
  //       "path": "/functionSetUp",
  //       "childNodes": [],
  //     },
  //   ]
  // },

  // {
  //   "id": 26,
  //   "name": "系统设置",
  //   "code": "system",
  //   "path": "/system",
  //   "parentId": 0,
  //   "sort": 0,
  //   "hidden": 0,
  //   "icon": "&#xe644;",
  //   "childNodes": [{
  //       "id": 260,
  //       "name": "厂商管理",
  //       "path": "/manufacturerInformation",
  //       "parentId": 26,
  //       "sort": 0,
  //       "hidden": 0,
  //       "icon": null,
  //       "childNodes": []
  //     },
  //     {
  //       "id": 261,
  //       "name": "供应商管理",
  //       "path": "/supplierInformation",
  //       "parentId": 26,
  //       "sort": 0,
  //       "hidden": 0,
  //       "icon": null,
  //       "childNodes": []
  //     },
  //     {
  //       "id": 262,
  //       "name": "物资分类",
  //       "path": "/materialClassification",
  //       "parentId": 26,
  //       "sort": 0,
  //       "hidden": 0,
  //       "icon": null,
  //       "childNodes": []
  //     },
  //     {
  //       "id": 263,
  //       "name": "物资信息",
  //       "path": "/materialInformation",
  //       "parentId": 26,
  //       "sort": 0,
  //       "hidden": 0,
  //       "icon": null,
  //       "childNodes": []
  //     },
  //     {
  //       "id": 264,
  //       "name": "审批流程设置",
  //       "path": "/approvalProcessSettings",
  //       "parentId": 26,
  //       "sort": 0,
  //       "hidden": 0,
  //       "icon": null,
  //       "childNodes": []
  //     },
  //     {
  //       "id": 265,
  //       "name": "数字字典",
  //       "path": "/dictManagement",
  //       "parentId": 26,
  //       "sort": 0,
  //       "hidden": 0,
  //       "icon": null,
  //       "childNodes": []
  //     },
  //     {
  //       "id": 266,
  //       "name": "用户管理",
  //       "path": "/userManagement",
  //       "parentId": 26,
  //       "sort": 0,
  //       "hidden": 0,
  //       "icon": null,
  //       "childNodes": []
  //     },
  //     {
  //       "id": 267,
  //       "name": "角色管理",
  //       "path": "/roleManagement",
  //       "parentId": 26,
  //       "sort": 0,
  //       "hidden": 0,
  //       "icon": null,
  //       "childNodes": []
  //     },
  //     {
  //       "id": 268,
  //       "name": "接单设置",
  //       "path": "/ordersManagement",
  //       "parentId": 26,
  //       "sort": 0,
  //       "hidden": 0,
  //       "icon": null,
  //       "childNodes": []
  //     },
  //     {
  //       "id": 269,
  //       "name": "操作日志",
  //       "path": "/operationLog",
  //       "parentId": 26,
  //       "sort": 0,
  //       "hidden": 0,
  //       "icon": null,
  //       "childNodes": []
  //     },
  //   ]
  // },
  // {
  //   "id": 80,
  //   "parentId": 0,
  //   "name": "表单设置",
  //   "icon": "&#xe615;",
  //   "sort": 0,
  //   "hidden": 0,
  //   "path": "/formset",
  //   "childNodes": [{
  //     "id": 801,
  //     "parentId": 80,
  //     "childNodes": [],
  //     "name": "表单设置",
  //     "icon": null,
  //     "sort": 0,
  //     "hidden": 0,
  //     "path": "/formset"
  //   }, ]
  // },
  // {
  //   "id": 90,
  //   "parentId": 0,
  //   "name": "设备管理",
  //   "icon": "&#xe615;",
  //   "sort": 0,
  //   "hidden": 0,
  //   "path": "/formset1",
  //   "childNodes": [{
  //     "id": 901,
  //     "parentId": 90,
  //     "childNodes": [],
  //     "name": "设备管理",
  //     "icon": null,
  //     "sort": 0,
  //     "hidden": 0,
  //     "path": "/formset1"
  //   }, ]
  // },
  // {
  //   "id": 100,
  //   "parentId": 0,
  //   "name": "巡检管理",
  //   "icon": "&#xe615;",
  //   "sort": 0,
  //   "hidden": 0,
  //   "path": "/checkManage",
  //   "childNodes": [{
  //     "id": 1001,
  //     "parentId": 100,
  //     "childNodes": [],
  //     "name": "巡检计划",
  //     "icon": null,
  //     "sort": 0,
  //     "hidden": 0,
  //     "path": "/checkManage"
  //   }, {
  //     "id": 1002,
  //     "parentId": 100,
  //     "childNodes": [],
  //     "name": "巡检任务",
  //     "icon": null,
  //     "sort": 0,
  //     "hidden": 0,
  //     "path": "/checkProject"
  //   }, {
  //     "id": 1003,
  //     "parentId": 100,
  //     "childNodes": [],
  //     "name": "异常查询",
  //     "icon": null,
  //     "sort": 0,
  //     "hidden": 0,
  //     "path": "/abnormalSearch"
  //   }, {
  //     "id": 1004,
  //     "parentId": 100,
  //     "childNodes": [],
  //     "name": "巡检分类设置",
  //     "icon": null,
  //     "sort": 0,
  //     "hidden": 0,
  //     "path": "/checkSet"
  //   }, {
  //     "id": 1005,
  //     "parentId": 100,
  //     "childNodes": [],
  //     "name": "工作人员管理",
  //     "icon": null,
  //     "sort": 0,
  //     "hidden": 0,
  //     "path": "/checkWorkerManage"
  //   }, {
  //     "id": 1006,
  //     "parentId": 100,
  //     "childNodes": [],
  //     "name": "我的任务",
  //     "icon": null,
  //     "sort": 0,
  //     "hidden": 0,
  //     "path": "/myCheckProject"
  //   }, {
  //     "id": 1007,
  //     "parentId": 100,
  //     "childNodes": [],
  //     "name": "班组任务表",
  //     "icon": null,
  //     "sort": 0,
  //     "hidden": 0,
  //     "path": "/checkTeamTask"
  //   }, {
  //     "id": 1008,
  //     "parentId": 100,
  //     "childNodes": [],
  //     "name": "巡检接单设置",
  //     "icon": null,
  //     "sort": 0,
  //     "hidden": 0,
  //     "path": "/checkOrderSet"
  //   }, {
  //     "id": 1010,
  //     "parentId": 100,
  //     "childNodes": [],
  //     "name": "统计报表",
  //     "icon": null,
  //     "sort": 0,
  //     "hidden": 0,
  //     "path": "/checkStaReport"
  //   }]
  // },
  // {
  //   "id": 110,
  //   "parentId": 0,
  //   "name": "保养管理",
  //   "icon": "&#xe615;",
  //   "sort": 0,
  //   "hidden": 0,
  //   "path": "/maintainManage",
  //   "childNodes": [{
  //     "id": 1101,
  //     "parentId": 110,
  //     "childNodes": [],
  //     "name": "保养管理",
  //     "icon": null,
  //     "sort": 0,
  //     "hidden": 0,
  //     "path": "/maintainManage"
  //   }, ]
  // },
  // {
  //   "id": 120,
  //   "parentId": 0,
  //   "name": "仓库管理",
  //   "icon": "&#xe615;",
  //   "sort": 0,
  //   "hidden": 0,
  //   "path": "/warehouse",
  //   "childNodes": [{
  //     "id": 1201,
  //     "parentId": 120,
  //     "childNodes": [],
  //     "name": "入库管理",
  //     "icon": null,
  //     "sort": 0,
  //     "hidden": 0,
  //     "path": "/warehousing"
  //   }, {
  //     "id": 1202,
  //     "parentId": 120,
  //     "childNodes": [],
  //     "name": "出库管理",
  //     "icon": null,
  //     "sort": 0,
  //     "hidden": 0,
  //     "path": "/delivery"
  //   }]
  // },
  // {
  //   "id": 130,
  //   "parentId": 0,
  //   "name": "合同管理",
  //   "icon": "&#xe615;",
  //   "sort": 0,
  //   "hidden": 0,
  //   "path": "/contractManage",
  //   "childNodes": [{
  //     "id": 1301,
  //     "parentId": 130,
  //     "childNodes": [],
  //     "name": "合同管理",
  //     "icon": null,
  //     "sort": 0,
  //     "hidden": 0,
  //     "path": "/contractManage"
  //   }, {
  //     "id": 1302,
  //     "parentId": 130,
  //     "childNodes": [],
  //     "name": "合同到期提醒",
  //     "icon": null,
  //     "sort": 0,
  //     "hidden": 0,
  //     "path": "/contractDeathRemind"
  //   }, ]
  // },
  // {
  //   "id": 140,
  //   "parentId": 0,
  //   "name": "基础设置",
  //   "icon": "&#xe615;",
  //   "sort": 0,
  //   "hidden": 0,
  //   "path": "/baseSet",
  //   "childNodes": [{
  //     "id": 1401,
  //     "parentId": 140,
  //     "childNodes": [],
  //     "name": "基础设置",
  //     "icon": null,
  //     "sort": 0,
  //     "hidden": 0,
  //     "path": "/baseSet"
  //   }, ]
  // }
  {
    "id": 200,
    "parentId": 0,
    "name": "随时记录",
    "icon": "&#xe615;",
    "sort": 0,
    "hidden": 0,
    "path": "/personalDomain",
    "childNodes": [{
      "id": 2001,
      "parentId": 200,
      "childNodes": [],
      "name": "随时记录",
      "icon": null,
      "sort": 0,
      "hidden": 0,
      "path": "/personalDomain"
    }, {
      "id": 2002,
      "parentId": 200,
      "childNodes": [],
      "name": "没有记录",
      "icon": null,
      "sort": 0,
      "hidden": 0,
      "path": "/someNote"
    }, {
      "id": 2003,
      "parentId": 200,
      "childNodes": [],
      "name": "就没有发生",
      "icon": null,
      "sort": 0,
      "hidden": 0,
      "path": "/happening"
    }]
  },
  {
    "id": 300,
    "parentId": 0,
    "name": "笔记本",
    "icon": "&#xe615;",
    "sort": 0,
    "hidden": 0,
    "path": "/notebook",
    "childNodes": [{
      "id": 3001,
      "parentId": 300,
      "childNodes": [],
      "name": "笔记本",
      "icon": null,
      "sort": 0,
      "hidden": 0,
      "path": "/notebook"
    }]
  }
]

export default menuItems