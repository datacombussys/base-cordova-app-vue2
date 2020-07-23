//Import and Use Axios


export default {
	namespace: true,
	name: "contenttypes",
	state: {
    contentTypeList: [],
	},
	mutations: {
		UPDATE_CONTENTTYPE_LIST(state, payload) {
			state.contentTypeList = payload;
			console.log("Mutated Permission List", state.contentTypeList);
		}
	},
	actions: {
		getContentTypeList({commit}) {
			axios.get("/django/contenttype/").then(response => {
				console.log("Retreiveing ContentType list", response.data);
				commit("UPDATE_CONTENTTYPE_LIST", response.data);
			})
		}
	},
	getters: {
		getContentTypeList(state){
			return state.contentTypeList
		}
	}
};
