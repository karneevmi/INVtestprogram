<template>
  <div class="wrapper">
    <div class="searchReset">
      <div class="reset">
        <h1>Список новостей</h1>
      <ResetComponent/>
      </div>
      <SearchComponent
      @input="(el) => (searchQuery = el)"
      :searchQuery="searchQuery"
      />
    </div>
    <div class="line"></div>
      <div class="navbar">
        <HeaderComponent 
        :sitenews="site"
        @changeSite="(el) => (site = el)" />
        <SwitchStatusComponent
        :statusProp="postStatus"
        @changeStatus="(el) => (postStatus = el)"/>
      </div>
      <div v-if="isLoading">Loading...</div>
    <PostComponent 
    :status="postStatus"
    v-else
    :posts="filterPosts"
     />
    <PaginationComponent
      @changePage="(el) => (page = el)"
      :currentPage="page"
      :countPages="countPages"
    />

  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import {xmlParse} from "@/helpers"

export default {
  data: () => {
    return {
      postStatus: false,
      kposts: 4,
      searchQuery: '',
      isLoading: false,
      site: "all",
      page: 1,
      feed: [],
      params: 1,
      isLoaded: false,
      globalPosts: {
        mos: [], 
        lenta: []
      },
          }
  },
  components: {
    HeaderComponent,
    PaginationComponent,
  },
  created() {
    if (process.browser){
      this.params = new URLSearchParams(window.location.search)   
    }
  },

  methods: {
    async getData() {
      this.$router.push({
        path: "/",
        query: { site: this.site, page: this.page},
      })
    },
    async getGlobalPosts () {
      this.isLoading = true
      const resMos = await this.$store.dispatch("posts/fetchMos")
      this.globalPosts.mos = xmlParse(resMos)
      const resLenta = await this.$store.dispatch("posts/fetchLenta")
      this.globalPosts.lenta = xmlParse(resLenta)
      this.isLoading = false

    },
  },

  async mounted() {
    if (process.client) {
      this.postStatus = JSON.parse(localStorage.getItem("status"))
    }
    await this.getGlobalPosts()
    this.site = this.params.get("site") || "all";
    this.page = this.params.get("page") || 1;
    this.searchQuery = this.params.get("searchQuery") || "";

    this.getData();
    this.$nextTick(() => {
      this.isLoaded = true;
    });
  },

  computed: {
     countPages() {
        const currentSite = this.site ===  "all" ? [...this.postAll] : [...this.globalPosts[this.site]] || []
        const countPages = Math.ceil(currentSite.length / this.kposts)
        return countPages
    },
    postAll() {
        return [].concat(this.globalPosts.mos, this.globalPosts.lenta)
    },
    filterPosts() { 
        const arrPosts = this.site ===  "all" ? [...this.postAll] : [...this.globalPosts[this.site]] || []
        const searchAndFilterPosts = arrPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        if (this.searchQuery !== "") {
          this.kposts = 10000
          this.$router.push({
          path: "/",
          query: { site: this.site, page: this.page, searchQuery: this.searchQuery },
        });
        } else {
          if (process.client) {
            this.kposts = this.postStatus ? 3 : 4     
      }
          this.$router.push({
          path: "/",
          query: { site: this.site, page: this.page},
        });
        }
        const start = ((this.page) - 1) * this.kposts
        const end = this.page * this.kposts
        const b = searchAndFilterPosts.slice(start, end)
        return b
    },
  },
  watch: {
    postStatus() {

      if (process.client) {
            localStorage.setItem("status", this.postStatus)
            this.kposts = this.postStatus ? 3 : 4     
      
      }
    },
    site() {
      if (this.isLoaded) {
        this.page = 1;
        this.getData();
      }
    },
    page() {
      if (this.isLoaded) {
        this.getData();
      }
    },
  },
};
</script>
<style>
  body {
    max-width: 1060px;
    margin: 0 auto;
  }
  .searchReset {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .line {
    max-width: 100%;
    height: 1px;
    background: #E5E5E5;
    margin-bottom: 25px;
    margin-top: 20px;
  }
  .reset {
    display: flex;
    align-items: center;
    gap: 30px;
  }
</style>