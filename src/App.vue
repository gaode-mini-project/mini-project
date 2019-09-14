<template>
  <div id="app">
    <div id="container"></div>
    <Layer />
    <Action />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Layer from '@/components/Layer.vue';
import Action from '@/components/Action.vue';

@Component({
  components: {
    Layer,
    Action,
  },
})
export default class App extends Vue {
  mounted() {
    const map  = new AMap.Map('container', {
      zoom: 13,
    });
    this.$store.dispatch('initMap', map);

    AMap.plugin([
      'AMap.ToolBar',
    ], () => {
      // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
      map.addControl(new AMap.ToolBar({
        // 简易缩放模式，默认为 false
        liteStyle: true
      }));
    });
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;

  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#container {
  width: 100%;
  height: 100%;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

html, body {
  width: 100%;
  height: 100%;

  padding: 0;
  margin: 0;

  box-sizing: border-box;
}

.tool-box {
  padding: 10px;

  background: rgba(219, 219, 219, .8);
  border-radius: 5px;
}

.mb-5 {
  margin-bottom: 5px;
}

.ml-5 {
  margin-left: 5px;
}

</style>
