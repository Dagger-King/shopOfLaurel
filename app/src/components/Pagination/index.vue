<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button v-if="pageStartAndEnd.start > 1" @click="$emit('getPageNo', 1)" :class="{active:pageNo==1}">
      1
    </button>
    <button v-if="pageStartAndEnd.start > 2">···</button>

    <button
      v-for="x in showPage"
      :key="x"
      @click="$emit('getPageNo', pageStartAndEnd.start + x - 1)"
      :class="{active:pageNo==pageStartAndEnd.start + x - 1}"
    >
      {{ pageStartAndEnd.start + x - 1 }}
    </button>

    <button v-if="pageStartAndEnd.end < totalPage - 1">···</button>
    <button
      v-if="pageStartAndEnd.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{active:pageNo==totalPage}"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">
      共 <i>{{ total }}</i> 条
    </button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    pageStartAndEnd() {
      const { pageNo, continues, totalPage } = this;
      // console.log(totalPage, continues);
      let start = 1;
      let end = totalPage;
      let wing = parseInt(continues / 2);
      if (continues <= totalPage) {
        start = pageNo - wing;
        end = pageNo + wing;
        // console.log(start, end);
        if (start < 1) {
          start = 1;
          end = continues;
          // console.log(start, end);
        }
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
          // console.log(start, end);
        }
      }
      return { start, end };
    },
    showPage() {
      if (this.continues > this.totalPage) {
        console.log(this.totalPage);
        return this.totalPage;
      } else {
        return this.continues;
      }
    },
  },
};
</script>

<style scoped lang='less'>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background-color: skyblue;
}
</style>