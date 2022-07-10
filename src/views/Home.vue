<template>
<div>
  <h1>Home Page</h1>
  <div class="banner">
      <a-input-search placeholder="input search text" enter-button @search="onSearch" />
  </div>

</div>
  
</template>

<script>
export default {
  methods: {
    onSearch(value) {
      console.log(value);
    },
  },
};
</script>



