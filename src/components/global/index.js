
export default {
  install: (Vue) => {
    [
      {
        name: 'ContainerGroup',
        component: () => import('./ContainerGroup.vue')
      },
      {
        name: 'Button',
        component: () => import('./Button.vue')
      },
      {
        name: 'Container',
        component: () => import('./Container.vue')
      },
      {
        name: 'Input',
        component: () => import('./Input.vue')
      },
      {
        name: 'Select',
        component: () => import('./Select.vue')
      },
      {
        name: 'TextArea',
        component: () => import('./TextArea.vue')
      },
      {
        name: 'TextButton',
        component: () => import('./TextButton.vue')
      },
      {
        name: 'Dialog',
        component: () => import('./Dialog.vue')
      },
      {
        name: 'FilterForm',
        component: () => import('./FilterForm.vue')
      },
      {
        name: 'Table',
        component: () => import('./Table.vue')
      },
      {
        name: 'DatePicker',
        component: () => import('./DatePicker.vue')
      },
      {
        name: 'Empty',
        component: () => import('./Empty.vue')
      },
      {
        name: 'WaitingState',
        component: () => import('./WaitingState.vue')
      },
      {
        name: 'Drawer',
        component: () => import('./Drawer.vue')
      },
      {
        name: 'DropDown',
        component: () => import('./DropDown.vue')
      },
      {
        name: 'OperationContainer',
        component: () => import('./OperationContainer.vue')
      }
    ].forEach(item => {
      Vue.component(item.name, item.component)
    })
  }
}
