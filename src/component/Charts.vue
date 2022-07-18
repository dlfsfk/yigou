<template>
  <div>
    <div id="chart" ref="container"></div>
  </div>
</template>
<script>
export default {
  name: "ec",
  props:{
	  options:{
	  	 type:Object,
		 default:{},
		 required:true,
	  }
  },
  data() {
    return {
      echartsinstance: {},
    };
  },
  mounted() {
    this.echartsinstance = this.$echarts.init(this.$refs.container);
    this.echartsinstance.setOption(this.options);
  },
  methods: {},
  watch: {
    options() {
      this.echartsinstance.setOption(this.options);
    },
  },
};
</script>

<style scoped>
#chart {
  width: 600px;
  height: 400px;
}
</style>