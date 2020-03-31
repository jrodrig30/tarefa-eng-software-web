<template>
  <v-footer :color="primary_color" >
    <v-container>
      <img :src="imageUrl" height="48" />
      <br />
      <span class="copy-footer">{{$t('msg_footer')}}</span>
    </v-container>
  </v-footer>
</template>

<script>
import { CONSTANTS } from "../libs/constants/Constants";

export default {
  name: "Footer",
  data: () => ({
    primary_color: CONSTANTS.PRIMARY_COLOR,
    imageUrl: CONSTANTS.IMAGE_URL
  })
};
</script>

<style scoped>
.copy-footer {
  font-size: 13px;
  color: white;
}
.v-footer {
  bottom: 0;
  margin-bottom: 0;
}
footer {
  padding: 0;
  margin-top: 0px;
}

@media screen and (max-width: 660px) {
  footer {
    padding: 0;
    margin-top: 0px;
  }
  img {
    height: 28px;
  }

  .copy-footer {
    font-size: 9px;
  }

  .v-footer {
    margin-bottom: constant(
      safe-area-inset-bottom
    ); /* move footer up on iPhone X - iOS 11.0 */
    margin-bottom: env(
      safe-area-inset-bottom
    ); /* move footer up on iPhone X - iOS 11.2 */
  }
}
</style>
