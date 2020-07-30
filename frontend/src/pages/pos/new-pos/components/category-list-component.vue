<template>
  <div>
    <div class="headline text-center pt-3">Categories</div>
    <v-list>
      <v-subheader>Categories</v-subheader>
        <v-list-item
          v-for="(item, i) in categoriesList"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
    </v-list>
  </div>
</template>

<script>
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
      categoriesList: [
        { id: 1, text: "Doors"},
        { id: 2, text: "Frame"},
        { id: 3, text: "Manifold"},
        { id: 4, text: "Engine"}
      ]
    };
  },
  methods: {
    handleClick(e) {
      console.log('handleClick e', e)
      this.$emit('navigated');
    },

   
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

.side-navigation-menu {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: 100%;
  width: 250px !important;

  .menu-container {
    min-height: 100%;
    display: flex;
    flex: 1;

    .dx-treeview {
      // ## Long text positioning
      white-space: nowrap;

      // ## Icon width customization
      .dx-treeview-item {
        padding-left: 0;
        padding-right: 0;

        .dx-icon {
          width: $side-panel-min-width !important;
          margin: 0 !important;
        }
      }

      // ## Arrow customization
      .dx-treeview-node {
        padding: 0 0 !important;
      }

      .dx-treeview-toggle-item-visibility {
        right: 10px;
        left: auto;
      }

      .dx-rtl .dx-treeview-toggle-item-visibility {
        left: 10px;
        right: auto;
      }

      // ## Item levels customization
      .dx-treeview-node {
        &[aria-level="1"] {
          font-weight: bold;
          border-bottom: 1px solid $base-border-color;
        }

        &[aria-level="2"] .dx-treeview-item-content {
          font-weight: normal;
          padding: 0 $side-panel-min-width;
        }
      }
    }

    // ## Selected & Focuced items customization
    .dx-treeview {
      .dx-treeview-node-container {
        .dx-treeview-node {
          &.dx-state-selected:not(.dx-state-focused) > .dx-treeview-item {
            background: transparent;
          }

          &.dx-state-selected > .dx-treeview-item * {
            color: $base-accent;
          }

          &:not(.dx-state-focused) > .dx-treeview-item.dx-state-hover {
            color: rgb(34, 34, 34);
            background-color: lighten($base-bg, 4);
          }
        }
      }
    }

    .dx-theme-generic .dx-treeview {
      .dx-treeview-node-container
        .dx-treeview-node.dx-state-selected.dx-state-focused
        > .dx-treeview-item
        * {
        color: inherit;
      }
    }
  }
}
.category-list {
  background: rgb(255, 255, 255);
  height: 100%;
  max-width: 250px;
}


</style>
