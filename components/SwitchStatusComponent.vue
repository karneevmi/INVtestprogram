<template>
  <div class="status">
        <svg 
        @click="swichState(true)" 
        class="iconblok"
        :class="{ active: status == true }"
        width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="18" height="8"/>
            <rect y="10" width="18" height="8"/>
        </svg>
        <svg 
        @click="swichState(false)" 
        class="iconblok"
        :class="{ active: status == false }"
        width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="8" height="8"/>
            <rect y="10" width="8" height="8"/>
            <rect x="10" width="8" height="8"/>
            <rect x="10" y="10" width="8" height="8"/>
        </svg>
  </div>
</template>

<script>
export default {
   data: () => {
    return {
      status: true
    };
  },
  mounted() {
    this.status = this.statusProp
  },
  methods: {
  swichState(prop) {
    this.status = prop
  }
  },
  watch: {
    statusProp() {
      this.status = this.statusProp
    },
    status() {
      this.$emit("changeStatus", this.status)
    }
  },
  props: {
    statusProp: {
      default: true
    }
  }
};
</script>

<style scoped>

.iconblok {
    fill: #C4C4C4;
}
.active {
  fill: #0029FF;
}
</style>