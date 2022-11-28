<template>
    <table class="ranking">
        <tr>
            <th class="rank_index cute">RANK</th>
            <th class="cute">NAME</th>
            <th class="cute">TOTAL</th>
            <th class="cute">TIME</th>
            <th class="cute">DELETE</th>
        </tr>
        <tr class="rank" v-for="rank in ranking">
            <td class="rank_index cute">{{ranking.indexOf(rank) + 1}}</td>
            <td>{{rank.username}}</td>
            <td class="cute">{{rank.score}}</td>
            <td class="cute">{{rank.time_score}}</td>
            <td class="cute">{{rank.remove_score}}</td>
        </tr>
    </table>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  name: 'Ranking',
  props: [
    'ranking',
  ],
  mounted() {
  },
};
</script>

<style lang='scss' scoped>
  @import "stylesheets/constants";
  table{
    display: table;
  }
  th, td{
    display: table-cell;
  }
  .ranking{
    padding: 10px;
  }
  .rank_index{
    text-align: center;
  }
  .cute{
    font-family: 'Cute Font', cursive;
    font-size: 1.3em;
  }

</style>
