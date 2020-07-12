<template>
  <div>
    <h2>The template page</h2>
    <h3>This is supposed to appear in the drawer</h3>
  </div>
</template>

<script>



export default {
  name: "pageTemplate",
    mixins: [

  ],
  components: {

  },
  data() {
    return {
      //Component Data
      pageSettings: {
      leftNavDrawer: ".accounting-panel",
      pageTitle: "Accounting"
    },
      moduleInfo: {
        name: "Accounting",
        type: "dashboard",
        level: 5
      },
      //Main Settings
    
    }
  },
  methods: {
    testButton() {
      
    },

  },
  computed: {

    
  },
  watch: {

  },
  mounted() {

    
  },
  created() {

  },

    
  }
</script>

<style lang="scss" scoped>

</style>

