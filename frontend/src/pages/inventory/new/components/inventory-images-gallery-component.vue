<template>
	<div>
		<div class="row">
			<div class="col-12">
				<div>Please select an inventory item from the database</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<article v-for="photo in Inventory.inventoryGalleryList" :key="photo.id" class="media">
					<figure class="media-left">
						<p class="image is-96x96">
							<img
								v-if="Inventory.inventoryGalleryList.length == 0"
								src="https://bulma.io/images/placeholders/128x128.png"
							/>
							<img v-if="Inventory.inventoryGalleryList.length != 0" :src="photo.image" />
						</p>
					</figure>
					<div class="media-content">
						<div class="content">
							<strong>Title: {{ photo.title }}</strong> <br />
							<div>Subtitle: {{ photo.sub_title }}</div>
							<small>Size: {{ photo.size / 1000 + "Mb" }}</small>
						</div>
						<nav class="level is-mobile">
							<div class="level-left">
								<a class="level-item">
									<span class="icon is-small"><i class="fa-reply"></i></span>
								</a>
								<a class="level-item">
									<span class="icon is-small"><i class="fa-retweet"></i></span>
								</a>
								<a class="level-item">
									<span class="icon is-small"><i class="fa-heart"></i></span>
								</a>
							</div>
						</nav>
					</div>
					<div class="media-right">
						<button @click.prevent="deleteInvGalleryImg(photo.id)" class="delete"></button>
					</div>
				</article>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "inventoryImagesGalleryComponent",
	mixins: [],
	components: {},
	props: {

	},
	data() {
		return {};
	},
	methods: {
		testingMethod(e) {
			console.log();
		},
		deleteInvGalleryImg() {
			console.log("deleteInvGalleryImg")
		}
	},
	computed: {
		...mapState(["Inventory"])
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss">

</style>
