<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content"><router-view/></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
#main-wrap {
  height: 100vh;
}

.main-content {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 30px;
  padding-left: $navMenuWeight + 30px;
  padding-right: 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  @include webkit(box-sizing,border-box);
  @include webkit(transition, all .3s ease 0s);
  background-color: rgb(243,243,244);
}

.open {
  .main-content { padding-left: $navMenuWeight + 30; }
}
.close {
  .main-content { padding-left: $navMenuWeightClose + 30; }
}

.content {
  width: 100%;
  height: 100%;
  padding: 30px 30px 0 30px;
  background-color: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  @include webkit(box-sizing,border-box);
}
</style>