<template>
  <v-md-editor v-model="form.text" height="400px"></v-md-editor>
</template>

<script lang="ts" setup>

import { reactive} from "vue"

const form = reactive({
  text:"aaaaaaaaaaa"
})

</script>