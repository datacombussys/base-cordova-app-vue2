<template>
	<div>
		<f7-navbar v-if="moduleInfo.name === 'home'" class="gradient-nav" f7="menu">
			<f7-nav-left>
				<f7-link
					icon-color="white"
					icon-ios="material:menu"
					icon-aurora="material:menu"
					icon-md="material:menu"
					:panel-open="pageSettings.leftNavDrawer"
				></f7-link>
			</f7-nav-left>
			<f7-nav-title class="display-flex justify-content-center align-items-center">
				{{ pageSettings.pageTitle }}
			</f7-nav-title>
			<f7-nav-right>
				<f7-link href="/checkout/">
					<f7-icon color="white" ios="f7:bell" aurora="f7:bell" md="f7:bell">
						<f7-badge color="red">5</f7-badge>
					</f7-icon>
				</f7-link>
				<f7-link
					v-if="Auth.isAuthenticated"
					icon-size="30"
					icon-color="white"
					icon="mdi mdi-logout"
					@click="logout"
					href="/#/"
				></f7-link>
				<f7-link
					v-if="!Auth.isAuthenticated"
					icon-size="30"
					icon-color="white"
					icon="mdi mdi-login"
					href="/login/"
				></f7-link>
			</f7-nav-right>
		</f7-navbar>

		<f7-navbar v-else class="gradient-nav" f7="menu" back-link="Back">
			<f7-nav-left>
				<f7-link
					icon-color="white"
					icon-ios="material:menu"
					icon-aurora="material:menu"
					icon-md="material:menu"
					:panel-open="pageSettings.leftNavDrawer"
				></f7-link>
			</f7-nav-left>
			<f7-nav-title class="display-flex justify-content-center align-items-center">
				{{ pageSettings.pageTitle }}
			</f7-nav-title>
			<f7-nav-right>
				<f7-link href="/checkout/">
					<f7-icon color="white" ios="f7:bell" aurora="f7:bell" md="f7:bell">
						<f7-badge color="red">5</f7-badge>
					</f7-icon>
				</f7-link>
				<f7-link
					v-if="Auth.isAuthenticated"
					icon-size="30"
					icon-color="white"
					icon="mdi mdi-logout"
					@click="logout"
					href="/#/"
				></f7-link>
				<f7-link
					v-if="!Auth.isAuthenticated"
					icon-size="30"
					icon-color="white"
					icon="mdi mdi-login"
					href="/login/"
				></f7-link>
			</f7-nav-right>
		</f7-navbar>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "navbarComponent",
	components: {},
	mixins: [],
	props: {
		pageSettings: {
			type: Object
		},
		moduleInfo: {
			type: Object,
			required: true
		}
	},
	data() {
		return {};
	},
	methods: {
		logout() {
			this.$store.dispatch("signOut");
		}
	},
	computed: {
		...mapState(["Auth"])
	},
	created() {},
	mounted() {}
};
</script>

<style scoped style="less">
.navbar {
	background-color: linear-gradient(45deg, rgba(0, 55, 87, 1) 0%, rgba(23, 122, 143, 1) 100%);
}
</style>
