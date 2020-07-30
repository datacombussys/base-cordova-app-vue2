<template>
    <f7-page name="label-maker">
      <f7-navbar back-link="Back">
        <f7-nav-left>
        <f7-link size="10" panel-open=".panel-left-3">
          <f7-icon material="menu"></f7-icon>
        </f7-link>
        </f7-nav-left>
        <f7-nav-title>Label Maker</f7-nav-title>
      </f7-navbar>
      <!-- Main Container Row -->
      <f7-row class="full-height">
        <!-- Main Column -->
        <f7-col width="100" medium="100" class="full-height">
          <!-- Page content-->
          <f7-list>
          <f7-row class="title-bar display-flex justify-content-space-between align-items-center">
            <f7-col class="margin-left" width="15">
              <f7-row class="display-flex, justify-content-center align-items-center">
                <f7-col width="80">
                  <f7-list-input
                    style="max-width: 150px;"
                    outline
                    floating-label
                    type="number"
                    :value="windowWidth"
                    @input="windowWidth = $event.target.value"
                    @change="updateCanvas()"
                    required>
                    <p slot="inner-start">Canvas Width:</p>
                  </f7-list-input>
                </f7-col>
              </f7-row>
            </f7-col>
            <f7-col class="margin-left" width="15">
              <f7-list-input
                style="max-width: 150px;"
                outline
                floating-label
                type="number"
                :value="windowHeight"
                @input="windowHeight = $event.target.value"
                @change="updateCanvas()"
                required>
                <p slot="inner-start">Canvas Height:</p>
              </f7-list-input>
          </f7-col>
          <f7-col width="25">
            <div class="floor-crud-div display-flex align-items-center justify-content-center">
              <f7-row>
                <f7-col width="90" class="text-color-gray">
                  <f7-link popover-open=".floorCrud">- All Labels -</f7-link> 
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
                    <f7-list-item link="#" @click="loadSavedStage" popover-close title="Load Saved Stage"></f7-list-item>
                    <f7-list-item 
                    v-for="item in Labels.inventoryLabelList" 
                    :key="item.id" link="#" 
                    popover-close :title="item.name"
                    @click="loadSavedStage(item.json_data)"></f7-list-item>
                  </f7-list>
                </f7-popover>
              </f7-row>
            </div>
          </f7-col>
            <f7-col width="25">
              <div class="floor-crud-div display-flex align-items-center justify-content-center">
                <f7-row>
                  <f7-col width="90" class="text-color-gray">
                    <f7-link popover-open=".file-mgt">Manage Active Label</f7-link> 
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
                      <f7-list-item link="#" popup-open=".save-label" popover-close title="Save layout"></f7-list-item>
                      <f7-list-item link="#" popover-close title="New Layout"></f7-list-item>
                      <f7-list-item link="#" popover-close title="Delete Layout"></f7-list-item>
                      <f7-list-item link="#" @click="saveImage" popover-close title="Export Layout"></f7-list-item>
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

                <!-- Editable Text -->
                <f7-block-header>Text</f7-block-header>
                <f7-row class="margin">
                  <f7-col width="50">
                    <f7-button @click="addEditableText" fill>New</f7-button>
                  </f7-col>
                  <f7-col width="50">
                    <f7-button @click="clearLine" class="bg-color-red" fill>Clear</f7-button>
                  </f7-col>
                </f7-row>
                <f7-list>
                  <f7-row class="full-width">
                    <f7-col width="100" class="margin-left">
                      <f7-list-input
                        style="max-width: 275px;"
                        outline
                        label="Common Info"
                        floating-label
                        type="text"
                        clear-button
                        required>
                        <p slot="inner-start">Text:</p>
                      </f7-list-input>
                    </f7-col>
                  </f7-row>
                </f7-list>
                <!-- END Editable Text -->
                <f7-block-header>Clear Canvas</f7-block-header>
                <f7-row class="margin">
                  <f7-col>
                    <f7-button class="bg-color-red" fill>Delete All</f7-button>
                  </f7-col>
                </f7-row>
                <f7-row class="margin">
                  <f7-col>
                    <f7-button class="bg-color-blue" panel-close @click="testButton" fill>Test Stuff</f7-button>
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

        <!-- Popup to save Layout -->
        <f7-popup class="save-label" :opened="savePopupOpened" @popup:closed="savePopupOpened = false">
          <f7-page>
            <f7-navbar title="Save Label Design">
              <f7-nav-right>
                <f7-link popup-close>Close</f7-link>
              </f7-nav-right>
            </f7-navbar>
            <f7-block>
              <f7-row class="full-width">
                <f7-list>
                  <f7-list-input
                    label="Name"
                    type="text"
                    placeholder="label Name"
                    :value="labelForm.name"
                    @input="labelForm.name = $event.target.value"
                    clear-button
                  >
                  </f7-list-input>
                </f7-list>
              </f7-row>
              <f7-button popup-close @click="saveStagetoDB">Save Label</f7-button>
            </f7-block>
          </f7-page>
        </f7-popup>

    </f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';

