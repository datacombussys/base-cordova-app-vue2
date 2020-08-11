<template>
  <div class="category-list">
    <div class="headline text-center pt-3">Categories</div>
    <v-list>
      <v-subheader>Categories</v-subheader>
        <v-list-item
          v-for="(item, i) in GET_INV_CATEGORY_LIST"
          :key="i"
        @click="testMethod">
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { DxList } from "devextreme-vue/list";


export default {
	name: "categoryListComponent",
	components: {
    DxList
  },
  props: {
  },
  data() {
    return {
    };
  },
  methods: {
    testMethod() {
      console.log('testMethod')
    },
    handleClick(e) {
      console.log('handleClick e', e)
      this.$emit('navigated');
    },

   
  },
  computed: {
    ...mapGetters(["GET_INV_CATEGORY_LIST"])
  },
  mounted() {

  },
  watch: {
  
  },
  
};
</script>

<style lang="scss">
@import "../../../../assets/sass/dx-styles.scss";
@import "../../../../assets/themes/devexpress/generated/variables.base.scss";

.category-list {
  background: rgb(255, 255, 255);
  height: 100%;
}


</style>
