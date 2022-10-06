<template>
    <div class="post_section"
    :class="{ active: status }">
        <a
        class="post_container"
        v-for="(post, index) in posts"
        :key="index"
        :href="post.link"
        >
          <img :src="post.enclosure" class="post_img" alt="">
          <div class="post_content">
            <p class="post__title">{{ post.title }}</p>
            <p class="post__description">{{ post.description }}</p>
            <a :href="post.link" class="post__link">Подробнее</a>
            <p class="post__pubDate">{{ post.pubDate }}</p>
          </div>
        </a>
    </div>
</template>

<script>
export default {
  props: {
    posts: {
      default: () => [],
    },
    status: {
        default: false,
        type: Boolean
    }
  },
}
</script>

<style scoped>
.post_section {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 20px;
    margin-top: 25px;
}
.post_img {
    width: 200px;
    height: 100px;
    display: none;
    margin: 10px 30px 0 0;
}
.post_container {
    box-sizing: border-box;
    padding: 20px;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: #696969;
    font-family: sans-serif;
    width: 520px;
    height: 256px;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.05);
    border-radius: 3px;
}
.post_content {
    max-width: 772px;
}
.post_section.active .post_container .post_content {
   width: 100%;
}
.post__title {
    font-family: 'Arial';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #0029FF;
    margin: 10px 0 0 0;
}
.post__description {
    height: 40px;
    max-width: 459px;
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
}
.post_section.active .post_container .post_content .post__description {
   max-width: 100%;
}
.post__link {
    color: #0029FF;
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    display: none;
}
.post_section.active .post_container .post__link {
    display: none;
}
.post__pubDate {
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
}
.post_section.active {
    flex-wrap: wrap;
    flex-direction: column;
}
.post_section.active .post_container {
   width: 100%;
   height: auto;
   box-sizing: border-box;
   flex-direction: unset;
}
.post_section.active .post_container .post_img {
    display: block;

}

</style>