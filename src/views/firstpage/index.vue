<template>
  <div class="firstpage-container">
    <div class="firstpage-text">welcome {{ name }}
      <!--<el-button @click="test()">asda</el-button>-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Firstpage',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
    }
  }
  // methods: {
  //   test() {
  //     console.log('asa')
  //     this.$store.dispatch('user/setroutes').then(() => {
  //     }).catch(() => {
  //     })
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
