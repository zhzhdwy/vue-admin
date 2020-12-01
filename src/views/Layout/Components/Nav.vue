<template>
  <div id="nav-warp">
    <div class="logo">
      <img src="../../../assets/images/logo.png" alt="">
    </div>

    <!--    nav start-->
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
             :collapse="isCollapse" background-color="transparent" text-color="#fff"
             active-text-color="#fff" router>

      <template v-for="(item, index) in routers">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index+''">
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon"/>
            <!--            <i class="el-icon-location"></i>-->
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <el-menu-item-group>
            <template v-for="subItem in item.children">
              <el-menu-item v-if="!subItem.hidden" :key="subItem.id" :index="subItem.path+''">
                {{ subItem.meta.name }}
              </el-menu-item>
            </template>

          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
    <!--    nav end -->
  </div>
</template>

<script>
import {reactive, computed} from "@vue/composition-api"

export default {
  name: "navMenu",
  setup(props, {root}) {
    //数据
    // const isCollapse = ref(false)
    const routers = reactive(root.$router.options.routes)
    //监听值变化
    const isCollapse = computed(() => root.$store.state.app.isCollapse)


    //方法
    const handleOpen = (key, keyPath) => {
    }
    const handleClose = (key, keyPath) => {
    }

    return {
      isCollapse,
      handleOpen,
      handleClose,
      routers
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/config";

#nav-warp {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenuWeight;
  height: 100vh;
  background-color: rgb(47, 64, 80);
  @include webkit(transition, all .3s ease 0s);

  svg {
    margin-right: 8px;
    margin-bottom: 4px;
    font-size: 20px;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}


.logo {
  img {
    height: 45px;
    width: 45px;
    margin: auto;
    padding-top: 30px;
    padding-bottom: 30px;
    @include webkit(transition, all .3s ease 0s);
  }
}


.close {
  #nav-warp {
    width: $navMenuWeightClose;
  }

  //.logo {
  //  img {
  //    height: $navMenuWeightClose - 30px;
  //    width: $navMenuWeightClose  - 30px;
  //  }
  //}
}
</style>