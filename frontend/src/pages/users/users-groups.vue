<template>
	<f7-page name="user-groups">
		<f7-row>
			<f7-navbar back-link="Back" class="bg-color-white">
        <f7-nav-left>
        <f7-link size="10" panel-open=".permissions-panel">
          <f7-icon color="white" material="menu"></f7-icon>
        </f7-link>
        </f7-nav-left>
        <f7-nav-title>Users and Permissions</f7-nav-title>
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
		<f7-row>
			<!-- Main Column 100% -->
			<f7-col width="100" medium="100" class="full-height">		
				<f7-block-title medium>Add Users to Groups</f7-block-title>	

				<!--Begin Card #1 with Group Table -->
				<f7-row class="margin-top">
					<f7-card>
						<!--Begin Groups Table -->
								<b-table
										:data="this.GroupsPermissions.groupsList"
										ref="table"
										paginated
										per-page="5"
										:opened-detailed="openedRow"
										@details-open="(row, index) => defaultOpenedDetails(row)"
										detailed
										detail-key="id"
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
														{{ props.row.class }}
												</b-table-column>

												<b-table-column
														field="group_class"
														:visible="columnsVisible['group_class'].display"
														:label="columnsVisible['group_class'].title"
														sortable
														centered
												>
														{{ props.row.members }}
												</b-table-column>

												<b-table-column
														field="users"
														:visible="columnsVisible['users'].display"
														:label="columnsVisible['users'].title"
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
														<f7-icon f7="pencil" padding></f7-icon>
														<f7-icon f7="trash" padding></f7-icon>
														<f7-icon f7="checkmark_circle" padding></f7-icon>
														
												</b-table-column>
										</template>

										<template slot="detail" slot-scope="props">
											<f7-row class="display-flex no-padding-top align-content-center align-items-center justify-content-space-between">
												<f7-col width="25">
													<f7-button fill large popup-open=".add-users-popup">Add Users</f7-button>
												</f7-col>
												<f7-col width="75">
													<f7-block-title class="no-margin text-align-center">Manage Users in Group</f7-block-title>
													<f7-block strong>
														<f7-chip text="Example Chip" deleteable @click="deleteChip"></f7-chip>
														<f7-chip text="Chris" media="C" media-bg-color="orange" text-color="black" deleteable @click="deleteChip"></f7-chip>
														<f7-chip text="Jane Doe" deleteable @click="deleteChip">
															<img slot="media" src="https://cdn.framework7.io/placeholder/people-100x100-9.jpg"/>
														</f7-chip>
														<f7-chip text="One More Chip" deleteable @click="deleteChip"></f7-chip>
														<f7-chip text="Jennifer" media-bg-color="pink" media="J" deleteable @click="deleteChip"></f7-chip>
														<f7-chip text="Adam Smith" deleteable @click="deleteChip">
															<img slot="media" src="https://cdn.framework7.io/placeholder/people-100x100-7.jpg"/>
														</f7-chip>
													</f7-block>
												</f7-col>
											</f7-row>
									</template>
								</b-table>
            
						<!--END Group Table -->

						<!--Begin Pagination Footer -->

						<!--END Pagination Footer -->
					</f7-card>
				</f7-row>
				<!--END Card #1 with Group Table -->
			</f7-col>
			<!-- END Main Column 100%-->
		</f7-row>

		<!-- Begin Popup for Users -->
		<f7-popup class="add-users-popup" :opened="grppopupOpened" @popup:closed="grppopupOpened = false">
			<div class="view view-init">
				<f7-page>
				<f7-navbar title="Add Employees to Groups / Roles">
					<f7-nav-right>
						<f7-link popup-close>Close</f7-link>
					</f7-nav-right>
				</f7-navbar>
					<f7-row class="full-width">
						<f7-col>
							<f7-list virtualList no-hairlines-md>
								<f7-list-item title="Fruit" smart-select :smart-select-params="{searchbar: true, searchbarPlaceholder: 'Search car'}">
									<select name="fruits" multiple>
										<option value="apple" selected>Apple</option>
										<option value="pineapple">Pineapple</option>
										<option value="pear">Pear</option>
										<option value="orange">Orange</option>
										<option value="melon">Melon</option>
										<option value="peach">Peach</option>
										<option value="banana">Banana</option>
										<option value="apple" selected>Apple</option>
										<option value="pineapple">Pineapple</option>
										<option value="pear">Pear</option>
										<option value="orange">Orange</option>
										<option value="melon">Melon</option>
										<option value="peach">Peach</option>
										<option value="banana">Banana</option>
										<option value="apple" selected>Apple</option>
										<option value="pineapple">Pineapple</option>
										<option value="pear">Pear</option>
										<option value="orange">Orange</option>
										<option value="melon">Melon</option>
										<option value="peach">Peach</option>
										<option value="banana">Banana</option>
									</select>
								</f7-list-item>
							</f7-list>
						</f7-col>
					</f7-row>
					<f7-row>
						<f7-row class="margin full-width display-flex justify-content-end">
							<f7-col width="50">
								<button class="col button button-raised button-fill" @click="addUsersToGroup">Add To Group</button>
							</f7-col>
						</f7-row>
					</f7-row>
					
          
						
				
			</f7-page>
			</div>
		</f7-popup>
		<!-- END Popup for Users -->

		
	</f7-page>
