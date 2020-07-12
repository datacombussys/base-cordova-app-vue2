<template>
	<f7-page name="groups-permissions">
		<f7-row>
			<f7-navbar back-link="Back" class="bg-color-white">
        <f7-nav-left>
        <f7-link size="10" panel-open=".permissions-panel">
          <f7-icon color="white" material="menu"></f7-icon>
        </f7-link>
        </f7-nav-left>
        <f7-nav-title>Groups</f7-nav-title>
        <f7-nav-right>
          <f7-col class="nav-col-3 display-flex justify-content-end">
            <f7-link icon-color="white" icon-ios="f7:gear_alt" icon-aurora="f7:gear_alt" icon-md="f7:gear_alt" href="/checkout/"></f7-link>
            <f7-link icon-color="white" icon-ios="f7:lock" icon-aurora="f7:lock" icon-md="f7:lock"></f7-link>
            <f7-link icon-color="white" icon-ios="f7:lock_open" icon-aurora="f7:lock_open" icon-md="f7:lock_open" href="/login/"></f7-link>
            <f7-link icon-color="white" icon-ios="f7:person_crop_circle" icon-aurora="f7:person_crop_circle" icon-md="f7:person_crop_circle" href="/login/"></f7-link>
          </f7-col>
        </f7-nav-right>
      </f7-navbar>
		</f7-row>
			<!-- Column -->
		<f7-col width="100" medium="100" class="fullheight">
      <f7-block-title medium>Groups and Permissions</f7-block-title>
			<!-- Add Buttons -->
			<f7-row class="level">
				<f7-col width="100">
					<f7-col width="50" class="level-right">
            <f7-button @click="testMethod">Test Button</f7-button>
						<f7-button outline popup-open=".group-popup">Create Group</f7-button>
					</f7-col>
				</f7-col>
			</f7-row>

			<!-- Begin Groups Table -->
      <div v-if="this.GroupsPermissions.groupsList.length==0">
        <f7-card>
          <f7-card-content>
            <strong>
              <p class="text-align-center">There are currently no groups set up.
            Please create a group to get started.</p>
            </strong>
          </f7-card-content>
        </f7-card>
      </div>
			<f7-card v-if="this.GroupsPermissions.groupsList.length !=0">
          <b-table
            :data="this.GroupsPermissions.groupsList"
            ref="table"
            detailed
            paginated
            per-page="10"
            hoverable
            custom-detail-row
            :opened-detailed="['Datacom']"
            :default-sort="['name', 'asc']"
            detail-key="name"
            @details-open="showRowDetails"
            :show-detail-icon="showDetailIcon"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">
          <template slot-scope="props">
                  <b-table-column
                    field="id"
                    :visible="columnsVisible['id'].display"
                    :label="columnsVisible['id'].title"
                    width="50"
                    sortable
                  >
                    <template v-if="showDetailIcon">
                        {{ props.row.id }}
                    </template>
                  </b-table-column>
                  <b-table-column
                      field="name"
                      :visible="columnsVisible['name'].display"
                      :label="columnsVisible['name'].title"
                      width="300"
                      sortable
                  >
                      <template v-if="showDetailIcon">
                          {{ props.row.name }}
                      </template>
                      <template v-else>
                          <a @click="toggle(props.row)">
                              {{ props.row.name }}
                          </a>
                      </template>
                  </b-table-column>

                  <b-table-column
                      field="group_type"
                      :visible="columnsVisible['group_type'].display"
                      :label="columnsVisible['group_type'].title"
                      sortable
                      centered
                  >
                      {{ props.row.group_type }}
                  </b-table-column>

                  <b-table-column
                      field="group_class"
                      :visible="columnsVisible['group_class'].display"
                      :label="columnsVisible['group_class'].title"
                      sortable
                      centered
                  >
                      {{ props.row.group_class }}
                  </b-table-column>

                  <b-table-column
                      field="permissions"
                      :visible="columnsVisible['permissions'].display"
                      :label="columnsVisible['permissions'].title"
                      sortable
                      centered
                  >
                      Total: {{ props.row.permissions.length }}
                  </b-table-column>

                  <b-table-column
                    class="display-flex justify-content-space-evenly"
                    :visible="columnsVisible['actions'].display"
                    :label="columnsVisible['actions'].title"
                    centered
                  >
                    <f7-link @click.prevent="editGroupNameForm(props.row)" popup-open=".edit-group-popup" icon-f7="pencil" padding></f7-link>
                    <f7-link @click.prevent="deleteGroup(props.row)" icon-f7="trash" padding></f7-link>
                    <f7-link @click.prevent="savePermissions(props.row.name)" icon-f7="floppy_disk" padding></f7-link>

                  </b-table-column>
              </template>

              <template slot="detail" slot-scope="props">
                  <tr>
                    <td class="has-text-centered"></td>
                    <td class="has-text-centered"></td>
                    <strong><td>Application</td></strong>
                    <td class="has-text-centered">
                      <strong><td>Can View</td></strong></td>
                    <td class="has-text-centered">
                      <strong><td>Can Edit</td></strong></td>
                    <td class="has-text-centered">
                      <strong><td>Can Add</td></strong></td>
                    <td class="has-text-centered">
                      <strong><td>Can Delete</td></strong></td>
                    
                  </tr>
                  <tr v-for="item in parsedAppLabels" :key="`${props.row.name} + ${item}`">
                    <td class="has-text-centered"></td>
                    <td class="has-text-centered"></td>
                    <td v-show="columnsVisible['name'].display">{{item}}</td>
                    <td class="has-text-centered">
                      <f7-toggle 
                        :checked="props.row[`view_${item}`]"
                        @change="updateSelectedItems($event, props.row.name)" 
                        :name="`view_${item}`" color="blue"></f7-toggle>
                    </td>
                    <td class="has-text-centered">
                      <f7-toggle 
                        :checked="props.row[`change_${item}`]"
                        @change="updateSelectedItems($event, props.row.name)"
                        :name="`change_${item}`" color="blue"></f7-toggle>
                    </td>
                    <td class="has-text-centered">
                      <f7-toggle 
                        :checked="props.row[`add_${item}`]"
                        @change="updateSelectedItems($event, props.row.name)"
                        :name="`add_${item}`" color="blue"></f7-toggle>
                    </td>
                    <td class="has-text-centered">
                      <f7-toggle 
                        :checked="props.row[`delete_${item}`]"
                        @change="updateSelectedItems($event, props.row.name)"
                        :name="`delete_${item}`" color="blue"></f7-toggle>
                    </td>
                    <td></td>
                  </tr>
              </template>
          </b-table>
				</f7-card>
        <!-- Sample Mustache in action 
        <f7-card>
          <f7-card-content>
            <p>This is the new card!</p>
            <p>{{ parsedMustache }}</p>
          </f7-card-content>
        </f7-card> -->
        
				<!-- END Groups Table -->

        <!-- Begin Popup for Groups -->
        <f7-row>
          <f7-col>	
            <f7-popup class="group-popup" :opened="popupOpened" @popup:closed="popupOpened = false">
              <div class="view view-init">
                <f7-page>
                <f7-navbar title="Create Permissions Group">
                  <f7-nav-right>
                    <f7-link popup-close>Close</f7-link>
                  </f7-nav-right>
                </f7-navbar>
                <f7-block>
                  <!-- Form for Submission -->
                  <form class="list" id="form">
                    <f7-list no-hairlines-md>
                      <f7-list-input
                        label="Group Name"
                        floating-label
                        type="text"
                        placeholder="Supervisors"
                        :value="groupForm.name"
                        @input="groupForm.name = $event.target.value"
                        reqired
                        validate
                        clear-button
                      >
                      <f7-icon f7="person_circle" slot="media"></f7-icon>
                      </f7-list-input>
                      <f7-list-input
                        label="Group Type"
                        floating-label
                        type="text"
                        placeholder="Admin, Manager, Free, Paid, etc."
                        :value="groupForm.group_type"
                        @input="groupForm.group_type = $event.target.value"
                        clear-button
                      >
                      </f7-list-input>
                      <f7-list-input
                        label="Group Class"
                        floating-label
                        type="text"
                        placeholder="Employees, Customers, Vendors, etc."
                        :value="groupForm.group_class"
                        @input="groupForm.group_class = $event.target.value"
                        reqired
                        validate
                        clear-button
                      >
                      </f7-list-input>
                    </f7-list>
                  </form>
                </f7-block>
                <f7-block>
                  <div class="block">
                    <p class="row">
                      <button class="button col" @click.prevent="clearGroupForm">Reset</button>
                      <button class="col button button-raised button-fill" popup-close @click.prevent="createGroup">Add Group</button>
                    </p>
                  </div>
                </f7-block>
              </f7-page>
              </div>
            </f7-popup>
          </f7-col>
        </f7-row>
        <!-- END Popup for Groups -->

        <!-- Begin Popup for Edit Group Name -->
        <f7-row>
          <f7-col>	
            <f7-popup class="edit-group-popup" :opened="popupOpened" @popup:closed="popupOpened = false">
              <div class="view view-init">
                <f7-page>
                <f7-navbar title="Create Permissions Group">
                  <f7-nav-right>
                    <f7-link popup-close>Close</f7-link>
                  </f7-nav-right>
                </f7-navbar>
                <f7-block>
                  <!-- Form for Submission -->
                  <form class="list" id="form">
                    <f7-list no-hairlines-md>
                      <f7-list-input
                        label="Group Name"
                        floating-label
                        type="text"
                        placeholder="Supervisors"
                        :value="groupForm.name"
                        @input="groupForm.name = $event.target.value"
                        reqired
                        validate
                        clear-button
                      >
                      <f7-icon f7="person_circle" slot="media"></f7-icon>
                      </f7-list-input>
                      <f7-list-input
                        label="Group Type"
                        floating-label
                        type="text"
                        placeholder="Admin, Manager, Free, Paid, etc."
                        :value="groupForm.group_type"
                        @input="groupForm.group_type = $event.target.value"
                        clear-button
                      >
                      </f7-list-input>
                      <f7-list-input
                        label="Group Class"
                        floating-label
                        type="text"
                        placeholder="Employees, Customers, Vendors, etc."
                        :value="groupForm.group_class"
                        @input="groupForm.group_class = $event.target.value"
                        reqired
                        validate
                        clear-button
                      >
                      </f7-list-input>
                    </f7-list>
                  </form>
                </f7-block>
                <f7-block>
                  <div class="block">
                    <p class="row">
                      <button class="button col" @click="clearGroupForm">Reset</button>
                      <button class="col button button-raised button-fill" @click="editGroupNamePUT" close-popup>Edit Group</button>
                    </p>
                  </div>
                </f7-block>
              </f7-page>
              </div>
            </f7-popup>
          </f7-col>
        </f7-row>
        <!-- END Popup for Edit Group Name -->
		</f7-col>
	</f7-page>
