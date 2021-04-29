<!--
 * @Author: Jason_Ma
 * @Date: 2021-01-06 14:37:41
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-01-06 16:55:55
 * @FilePath: /hos-logistics-management/src/views/noFound.vue
-->
<template>
  <div style="width:100%;height:100%; background:#fff">
    <table class="no-found">
      <tr>
        <td style="text-align:right">
          <img src="@/assets/image/404.77e1571b.svg"
            alt />
        </td>
        <td style="text-align:left">
          <p>对不起，您请求的页面不存在、或已被删除、或暂时不可用</p>
          <br>
          <p>
            <a href="/"
              class="p-btn-text-primary">返回首页</a>
          </p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'noFound'
}
</script>
<style lang="less">
.no-found {
  width: 90%;
  height: 100%;
}
.p-btn-text-primary {
  color: #ff8c00;
}
</style>
