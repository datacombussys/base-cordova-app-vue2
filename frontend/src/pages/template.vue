<template>
  <div>
    <h2>The template page</h2>
    <div>
      <div class="row">
        <div>
          <div class="row">
            
          </div>
        </div>
      </div>
    </div>
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