</template>

<script>
import { mapState } from "vuex";
import Framework7Vue, { f7 } from 'framework7-vue';
import Dom7 from 'dom7';

const $ = Dom7;

export default {
	name: "userGroups",
	component: {
	},
	data() {
		return {
      //Table Settings
			showDetailIcon: true,
			expanded: false,
			atRight: false,
			size: null,
      type: null,
      columnsVisible: {
        id: { title: 'ID', display: true },
        name: { title: 'Group Name', display: true },
        group_type: { title: 'Group Type', display: true },
        group_class: { title: 'Group Class', display: true },
        permissions: { title: 'Permisisons', display: true },
        actions: { title: 'Actions', display: true },
			},
      //Popups and Sheets
			popupOpened: false,
			subpopupOpened: false,
			routableModals: false,
			loading: false,
      effect: null,
      //Permissions
			permissionType: {
				add: 'add',
				edit: 'edit',
				view: 'view',
				delete:'delete',
      },
      selectedPermissions: [],
      disabledPermissions: [
        'contenttype',
        'group',
        'user',
        'permission',
        'datacom',
        'inventorybarcode',
        'inventoryclass',
        'invcategory',
        'logentry',
        'site',
        'session',
        'city',
        'region',
        'country',
        'token',
        'timezones',
      ],
      //Groups
      groupPermissionObj: [],
			groupForm: {
        name: null,
				group_type: "",
				group_class: "",
				},
			
		}
	},
		methods: {
      testMethod(e) {
        console.log(" this.GroupsPermissions.groupsList", this.GroupsPermissions.groupsList);
        console.log("this.groupPermissionObj", this.groupPermissionObj);
        console.log("this.selectedPermissions", this.selectedPermissions);

          
      },
			toggle(row) {
				this.$refs.table.toggleDetails(row)
			},
			async createGroup () {
				console.log("Clicked to add group", this.groupForm);
				await this.$store.dispatch("addGroup", this.groupForm);
				this.clearGroupForm();
      },
      savePermissions(group) {
        console.log('savePermissions group', group);
        console.log("this.groupPermissionObj", this.groupPermissionObj);
        console.log("this.selectedPermissions", this.selectedPermissions);
        //I can't add to .pemisisons but I can to .permissionsnew  ?? Why ??
        this.groupPermissionObj.permissionsnew = [];
        this.groupPermissionObj.permissionsnew.push(this.selectedPermissions);
        console.log("save this.groupPermissionObj", this.groupPermissionObj);
        this.$store.dispatch('addGroupPermissions', this.groupPermissionObj);
      },
      deleteGroup(group) {
        console.log("row", row);
        // Still need to finish (make inactive) Need to add is_active to model as well
        // this.$store.dispatch('deleteGroup', this.groupPermissionObj);
      },
      clearGroupForm() {
        this.groupForm.name = null;
        this.groupForm.group_type = null;
        this.groupForm.group_class = null;
      },
      //Update this.selectedPermissions with current selections form database on initial render
      showRowDetails(row) {
        console.log('showRowDetails row', row);
        this.selectedPermissions = [];
        for(let permission of row.permissions) {
          console.log('each permission', permission.codename);
          this.selectedPermissions.push(permission.codename);
          console.log('showRowDetails this.selectedPermissions', this.selectedPermissions);
        }
        
      },
      updateSelectedItems(e, name) {
        console.log('e', e);
        console.log('updateSelectedItems name', name);
        //I need to clear the list when switching Group rows
        const checked = e.target.checked;
        const value = e.target.name;
        if (checked) {
          this.selectedPermissions.push(value);
        } 
        if (!checked) {
          this.selectedPermissions.splice(this.selectedPermissions.indexOf(value), 1);
        }
        // Get contenttype from the selected permisisons
        const contenttype = this.selectedPermissions[0].split("_")[1];
        console.log('contenttype', contenttype);
        // Get Index of Group from Groups.groupsList List
        const groupIndex = this.GroupsPermissions.groupsList.findIndex(elem => elem.name === name);
        console.log('groupIndex1', groupIndex);

        //Set Object and pass it to Django
        this.groupPermissionObj = this.GroupsPermissions.groupsList[groupIndex];
        // console.log('groupPermissionObj', this.groupPermissionObj);
        console.log('this.selectedPermissions', this.selectedPermissions);
      },
      editGroupNameForm(row) {
        console.log('editGroupNameForm row', row);
        this.groupForm.name = row.name;
        this.groupForm.group_type = row.group_type;
        this.groupForm.group_class = row.group_class;
        //Find ID of row Item in store List
        var selectedRowObj = this.GroupsPermissions.groupsList.findIndex(elem => elem.name === row.name);
        this.groupForm.id = this.GroupsPermissions.groupsList[selectedRowObj]['id'];
        console.log('selectedRowObj', selectedRowObj);

      },
      editGroupNamePUT(e) {
        console.log('editGroupNamePUT e', e);
        console.log('this.groupForm', this.groupForm);
        this.$f7.popup.close();
        this.$store.dispatch('editGroup', this.groupForm);
        
      },
      scrollHandle(evt) {
      },

		},
		computed: {
		...mapState(["GroupsPermissions"]),
    ...mapState(["ContentTypes"]),
    parsedAppLabels() {
      let unique = [...new Set(this.ContentTypes.contentTypeList.map(item => item.model))];
      const newVals = unique.filter(item => !this.disabledPermissions.includes(item));
      console.log('newVals', newVals);

      return newVals;
    },
    parsedMustache() {
      var view = {title: "My title goes here", calc:2+2}
      var output = Mustache.render("{{title}} spends {{calc}}", view);
      return output
    },
		},
		async beforeCreate() {
			this.$store.dispatch("getContentTypeList");
      await this.$store.dispatch("getPermissionsList");
		},

		onPageBeforeRemove() {
			const self = this;
			// Destroy popup when page removed
			if (self.popup) self.popup.destroy();
    },
		mounted () {
      console.log("Dom 7 is:", $);
      console.log("Dom 7 is:", this.Dom7);
      console.log('mounted GroupsPermissions', this.GroupsPermissions);
		}
	};
</script>

<style lang="scss" scoped>

</style>