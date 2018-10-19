<template>
    <v-layout>
        <v-flex md4>
            <v-btn @click="test(1)">test1</v-btn>
        </v-flex>
        <v-flex md4>
            <v-btn @click="test(2)">test2</v-btn>
        </v-flex>
        <v-flex md4>
            <v-btn @click="test(3)">test3</v-btn>
        </v-flex>
        <v-flex md4>
            <v-btn @click="testAll">testAll</v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
  import {Children} from '../api/children'

  let $test
  export default {
    name: 'test',
    mounted () {
      $test = new Children(this.$store)
    },
    methods: {
      test (i) {
        $test.test(i).then(result => {
          console.log('test', i, result)
        })
      },
      testAll () {
        $test.waitSend()
        $test.test(1).test(2).test(3)
        console.log('不发送-------------------')
        setTimeout(() => {
          console.log('~——+~~~*****开始发送')
          $test.test(1).test(2).test(3).send().then((result) => {
            console.log(result)
          })
        },3000)
      }
    }
  }
</script>

<style scoped>

</style>
