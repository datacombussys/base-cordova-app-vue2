<template>
	<div>
		<p>Inventory History</p>
		<div class="row">
			<div class="col-12">
				<table class="full-width">
					<thead>
						<tr>
							<th class="label-cell">Date</th>
							<th class="numeric-cell">ID</th>
							<th class="medium-only">Trans Type</th>
							<th class="medium-only">Units</th>
							<th class="medium-only">Revenue</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="label-cell">12-25-19</td>
							<td class="numeric-cell">345362</td>
							<td class="medium-only">Sale</td>
							<td class="medium-only">400</td>
							<td class="medium-only">$15,234</td>
						</tr>
						<tr>
							<td class="label-cell">12-25-19</td>
							<td class="numeric-cell">345362</td>
							<td class="medium-only">Purchase</td>
							<td class="medium-only">400</td>
							<td class="medium-only">$-9,234</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "inventoryHistoryComponent",
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
		}
	},
	computed: {
		...mapState([])
	},
	created() {},
	mounted() {}
};
</script>

<style scoped lang="scss">

</style>