</template>

<script>
import { mapState } from "vuex";

	export default {
		name: "userPermissions",
		data() {
			return {
        //Main Settings
        //Hide Show Items
        showPermissionTable: false,
        //Hide Show Popups
				grppopupOpened: false,
				permpopupOpened: false,
        //Group Data
				groupList: [],
				groupForm:{
					name: "",
					group_class: "",
					group_type: "",
      },
      //Permissions
				permForm:{
					selectedPermission: [],
				},
				//User and Group Table Buefy
				showDetailIcon: true,
				openedRow: [],
				expanded: false,
				atRight: false,
				size: null,
				type: null,
				columnsVisible: {
					id: { title: 'ID', display: true },
					name: { title: 'Group Name', display: true },
					group_type: { title: 'Group Type', display: true },
					group_class: { title: 'Group Class', display: true },
					users: { title: 'Users', display: true },
					actions: { title: 'Actions', display: true },
			},
			};
		},
		methods: {
			addUsersToGroup (row) {
				console.log("addUsersToGroup row", row);

			},
			deleteChip(e) {
        const $$ = this.$$;
        const app = this.$f7;
        const target = e.target;
        app.dialog.confirm('Do you want to delete this tiny demo Chip?', () => {
          $$(target).parents('.chip').remove();
        });
      },
			scrollHandle(evt) {
			},
			toggle(row) {
				this.$refs.table.toggleDetails(row)
			},
			defaultOpenedDetails(row) {
				this.openedRow.push(row);
				this.openedRow.unshift();
		}
		},
		on: {
			pageInit() {
			// Create Popup with swipe to close
				var swipeToClosePopup = app.popup.create({
				el: '.popup-swipe-to-close',
				swipeToClose: true,
			});
			}
		},
	computed: {
		...mapState(["GroupsPermissions"]),
		},
  beforeCreate() {
		this.$store.dispatch("getPermList");
    this.$store.dispatch("getGroupList");
  },
  created() {
  }
	};
</script>

<style lang="less" scoped>
.footer-pagination {
	display: flex;
	justify-content: space-around;
	width: 100%;
	align-content: center;

	div {
		display: flex;
		justify-content: center;
		align-self: center;

		div {
			display: flex;
			justify-content: center;
		}
	}
}

thead {
	tr {
		th {
			div {
				margin-bottom: 5px;
				border: none;
				box-shadow: none;
			}

		}
	}
}

.card {
	width: 100%;
	table {
		width: 100%;
	}
}

tbody {
	tr {
		td {
			line-height: 2.5;
			padding: 20px, 2px, 20px, 2px;
			// background:lightblue;
		}		
		div {
			border: none;
			box-shadow: none;
		}

	}
}

.checkbox-cell {
	.checkbox {
		.input:not(.input-outline)::after {
			height: 0px;
		}
	}
}

.input {
	.checkbox-cell {
		.checkbox {
			input:not(.input-outline)::after & .remove-borders {
				height: 0px;
			}
		}
	}
}



</style>
