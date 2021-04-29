import Home from './views/Home.vue'
let routeList = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      text: '主页'
    },
    isShow: true,
    icon: '1',
    component: Home,
    children: [{
        path: '/home',
        name: 'home',
        text: '主页',
        meta: {
          text: '主页',
          menuPath: '/home',
          menuBread: ['主页']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/index/homePage.vue')
      },
      // 表单设置
      {
        path: '/formset',
        name: 'formset',
        text: '表单设置',
        meta: {
          text: '表单设置',
          menuPath: '/formset',
          menuBread: ['主页', '表单设置']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/formset/index.vue')
      },
      {
        path: '/formset/add',
        name: 'formset',
        text: '新建',
        meta: {
          text: '新建',
          menuPath: '/formset/add',
          menuBread: ['主页', '表单设置', '新建']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/formset/add.vue')
      },
      {
        path: '/warehouseManagement',
        name: 'warehouseManagement',
        text: '仓库管理',
        meta: {
          text: '仓库管理',
          menuPath: '/warehouseManagement',
          menuBread: ['主页', '仓库管理']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/warehouse/index.vue')
      },
      {
        path: '/outAndIn',
        name: 'outAndIn',
        text: '直进直出',
        meta: {
          text: '直进直出',
          menuPath: '/outAndIn',
          menuBread: ['主页', '直进直出']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/outAndIn/index.vue')
      },
      {
        path: '/outAndIn/add',
        name: 'outAndIn/add',
        text: '直进直出-新增',
        meta: {
          text: '直进直出-新增',
          menuPath: '/outAndIn/add',
          menuBread: ['主页', '直进直出', '直进直出-新增']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/outAndIn/itemAdd.vue')
      },
      {
        path: '/outAndIn/edit',
        name: 'outAndIn/edit',
        text: '直进直出-编辑',
        meta: {
          text: '直进直出-编辑',
          menuPath: '/outAndIn/edit',
          menuBread: ['主页', '直进直出', '直进直出-编辑']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/outAndIn/itemEdit.vue')
      },
      {
        path: '/outAndIn/detail-yes',
        name: 'outAndIn/detail-yes',
        text: '直进直出-已过账',
        meta: {
          text: '直进直出-已过账',
          menuPath: '/outAndIn/edit',
          menuBread: ['主页', '直进直出', '直进直出-已过账']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/outAndIn/itemDetail.vue')
      },
      {
        path: '/outAndIn/detail-no',
        name: 'outAndIn/detail-no',
        text: '直进直出-未过账',
        meta: {
          text: '直进直出-未过账',
          menuPath: '/outAndIn/edit',
          menuBread: ['主页', '直进直出', '直进直出-未过账']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/outAndIn/itemDetail.vue')
      },
      {
        path: '/materialStorage',
        name: 'materialStorage',
        text: '物资入库',
        meta: {
          text: '物资入库',
          menuPath: '/materialStorage',
          menuBread: ['主页', '物资入库']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/materialStorage/index.vue')
      },
      {
        path: '/materialDelivery',
        name: 'materialDelivery',
        text: '物资出库',
        meta: {
          text: '物资出库',
          menuPath: '/materialDelivery',
          menuBread: ['主页', '物资出库']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/materialDelivery/index.vue')
      },
      {
        path: '/materialRequisition',
        name: 'materialRequisition',
        text: '物资领用',
        meta: {
          text: '物资领用',
          menuPath: '/materialRequisition',
          menuBread: ['主页', '物资领用']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/materialRequisition/index.vue')
      },
      {
        path: '/materialRequisition/add',
        name: 'materialRequisitionAdd',
        text: '新增领用',
        meta: {
          text: '新增领用',
          menuPath: '/materialRequisition',
          menuBread: ['主页', '物资领用', '新增领用']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/materialRequisition/add.vue')
      },
      {
        path: '/materialRequisition/detail-yes',
        name: 'materialRequisition',
        text: '领用详情',
        meta: {
          text: '领用详情',
          menuPath: '/materialRequisition',
          menuBread: ['主页', '物资领用', '领用详情-已过账']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/materialRequisition/detail.vue')
      },
      {
        path: '/materialRequisition/detail-no',
        name: 'materialRequisition',
        text: '领用详情',
        meta: {
          text: '领用详情',
          menuPath: '/materialRequisition',
          menuBread: ['主页', '物资领用', '领用详情-未过账']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/materialRequisition/detail.vue')
      },
      {
        path: '/materialRequisition/examinelist',
        name: 'examineList',
        text: '物资领用审批',
        meta: {
          text: '物资领用审批',
          menuPath: '/materialRequisition/examinelist',
          menuBread: ['主页', '物资领用审批']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/materialRequisition/examinelist.vue')
      },
      {
        path: '/materialRequisition/examine',
        name: 'examine',
        text: '物资领用-审批',
        meta: {
          text: '物资领用-审批',
          menuPath: '/materialRequisition/examinelist',
          menuBread: ['主页', '物资领用审批', '审批']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/materialRequisition/examine.vue')
      },
      {
        path: '/materialRequisition/examineDetail',
        name: 'examineDetail',
        text: '物资领用审批查看',
        meta: {
          text: '物资领用审批查看',
          menuPath: '/materialRequisition/examinelist',
          menuBread: ['主页', '物资领用审批', '审批查看']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/materialRequisition/examineDetail.vue')
      },
      {
        path: '/materialWithdrawal',
        name: 'materialWithdrawal',
        text: '物资退库',
        meta: {
          text: '物资退库',
          menuPath: '/materialWithdrawal',
          menuBread: ['主页', '物资退库']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/materialWithdrawal/index.vue')
      },
      {
        path: '/materialWithdrawal/add',
        name: 'materialWithdrawalAdd',
        text: '新增退库',
        meta: {
          text: '新增退库',
          menuPath: '/materialWithdrawal',
          menuBread: ['主页', '物资退库', '新增退库']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/materialWithdrawal/add.vue')
      },
      {
        path: '/materialWithdrawal/detail-yes',
        name: 'materialWithdrawal',
        text: '退库详情',
        meta: {
          text: '退库详情',
          menuPath: '/materialWithdrawal',
          menuBread: ['主页', '物资退库', '退库详情-已退库']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/materialWithdrawal/detail.vue')
      },
      {
        path: '/materialWithdrawal/detail-no',
        name: 'materialWithdrawal',
        text: '退库详情',
        meta: {
          text: '退库详情',
          menuPath: '/materialWithdrawal',
          menuBread: ['主页', '物资退库', '退库详情-待确认']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/materialWithdrawal/detail.vue')
      },
      {
        path: '/materialWithdrawal/examineList',
        name: 'materialWithdrawal',
        text: '物资退库审批',
        meta: {
          text: '物资退库审批',
          menuPath: '/materialWithdrawal/examineList',
          menuBread: ['主页', '物资退库审批']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/materialWithdrawal/examineList.vue')
      },
      {
        path: '/materialWithdrawal/examine',
        name: 'materialWithdrawal',
        text: '物资退库-审批',
        meta: {
          text: '物资退库-审批',
          menuPath: '/materialWithdrawal/examineList',
          menuBread: ['主页', '物资退库审批', '审批']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/materialWithdrawal/examine.vue')
      },
      {
        path: '/materialWithdrawal/examineDetail',
        name: 'materialWithdrawalExamineDetail',
        text: '物资退库审批查看',
        meta: {
          text: '物资退库审批查看',
          menuPath: '/materialWithdrawal/examineList',
          menuBread: ['主页', '物资退库审批', '审批查看']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/materialWithdrawal/examineDetail.vue')
      },
      {
        path: '/inventoryQuery',
        name: 'inventoryQuery',
        text: '库存明细帐查询',
        meta: {
          text: '库存明细帐查询',
          menuPath: '/inventoryQuery',
          menuBread: ['主页', '库存明细帐查询']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/inventoryQuery/index.vue')
      },
      {
        path: '/inventoryInfo',
        name: 'inventoryInfo',
        text: '库存查询',
        meta: {
          text: '库存查询',
          menuPath: '/inventoryInfo',
          menuBread: ['主页', '库存查询']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/inventoryQuery/info.vue')
      },
      {
        path: '/allocate',
        name: 'allocate',
        text: '库存调拨',
        meta: {
          text: '库存调拨',
          menuPath: '/allocate',
          menuBread: ['主页', '库存调拨']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/allocate/index.vue')
      },
      {
        path: '/allocate/add',
        name: 'allocate',
        text: '库存调拨-新增',
        meta: {
          text: '库存调拨-新增',
          menuPath: '/allocate',
          menuBread: ['主页', '库存调拨', '库存调拨-新增']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/allocate/add.vue')
      },
      {
        path: '/allocate/edit',
        name: 'allocate',
        text: '库存调拨-编辑',
        meta: {
          text: '库存调拨-编辑',
          menuPath: '/allocate',
          menuBread: ['主页', '库存调拨', '库存调拨-编辑']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/allocate/edit.vue')
      },
      {
        path: '/allocate/detail',
        name: 'allocate',
        text: '库存调拨-查看',
        meta: {
          text: '库存调拨-查看',
          menuPath: '/allocate',
          menuBread: ['主页', '库存调拨', '库存调拨-查看']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/allocate/detail.vue')
      },
      {
        path: '/allocatesure',
        name: 'allocatesure',
        text: '库存调拨确认',
        meta: {
          text: '库存调拨确认',
          menuPath: '/allocatesure',
          menuBread: ['主页', '库存调拨确认']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/allocate/sure.vue')
      },
      {
        path: '/allocatesure/detail',
        name: 'allocatesure',
        text: '库存调拨确认',
        meta: {
          text: '库存调拨确认-查看',
          menuPath: '/allocatesure',
          menuBread: ['主页', '库存调拨确认', '库存调拨确认-查看']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/allocate/suredetail.vue')
      },
      {
        path: '/warehouseCheck',
        name: 'warehouseCheck',
        text: '库存盘点',
        meta: {
          text: '库存盘点',
          menuPath: '/warehouseCheck',
          menuBread: ['主页', '库存盘点']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/warehouseCheck/index.vue')
      },
      {
        path: '/warehouseCheck/add',
        name: 'warehouseCheckAdd',
        text: '库存盘点-新增',
        meta: {
          text: '库存盘点-新增',
          menuPath: '/warehouseCheck',
          menuBread: ['主页', '库存盘点', '库存盘点-新增']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/warehouseCheck/add.vue')
      },
      {
        path: '/warehouseCheck/edit',
        name: 'warehouseCheckEdit',
        text: '库存盘点-编辑',
        meta: {
          text: '库存盘点-编辑',
          menuPath: '/warehouseCheck',
          menuBread: ['主页', '库存盘点', '库存盘点-编辑']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/warehouseCheck/edit.vue')
      },
      {
        path: '/warehouseCheck/detail',
        name: 'warehouseCheckDetail',
        text: '库存盘点-查看',
        meta: {
          text: '库存盘点-查看',
          menuPath: '/warehouseCheck',
          menuBread: ['主页', '库存盘点', '库存盘点-查看']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/warehouseCheck/detail.vue')
      },
      {
        path: '/analysisReport',
        name: 'analysisReport',
        text: '物料消耗分析报表',
        meta: {
          text: '物料消耗分析报表',
          menuPath: '/analysisReport',
          menuBread: ['主页', '物料消耗分析报表']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/inventory/analysisReport/index.vue')
      },
      // 维修
      {
        path: '/repairRegister',
        name: 'repairRegister',
        text: '报修登记',
        meta: {
          text: '报修登记',
          menuPath: '/repairRegister',
          menuBread: ['主页', '报修登记']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/repairManage/repair/index.vue')
      },
      {
        path: '/repairRegister/add',
        name: 'repairRegisterAdd',
        text: '报修登记',
        meta: {
          text: '报修登记-新增',
          menuPath: '/repairRegister',
          menuBread: ['主页', '报修登记-新增']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/repairManage/repair/add.vue')
      },
      {
        path: '/repairRegister/edit',
        name: 'repairRegisterEdit',
        text: '报修登记编辑',
        meta: {
          text: '报修登记-编辑',
          menuPath: '/repairRegister',
          menuBread: ['主页', '报修登记-编辑']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/repairManage/repair/edit.vue')
      },
      {
        path: '/repairRegister/detail',
        name: 'repairRegisterDetail',
        text: '报修登记',
        meta: {
          text: '报修登记-查看',
          menuPath: '/repairRegister',
          menuBread: ['主页', '报修登记-查看']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/repairManage/repair/detail.vue')
      },
      {
        path: '/workAccept',
        name: 'workAccept',
        text: '工单受理',
        meta: {
          text: '工单受理',
          menuPath: '/workAccept',
          menuBread: ['主页', '工单受理']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/repairManage/workAccept/index.vue')
      },
      {
        path: '/workAccept/edit',
        name: 'workAcceptEdit',
        text: '工单审核',
        meta: {
          text: '工单审核',
          menuPath: '/workAccept',
          menuBread: ['主页', '工单受理', '工单审核']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/repairManage/workAccept/edit.vue')
      },
      {
        path: '/workAccept/detail',
        name: 'workAcceptDetail',
        text: '工单受理查看',
        meta: {
          text: '工单受理查看',
          menuPath: '/workAccept',
          menuBread: ['主页', '工单受理', '工单受理查看']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/repairManage/workAccept/detail.vue')
      },
      {
        path: '/taskSell',
        name: 'taskSell',
        text: '任务派发',
        meta: {
          text: '任务派发',
          menuPath: '/taskSell',
          menuBread: ['主页', '任务派发']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/repairManage/taskSell/index.vue')
      },
      {
        path: '/taskSell/add',
        name: 'taskSellAdd',
        text: '任务派发新增',
        meta: {
          text: '任务派发新增',
          menuPath: '/taskSell',
          menuBread: ['主页', '任务派发', '任务派发新增']
        },
        isShow: true,
        icon: '1',
        component: () => import('./views/repairManage/taskSell/add.vue')
      },
      {
        path: '/taskSell/edit',
        name: 'taskSellEdit',
        text: '任务派发编辑',
        meta: {
          text: '任务派发编辑',
          menuPath: '/taskSell',
          menuBread: ['主页', '任务派发', '任务派发编辑']
        },
        isShow: true,
        icon: '1',
        component: () => import('./views/repairManage/taskSell/edit.vue')
      },
      {
        path: '/taskSell/detail',
        name: 'taskSellDetail',
        text: '任务派发查看',
        meta: {
          text: '任务派发查看',
          menuPath: '/taskSell',
          menuBread: ['主页', '任务派发', '任务派发查看']
        },
        isShow: true,
        icon: '1',
        component: () => import('./views/repairManage/taskSell/detail.vue')
      },
      {
        path: '/taskWorker',
        name: 'taskWorker',
        text: '工单派工',
        meta: {
          text: '工单派工',
          menuPath: '/taskWorker',
          menuBread: ['主页', '工单派工']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/repairManage/taskWorker/index.vue')
      },
      {
        path: '/taskWorker/assign',
        name: 'taskWorkerAssign',
        text: '派工',
        meta: {
          text: '派工',
          menuPath: '/taskWorker',
          menuBread: ['主页', '工单派工', '派工']
        },
        isShow: true,
        icon: '1',
        component: () => import('./views/repairManage/taskWorker/assign.vue')
      },
      {
        path: '/taskWorker/edit',
        name: 'taskWorkerEdit',
        text: '派工编辑',
        meta: {
          text: '派工编辑',
          menuPath: '/taskWorker',
          menuBread: ['主页', '工单派工', '派工编辑']
        },
        isShow: true,
        icon: '1',
        component: () => import('./views/repairManage/taskWorker/edit.vue')
      },
      {
        path: '/taskWorker/detail',
        name: 'taskWorkerDetail',
        text: '派工查看',
        meta: {
          text: '派工查看',
          menuPath: '/taskWorker',
          menuBread: ['主页', '工单派工', '派工查看']
        },
        isShow: true,
        icon: '1',
        component: () => import('./views/repairManage/taskWorker/detail.vue')
      },
      {
        path: '/serveEvaluate',
        name: 'serveEvaluate',
        text: '服务评价',
        meta: {
          text: '服务评价',
          menuPath: '/serveEvaluate',
          menuBread: ['主页', '服务评价']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/repairManage/serveEvaluate/index.vue')
      },
      {
        path: '/serveEvaluate/detail',
        name: 'serveEvaluateDetail',
        text: '服务评价-查看',
        meta: {
          text: '服务评价查看',
          menuPath: '/serveEvaluate',
          menuBread: ['主页', '服务评价', '服务评价查看']
        },
        isShow: true,
        icon: '1',
        component: () => import('./views/repairManage/serveEvaluate/detail.vue')
      },
      {
        path: '/workSearch',
        name: 'workSearch',
        text: '工单综合查询',
        meta: {
          text: '工单综合查询',
          menuPath: '/workSearch',
          menuBread: ['主页', '工单综合查询']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/repairManage/workSearch/index.vue')
      },
      {
        path: '/workSearch/detail',
        name: 'workSearchDetail',
        text: '工单综合查看',
        meta: {
          text: '工单综合查看',
          menuPath: '/workSearch',
          menuBread: ['主页', '工单综合查询', '工单综合查看']
        },
        isShow: true,
        icon: '1',
        component: () => import('./views/repairManage/workSearch/detail.vue')
      },
      {
        path: '/myRepair',
        name: 'myRepair',
        text: '我的维修',
        meta: {
          text: '我的维修',
          menuPath: '/myRepair',
          menuBread: ['主页', '我的维修']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/repairManage/myRepair/index.vue')
      },
      {
        path: '/myRepair/detail',
        name: 'myRepairDetail',
        text: '维修详情',
        meta: {
          text: '维修详情',
          menuPath: '/myRepair',
          menuBread: ['主页', '维修详情']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/repairManage/myRepair/detail.vue')
      },
      {
        path: '/myRepair/getOrder',
        name: 'myRepairgetOrder',
        text: '接单',
        meta: {
          text: '接单',
          menuPath: '/myRepair',
          menuBread: ['主页', '接单']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/repairManage/myRepair/getOrders.vue')
      },
      {
        path: '/myRepair/robOrder',
        name: 'myRepairrobOrder',
        text: '抢单',
        meta: {
          text: '抢单',
          menuPath: '/myRepair',
          menuBread: ['主页', '抢单']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/repairManage/myRepair/getOrders.vue')
      },
      {
        path: '/myRepair/changeOrder',
        name: 'myRepairchangeOrder',
        text: '转单',
        meta: {
          text: '转单',
          menuPath: '/myRepair',
          menuBread: ['主页', '转单']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/repairManage/myRepair/changeOrder.vue')
      },
      {
        path: '/myRepair/assignOrder',
        name: 'myRepairassignOrder',
        text: '派工',
        meta: {
          text: '派工',
          menuPath: '/myRepair',
          menuBread: ['主页', '派工']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/repairManage/myRepair/assignOrder.vue')
      },
      {
        path: '/myRepair/editOrder',
        name: 'myRepaireditOrder',
        text: '编辑派工',
        meta: {
          text: '编辑派工',
          menuPath: '/myRepair',
          menuBread: ['主页', '编辑派工']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/repairManage/myRepair/editOrder.vue')
      },
      {
        path: '/workerManage',
        name: 'workerManage',
        text: '维修工管理',
        meta: {
          text: '维修工管理',
          menuPath: '/workerManage',
          menuBread: ['主页', '维修工管理']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/repairManage/workerManage/index.vue')
      },
      {
        path: '/teamTask',
        name: 'teamTask',
        text: '班组任务表',
        meta: {
          text: '班组任务表',
          menuPath: '/teamTask',
          menuBread: ['主页', '班组任务表']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/repairManage/teamTask/index.vue')
      },
      {
        path: '/teamTask/detail',
        name: 'teamTaskDetail',
        text: '班组任务表查看',
        meta: {
          text: '班组任务表查看',
          menuPath: '/teamTask',
          menuBread: ['主页', '班组任务表', '班组任务表查看']
        },
        isShow: true,
        icon: '1',
        component: () => import('./views/repairManage/teamTask/detail.vue')
      },
      {
        path: '/ledShow',
        name: 'ledShow',
        text: '电子屏显示',
        meta: {
          text: '电子屏显示',
          menuPath: '/ledShow',
          menuBread: ['主页', '电子屏显示']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/repairManage/ledShow/index.vue')
      },
      // 采购
      {
        path: '/purchaseRequisition',
        name: 'purchaseRequisition',
        text: '采购申请',
        meta: {
          text: '采购申请',
          menuPath: '/purchaseRequisition',
          menuBread: ['主页', '采购申请']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseRequisition/index.vue')
      },
      {
        path: '/purchaseRequisition/add',
        name: 'purchaseRequisition/add',
        text: '采购申请-新增',
        meta: {
          text: '采购申请-新增',
          menuPath: '/purchaseRequisition/add',
          menuBread: ['主页', '采购申请', '新增']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseRequisition/add.vue')
      },
      {
        path: '/purchaseRequisition/edit',
        name: 'purchaseRequisition/edit',
        text: '采购申请-编辑',
        meta: {
          text: '采购申请-编辑',
          menuPath: '/purchaseRequisition/edit',
          menuBread: ['主页', '采购申请', '编辑']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseRequisition/add.vue')
      },
      {
        path: '/purchaseRequisition/detail',
        name: 'purchaseRequisition/detail',
        text: '采购申请-详情',
        meta: {
          text: '采购申请-详情',
          menuPath: '/purchaseRequisition/detail',
          menuBread: ['主页', '采购申请', '详情']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseRequisition/detail.vue')
      },
      {
        path: '/purchaseApproval',
        name: 'purchaseApproval',
        text: '采购审批',
        meta: {
          text: '采购审批',
          menuPath: '/purchaseApproval',
          menuBread: ['主页', '采购审批']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseApproval/index.vue')
      },
      {
        path: '/purchaseApproval/add',
        name: 'purchaseApproval/add',
        text: '采购订单新增',
        meta: {
          text: '采购订单新增',
          menuPath: '/purchaseApproval/add',
          menuBread: ['主页', '采购审批', '采购订单新增']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseApproval/add.vue')
      },
      {
        path: '/purchaseApproval/detail',
        name: 'purchaseApproval/detail',
        text: '采购订单详情',
        meta: {
          text: '采购订单详情',
          menuPath: '/purchaseApproval/detail',
          menuBread: ['主页', '采购审批', '采购订单详情']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseApproval/detail.vue')
      },

      {
        path: '/purchaseOrder',
        name: 'purchaseOrder',
        text: '采购订单',
        meta: {
          text: '采购订单',
          menuPath: '/purchaseOrder',
          menuBread: ['主页', '采购订单']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseOrder/index.vue')
      },

      {
        path: '/purchaseOrder/edit',
        name: 'purchaseOrder/edit',
        text: '采购订单-编辑',
        meta: {
          text: '采购订单-编辑',
          menuPath: '/purchaseOrder/edit',
          menuBread: ['主页', '采购订单', '编辑']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseOrder/edit.vue')
      },

      {
        path: '/purchaseOrder/detail',
        name: 'purchaseOrder/detail',
        text: '采购订单-详情',
        meta: {
          text: '采购订单-详情',
          menuPath: '/purchaseOrder/detail',
          menuBread: ['主页', '采购订单', '详情']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseOrder/detail.vue')
      },
      {
        path: '/purchaseReceipt',
        name: 'purchaseReceipt',
        text: '采购收货',
        meta: {
          text: '采购收货',
          menuPath: '/purchaseReceipt',
          menuBread: ['主页', '采购收货']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseReceipt/index.vue')
      },
      {
        path: '/purchaseReceipt/detail',
        name: 'purchaseReceipt/detail',
        text: '采购收货-详情',
        meta: {
          text: '采购收货-详情',
          menuPath: '/purchaseReceipt/detail',
          menuBread: ['主页', '采购收货', '详情']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseReceipt/detail.vue')
      },
      {
        path: '/purchaseReceipt/add',
        name: 'purchaseReceipt/add',
        text: '采购收货-确认收货',
        meta: {
          text: '采购收货-确认收货',
          menuPath: '/purchaseReceipt/add',
          menuBread: ['主页', '采购收货', '确认收货']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseReceipt/add.vue')
      },
      {
        path: '/purchaseReceipt/return',
        name: 'purchaseReceipt/return',
        text: '采购收货-退货单',
        meta: {
          text: '采购收货-退货单',
          menuPath: '/purchaseReceipt/return',
          menuBread: ['主页', '采购收货', '退货单']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseReceipt/return.vue')
      },

      {
        path: '/purchaseReturns',
        name: 'purchaseReturns',
        text: '采购退货',
        meta: {
          text: '采购退货',
          menuPath: '/purchaseReturns',
          menuBread: ['主页', '采购退货']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseReturns/index.vue')
      },
      {
        path: '/purchaseReturns/add',
        name: 'purchaseReturns/add',
        text: '采购退货-新增',
        meta: {
          text: '采购退货-新增',
          menuPath: '/purchaseReturns/add',
          menuBread: ['主页', '采购退货', '新增']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseReturns/add.vue')
      },
      {
        path: '/purchaseReturns/edit',
        name: 'purchaseReturns/edit',
        text: '采购退货-编辑',
        meta: {
          text: '采购退货-编辑',
          menuPath: '/purchaseReturns/add',
          menuBread: ['主页', '采购退货', '编辑']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseReturns/edit.vue')
      },
      {
        path: '/purchaseReturns/detail',
        name: 'purchaseReturns/detail',
        text: '采购退货-待审批',
        meta: {
          text: '采购退货-待审批',
          menuPath: '/purchaseReturns/detail',
          menuBread: ['主页', '采购退货', '待审批']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseReturns/detail.vue')
      },
      {
        path: '/returnApproval',
        name: 'returnApproval',
        text: '采购退货审批',
        meta: {
          text: '采购退货审批',
          menuPath: '/returnApproval',
          menuBread: ['主页', '采购退货审批']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/returnApproval/index.vue')
      },
      {
        path: '/returnApproval/approval',
        name: 'returnApproval/approval',
        text: '采购退货审批',
        meta: {
          text: '采购退货审批',
          menuPath: '/returnApproval/approval',
          menuBread: ['主页', '采购退货审批']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/returnApproval/approval.vue')
      },
      {
        path: '/returnApproval/detail',
        name: 'returnApproval/detail',
        text: '采购退货审批',
        meta: {
          text: '采购退货审批',
          menuPath: '/returnApproval/detail',
          menuBread: ['主页', '采购退货审批', '详情']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/returnApproval/detail.vue')
      },
      {
        path: '/purchaseInvoice',
        name: 'purchaseInvoice',
        text: '采购发票维护',
        meta: {
          text: '采购发票维护',
          menuPath: '/purchaseInvoice',
          menuBread: ['主页', '采购发票维护']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseInvoice/index.vue')
      },
      {
        path: '/purchaseInvoice/setting',
        name: 'purchaseInvoice',
        text: '维护',
        meta: {
          text: '维护',
          menuPath: '/purchaseInvoice',
          menuBread: ['主页', '采购发票维护', '维护']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseInvoice/setting.vue')
      },
      {
        path: '/purchaseInvoice/detail',
        name: 'purchaseInvoice',
        text: '详情',
        meta: {
          text: '详情',
          menuPath: '/purchaseInvoice',
          menuBread: ['主页', '采购发票维护', '详情']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseInvoice/detail.vue')
      },
      {
        path: '/purchaseInvoice/add',
        name: 'purchaseInvoice',
        text: '新增',
        meta: {
          text: '新增',
          menuPath: '/purchaseInvoice/add',
          menuBread: ['主页', '采购发票维护', '新增']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseInvoice/add.vue')
      },

      {
        path: '/customerFeedback',
        name: 'customerFeedback',
        text: '意见反馈',
        meta: {
          text: '意见反馈',
          menuPath: '/customerFeedback',
          menuBread: ['主页', '意见反馈']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/feedback/customerFeedback/index.vue')
      },
      {
        path: '/customerFeedback/detail',
        name: 'customerFeedbackDetail',
        text: '意见查看详情',
        meta: {
          text: '意见反馈',
          menuPath: '/customerFeedback',
          menuBread: ['主页', '意见反馈', '意见查看详情']
        },
        icon: '1',
        component: () =>
          import('./views/feedback/customerFeedback/detail.vue')
      },
      {
        path: '/customerFeedback/reply',
        name: 'customerFeedbackReply',
        text: '意见处理详情',
        meta: {
          text: '意见反馈',
          menuPath: '/customerFeedback',
          menuBread: ['主页', '意见反馈', '意见处理详情']
        },
        icon: '1',
        component: () =>
          import('./views/feedback/customerFeedback/reply.vue')
      },
      {
        path: '/messageReply',
        name: 'messageReply',
        text: '消息回复',
        meta: {
          text: '消息回复',
          menuPath: '/messageReply',
          menuBread: ['主页', '消息回复']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/feedback/messageReply/index.vue')
      },

      {
        path: '/departmentSetting',
        name: 'departmentSetting',
        text: '部门设置',
        meta: {
          text: '部门设置',
          menuPath: '/departmentSetting',
          menuBread: ['主页', '部门设置']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/system/departmentSetting/index.vue')
      },
      {
        path: '/userManagement',
        name: 'userManagement',
        text: '用户管理',
        meta: {
          text: '用户管理',
          menuPath: '/userManagement',
          menuBread: ['主页', '用户管理']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/system/userManagement/index.vue')
      },
      {
        path: '/userManagement/add',
        name: 'userManagementAdd',
        text: '用户信息',
        meta: {
          text: '用户信息',
          menuPath: '/userManagement',
          menuBread: ['主页', '用户管理', '用户信息']
        },
        icon: '1',
        component: () =>
          import('./views/system/userManagement/add.vue')
      },
      {
        path: '/roleManagement',
        name: 'roleManagement',
        text: '角色管理',
        meta: {
          text: '角色管理',
          menuPath: '/roleManagement',
          menuBread: ['主页', '角色管理']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/system/roleManagement/index.vue')
      },
      {
        path: '/dictManagement',
        name: 'dictManagement',
        text: '字典管理',
        meta: {
          text: '字典管理',
          menuPath: '/dictManagement',
          menuBread: ['主页', '字典管理']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/system/dictManagement/index.vue')
      },
      {
        path: '/dictManagement/data',
        name: 'dictManagementData',
        text: '数据项管理',
        meta: {
          text: '数据项管理',
          menuPath: '/dictManagement',
          menuBread: ['主页', '字典管理', '数据项管理']
        },
        icon: '1',
        component: () =>
          import('./views/system/dictManagement/data.vue')
      },
      {
        path: '/approvalProcessSettings',
        name: 'approvalProcessSettings',
        text: '审批流程设置',
        meta: {
          text: '审批流程设置',
          menuPath: '/approvalProcessSettings',
          menuBread: ['主页', '审批流程设置']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/system/approvalProcessSettings/index.vue')
      },
      {
        path: '/materialClassification',
        name: 'materialClassification',
        text: '物资分类',
        meta: {
          text: '物资分类',
          menuPath: '/materialClassification',
          menuBread: ['主页', '物资分类']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/system/materialClassification/index.vue')
      },
      {
        path: '/materialInformation',
        name: 'materialInformation',
        text: '物资信息',
        meta: {
          text: '物资信息',
          menuPath: '/materialInformation',
          menuBread: ['主页', '物资信息']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/system/materialInformation/index.vue')
      },
      {
        path: '/supplierInformation',
        name: 'supplierInformation',
        text: '供应商信息管理',
        meta: {
          text: '供应商信息管理',
          menuPath: '/supplierInformation',
          menuBread: ['主页', '供应商信息管理']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/system/supplierInformation/index.vue')
      },
      {
        path: '/purchaseOrderApproval',
        name: 'purchaseOrderApproval',
        text: '采购订单审批',
        meta: {
          text: '采购订单审批',
          menuPath: '/purchaseOrderApproval',
          menuBread: ['主页', '采购订单审批']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseOrderApproval/index.vue')
      },
      {
        path: '/purchaseOrderApproval/detail',
        name: 'purchaseOrderApproval/detail',
        text: '采购订单审批详情',
        meta: {
          text: '采购订单审批详情',
          menuPath: '/purchaseOrderApproval/detail',
          menuBread: ['主页', '采购订单审批', '采购订单审批详情']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseOrderApproval/detail.vue')
      },
      {
        path: '/purchaseOrderApproval/approval',
        name: 'purchaseOrderApproval/approval',
        text: '采购订单审批',
        meta: {
          text: '采购订单审批',
          menuPath: '/purchaseOrderApproval/approval',
          menuBread: ['主页', '采购订单审批', '采购订单审批']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/procurement/purchaseOrderApproval/approval.vue')
      },
      {
        path: '/manufacturerInformation',
        name: 'manufacturerInformation',
        text: '厂商管理',
        meta: {
          text: '厂商管理',
          menuPath: '/manufacturerInformation',
          menuBread: ['主页', '厂商管理']
        },
        isShow: true,
        icon: '1',
        component: () => import('./views/system/manufacturerInformation/index.vue')
      },
      {
        path: '/ordersManagement',
        name: 'ordersManagement',
        text: '接单设置',
        meta: {
          text: '接单设置',
          menuPath: '/ordersManagement',
          menuBread: ['主页', '接单设置']
        },
        isShow: true,
        icon: '1',
        component: () => import('./views/system/ordersManagement/index.vue')
      },
      {
        path: '/operationLog',
        name: 'operationLog',
        text: '操作日志',
        meta: {
          text: '操作日志',
          menuPath: '/operationLog',
          menuBread: ['主页', '操作日志']
        },
        isShow: true,
        icon: '1',
        component: () => import('./views/system/operationLog/index.vue')
      },
      // 后勤管理
      {
        path: '/equipmentClass',
        name: 'equipmentClass',
        text: '设备分类',
        meta: {
          text: '设备分类',
          menuPath: '/equipmentClass',
          menuBread: ['主页', '设备分类']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/logisticsEquipment/equipmentClass/index.vue')
      },
      {
        path: '/equipmentRecord',
        name: 'equipmentRecord',
        text: '设备档案',
        meta: {
          text: '设备档案',
          menuPath: '/equipmentRecord',
          menuBread: ['主页', '设备档案']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/logisticsEquipment/equipmentRecord/index.vue')
      },
      {
        path: '/equipmentRecord/add',
        name: 'add',
        text: '设备档案新增',
        meta: {
          text: '设备档案新增',
          menuPath: '/equipmentRecord/add',
          menuBread: ['主页', '设备档案新增']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/logisticsEquipment/equipmentRecord/add.vue')
      },
      {
        path: '/equipmentRecord/detail',
        name: 'detail',
        text: '设备档案详情',
        meta: {
          text: '设备档案详情',
          menuPath: '/equipmentRecord/detail',
          menuBread: ['主页', '设备档案详情']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/logisticsEquipment/equipmentRecord/detail.vue')
      },
      {
        path: '/equipmentRecord/edit',
        name: 'detail',
        text: '设备档案编辑',
        meta: {
          text: '设备档案编辑',
          menuPath: '/equipmentRecord/detail',
          menuBread: ['主页', '设备档案编辑']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/logisticsEquipment/equipmentRecord/edit.vue')
      },
      {
        path: '/equipmentParameter',
        name: 'equipmentParameter',
        text: '设备参数',
        meta: {
          text: '设备参数',
          menuPath: '/equipmentParameter',
          menuBread: ['主页', '设备参数']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/logisticsEquipment/equipmentParameter/index.vue')
      },
      {
        path: '/equipmentReport',
        name: 'equipmentReport',
        text: '设备报表',
        meta: {
          text: '设备报表',
          menuPath: '/equipmentReport',
          menuBread: ['主页', '设备报表']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/logisticsEquipment/equipmentReport/index.vue')
      },
      {
        path: '/equipmentReport/detail',
        name: 'equipmentReportdetai',
        text: '设备报表详情',
        meta: {
          text: '设备报表详情',
          menuPath: '/equipmentReport/detail',
          menuBread: ['主页', '设备报表详情']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/logisticsEquipment/equipmentReport/detai.vue')
      },
      // 陪检运送
      {
        path: '/projectRegister',
        name: 'projectRegister',
        text: '任务登记',
        meta: {
          text: '任务登记',
          menuPath: '/projectRegister',
          menuBread: ['主页', '任务登记']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/projectRegister/index.vue')
      },
      {
        path: '/projectRegister/addCheck',
        name: 'projectRegisterAddcheck',
        text: '陪检运送',
        meta: {
          text: '陪检运送',
          menuPath: '/projectRegister',
          menuBread: ['主页', '陪检运送']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/projectRegister/addCheck.vue')
      },
      {
        path: '/projectRegister/edit',
        name: 'projectRegisterEdit',
        text: '陪检运送-编辑',
        meta: {
          text: '陪检运送-编辑',
          menuPath: '/projectRegister',
          menuBread: ['主页', '陪检运送-编辑']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/projectRegister/editCheck.vue')
      },
      {
        path: '/projectRegister/editSpec',
        name: 'projectRegisterEditSpec',
        text: '运送(标本)-编辑',
        meta: {
          text: '运送(标本)-编辑',
          menuPath: '/projectRegister',
          menuBread: ['主页', '运送(标本)-编辑']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/projectRegister/editSpec.vue')
      },
      {
        path: '/projectRegister/editGoods',
        name: 'projectRegisterEditGoods',
        text: '运送(物品)-编辑',
        meta: {
          text: '运送(物品)-编辑',
          menuPath: '/projectRegister',
          menuBread: ['主页', '运送(物品)-编辑']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/projectRegister/editGoods.vue')
      },
      {
        path: '/projectRegister/detail',
        name: 'projectRegisterDetail',
        text: '陪检运送-查看',
        meta: {
          text: '陪检运送-查看',
          menuPath: '/projectRegister',
          menuBread: ['主页', '陪检运送-查看']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/projectRegister/detail.vue')
      },
      {
        path: '/taskList',
        name: 'taskList',
        text: '班组任务表',
        meta: {
          text: '班组任务表',
          menuPath: '/taskList',
          menuBread: ['主页', '班组任务表']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/taskList/index.vue')
      },
      {
        path: '/projectAccept',
        name: 'projectAccept',
        text: '任务受理',
        meta: {
          text: '任务受理',
          menuPath: '/projectAccept',
          menuBread: ['主页', '任务受理']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/projectAccept/index.vue')
      },
      {
        path: '/projectAccept/accept',
        name: 'projectaccept',
        text: '受理',
        meta: {
          text: '受理',
          menuPath: '/projectAccept',
          menuBread: ['主页', '受理']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/projectAccept/accept.vue')
      },
      {
        path: '/projectAccept/detail',
        name: 'projectDetail',
        text: '受理详情',
        meta: {
          text: '受理详情',
          menuPath: '/projectAccept',
          menuBread: ['主页', '受理详情']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/projectAccept/detail.vue')
      },
      {
        path: '/projectDispatch',
        name: 'projectDispatch',
        text: '任务派工',
        meta: {
          text: '任务派工',
          menuPath: '/projectDispatch',
          menuBread: ['主页', '任务派工']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/projectDispatch/index.vue')
      },
      {
        path: '/projectDispatch/dispatch',
        name: 'dispatch',
        text: '派工',
        meta: {
          text: '派工',
          menuPath: '/projectDispatch',
          menuBread: ['主页', '派工']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/projectDispatch/dispatch.vue')
      },
      {
        path: '/projectDispatch/edit',
        name: 'editdispatch',
        text: '编辑派工',
        meta: {
          text: '编辑派工',
          menuPath: '/projectDispatch',
          menuBread: ['主页', '编辑派工']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/projectDispatch/edit.vue')
      },
      {
        path: '/projectDispatch/detail',
        name: 'dispatchdetail',
        text: '派工详情',
        meta: {
          text: '派工详情',
          menuPath: '/projectDispatch',
          menuBread: ['主页', '派工详情']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/projectDispatch/detail.vue')
      },
      {
        path: '/projectComplete',
        name: 'projectComplete',
        text: '任务完工',
        meta: {
          text: '任务完工',
          menuPath: '/projectComplete',
          menuBread: ['主页', '任务完工']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/projectComplete/index.vue')
      },
      {
        path: '/projectComplete/detail',
        name: 'projectCompleteDetail',
        text: '任务完工-查看',
        meta: {
          text: '任务完工-查看',
          menuPath: '/projectComplete',
          menuBread: ['主页', '任务完工-查看']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/projectComplete/detail.vue')
      },
      {
        path: '/myProject',
        name: 'myProject',
        text: '我的任务',
        meta: {
          text: '我的任务',
          menuPath: '/myProject',
          menuBread: ['主页', '我的任务']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/myProject/index.vue')
      },
      {
        path: '/myProject/getOrders',
        name: 'myProjectGetOrders',
        text: '我的任务-接单',
        meta: {
          text: '我的任务-接单',
          menuPath: '/myProject',
          menuBread: ['主页', '我的任务-接单']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/myProject/getOrders.vue')
      },
      {
        path: '/myProject/robOrders',
        name: 'myProjectRobOrders',
        text: '我的任务-抢单',
        meta: {
          text: '我的任务-抢单',
          menuPath: '/myProject',
          menuBread: ['主页', '我的任务-抢单']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/myProject/getOrders.vue')
      },
      {
        path: '/myProject/changeOrders',
        name: 'myProjectChangeOrders',
        text: '我的任务-转单',
        meta: {
          text: '我的任务-转单',
          menuPath: '/myProject',
          menuBread: ['主页', '我的任务-转单']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/myProject/changeOrder.vue')
      },
      {
        path: '/myProject/dispatch',
        name: 'myProjectDispatch',
        text: '我的任务-派工',
        meta: {
          text: '我的任务-派工',
          menuPath: '/myProject',
          menuBread: ['主页', '我的任务-派工']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/myProject/dispatch.vue')
      },
      {
        path: '/myProject/detail',
        name: 'myProjectDetail',
        text: '我的任务-查看',
        meta: {
          text: '我的任务-查看',
          menuPath: '/myProject',
          menuBread: ['主页', '我的任务-查看']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/myProject/detail.vue')
      },
      {
        path: '/entrust',
        name: 'entrust',
        text: '陪检嘱托',
        meta: {
          text: '陪检嘱托',
          menuPath: '/entrust',
          menuBread: ['主页', '陪检嘱托']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/entrust/index.vue')
      },
      {
        path: '/nursing',
        name: 'nursing',
        text: '护工管理',
        meta: {
          text: '护工管理',
          menuPath: '/nursing',
          menuBread: ['主页', '护工管理']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/nursing/index.vue')
      },
      {
        path: '/inchargeWard',
        name: 'inchargeWard',
        text: '负责病区',
        meta: {
          text: '负责病区',
          menuPath: '/inchargeWard',
          menuBread: ['主页', '负责病区']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/inchargeWard/index.vue')
      },
      {
        path: '/compreInquiry',
        name: 'compreInquiry',
        text: '综合查询',
        meta: {
          text: '综合查询',
          menuPath: '/compreInquiry',
          menuBread: ['主页', '综合查询']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/compreInquiry/index.vue')
      },
      {
        path: '/transportGoodsDetail',
        name: 'transportGoodsDetail',
        text: '运送(物品)详情',
        meta: {
          text: '运送(物品)详情',
          menuPath: '/transportGoodsDetail',
          menuBread: ['主页', '运送(物品)详情']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/compreInquiry/transportGoodsDetail.vue')
      },
      {
        path: '/departmentReport',
        name: 'departmentReport',
        text: '科室报表',
        meta: {
          text: '科室报表',
          menuPath: '/departmentReport',
          menuBread: ['主页', '科室报表']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/departmentReport/index.vue')
      },
      {
        path: '/screenShow',
        name: 'screenShow',
        text: '电子屏显示',
        meta: {
          text: '电子屏显示',
          menuPath: '/screenShow',
          menuBread: ['主页', '电子屏显示']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/screenShow/index.vue')
      },
      {
        path: '/functionSetUp',
        name: 'functionSetUp',
        text: '陪检运送功能设置',
        meta: {
          text: '陪检运送功能设置',
          menuPath: '/functionSetUp',
          menuBread: ['主页', '陪检运送功能设置']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/transport/functionSetUp/index.vue')
      },
      {
        path: '/checkManage',
        name: 'checkManage',
        text: '巡检计划',
        meta: {
          text: '巡检计划',
          menuPath: '/checkManage',
          menuBread: ['主页', '巡检计划']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/checkManage/checkPlan/index.vue')
      },
      {
        path: '/checkManage/add',
        name: 'checkManageAdd',
        text: '新建巡检计划',
        meta: {
          text: '新建巡检计划',
          menuPath: '/checkManage',
          menuBread: ['主页', '新建巡检计划']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/checkManage/checkPlan/add.vue')
      },
      {
        path: '/checkManage/detail',
        name: 'checkManageDetail',
        text: '巡检计划详情',
        meta: {
          text: '巡检计划详情',
          menuPath: '/checkManage',
          menuBread: ['主页', '巡检计划详情']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/checkManage/checkPlan/detail.vue')
      },
      {
        path: '/checkProject',
        name: 'checkProject',
        text: '巡检任务',
        meta: {
          text: '巡检任务',
          menuPath: '/checkProject',
          menuBread: ['主页', '巡检任务']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/checkManage/checkProject/index.vue')
      },
      {
        path: '/checkProject/list',
        name: 'checkProjectList',
        text: '巡检任务详情',
        meta: {
          text: '巡检任务详情',
          menuPath: '/checkProject',
          menuBread: ['主页', '巡检任务详情']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/checkManage/checkProject/list.vue')
      },
      {
        path: '/abnormalSearch',
        name: 'abnormalSearch',
        text: '异常查询',
        meta: {
          text: '异常查询',
          menuPath: '/abnormalSearch',
          menuBread: ['主页', '异常查询']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/checkManage/abnormalSearch/index.vue')
      },
      {
        path: '/checkSet',
        name: 'checkSet',
        text: '巡检分类设置',
        meta: {
          text: '巡检分类设置',
          menuPath: '/checkSet',
          menuBread: ['主页', '巡检分类设置']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/checkManage/checkSet/index.vue')
      },
      {
        path: '/checkWorkerManage',
        name: 'checkWorkerManage',
        text: '工作人员管理',
        meta: {
          text: '工作人员管理',
          menuPath: '/checkWorkerManage',
          menuBread: ['主页', '工作人员管理']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/checkManage/checkWorkerManage/index.vue')
      },
      {
        path: '/myCheckProject',
        name: 'myCheckProject',
        text: '我的任务',
        meta: {
          text: '我的任务',
          menuPath: '/myCheckProject',
          menuBread: ['主页', '我的任务']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/checkManage/myCheckProject/index.vue')
      },
      {
        path: '/checkTeamTask',
        name: 'checkTeamTask',
        text: '班组任务表',
        meta: {
          text: '班组任务表',
          menuPath: '/checkTeamTask',
          menuBread: ['主页', '班组任务表']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/checkManage/checkTeamTask/index.vue')
      },
      {
        path: '/warehousing',
        name: 'warehousing',
        text: '入库管理',
        meta: {
          text: '入库管理',
          menuPath: '/warehousing',
          menuBread: ['主页', '入库管理']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/warehouseManagement/warehousing/index.vue')
      },
      {
        path: '/warehousing/add',
        name: 'add',
        text: '新建入库',
        meta: {
          text: '新建入库',
          menuPath: '/warehousing/add',
          menuBread: ['入库管理', '新建入库']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/warehouseManagement/warehousing/add.vue')
      },
      {
        path: '/warehousing/edit',
        name: 'edit',
        text: '编辑入库',
        meta: {
          text: '编辑入库',
          menuPath: '/warehousing/edit',
          menuBread: ['入库管理', '编辑入库']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/warehouseManagement/warehousing/add.vue')
      },
      {
        path: '/warehousing/detail',
        name: 'detail',
        text: '入库详情',
        meta: {
          text: '入库详情',
          menuPath: '/warehousing/detail',
          menuBread: ['入库管理', '入库详情']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/warehouseManagement/warehousing/detail.vue')
      },
      {
        path: '/delivery',
        name: 'delivery',
        text: '出库管理',
        meta: {
          text: '出库管理',
          menuPath: '/delivery',
          menuBread: ['主页', '出库管理']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/warehouseManagement/delivery/index.vue')
      },
      {
        path: '/delivery/add',
        name: 'add',
        text: '新建出库',
        meta: {
          text: '新建出库',
          menuPath: '/delivery/add',
          menuBread: ['主页', '新建出库']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/warehouseManagement/delivery/add.vue')
      },
      {
        path: '/delivery/edit',
        name: 'edit',
        text: '编辑出库',
        meta: {
          text: '编辑出库',
          menuPath: '/delivery/edit',
          menuBread: ['主页', '编辑出库']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/warehouseManagement/delivery/add.vue')
      },
      {
        path: '/delivery/detail',
        name: 'detail',
        text: '出库详情',
        meta: {
          text: '出库详情',
          menuPath: '/delivery/detail',
          menuBread: ['主页', '出库详情']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/warehouseManagement/delivery/detail.vue')
      },
      {
        path: '/contractManage',
        name: 'contractManage',
        text: '合同管理',
        meta: {
          text: '合同管理',
          menuPath: '/contractManage',
          menuBread: ['主页', '合同管理']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/contractManage/index.vue')
      },
      {
        path: '/contractManage/add',
        name: 'add',
        text: '新建合同',
        meta: {
          text: '新建合同',
          menuPath: '/contractManage/add',
          menuBread: ['合同管理', '新建合同']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/contractManage/add.vue')
      },
      {
        path: '/contractManage/edit',
        name: 'edit',
        text: '编辑合同',
        meta: {
          text: '编辑合同',
          menuPath: '/contractManage/edit',
          menuBread: ['合同管理', '编辑合同']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/contractManage/add.vue')
      },
      {
        path: '/contractManage/detail',
        name: 'detail',
        text: '合同详情',
        meta: {
          text: '合同详情',
          menuPath: '/contractManage/detail',
          menuBread: ['合同管理', '合同详情']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/contractManage/detail.vue')
      },
      {
        path: '/contractDeathRemind',
        name: 'contractDeathRemind',
        text: '合同到期提醒',
        meta: {
          text: '合同到期提醒',
          menuPath: '/contractDeathRemind',
          menuBread: ['主页', '合同到期提醒']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/contractManage/deathRemind/index.vue')
      },
      {
        path: '/checkOrderSet',
        name: 'checkOrderSet',
        text: '巡检接单设置',
        meta: {
          text: '巡检接单设置',
          menuPath: '/checkOrderSet',
          menuBread: ['巡检管理', '巡检接单设置']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/checkManage/checkOrderSet/index.vue')
      },
      // {
      //   path: '/checkDictionary',
      //   name: 'checkDictionary',
      //   text: '巡检数字字典',
      //   meta: {
      //     text: '巡检数字字典',
      //     menuPath: '/checkDictionary',
      //     menuBread: ['巡检管理', '巡检数字字典']
      //   },
      //   isShow: true,
      //   icon: '1',
      //   component: () =>
      //     import('./views/checkManage/checkDictionary/index.vue')
      // },
      {
        path: '/checkStaReport',
        name: 'checkStaReport',
        text: '统计报表',
        meta: {
          text: '统计报表',
          menuPath: '/checkStaReport',
          menuBread: ['巡检管理', '统计报表']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/checkManage/checkStaReport/index.vue')
      },
      {
        path: '/personalDomain',
        name: 'personalDomain',
        text: '随时记录',
        meta: {
          text: '随时记录',
          menuPath: '/personalDomain',
          menuBread: ['随时记录', '随时记录']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/personalDomain/index.vue')
      },
      {
        path: '/someNote',
        name: 'someNote',
        text: '没有记录',
        meta: {
          text: '没有记录',
          menuPath: '/someNote',
          menuBread: ['随时记录', '没有记录']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/personalDomain/someNote.vue')
      },
      {
        path: '/happening',
        name: 'happening',
        text: '就没有发生',
        meta: {
          text: '就没有发生',
          menuPath: '/happening',
          menuBread: ['随时记录', '就没有发生']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/personalDomain/happening.vue')
      },
      {
        path: '/notebook',
        name: 'notebook',
        text: '笔记本',
        meta: {
          text: '笔记本',
          menuPath: '/notebook',
          menuBread: ['笔记本', '笔记本']
        },
        isShow: true,
        icon: '1',
        component: () =>
          import('./views/notebook/index.vue')
      },
      {
        path: '*',
        redirect: '/404',
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      text: '登录',
      menuPath: '/login',
      menuBread: []
    },
    component: () =>
      import('./views/Login.vue')
  },
  /*  {
     path: '/register',
     name: 'register',
     meta: {
       text: '注册',
       menuPath: '/register',
       menuBread: []
     },
     component: () => import('./views/Register.vue')
   }, */
  {
    path: '/404',
    name: 'noFound',
    meta: {
      text: '404',
      menuPath: '/nofound',
      menuBread: ['未找到页面']
    },
    component: () =>
      import('./views/noFound.vue')

  }
]
export default routeList