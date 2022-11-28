<template>
    <table class="ranking">
        <tr>
            <th class="rank_index">RANK</th>
            <th>NAME</th>
            <th>TOTAL</th>
            <th>HIT</th>
            <th>SPEED</th>
        </tr>
        <tr class="rank" v-for="rank in ranking">
            <td class="rank_index">{{ranking.indexOf(rank) + 1}}</td>
            <td>{{rank.username}}</td>
            <td>{{rank.total_score}}</td>
            <td>{{rank.score}}</td>
            <td>{{rank.speed_score === -1 ? '0' : rank.speed_score}}</td>
        </tr>
    </table>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  name: 'ranking',
  props: [
    'ranking',
  ],
  mounted() {
  },
  computed: {
  },
  methods: {
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

</style>
