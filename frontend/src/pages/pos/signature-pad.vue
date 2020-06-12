<template>
    <f7-page name="signature-pad">
      <f7-navbar back-link="Back">
        <f7-nav-left>
        <f7-link size="10" panel-open=".panel-left-2">
          <f7-icon material="menu"></f7-icon>
        </f7-link>
        </f7-nav-left>
        <f7-nav-title>Signature Pad</f7-nav-title>
      </f7-navbar>
      <!-- Main Container Row -->
      <f7-row class="full-height">
        <!-- Main Column -->
        <f7-col width="100" medium="100" class="full-height">
          <!-- Page content-->
          <f7-block-title class="no-margin-bottom" medium>Floorplan</f7-block-title>
          <f7-row class="title-bar">
            <p>Place columns here to add otions to add a new floorplan, list floorplans, name them, and save them.</p> 
          </f7-row>
          <f7-row class="full-height display-flex justify-content-start">
            <f7-col width="20" class="side-bar">
              <p>Place tools here to make floorplan</p>
              <f7-row class="margin">
                <f7-col>
                  <f7-button @click="clearScreen" fill>Clear</f7-button>
                </f7-col>
              </f7-row>
             
             
         
              <f7-row class="margin">
                <f7-col>
                  <f7-button class="bg-color-blue" @click="testButton" fill>Test Stuff</f7-button>
                </f7-col>
              </f7-row>
            </f7-col>
            <f7-col width="80">
              <v-stage ref="stage" 
                class="konva-stage" 
                :config="stageSize">
                <v-layer ref="layer">
                  <v-line></v-line>
                </v-layer>
              </v-stage>

            </f7-col>
          </f7-row>
        </f7-col>
      </f7-row>

    </f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';

  export default {
    name: "signaturepad",
    data() {
      return {
        //Konva Settings
        stage: null,
        layer: null,
        group: null,
        stageSize: {
          width: 900,
          height: 600
        }
      }
    },
    methods: {
      testButton() {
        console.log("this.stage", this.stage);
        console.log("this.layer", this.layer);
        console.log("this.rectangle", this.rectangle);
       
      },
      load() {
        const data = localStorage.getItem('storage') || '[]';
        this.list = JSON.parse(data);
      },

      save() {
        localStorage.setItem('storage', JSON.stringify(this.list));
      },
      clearScreen() {
        this.stage.removeChildren();
        this.freeDraw();
      },
      freeDraw() {
        var stage = this.stage;
        var layer = new Konva.Layer();
        this.stage.add(layer);

        var isPaint = false;
        var mode = 'brush';
        var lastLine;

        stage.on('mousedown touchstart', function(e) {
        isPaint = true;
        var pos = stage.getPointerPosition();
        lastLine = new Konva.Line({
          stroke: '#000',
          strokeWidth: 5,
          globalCompositeOperation:
            mode === 'brush' ? 'source-over' : 'destination-out',
          points: [pos.x, pos.y]
        });
        layer.add(lastLine);
        });

        stage.on('mouseup touchend', function() {
          isPaint = false;
        });

        // and core function - drawing
        stage.on('mousemove touchmove', function() {
          if (!isPaint) {
            return;
          }

          const pos = stage.getPointerPosition();
          var newPoints = lastLine.points().concat([pos.x, pos.y]);
          lastLine.points(newPoints);
          layer.batchDraw();
        });

  
      },

    },
    computed: {
      ...mapState(["Users", "Inventory"]),
      changeDragging() {
        if(this.isDragging) {
          return green;
        }
        return red;
      }
    },
    mounted() {
      this.load();
      this.stage = this.$refs.stage.getNode();
      this.layer = this.$refs.layer.getNode();
      // this.rectangle = this.$refs.rectangle.getNode();
      this.freeDraw();
      
    },
    on: {
      pageInit() {
        
      }
    }
    
  }
</script>

<style lang="less" scoped>
.title-bar {
  height: 100px;
  background: lightblue;
}
.side-bar {
  background: rgb(213, 245, 230);
  height: 100%;
}
.konva-stage {
  border: 2px solid black;
  width: 900;
  height: 600;
}

</style>

