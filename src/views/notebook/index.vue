<template>
  <ContainerGroup>
    <Container>
      <div>vue中本地储存实时监听</div>
    </Container>
    <Container>
      <pre>
        Vue.prototype.resetSetItem = function (key, newVal) { 
            if (key === 'changData') { 
                // 创建一个StorageEvent事件 
                var newStorageEvent = document.createEvent('StorageEvent'); 
                const storage = { 
                    setItem: function (k, val) { 
                        sessionStorage.setItem(k, val); 
                        // 初始化创建的事件 
                        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null); 
                        // 派发对象 
                        window.dispatchEvent(newStorageEvent) 
                    } 
                } 
                return storage.setItem(key, newVal);
          }
        }
        //A页面 存储值
        this.resetSetItem('changeData', this.value);
        
        //B页面 监听
        window.addEventListener('setItem', ()=> {
            this.newVal = sessionStorage.getItem('changeData');
        }) 
      </pre>
    </Container>
  </ContainerGroup>
</template>

<script>
export default {

}
</script>

<style>

</style>