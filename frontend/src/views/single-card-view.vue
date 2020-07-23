<template>
  <div class="login-page">  
    <dx-scroll-view height="100%" width="100%" class="with-footer single-card">
      <div class="dx-card"><slot /></div>
    </dx-scroll-view>
  </div>
</template>

<script>
import DxScrollView from "devextreme-vue/scroll-view";

export default {
  components: {
    DxScrollView
  }
};
</script>

<style lang="scss">
.login-page {
  margin-top: 15%;
}
.single-card {

  .dx-card {
    width: 330px;
    margin: 40px auto;
    padding: 40px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);

    .screen-x-small & {
      width: 100%;
      height: 100%;
      border-radius: 0;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
      margin: 0;
      border: 0;
      flex-grow: 1;
    }
  }
}

</style>