const width = window.innerWidth;
const height = window.innerHeight;

export default {
    name: "labelMaker",
    data() {
      return {
        //Main Settings
        //Popups and Sheets
        savePopupOpened: false,
        //Scrollbar Settings
        settings: {
          maxScrollbarLength: 120
        },
        //Label Form
        labelForm: {
          name: null,
          json_data: null,
        },
        //Konva Settings
        stage: null,
        layer: null,
        group: null,
        selectedShapeName: '',
        //StageSettings
        stageSize: {
          width: width,
          height: height,
          draggable: false,
        },
        //Frame Settings
        frameOnScreenWidth: null,
        frameOnScreenHeight: null,
        //Field Inputs
        windowWidth: 1000,
        windowHeight: 500,
        widthInput: null,
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
        toolbarObjects: [
          {
            name: "Name",
            value: "{{Name}}"
          },
          {
            name: "Price",
            value: "{{Price}}"
          },
          {
            name: "Manufacturer",
            value: "{{Manufacturer}}"
          },
          {
            name: "Barcode Number",
            value: "{{Barcode Number}}"
          }
        ]
      }
    },
    methods: {
      testButton() {
        console.log("this.stage", this.stage);
        console.log("this.selectedShapeName", this.selectedShapeName);
        // this.saveImage();.
        console.log("this.Labels.inventoryLabelList", this.Labels.inventoryLabelList);

   
       
      },
      load() {
        const data = localStorage.getItem('storage') || '[]';
        this.list = JSON.parse(data);
      },

      save() {
        localStorage.setItem('storage', JSON.stringify(this.list));
      },
      addLine() {

      },
      activateLine() {
        this.isActiveLine = true;
      },
      deactivateLine() {
        this.isActiveLine = false;
      },
      clearLine() {

      },
      createFrame(frameWidth, frameHeight) {
        var widthInput = this.windowWidth;
        var heightInput = this.windowHeight;

        var padding = 10;
        var group = new Konva.Group();
        var top = new Konva.Line({
          points: [
            frameWidth - padding,
            padding,
            padding,
            padding
          ],
        });

        var left = new Konva.Line({
          points: [
            padding,
            padding,
            padding,
            frameHeight - padding,
          ],
        });

        var bottom = new Konva.Line({
          points: [
            padding,
            frameHeight - padding,
            frameWidth - padding,
            frameHeight - padding
          ],
        });

        var right = new Konva.Line({
          points: [
            frameWidth - padding,
            frameHeight - padding,
            frameWidth - padding,
            padding
          ],
        });   

        var glass = new Konva.Rect({
          x: padding,
          y: padding,
          width: frameWidth - padding * 2,
          height: frameHeight - padding * 2,
          fill: '#fff',
          opacity: 0.4
        });

        group.add(glass, right, bottom, left, top);

        group
          .find('Line')
          // .closed(true)
          .stroke('grey')
          .strokeWidth(1);

        return group;
  
      },
     
      //Redraw Canvas on Text Input
      updateCanvas() {
        this.layer.destroyChildren();
        console.log("this.windowHeight", this.windowHeight);

        var frameWidth = parseInt(this.windowWidth, 10);
        var frameHeight = parseInt(this.windowHeight, 10);

        console.log("frameWidth", frameWidth);

        var wr = this.stage.width() / frameWidth;
        var hr = this.stage.height() / frameHeight;

        var ratio = Math.min(wr, hr) * .7;

        this.frameOnScreenWidth = frameWidth * ratio;
        this.frameOnScreenHeight = frameHeight * ratio;

        console.log("this.frameOnScreenHeight", this.frameOnScreenHeight);

        var group = new Konva.Group({});

        group.x(Math.round(this.stage.width() / 2.5 - this.frameOnScreenWidth / 2) + 0.5);
        group.y(Math.round(this.stage.height() / 2.5 - this.frameOnScreenHeight / 2) + 0.5);

        this.layer.add(group);

        var frameGroup = this.createFrame(frameWidth, frameHeight);
        // frameGroup.scale({ x: ratio, y: ratio });
        group.add(frameGroup);

        this.layer.draw();

      },
      //Add Toolbar on right Side
      toolBar() {
        var toollayer = new Konva.Layer();
        var group = new Konva.Group();
        console.log("width", width);

        var startX = width - (width * 0.22);
        var containerWidth = (width * 0.2);
        var containerHeight = (height * 0.7);

        var container = new Konva.Rect({
          x: startX,
          y: 20,
          width: containerWidth,
          height: containerHeight,
          fill: "#99E4E5",
          stroke: 'black',
          strokeWidth: 2,
        });
        group.add(container);
        toollayer.add(group);
       

        // Tool Row Item Loop
        for (var n = 0; n < this.toolbarObjects.length; n++) {
        var num = n + 1;
        var tool = this.toolbarObjects[n];
        var text = new Konva.Text({
          x: startX + 35,
          y: 125 + (n * 100) / this.toolbarObjects.length,
          padding: 4,
          text: tool.value,
          fontSize: 18,
          draggable: true,
          stroke: 'black',
          strokeWidth: .5,
          strokeEnabled: true,
          fontFamily: "OpenSans-Regular",
          fill: 'black',
          
        });
        toollayer.add(text);
        }

        // Set Barcode Image
        var imageObj = new Image();
        imageObj.onload = function() {
          var barcode = new Konva.Image({
            x: startX + 70,
            y: 50,
            image: imageObj,
            width: 300,
            height: 118,
            scaleX: 0.5,
            scaleY: 0.5,
            draggable: true
          });

          // add the shape to the layer
          toollayer.add(barcode);
          toollayer.batchDraw();
        };
        imageObj.src = '/static/Barcode.png';
        //Add editable text
        this.addEditableText();
 
        this.stage.add(toollayer);
      },

      addEditableText() {
        var editTextlayer = new Konva.Layer();

        //Editable Text
        var editText = new Konva.Text({
          text: 'Some text here',
          x: 50,
          y: 80,
          fontSize: 20,
          draggable: true,
          width: 200
        });
        
        
        editTextlayer.add(editText);

        // editText Transformer
        var tr = new Konva.Transformer({
          node: editText,
          enabledAnchors: ['middle-left', 'middle-right'],
          // set minimum width of text
          boundBoxFunc: function(oldBox, newBox) {
            newBox.width = Math.max(30, newBox.width);
            return newBox;
          }
        });

        //Transform Event
        editText.on('transform', function() {
        // reset scale, so only with is changing by transformer
        editText.setAttrs({
          width: editText.width() * editText.scaleX(),
          scaleX: 1
          });
        });
        editTextlayer.add(tr);
        editTextlayer.draw();

         editText.on('dblclick', () => {
        // hide text node and transformer:
        editText.hide();
        tr.hide();
        editTextlayer.draw();

        // create textarea over canvas with absolute position
        // first we need to find position for textarea
        // how to find it?

        // at first lets find position of text node relative to the stage:
        var textPosition = editText.absolutePosition();

        // then lets find position of stage container on the page:
        var stageBox = this.stage.container().getBoundingClientRect();

        // so position of textarea will be the sum of positions above:
        var areaPosition = {
          x: stageBox.left + textPosition.x,
          y: stageBox.top + textPosition.y
        };

        // create textarea and style it
        var textarea = document.createElement('textarea');
        document.body.appendChild(textarea);

        // apply many styles to match text on canvas as close as possible
        // remember that text rendering on canvas and on the textarea can be different
        // and sometimes it is hard to make it 100% the same. But we will try...
        textarea.value = editText.text();
        textarea.style.position = 'absolute';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        textarea.style.width = editText.width() - editText.padding() * 2 + 'px';
        textarea.style.height =
          editText.height() - editText.padding() * 2 + 5 + 'px';
        textarea.style.fontSize = editText.fontSize() + 'px';
        textarea.style.border = 'none';
        textarea.style.padding = '0px';
        textarea.style.margin = '0px';
        textarea.style.overflow = 'hidden';
        textarea.style.background = 'none';
        textarea.style.outline = 'none';
        textarea.style.resize = 'none';
        textarea.style.lineHeight = editText.lineHeight();
        textarea.style.fontFamily = editText.fontFamily();
        textarea.style.transformOrigin = 'left top';
        textarea.style.textAlign = editText.align();
        textarea.style.color = editText.fill();
        var rotation = editText.rotation();
        var transform = '';
        if (rotation) {
          transform += 'rotateZ(' + rotation + 'deg)';
        }

        var px = 0;
        // also we need to slightly move textarea on firefox
        // because it jumps a bit
        var isFirefox =
          navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isFirefox) {
          px += 2 + Math.round(editText.fontSize() / 20);
        }
        transform += 'translateY(-' + px + 'px)';

        textarea.style.transform = transform;

        // reset height
        textarea.style.height = 'auto';
        // after browsers resized it we can set actual value
        textarea.style.height = textarea.scrollHeight + 3 + 'px';

        textarea.focus();

        function removeTextarea() {
          textarea.parentNode.removeChild(textarea);
          window.removeEventListener('click', handleOutsideClick);
          editText.show();
          tr.show();
          tr.forceUpdate();
          editTextlayer.draw();
        }

        function setTextareaWidth(newWidth) {
          if (!newWidth) {
            // set width for placeholder
            newWidth = editText.placeholder.length * editText.fontSize();
          }
          // some extra fixes on different browsers
          var isSafari = /^((?!chrome|android).)*safari/i.test(
            navigator.userAgent
          );
          var isFirefox =
            navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
          if (isSafari || isFirefox) {
            newWidth = Math.ceil(newWidth);
          }

          var isEdge =
            document.documentMode || /Edge/.test(navigator.userAgent);
          if (isEdge) {
            newWidth += 1;
          }
          textarea.style.width = newWidth + 'px';
        }

        textarea.addEventListener('keydown', function(e) {
          // hide on enter
          // but don't hide on shift + enter
          if (e.keyCode === 13 && !e.shiftKey) {
            editText.text(textarea.value);
            removeTextarea();
          }
          // on esc do not set value back to node
          if (e.keyCode === 27) {
            removeTextarea();
          }
        });

        textarea.addEventListener('keydown', function(e) {
          scale = editText.getAbsoluteScale().x;
          setTextareaWidth(editText.width() * scale);
          textarea.style.height = 'auto';
          textarea.style.height =
            textarea.scrollHeight + editText.fontSize() + 'px';
        });

        function handleOutsideClick(e) {
          if (e.target !== textarea) {
            editText.text(textarea.value);
            removeTextarea();
          }
        }
        setTimeout(() => {
          window.addEventListener('click', handleOutsideClick);
        });
      });


      this.stage.add(editTextlayer);

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
        // create new transformer
        var tr = new Konva.Transformer();
        this.layer.add(tr);
        tr.attachTo(circ1);
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

        // create new transformer
        var transformer = new Konva.Transformer({
          node: rect,
          rotateAnchorOffset: 60,
          enabledAnchors: ['top-left', 'top-center', 'top-right', 'middle-right', 'middle-left', 'bottom-left', 'bottom-center', 'bottom-right']
        });
        this.layer.add(transformer);
        transformer.attachTo(rect);
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
        console.log('e', e)
        // clicked on stage - clear selection
        if (e.target === e.target.getStage()) {
          this.selectedShapeName = '';
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
        const name = e.target.name();
        const rect = this.layer.find(r => r.name === name);
        if (rect) {
          this.selectedShapeName = name;
        } else {
          this.selectedShapeName = '';
        }
        this.updateTransformer();

      },
      //Finish Resizing Objects Function
      handleTransformEnd(e) {
        // shape is transformed, let us save new attrs back to the node
        // find element in our state
        const rect = this.layer.find(r => r.name === this.selectedShapeName);
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
        const stage = transformerNode.getStage();
        const { selectedShapeName } = this;

        const selectedNode = this.stage.findOne('.' + selectedShapeName);
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
      saveImage() {
        var pixlRatio = 3;
        var dataURL = this.stage.toDataURL({quality: 1, pixelRatio: pixlRatio});
        console.log('dataURL', dataURL); 

        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d'); 
        
        console.log('ctx', ctx);    
        //Create New Image Object
        var img = new Image();
        img.setAttribute('src', dataURL);

        //Get coordinances of the frame
        var frameWidth = parseInt(this.windowWidth, 10);
        var frameHeight = parseInt(this.windowHeight, 10);
        console.log("frameWidth", frameWidth);

        var wr = this.stage.width() / frameWidth;
        var hr = this.stage.height() / frameHeight;

        var ratio = Math.min(wr, hr) * .7;

        this.frameOnScreenWidth = frameWidth * ratio;
        this.frameOnScreenHeight = frameHeight * ratio;

        console.log("this.frameOnScreenHeight", this.frameOnScreenHeight);

        var xpos = (Math.round((this.stage.width() / 2.5 - this.frameOnScreenWidth / 2) + 0.5)*pixlRatio);
        var ypos = (Math.round((this.stage.height() / 2.5 - this.frameOnScreenHeight / 2) + 0.5)*pixlRatio);

        img.onload = () => {
          canvas.width = this.frameOnScreenWidth * pixlRatio;
          canvas.height = this.frameOnScreenHeight * pixlRatio;
          console.log('canvas', canvas); 
          //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
          ctx.drawImage(img, xpos, ypos, this.frameOnScreenWidth * pixlRatio, this.frameOnScreenHeight * pixlRatio, 0, 0, this.frameOnScreenWidth * pixlRatio, this.frameOnScreenHeight * pixlRatio);


          var result = canvas.toDataURL(); 
          this.downloadURI(result, 'stage.png');
        };
      },
      downloadURI(uri, name) {
        var link = document.createElement('a');
        link.setAttribute('download', name);
        link.href = uri;
        link.click();
      },
      saveStagetoDB() {
      // save stage as a json string
      this.labelForm.json_data = this.stage.toJSON();
      // localStorage.setItem('stageJson', json);
      console.log('this.labelForm', this.labelForm); 
      this.$store.dispatch('createInventoryLabels', this.labelForm);
      },
      loadSavedStage(json) {
        // var json = localStorage.getItem('stageJson');

        // create node using json string
        this.stage = Konva.Node.create(json, '.konva-stage');
      },
      
      //Custom Scrollbar
      scrollHandle(evt) {
      },
 
  
    },
    computed: {
      ...mapState(["Users", "Inventory", "Labels"]),
     
    },
    watch: {
 
    },
    mounted() {
      this.load();
      
      this.stage = this.$refs.stage.getNode();
      this.layer = this.$refs.layer.getNode();
      // this.rectangle = this.$refs.rectangle.getNode();
      this.updateCanvas();
      this.toolBar();
     
    },
    created() {

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
  height: 100%;
  padding-right: 40px;
  margin-right: 0px;
}
.scroll-area {
  position: relative;
  margin: auto;
  width: 300px;
  height: 800px;
}
.scroll-area-stage {
  position: relative;
  margin: auto;
  width: 100vw;
  height: 100vh;
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

</style>

