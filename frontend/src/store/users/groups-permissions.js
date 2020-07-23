//Import and Use Axios


export const GroupsPermissions = {
	namespace: true,
	name: "groups_permissions",
	state: {
////// Groups //////
		groupsList: [],
		
////// Permissions //////
		permissionList: [],
			},

	mutations: {
//// Groups //////
		UPDATE_GROUP_LIST(state, payload) {
			//Convert Primary ID's to names for Permissions
			var newGroupObj = payload;
			// console.log('newGroupObj', newGroupObj);
			for(let item in newGroupObj) {
				// console.log('newGroupObj[item]', newGroupObj[item]);
					for(let index in newGroupObj[item].permissions) {
						newGroupObj[item][newGroupObj[item].permissions[index].codename] = true;
					};
				console.log('Main newGroupObj', newGroupObj);

			};
			state.groupsList = newGroupObj;
			console.log("Mutated Group List", state.groupsList);
		},

////// Permissions //////
		UPDATE_PERM_LIST(state, payload) {
			state.permissionList = payload;
			console.log("Mutated Permission List", state.permissionList);
		}
	},

	actions: {
		////// Groups //////
		addGroup({ commit, dispatch }, groupForm) {
			console.log("addGroup groupForm.", groupForm)
			axios
				.post("/django/groups/", groupForm)
				.then(response => {
					console.log("Request received to create new group POST method", response.data);
					if ( response.status === 201) {
						commit("updateNotification", "Group Created Successfully");
						dispatch('getGroupList');
						console.log("getting Group List");
					} 
				}).catch(error => {
					commit("updateNotification", `There was an error creating this group, Response: ${error.response.data.name[0]}`);
					console.log("Catch Group Error", error);
				});
		},
		getGroupList({commit}) {
			axios.get("/django/groups/").then(response => {
				console.log("Retreiveing Group list", response.data);
				commit("UPDATE_GROUP_LIST", response.data);
			}).catch(error => {
        commit("updateNotification", `There was an error retrieving the groups, Response: ${error.response.data.detail}`);
        console.log("Catch Group Error", error);
      });
		},
		editGroup({ commit, dispatch }, groupForm) {
			console.log("edditGroup.", groupForm)
			axios
				.put("/django/groups/"+ groupForm.id + "/", groupForm)
				.then(response => {
					console.log("Request received to delete Group", response.data);
					if ( response.status === 204 || response.status === 200) {
						commit("updateNotification", "Group updated Successfully");
						dispatch('getGroupList');
					} 
				}).catch(error => {
					commit("updateNotification", `There was an error updating this group, Response: ${error.response.data}`);
					console.log("Caught Group Error", error);
				});
		},
		deleteGroup({ commit, dispatch }, groupForm) {
			console.log("addGroup reporting for duty sir.", groupForm)
			axios
				.post("/django/groups/"+ groupForm.id + "/", groupForm)
				.then(response => {
					console.log("Request received to delete Group", response.data);
					if ( response.status === 200) {
						commit("updateNotification", "Group Deleted Successfully");
						dispatch('getGroupList');
						console.log("getting Group List");
					} 
				}).catch(error => {
					commit("updateNotification", `There was an error deleting this group, Response: ${error.response.data.name[0]}`);
					console.log("Caught Group Error", error);
				});
		},

////// Permissions //////

		addGroupPermissions({ commit, dispatch, state }, permissions) {
			console.log('addGroupPermissions permissions', permissions);
			//Combine Permisisons to Group Object
			//Get index of each permisison from Permisisons.permisionList
			var groupObj = {};
			groupObj.date_added = permissions.date_added;
			groupObj.group_class = permissions.group_class;
			groupObj.group_type = permissions.group_type;
			groupObj.id = permissions.id;
			groupObj.name = permissions.name;
			groupObj.permissionsnew = permissions.permissionsnew;
			groupObj.permissions_id = [];
			console.log('groupObj addGroupPemissions Action', groupObj);
			var grpPermissions = permissions['permissionsnew'][0];
			var PermissionList = state.permissionList;
			console.log('PermissionList', PermissionList);
			for(let permission in grpPermissions) {
				console.log('each permission', grpPermissions[permission]);
				var permObj = PermissionList.find(elem => elem.codename === grpPermissions[permission]);
				console.log('matched permObj.id', permObj);
				groupObj.permissions_id.push(permObj.id);
			};
			delete groupObj.permissionsnew;
			console.log('groupObj final', groupObj);
			axios.put("/django/groups/"+ groupObj.id + "/", groupObj).then(response => {
					console.log("Request received to edit group to add Permissions POST method", response.data);
					if ( response.status === 201) {
						commit("updateNotification", "Permissions Added Successfully");
						dispatch('getGroupList');
						console.log("getting Group List");
					} 
				}).catch(error => {
					commit("updateNotification", `There was an error creating this group, Response: ${error.response.data}`);
					console.log("Catch Group Error", error);
				});
		},
		updateGroupPerms({ commit, dispatch }, perms) {
			console.log("permissions", perms)
			axios.put("/django/groups/", perms).then(response => {
					console.log("Request received to update Group PUT method", response.data);
					if ( response.status === 201) {
						commit("updateNotification", "Group Created Successfully");
						dispatch('getGroupList');
						console.log("getting Group List");
					} 
				}).catch(error => {
					commit("updateNotification", `There was an error creating this group, Response: ${error.response.data.name[0]}`);
					console.log("Catch Group Error", error);
				});
		},
		//List Permissions Methods
		getPermissionsList({commit, dispatch}) {
			axios.get("/django/permission/").then(response => {
				console.log("Retreiveing Permissions list", response.data);
				if ( response.status === 200) {
					commit("updateNotification", "Permissions List Retrieved");
					commit("UPDATE_PERM_LIST", response.data);
					console.log("Updating Permission List");
					dispatch('getGroupList');
				} 
			}).catch(error => {
				commit("updateNotification", `There was an error getting the permissions list, Response: ${error.response.data.detail}`);
				console.log("Catch Permission Error", error);
			});
		},

	},
	getters: {
////// Groups //////
		getgrouplist(state) {
			return state.groupsList
		},

////// Permissions //////
		getpegetPermissionsListrmlist(state){
			return state.permissionList;
		}
	}
};
