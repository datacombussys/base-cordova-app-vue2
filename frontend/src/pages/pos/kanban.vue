<template>
	<f7-page name="kanban">
		<f7-row>
		<f7-navbar title="Kanban Board" back-link="Back">
			</f7-navbar>
		</f7-row>
		
		<!-- Main Container Row -->
		<f7-row class="full-height">
			<!-- Main Container Column -->
			<f7-col width="100" medium="100" class="fullheight">
	      <!-- Page content-->
        <f7-row class="full-width body-row display-flex justify-content-stretch">
          <!-- Left Column-->
          <f7-col width="25" class="display-flex flex-direction-column padding">
            <f7-row class="full-width display-flex justify-content-center">
              <f7-block-title>The List  is sortable and draggable</f7-block-title>
              <f7-col>
                
                
              </f7-col>
            </f7-row>
          </f7-col>
          <!-- END Left Column-->

          <!-- Right Column-->
          <f7-col width="75" class="no-padding full-height">
            <f7-row class="full-width full-height display-flex flex-direction-row">
                <f7-col width="50" class="full-height display-flex">
                  <div
                    v-for="column in columns"
                    :key="column.title"
                    class="bg-color-gray rounded-lg px-3 py-3 column-width rounded margin-right"
                  >
                    <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{column.title}}</p>
                    <draggable :list="column.tasks" :animation="200" ghost-class="ghost-card" group="tasks">
                      <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
                      <div
                        v-for="(task) in column.tasks"
                        :key="task.id"

                        class="margin-top cursor-move"
                      >{{ task.name }}</div>
                      <!-- </transition-group> -->
                    </draggable>
                  </div>
                  
    
                </f7-col>
            </f7-row>
          </f7-col>
          <!-- END Right Column-->

        </f7-row>
        <!-- END Page content-->


			</f7-col>
			<!-- END Main Container Column -->
		</f7-row>
		<!-- END Main Container Row -->
		



	</f7-page>
</template>

<script>
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';

export default {
	name: "kanban",
	data() {
		return {
      columns: [
        {
          title: "Initial Stage",
          tasks: [
            {
              name: "Ian Christensen"
            },
            {
              name: "Joe Smith"
            },
            {
              name: "Michael Taylor"
            },
            {
              name: "Draggable"
            },
            {
              name: "Sortable"
            }
          ],
        },
        {
          title: "Second Stage",
          tasks: [
            {
              name: "Ian Christensen"
            },
            {
              name: "Joe Smith"
            },
            {
              name: "Michael Taylor"
            },
            {
              name: "Draggable"
            },
            {
              name: "Sortable"
            }
          ],
        },
      ]
   
	

		
	
		}
	},

	methods: {
		testButton() {
		
			
		},
	

	},
	computed: {
		...mapState(["Users", "Inventory"]),
		...mapGetters(['getInventoryBarcodes']),

	},
	watch: {
	},
	mounted() {

	}
};
</script>

<style lang="scss" scoped>
.draggable-element {
  cursor: pointer;
}

.column-width {
  min-width: 320px;
  width: 320px;
}
/* Unfortunately @apply cannot be setup in codesandbox, 
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
.ghost-card {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
}




</style>