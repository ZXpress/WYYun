<template>
  <div>
    <div class="search_wrap main">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        shape="round"
        @input="inputFn"
      />
      <!-- 热门搜索 -->
      <div
        class="hot_name_wrap search_wrap"
        v-if="this.resultList.length === 0"
      >
        <p class="hot_title">热门搜索</p>
        <span
          class="hot_item"
          v-for="(obj, ind) in hotlist"
          :key="ind"
          @click="fn(obj.first)"
          >{{ obj.first }}</span
        >
      </div>
      <!-- 搜索结果 -->
      <div class="search_wrap" v-else>
        <!-- 标题 -->
        <p class="hot_title">最佳匹配</p>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <SongItem
            v-for="obj in resultList"
            :key="obj.id"
            :name="obj.name"
            :author="obj.ar[0].name"
            :id="obj.id"
          ></SongItem>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import { hotSearchAPI, searchResultAPI } from "../../api/index";
import SongItem from "../../components/SongItem.vue";
export default {
  components: {
    SongItem,
  },
  data() {
    return {
      value: "",
      hotlist: [],
      resultList: [],
      loading: false,
      finished: false,
      page: 1, //当前默认页面
      timer: null,
    };
  },
  async created() {
    const res1 = await hotSearchAPI();
    // console.log(res1);
    this.hotlist = res1.data.result.hots;
  },
  methods: {
    async getListFn() {
      return await searchResultAPI({
        keywords: this.value,
        limit: 20,
        offset: (this.page - 1) * 20,
      });
    },
    async fn(hotname) {
      this.page = 1;
      this.finished = false; // 点击新关键词-可能有新的数据
      this.value = hotname;
      // console.log(this.getListFn());
      const res = await this.getListFn();
      console.log(res);
      this.resultList = res.data.result.songs;
      //this.loading = false; // 本次数据加载完毕-才能让list加载更多
    },
    async inputFn() {
      //防抖
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        this.page = 1;
        this.finished = false; // 输入框关键字改变-可能有新数据(不一定加载完成了)
        if (this.value.trim().length === 0) {
          this.resultList = [];
          return;
        }
        const res = await this.getListFn();
        if (res.data.result.songs === undefined) {
          this.resultList = [];
          return;
        }
        // console.log(res);
        this.resultList = res.data.result.songs;
      }, 500);
    },
    async onLoad() {
      //触发后会自动将loading改为true
      this.page++;
      const res = await this.getListFn();
      // console.log(res);
      if (res.data.result.songs === undefined) {
        // 没有更多数据了
        this.finished = true; // 全部加载完成(list不会在触发onload方法)
        this.loading = false; // 本次加载完成
        return;
      }
      this.resultList = [...this.resultList, ...res.data.result.songs];
      this.loading = false;
    },
  },
};
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
.van-cell {
  border-bottom: 1px solid lightgray;
}
.main {
  margin: 46px 0 50px 0;
  padding: 0;
}
</style>