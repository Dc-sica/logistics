const quesTypeList = [
  {
    type:"singleChoice",
    typeName:'单选题',
    isRequire:true,
    icon:'&#xe627;',
    title:'这是一道单选题',
    selectItems:[
      {
        label:'选项',
        isRemark:''
      }
    ]
  },
  {
    type:"multipleChoice",
    typeName:'多选题',
    isRequire:true,
    title:'这是一道多选题',
    icon:'&#xe608;',
    selectItems:[
      {
        label:'选项一',
        isRemark:''
      }
    ]
  },
  {
    type:"dropDown",
    typeName:'下拉题',
    isRequire:true,
    title:'这是一道下拉题',
    icon:'&#xe63f;',
    placeholder:'请选择',
    selectItems:[
      {
        label:'',
        isRemark:''
      }
    ]
  },
  {
    type:"singleInput",
    typeName:'单行文本',
    placeholder:'请输入',
    title:'这是一道单行文本题',
    icon:'&#xe638;',
    isRequire:true
  },
  {
    type:"multipleInput",
    typeName:'多行文本',
    placeholder:'请输入',
    icon:'&#xe650;',
    title:'这是一道多行文本题',
    isRequire:true
  },
  {
    type:"upInput",
    typeName:'上传照片',
    // placeholder:'请输入',
    icon:' &#xe651;',
    title:'拍照',
    isRequire:true
  }
]

export default quesTypeList

