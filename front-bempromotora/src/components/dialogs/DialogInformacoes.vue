<template>
  <v-dialog style="overflow-x:hidden;" width="480px" v-model="showDialogInformacoes" persistent>
    <v-card style='overflow-x:hidden'>
      <v-content style="padding: 45px; padding-bottom: 10px">
        <v-row align-content="center" justify="center">
          <v-col cols="12">
            <v-container fluid>
              <span style="text-align:center; font-weight: bold; font-size: 25px ">{{msgInfo}}</span>
            </v-container>
          </v-col>
        </v-row>
      </v-content>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
                class="ma-2 font-bold" dark
          color="indigo darken-4 darken-4"
                style="font-size: 20px"
          @click="mudarInformacoes()"
        >OK</v-btn>

        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  import {mapActions} from "vuex";

  export default {
    name: "DialogInformacoes",
    props: {
      tipo: String,
      msgInfo: String,
      value: Boolean
    },
    computed: {
      showDialogInformacoes: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit("input", value);
        }
      }
    },
    methods: {
      ...mapActions(["changeInformacoes"]),
      mudarInformacoes(){
        this.changeInformacoes({
          msgInfo: null,
          tipo: this.tipo,
          showDialogInformacoes: false
        });

        this.showDialogInformacoes=false;
      }
    }
  };
</script>

<style scoped>
.title-step span {
  font-size: 36px;
}

h5 {
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 10px;
}
</style>
