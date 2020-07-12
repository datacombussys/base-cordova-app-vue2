<template>
    <f7-page name="floorplan">
      <f7-navbar back-link="Back">
        <f7-nav-left>
        <f7-link size="10" panel-open=".panel-left-3">
          <f7-icon material="menu"></f7-icon>
        </f7-link>
        </f7-nav-left>
        <f7-nav-title>Floorplan</f7-nav-title>
      </f7-navbar>
      <!-- Main Container Row -->
      <f7-row class="full-height">
        <!-- Main Column -->
        <f7-col width="100" medium="100" class="full-height">
          <!-- Page content-->
          <f7-list>
          <f7-row class="title-bar">
            <f7-col class="margin-left" width="15">
              <f7-row>
                <f7-button outline @click="addTableNumber">Add Table Number</f7-button>
              </f7-row>
              <f7-row class="display-flex, justify-content-center align-items-center">
                <f7-col width="80">
                  <f7-list-input
                    style="max-width: 150px;"
                    outline
                    floating-label
                    type="number"
                    clear-button
                    :value="tableNumber"
                    @input="tableNumber = $event.target.value"
                    required>
                    <p slot="inner-start">Table Number:</p>
                  </f7-list-input>
                </f7-col>
                <f7-col width="15">
                  <f7-link icon-size="30" @click="incTableNo" icon="mdi mdi-chevron-up"></f7-link>
                  <f7-link icon-size="30" @click="decTableNo" icon="mdi mdi-chevron-down"></f7-link>
                </f7-col>
              </f7-row>
            </f7-col>
            <f7-col class="margin-left" width="15">
              <f7-button outline @click="addTableNumber">Add Server</f7-button>
              <f7-list-input
                style="max-width: 250px;"
                outline
                floating-label
                type="select">
                <option value="">Sally Jones</option>
                <option value="">Michael Herman</option>
                <option value="">Josh Groban</option>
                <p slot="inner-start">Name:</p>
              </f7-list-input>
          </f7-col>
          <f7-col width="25">
            <div class="floor-crud-div display-flex align-items-center justify-content-center">
              <f7-row>
                <f7-col width="90" class="text-color-gray">
                  <f7-link popover-open=".floorCrud">Main Dining Hall</f7-link> 
                </f7-col>
                <f7-col width="10">
                  <f7-link 
                  icon-ios="f7:chevron_down" 
                  icon-aurora="f7:chevron_down" 
                  icon-md="f7:chevron_down" 
                  href="#"
                  popover-open=".floorCrud"></f7-link>
                </f7-col>
                <f7-popover class="floorCrud">
                  <f7-list>
                    <f7-list-item link="#" popover-close title="Main Dining Room"></f7-list-item>
                    <f7-list-item link="#" popover-close title="Patio"></f7-list-item>
                  </f7-list>
                </f7-popover>
              </f7-row>
            </div>
          </f7-col>
            <f7-col width="25">
              <div class="floor-crud-div display-flex align-items-center justify-content-center">
                <f7-row>
                  <f7-col width="90" class="text-color-gray">
                    <f7-link popover-open=".file-mgt">Manage Layout</f7-link> 
                  </f7-col>
                  <f7-col width="10">
                    <f7-link 
                    icon-ios="f7:chevron_down" 
                    icon-aurora="f7:chevron_down" 
                    icon-md="f7:chevron_down" 
                    href="#"
                    popover-open=".file-mgt"></f7-link>
                  </f7-col>
                  <f7-popover class="file-mgt">
                    <f7-list>
                      <f7-list-item link="#" popover-close title="Save layout"></f7-list-item>
                      <f7-list-item link="#" popover-close title="New Layout"></f7-list-item>
                      <f7-list-item link="#" popover-close title="Delete Layout"></f7-list-item>
                      <f7-list-item link="#" popover-close title="Export Layout"></f7-list-item>
                      <f7-list-item link="#" popover-close title="Print Layout"></f7-list-item>
                    </f7-list>
                  </f7-popover>
                </f7-row>
              </div>
            </f7-col>
          </f7-row>
          </f7-list>
        

        
          <f7-row>
            <f7-col width="100">
              <div v-bind:style="{ height: '100vh', width: '100vw' }" class="stage-container" ref="container">
                <custom-scrollbar class="scroll-area-stage" :settings="settings" @ps-scroll-y="scrollHandle">
                  <div id="general-menu">
                    <div>
                      <button id="deactivate-button">Deactivate Line</button>
                      <button id="unselectall-button">Unselect All</button>
                      <button id="printstage-button">Print Stage</button>
                      <button id="exportstage-button">Export Stage</button>
                      <button id="savestage-button">Save Stage</button>
                    </div>
                  </div>
                  <div id="object-menu">
                    <div>
                      <button id="assignserver-button">Assign Server</button>
                      <button id="unselect-button">Unselect</button>
                      <button id="delete-button">Delete</button>
                    </div>
                  </div>
                  <v-stage ref="stage" 
                  class="konva-stage" 
                  :config="stageSize" 
                  @mousedown="handleStageMouseDown" 
                  @touchstart="handleStageMouseDown">
                    <v-layer ref="layer">
                      <v-circle 
                        draggable="true"
                        @dragstart="handleDragStart"
                        @dragend="handleDragEnd"
                        :config="configCircle">
                      </v-circle>
                        <v-line></v-line>
                      <v-transformer ref="transformer" />
                    </v-layer>
                    
                </v-stage>
                </custom-scrollbar>
              </div>
            </f7-col>
          </f7-row>
        </f7-col>
      </f7-row>
            



          <!-- Left Panel FloorPlan -->
        <div class="panel panel-left panel-left-3 panel-cover panel-init">
          <f7-view>
            <f7-page>
              <f7-navbar title="Floorplan"></f7-navbar>
              <!-- Lines -->
              <f7-col width="100" class="side-bar">
                <custom-scrollbar class="scroll-area-menu" :settings="settings" @ps-scroll-y="scrollHandle">
                <f7-block-header>Lines</f7-block-header>
                <f7-row class="margin">
                  <f7-col width="50">
                    <f7-link @click="activateLine">Activate</f7-link>
                    <f7-button @click="addLine" fill>New</f7-button>
                  </f7-col>
                  <f7-col width="50">
                    <f7-link @click="deactivateLine">Deactivate</f7-link>
                    <f7-button @click="clearLine" class="bg-color-red" fill>Clear</f7-button>
                  </f7-col>
                </f7-row>
                <f7-list>
                  <f7-row class="full-width no-margin">
                    <f7-col width="50" class="margin-left">
                      <f7-list-input
                        style="max-width: 150px;"
                        outline
                        label="Width"
                        floating-label
                        type="number"
                        clear-button
                        required>
                        <p slot="inner-start">Stroke:</p>
                      </f7-list-input>
                    </f7-col>
                    <f7-col width="50">
                        <f7-list-input
                          type="colorpicker"
                          label="HexValue"
                          placeholder="Color"
                          readonly
                          :value="{ hex: '#ff0000' }"
                          :color-picker-params="{
                            modules: ['sb-spectrum', 'hue-slider'],
                          }">
                        <p slot="inner-start">Color:</p>
                      </f7-list-input>
                    </f7-col>
                  </f7-row>
                  <f7-row class="full-width">
                    <f7-col width="50" class="margin-left">
                        <f7-list-input
                          type="colorpicker"
                          label="HexValue"
                          placeholder="Color"
                          readonly
                          :value="{ hex: '#ff0000' }"
                          :color-picker-params="{
                            modules: ['sb-spectrum', 'hue-slider'],
                          }">
                        <p slot="inner-start">Fill Color:</p>
                      </f7-list-input>
                    </f7-col>
                    <f7-col width="50">
                        <f7-list-input
                          type="number"
                          label="Opacity"
                          placeholder="0.5"
                          readonly>
                        <p slot="inner-start">Opacity</p>
                      </f7-list-input>
                    </f7-col>
                  </f7-row>
                </f7-list>
                <!-- END Lines -->

                <!-- Squares -->
                <f7-block-header>Squares</f7-block-header>
                <f7-row class="margin">
                  <f7-col width="50">
                    <f7-button @click="addRect" fill>New</f7-button>
                  </f7-col>
                  <f7-col width="50">
                    <f7-button @click="clearLine" class="bg-color-red" fill>Clear</f7-button>
                  </f7-col>
                </f7-row>
                <f7-list>
                  <f7-row class="full-width">
                    <f7-col width="50" class="margin-left">
                      <f7-list-input
                        style="max-width: 150px;"
                        outline
                        label="Width"
                        floating-label
                        type="number"
                        clear-button
                        required>
                        <p slot="inner-start">Stroke:</p>
                      </f7-list-input>
                    </f7-col>
                    <f7-col width="50">
                        <f7-list-input
                          type="colorpicker"
                          label="HexValue"
                          placeholder="Color"
                          readonly
                          :value="{ hex: '#ff0000' }"
                          :color-picker-params="{
                            modules: ['sb-spectrum', 'hue-slider'],
                          }">
                        <p slot="inner-start">Color:</p>
                      </f7-list-input>
                    </f7-col>
                  </f7-row>
                  <f7-row class="full-width">
                    <f7-col width="50" class="margin-left">
                        <f7-list-input
                          type="colorpicker"
                          label="HexValue"
                          placeholder="Color"
                          readonly
                          :value="{ hex: '#ff0000' }"
                          :color-picker-params="{
                            modules: ['sb-spectrum', 'hue-slider'],
                          }">
                        <p slot="inner-start">Fill Color:</p>
                      </f7-list-input>
                    </f7-col>
                    <f7-col width="50">
                        <f7-list-input
                          type="number"
                          label="Opacity"
                          placeholder="0.5"
                          readonly>
                        <p slot="inner-start">Opacity</p>
                      </f7-list-input>
                    </f7-col>
                  </f7-row>
                </f7-list>
                <!-- END Squares -->

                <!-- Circles -->
                <f7-block-header>Circles</f7-block-header>
                <f7-row class="margin">
                  <f7-col width="50">
                    <f7-button @click="addCircle" fill>New</f7-button>
                  </f7-col>
                  <f7-col width="50">
                    <f7-button @click="clearLine" class="bg-color-red" fill>Clear</f7-button>
                  </f7-col>
                </f7-row>
                <f7-list>
                  <f7-row class="full-width">
                    <f7-col width="50" class="margin-left">
                      <f7-list-input
                        style="max-width: 150px;"
                        outline
                        label="Width"
                        floating-label
                        type="number"
                        clear-button
                        required>
                        <p slot="inner-start">Stroke:</p>
                      </f7-list-input>
                    </f7-col>
                    <f7-col width="50">
                        <f7-list-input
                          type="colorpicker"
                          label="HexValue"
                          placeholder="Color"
                          readonly
                          :value="{ hex: '#ff0000' }"
                          :color-picker-params="{
                            modules: ['sb-spectrum', 'hue-slider'],
                          }">
                        <p slot="inner-start">Color:</p>
                      </f7-list-input>
                    </f7-col>
                  </f7-row>
                  <f7-row class="full-width">
                    <f7-col width="50" class="margin-left">
                        <f7-list-input
                          type="colorpicker"
                          label="HexValue"
                          placeholder="Color"
                          readonly
                          :value="{ hex: '#ff0000' }"
                          :color-picker-params="{
                            modules: ['sb-spectrum', 'hue-slider'],
                          }">
                        <p slot="inner-start">Fill Color:</p>
                      </f7-list-input>
                    </f7-col>
                    <f7-col width="50">
                        <f7-list-input
                          type="number"
                          label="Opacity"
                          placeholder="0.5"
                          readonly>
                        <p slot="inner-start">Opacity</p>
                      </f7-list-input>
                    </f7-col>
                  </f7-row>
                </f7-list>
                <!-- END Circles -->

                <f7-row class="margin">
                  <f7-col>
                    <f7-button class="bg-color-red" fill>Delete All</f7-button>
                  </f7-col>
                </f7-row>
                <f7-row class="margin">
                  <f7-col>
                    <f7-button class="bg-color-blue" @click="testButton" fill>Test Stuff</f7-button>
                  </f7-col>
                </f7-row>
                <!-- Paddign for the bottom -->
                <f7-row>
                  <div style="margin-bottom: 100px;"></div>
                </f7-row>
                </custom-scrollbar>
              </f7-col>
            </f7-page>
          </f7-view>
        </div>
        <!-- END Left Panel FloorPlan -->
  

    </f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';

