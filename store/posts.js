
export const state = () => ({
    all: [],
    mosfeed: [],
    lentafeed: [],
    searchQuery: '',
    page: 1,    
    kposts: 4,
    site: "all"
})



export const actions = {
    async fetchLenta() {
        const response = await this.$axios.$get("https://lenta.ru/rss/news")
        return response
    },
    async fetchMos() {
        const response = await this.$axios.$get("https://www.mos.ru/rss")
        return response
    }
}

export const getters = {


  }