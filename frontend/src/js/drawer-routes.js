const homeView = {
	name: "homeRoutes",
	template: `<md-list>
		<md-list-item v-on:click="showStuff">
			<md-icon>move_to_inbox</md-icon>
			<span class="md-list-item-text">Inbox</span>
		</md-list-item>

		<md-list-item>
			<md-icon>send</md-icon>
			<span class="md-list-item-text">Sent Mail</span>
		</md-list-item>

		<md-list-item>
			<md-icon>delete</md-icon>
			<span class="md-list-item-text">Trash</span>
		</md-list-item>

		<md-list-item>
			<md-icon>error</md-icon>
			<span class="md-list-item-text">Spam</span>
		</md-list-item>
	</md-list>`,
	methods: {
		showStuff() {
			console.log("Show Stuff")
		}
	}
}
const adminView = {
	name: "homeRoutes",
	template: `<div>Hello this is the adminView</div>`
}
const userView = {
	name: "homeRoutes",
	template: `<div>Hello this is the userView</div>`
}
const studentView = {
	name: "homeRoutes",
	template: `<div>Hello this is the studentView</div>`
}
const teacherView = {
	name: "homeRoutes",
	template: `<div>Hello this is the teacherView</div>`
}

export { homeView, adminView, userView, studentView, teacherView}