const width = window.innerWidth;
const height = window.innerHeight;

export default {
    name: "floorPlan",
    data() {
      return {
        //Main Settings
        isEditable: false,
        isActiveLine: false,
        //Scrollbar Settings
        settings: {
          maxScrollbarLength: 120
        },
        //Konva Settings
        stage: null,
        layer: null,
        group: null,
        rectangle: null,
        list: [{ x: 100, y: 100, radius: 50, fill: 'blue' }],
        selectedShapeID: '',
        //StageSettings
        stageSize: {
          width: width,
          height: height,
          draggable: false,
        },
        //Field Inputs
        tableNumber: null,
        //Individual Node Elements
        circles: [],
        squares: [],
        configCircle: {
          x: 100,
          y: 100,
          radius: 70,
          fill: null,
          stroke: "black",
          strokeWidth: 4
        },
        rectangles: [
          {
            rotation: 0,
            x: 10,
            y: 10,
            width: 100,
            height: 100,
            scaleX: 1,
            scaleY: 1,
            fill: 'red',
            name: 'rect1',
            draggable: true
          },
          {
            rotation: 0,
            x: 150,
            y: 150,
            width: 100,
            height: 100,
            scaleX: 1,
            scaleY: 1,
            fill: 'green',
            name: 'rect2',
            draggable: true
          }
        ],
      }
    },
    methods: {
      testButton(e) {
        console.log("this.stage", this.stage);
        console.log("this.layer", this.layer);
        console.log("this.group", this.group);
        
        console.log("this.rectangle", this.rectangle);
        console.log("this.selectedShapeID", this.selectedShapeID);
   
       
      },
      load() {
        const data = localStorage.getItem('storage') || '[]';
        this.list = JSON.parse(data);
      },

      save() {
        localStorage.setItem('storage', JSON.stringify(this.list));
      },
      incTableNo() {
        this.tableNumber += 1;
      },
      decTableNo() {
        this.tableNumber -= 1;
      },
      addLine() {
        this.isActiveLine = true;
        this.drawActiveLine();
      },
      activateLine() {
        this.isActiveLine = true;
      },
      deactivateLine() {
        this.isActiveLine = false;
      },
      clearLine() {

      },
      // Tooltip Table Number Function
      addTableNumber() {
        // simple label Creation
        var simpleLabel = new Konva.Label({
          x: 180,
          y: 150,
          opacity: 1,
          draggable: true
        });
        simpleLabel.add(
          new Konva.Tag({
            fill: '#454545',
            stroke: '#000'
          })
        );
        simpleLabel.add(
          new Konva.Text({
            text: this.tableNumber,
            fontFamily: 'Calibri',
            fontSize: 18,
            padding: 5,
            fill: 'white'
          })
        );
        // create new transformer
        var tr = new Konva.Transformer();
        this.layer.add(tr);
        tr.attachTo(simpleLabel);
        this.layer.draw();

        this.layer.add(simpleLabel);;

        this.stage.add(this.layer);
      },

      //Add Circle to Group and Stage
      addCircle() {
        var circ1 = new Konva.Circle({
          x: 100,
          y: 100,
          scaleX: 1,
          scaleY: 1,
          radius: 50,
          fill: "#056489",
          stroke: 'black',
          strokeWidth: 2,
          draggable: true
        });
        // add the shape to the layer
        this.layer.add(circ1);
        this.layer.draw();
        this.stage.add(this.layer);
      },

      //Add Rect to Group and Stage
      addRect() {
        var rect = new Konva.Rect({
          x: 20,
          y: 20,
          width: 100,
          height: 100,
          fill: '#26D798',
          stroke: 'black',
          strokeWidth: 2,
          draggable: true
        });
        
        // Add the shape to the layer before tweens and easings
        this.layer.add(rect);
        this.layer.draw();

        this.stage.add(this.layer);
      },
      //Change Shape Efects during Drag Function
      handleDragStart(e) {
        e.target.setAttrs({
          shadowOpacity: 0.6,
          shadowBlur: 10,
          shadowOffset: {
            x: 15,
            y: 15
          },
        });
      },
      //Change Shape Efects After Drag Completes Function
      handleDragEnd(e) {
        e.target.to({
          duration: 0.5,
          easing: Konva.Easings.ElasticEaseOut,
          shadowOffsetX: 5,
          shadowOffsetY: 5
        });
      },
      //Resizing Objects Start Function
      handleStageMouseDown(e) {

        console.log("e.target._id", e.target._id);

        // clicked on stage - clear selection Handled in Mounted()
        if (e.target === e.target.getStage()) {
          this.selectedShapeID = '';
          this.updateTransformer();
          return;
        }

        // clicked on transformer - do nothing
        const clickedOnTransformer =
          e.target.getParent().className === 'Transformer';
        if (clickedOnTransformer) {
          return;
        }
        // find clicked rectangle by its name
        const objID = e.target._id;
        this.selectedShapeID = objID;

        this.updateTransformer();

        // Begin Context Menu / Setup Menu (Need to complete)
        let currentShape;
        var generalMenu = document.getElementById('general-menu');
        var objMenu = document.getElementById('object-menu')
        //First Item in Context Menu - check the line methon to escape the function
          document.getElementById('deactivate-button').addEventListener('click', () => {
            console.log("Clicked Deactivate Button!");
            this.isActiveLine = false;
            console.log("this.isActiveLine", this.isActiveLine);
          });
        
        //Second Item in Context Menu
        document.getElementById('delete-button').addEventListener('click', () => {
          currentShape.destroy();
          this.layer.draw();
        });

        // hide general-menu 
        window.addEventListener('click', () => {
          generalMenu.style.display = 'none';
          objMenu.style.display = 'none';
        })

        // prevent default behavior
        this.stage.on('contextmenu', (e) => {
          e.evt.preventDefault();
          if (e.target === this.stage) {
            // if we are on empty place of the stage we will show General-Menu
            generalMenu.style.display = 'initial';
            var containerRect = this.stage.container().getBoundingClientRect();
            generalMenu.style.top = containerRect.top + this.stage.getPointerPosition().y - 200 +'px';
            generalMenu.style.left = containerRect.left + this.stage.getPointerPosition().x + 25 + 'px';
            //Deselect item from Transformer
            this.selectedShapeID = '';
            this.updateTransformer();
            return;
          }
          currentShape = e.target;
          //On Selected Ibject show Object-Menu
          objMenu.style.display = 'initial';
          var containerRect = this.stage.container().getBoundingClientRect();
          objMenu.style.top = containerRect.top + this.stage.getPointerPosition().y - 200 +'px';
          objMenu.style.left = containerRect.left + this.stage.getPointerPosition().x + 25 + 'px';
        });

      },
      //Finish Resizing Objects Function
      handleTransformEnd(e) {
        // shape is transformed, let us save new attrs back to the node
        // find element in our state
        const rect = this.layer.find(r => r.name === this.selectedShapeID);
        // update the state
        rect.x = e.target.x();
        rect.y = e.target.y();
        rect.rotation = e.target.rotation();
        rect.scaleX = e.target.scaleX();
        rect.scaleY = e.target.scaleY();
        // change fill
        rect.fill = Konva.Util.getRandomColor();


      },
      // Transforming objects - Resizing Objects Function
      updateTransformer() {
        // here we need to manually attach or detach Transformer node
        const transformerNode = this.$refs.transformer.getNode();
        console.log("transformerNode", transformerNode);
        const stage = transformerNode.getStage();
        const { selectedShapeID } = this;

        const selectedNode = stage.findOne(node => {
           return node._id === selectedShapeID;
        });
        console.log("selectedNode", selectedNode);
        
        // do nothing if selected node is already attached
        if (selectedNode === transformerNode.node()) {
          return;
        }
        if (selectedNode) {
          // attach to another node
          transformerNode.attachTo(selectedNode);
        } else {
          // remove transformer
          transformerNode.detach();
        }
        transformerNode.getLayer().batchDraw();
      },
      
      //Custom Scrollbar
      scrollHandle(evt) {
      },
      //Scale with the width of the window
      changeRect() {
        const container = this.$refs.container;
        // console.log('container', container);
        if (!container) {
          return;
        }
        var stageWidth = 900;
        var stageHeight = 600;
        // const height = container.offsetHeight;
        const width = container.offsetWidth;

        var scale = width / stageWidth;

        console.log("height", height, "width", height);
        this.stage.width(stageWidth * scale);
        this.stage.height(stageHeight * scale);
        this.stage.scale({x: scale, y: scale})
      },
      drawActiveLine() {
        //Not working
        if(this.isActiveLine === true) {
          var stage = this.stage;
          var layer = new Konva.Layer();

          //Get Pointer Position and add to Line Element
          var newPoints = [];
          stage.on('mousedown touchstart', function(e) {
            var pos = stage.getPointerPosition();
            console.log("pos1", pos);
            pos.x = pos.x -95;
            pos.y = pos.y - 45;
            console.log("pos2", pos);

            newPoints.push(pos.x, pos.y);
            console.log("newPoints", newPoints);

            //Draw line
            var line = new Konva.Line({
              x: 100,
              y: 50,
              points: newPoints,
              stroke: 'red',
          
            });
            
            layer.add(line);
            stage.add(layer);
          });
        } else {
          return;
        }
      }
  
    },
    computed: {
      ...mapState(["Users", "Inventory"]),
      
    },
    watch: {
      
    },
    mounted() {
      this.load();
      this.stage = this.$refs.stage.getNode();
      this.layer = this.$refs.layer.getNode();
      // this.rectangle = this.$refs.rectangle.getNode();

      
  
      
    },
    created() {
      window.addEventListener("resize", this.changeRect);
      this.changeRect();

      
     
    },
    on: {
      pageInit() {
       
      }
    }
    
  }
