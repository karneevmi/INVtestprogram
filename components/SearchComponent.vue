<template>
  <div class="search">
        <input @input="updateInput" :value="searchQuery" type="text" class="search-field">
        <img src="../assets/Stroke.svg" alt="" class="search-icon">
    </div>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    searchQuery: [String]
  },
  methods: {
    updateInput(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped>
.search {
    display: inline-flex;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    height: 40px;
    width: 321px;
}
.search-icon {
    width: 20px;
    height: 20px;
    margin: 10px;
}
.search-field {
    width: 288px;
    border: 0; 
    padding-left: 10px;
}

</style>