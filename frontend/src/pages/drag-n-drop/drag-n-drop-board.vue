<template>
  <f7-page name=drag-n-drop>
    <f7-navbar back-link="Back">
      <f7-nav-left>
        <f7-link size="10" panel-open=".panel-left">
          <f7-icon material="menu"></f7-icon>
        </f7-link>
      </f7-nav-left>
      <f7-nav-title>Drag and Drop</f7-nav-title>
      <f7-nav-right>
        <f7-col class="nav-col-3 display-flex justify-content-end">
          <f7-link icon-color="white" icon-ios="f7:gear_alt" icon-aurora="f7:gear_alt" icon-md="f7:gear_alt" href="/checkout/"></f7-link>
          <f7-link icon-color="white" icon-ios="f7:lock" icon-aurora="f7:lock" icon-md="f7:lock"></f7-link>
          <f7-link icon-color="white" icon-ios="f7:lock_open" icon-aurora="f7:lock_open" icon-md="f7:lock_open" href="/login/"></f7-link>
          <f7-link icon-color="white" icon-ios="f7:person_crop_circle" icon-aurora="f7:person_crop_circle" icon-md="f7:person_crop_circle" href="/login/"></f7-link>
        </f7-col>
      </f7-nav-right>
    </f7-navbar>
    <!-- Main Container Row -->
    <f7-row class="full-height">
      <!-- Main Column -->
      <f7-col width="100" medium="100" class="full-height display-flex flex-direction-column">
        <f7-row>
          <!-- Left Col-->
          <f7-col width="75">
            <f7-row>
              <div
                id="board-1"
                class="board"
                @dragover.prevent="dragOver"
                :dragLeave="dragLeave"
                @drop.prevent="addNewRow"
              >
                <drag-row-component 
                  v-for="(row, $rowID) in DragNDrop.rows" 
                  :key="$rowID" 
                  :id="'row_'+ $rowID"
                  :dragStart="dragStart"
                  :dragEnter.prevent="dragEnter" 
                  :dragOver="dragOver" 
                  :dragLeave="dragLeave" 
                  :dragDrop="dragDrop">

                    <drag-col-component 
                    v-for="(col, $colID) in DragNDrop.columns" 
                    :key="$colID" 
                    :id="'col_'+ $colID"
                    :dragStart="dragStart"
                    :dragEnter.prevent="dragEnter" 
                    :dragOver="dragOver" 
                    :dragLeave="dragLeave"
                    :dragDrop="dragDrop">
                    
                  </drag-col-component>
                </drag-row-component>
                
              </div>
            </f7-row>

            
          </f7-col>
          <!-- Right Col-->
          <f7-col width="25">
            This is where I am going to put all of the draggable elements
       
            <f7-icon 
              draggable 
              @dragstart="dragStart" 
              @drag.stop="Drag" 
              @dragend="dragEnd" 
              size="100" 
              icon="mdi mdi-table-row" 
              style="cursor: pointer;">
            </f7-icon>

            <f7-icon 
              draggable
              @dragstart="dragStart"
              @drag.stop="Drag"
              @dragend="dragEnd" 
              size="100" 
              icon="mdi mdi-table-row mdi-rotate-90" 
              style="cursor: pointer;">
            </f7-icon>

            <f7-button @click="testButton">Test</f7-button>
          </f7-col>
        </f7-row>
      </f7-col>
    </f7-row>
  </f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';

//Components
import DragNDropComponent from './drag-n-drop-component.vue';
import DragRowComponent from './drag-row-component.vue';
import DragColComponent from './drag-col-component.vue';


export default {
		name: "dragNDrop",
		mixins: [],
		components: {
      "drag-n-drop-component": DragNDropComponent,
      "drag-row-component": DragRowComponent,
      "drag-col-component": DragColComponent
		},
    data() {
      return {
        //Main Settings

      }
    },
    methods: {
      testButton() {
      console.log("this.Common", this.Common);
      },

      dragStart(a) {
			console.log('dragStart');
      console.log('a', a);
      console.log('', );
      a.target.add('new-div');

      },
      Drag(b) {
        // console.log('Dragging');
        // console.log('a', a);
        // console.log('', );
         
      },
      dragEnd(c) {
        console.log('dragEnd');
        console.log('c', c);


      },
      dragOver(d) {
      // console.log('dragOver');
      // console.log('d', d);
			
		},
      dragEnter(e) {
        console.log('dragEnter');
        console.log('e', e);
        e.target.classList.add('hovered');
        
      },
      dragLeave(f) {
        console.log('dragLeave');
        console.log('f', f);

        f.target.classList.remove('hovered');
      },
      dragDrop(g) {
        console.log('g', g);
        const from_row_id = g.dataTransfer.getData('from_row_id');
        const to_row_id = g.dataTransfer.getData('to_row_id');

        const from_col_id = g.dataTransfer.getData('from_col_id');
        const to_col_id = g.dataTransfer.getData('to_col_id');

        if(from_row_id) {
          console.log('from_row_id', from_row_id);
          // const row = document.getElementById(from_row_id);
          // console.log('row', row);
          // g.target.appendChild(row);
          this.$store.commit('MOVE_ROW', {from_row_id, to_row_id});

        } else if(from_col_id) {
          console.log('col_id', col_id);
          // const col = document.getElementById(from_col_id);
          // g.target.appendChild(col);
          this.$store.commit('MOVE_COL', {from_col_id, to_col_id});
        }
        
        

        

        
      },
      addNewRow() {
        this.$store.commit('CREATE_ROW');
      }
 
    },
    computed: {
      ...mapState(["Users", "Inventory", "DragNDrop"]),
     
    },
    watch: {
 
    },
    mounted() {
 
     
    },
    created() {

    },

    
  }
</script>
<style lang="less">
.board {
  display: block;
  width: 100%;
  background: rgb(228, 228, 228);
  padding: 25px;
}
</style>



