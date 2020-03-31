<template>
  <v-row align-content="center" justify="center">
    <v-col cols="12">
      <v-alert :type="type">
        <div v-html="message"></div>
      </v-alert>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "Alert",
  props: {
    type: String,
    message: String
  }
};
</script>