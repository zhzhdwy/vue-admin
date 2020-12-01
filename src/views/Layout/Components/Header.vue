<template>
  <div id="header-warp">
    <div class="pull-left header-icon" @click="navMenuState">
      <svg-icon iconClass="menu" className="menu"/>
    </div>
    <div class="pull-right">
      <!--      头像-->
      <div class="user-profile pull-left">
        <img src="../../../assets/images/face.jpg" alt="">
        {{ username }}
      </div>
      <!--      -->
      <div class="header-icon pull-left" @click="exist">
        <svg-icon icon-class="exist" class-name="exist" ></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
import {computed} from "@vue/composition-api"

export default {
  name: "layoutHeader",
  setup(props, {root}) {
    const username = computed(() => root.$store.state.login.username)
    const navMenuState = () => {
      root.$store.commit('app/SET_isCollapse')
    }
    const exist = () => {
      root.$store.dispatch("login/exist").then(() => {
        root.$router.push({
          name: "Login"
        })
      })
    }

    return {
      navMenuState,
      username,
      exist
    }
  }
}
</script>

<style lang="scss" scoped>
#header-warp {
  position: fixed;
  top: 0;
  right: 0;
  left: $navMenuWeight;
  height: $layoutHeader;
  background-color: #fff;
  border: 1px solid rgb(231, 234, 236);
  line-height: $layoutHeader;
}

.close {
  #header-warp {
    left: $navMenuWeightClose;
  }
}

.header-icon {
  padding: 0 25px;

  svg {
    margin-bottom: -6px;
    font-size: 20px;
    cursor: pointer; //鼠标变手势
  }
}

.user-profile {
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #f7f7f7;
  font-size: 13px;

  img {
    display: inline-block;
    margin-bottom: -12px;
    margin-right: 18px;
    border-radius: 50px;
    height: 30px;
    width: 30px;
  }
}
</style>