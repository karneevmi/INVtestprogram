<template>
  <div class="sites">
    <button class="sites_btn"
      v-for="(site, index) in sites"
      :key="index"
      @click="changeSite(site.link)"
      :class="{ active: site.link == sitenews }"
    >
      {{ site.title }}
    </button>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      sites: [
        {
          title: "Все",
          link: "all",
        },
        {
          title: "Lenta.ru",
          link: "lenta",
        },
        {
          title: "Mos.ru",
          link: "mos",
        },
      ],
    };
  },
  props: {
    sitenews: {
      default: "all",
    }
  },
  mounted() {
    
  },
  methods: {
    changeSite(link) {
        this.$emit("changeSite", link);

        const buttons = document.querySelectorAll('button')
    
        for(let i = 0; i < buttons.length; i++){
        buttons[i].onclick = function(){
        [...buttons].forEach((el) => el.classList.remove('active')); 
        this.classList.add('active')
  }
}
    },
  },
};
</script>

<style scoped>
.sites_btn {
    border: 0;
    background-color: white;
    color: #0029FF;
    font-family: 'Arial';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
}
.active {
    color: #000000;
}
</style>