</script>

<style lang="scss" scoped>
/* Limit resizable panel width */
.panel {
  min-width: 400px;
  max-width: 90vw;
  background: green;
}

.scroll-area-menu {
  position: relative;
  margin: auto;
  width: 350px;
  height: 800px;
}
.scroll-area-stage {
  position: relative;
  margin: auto;
  width: 100%;
  height: 100%;
}

.title-bar {
  height: 100px;
  background: rgb(239, 239, 239);
}
.side-bar {
  background: rgb(228, 228, 228);
  height: 100%;
}
.konva-stage {
  border: 2px solid black;
}
.stage-container {
  width: 100%;
}
.floor-crud-div {
  width: 70%;
  height: 50px;
  background: rgb(134,134,134);
  background: linear-gradient(0deg, rgba(134,134,134,0.49748063287815125) 0%, rgba(180,180,180,0.5030828737745099) 50%, rgba(115,115,115,0.5002817533263305) 100%);
  border: 1px solid black;
  color: black;
}
// General Menu
#general-menu {
  display: none;
  position: absolute;
  width: 150px;
  background-color: white;
  box-shadow: 0 0 5px grey;
  border-radius: 3px;
  z-index: 1;
}


#general-menu button {
  width: 100%;
  background-color: white;
  border: none;
  margin: 0;
  padding: 10px;
}

#general-menu button:hover {
  background-color: lightgray;
}

// Object Menu
#object-menu {
  display: none;
  position: absolute;
  width: 150px;
  background-color: white;
  box-shadow: 0 0 5px grey;
  border-radius: 3px;
  z-index: 1;
}

#object-menu button {
  width: 100%;
  background-color: white;
  border: none;
  margin: 0;
  padding: 10px;
}

#object-menu button:hover {
  background-color: lightgray;
}

</style>

