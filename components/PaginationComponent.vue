<template>
  <div class="pagination">
    <button
        v-if="page > 2"
        :class="{ active: currentPage == 1 }"
        @click="changePage(1), setPage(1)"
      >
      {{ 1 }}
    </button>

    <p v-if="this.page > 2">...</p>
    <button
      v-for="index in paginationPages"
      :key="index"
      @click="changePage(index), setPage(index)"
      :class="{ active: index == currentPage }"
    >
      {{ index }}
    </button>

    <p v-if="this.page < this.countPages - 1">...</p>

    <button
      :class="{ active: currentPage == countPages }"
      @click="changePage(countPages), setPage(countPages)"
      >
        {{ countPages }}
      </button>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      page: 1,
      offset: 4,
    };
  },
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    },
    setPage(index) {
      this.page = index;
    },
  },
  computed: {
    paginationPages() {
      const pages = Array.from({ length: this.countPages - 1 }, (_, i) => i + 1);
      let first = this.page - 2;
      let last = this.page + this.offset - 2;

      if (first < 0) {
        first = 0;
        last += 1;
      }

      if (first > this.countPages - this.offset - 1) {
        first = this.countPages - this.offset - 1;
      }

      return pages.slice(first, last);
    },
  },
  watch: {
    currentPage() {
      this.page = this.currentPage
    }
  },
  props: {
    currentPage: {
      default: 1,
    },
    countPages: {
      default: 1,
    }
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
button {
  border: 0;
  background-color: white;
  color: #000000;
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
}
.active {
  color: #0029FF;
}
</style>