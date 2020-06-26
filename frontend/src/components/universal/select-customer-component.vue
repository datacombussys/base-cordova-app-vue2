<template>
	<div>
		<f7-card>
			<f7-card-content>
				<f7-searchbar
					searchContainer=".search-list"
					searchIn=".item-content"
					disable-button-text="Cancel"
					placeholder="Search in Customers"
					:clear-button="true"
				></f7-searchbar>
				<f7-row>
						<f7-col width="10">
						</f7-col>
						<f7-col width="40">
							<f7-block-title class="classy-small no-margin-top">Customer Id</f7-block-title>
							<!-- <p>Customer Id</p> -->
						</f7-col>
						<f7-col width="50">
							<f7-block-title class="classy-small no-margin-top">Full Name</f7-block-title>
							<!-- <p>Full Name</p> -->
						</f7-col>
					</f7-row>
				<div v-bar="{
					preventParentScroll: true,
					scrollThrottle: 100,
				}" style="height: 400px;"> <!-- el1 -->
					<div> <!-- el2 -->
					
					<f7-list class="searchbar-not-found">
						<f7-list-item title="Nothing found"></f7-list-item>
					</f7-list>
						<f7-list contacts-list class="searchbar-found">
							<f7-list-group class="search-list">
								<f7-list-item title="A" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerA in aNames" 
									:key="customerA.id"
									:title="customerA.customer_number"
									link="#"
									:value="customerA.id"
									@click="testMethod"
									no-chevron>
									<span slot="content">{{ customerA.user.full_name }}</span>
								</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="B" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerB in bNames" 
									:key="customerB.id"
									:title="customerB.customer_number"
									link="#"
									:value="customerB.id"
									@click="testMethod"
									no-chevron>
									<span slot="content">{{ customerB.user.full_name }}</span>
							 }}	</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="C" group-title></f7-list-item>
								<f7-list-item link="#" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerC in cNames" 
									:key="customerC.id"
									:title="customerC.customer_number"
									link="#"
									:value="customerC.id"
									@click="testMethod"
									no-chevron>
									<span slot="content">{{ customerC.user.full_name }}</span>
								</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="D" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerD in dNames" 
									:key="customerD.id"
									:title="customerD.customer_number"
									link="#"
									:value="customerD.id"
									@click="testMethod"
									no-chevron>
									<span slot="content">{{ customerD.user.full_name }}</span>
								</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="E" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerE in eNames" 
									:key="customerE.id"
									:title="customerE.customer_number"
									link="#"
									:value="customerE.id"
									@click="testMethod"
									no-chevron>
									<span slot="content">{{ customerE.user.full_name }}</span>
								</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="F" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerF in fNames" 
									:key="customerF.id"
									:title="customerF.customer_number"
									link="#"
									:value="customerF.id"
									@click="testMethod"
									no-chevron>
									<span slot="content">{{ customerF.user.full_name }}</span>
								</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="G" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerG in gNames" 
									:key="customerG.id"
									:title="customerG.customer_number"
									link="#"
									:value="customerG.id"
									@click="testMethod"
									no-chevron>
									<span slot="content">{{ customerG.user.full_name }}</span>
								</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="H" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerH in hNames" 
									:key="customerH.id"
									:title="customerH.customer_number"
									link="#"
									:value="customerH.id"
									@click="testMethod"
									no-chevron>
									<span slot="content">{{ customerH.user.full_name }}</span>
								</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="I" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerI in iNames" 
									:key="customerI.id"
									title="12345"
									link="#"
									:value="customerI.id"
									@click="testMethod"
									no-chevron>
									<div slot="content">{{ customerI.user.full_name }}</div>
								</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="J" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerJ in jNames" 
									:key="customerJ.id"
									title="67890"
									link="#"
									:value="customerJ.id"
									@click="testMethod"
									no-chevron>
									<div slot="content">{{ customerJ.user.full_name }}</div>
								</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="K" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerK in kNames" 
									:key="customerK.id"
									:title="customerK.customer_number"
									link="#"
									:value="customerK.id"
									@click="testMethod"
									no-chevron>
									<span slot="content">{{ customerK.user.full_name }}</span>
								</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="L" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerL in lNames" 
									:key="customerL.id"
									:title="customerL.customer_number"
									link="#"
									:value="customerL.id"
									@click="testMethod"
									no-chevron>
									<span slot="content">{{ customerL.user.full_name }}</span>
								</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="M" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerM in mNames" 
									:key="customerM.id"
									:title="customerM.customer_number"
									link="#"
									:value="customerM.id"
									@click="testMethod"
									no-chevron>
									<span slot="content">{{ customerM.user.full_name }}</span>
								</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="N" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerN in nNames" 
									:key="customerN.id"
									:title="customerN.customer_number"
									link="#"
									:value="customerN.id"
									@click="testMethod"
									no-chevron>
									<span slot="content">{{ customerN.user.full_name }}</span>
								</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="O" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerO in oNames" 
									:key="customerO.id"
									:title="customerO.customer_number"
									link="#"
									:value="customerO.id"
									@click="testMethod"
									no-chevron>
									<span slot="content">{{ customerO.user.full_name }}</span>
								</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="P" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerP in pNames" 
									:key="customerP.id"
									:title="customerP.customer_number"
									link="#"
									:value="customerP.id"
									@click="testMethod"
									no-chevron>
									<span slot="content">{{ customerP.user.full_name }}</span>
								</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="Q" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerQ in qNames" 
									:key="customerQ.id"
									:title="customerQ.customer_number"
									link="#"
									:value="customerQ.id"
									@click="testMethod"
									no-chevron>
									<span slot="content">{{ customerQ.user.full_name }}</span>
								</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="R" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerR in rNames" 
									:key="customerR.id"
									:title="customerR.customer_number"
									link="#"
									:value="customerR.id"
									@click="testMethod"
									no-chevron>
									<span slot="content">{{ customerR.user.full_name }}</span>
								</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="S" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerS in sNames" 
									:key="customerS.id"
									:title="customerS.customer_number"
									link="#"
									:value="customerS.id"
									@click="testMethod"
									no-chevron>
									<span slot="content">{{ customerS.user.full_name }}</span>
								</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="T" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerT in tNames" 
									:key="customerT.id"
									:title="customerT.customer_number"
									link="#"
									:value="customerT.id"
									@click="testMethod"
									no-chevron>
									<span slot="content">{{ customerT.user.full_name }}</span>
								</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="U" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerU in uNames" 
									:key="customerU.id"
									:title="customerU.customer_number"
									link="#"
									:value="customerU.id"
									@click="testMethod"
									no-chevron>
									<span slot="content">{{ customerU.user.full_name }}</span>
								</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="V" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerV in vNames" 
									:key="customerV.id"
									:title="customerV.customer_number"
									link="#"
									:value="customerV.id"
									@click="testMethod"
									no-chevron>
									<span slot="content">{{ customerV.user.full_name }}</span>
								</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="W" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerW in wNames" 
									:key="customerW.id"
									:title="customerW.customer_number"
									link="#"
									:value="customerW.id"
									@click="testMethod"
									no-chevron>
									<span slot="content">{{ customerW.user.full_name }}</span>
								</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="X" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerX in xNames" 
									:key="customerX.id"
									:title="customerX.customer_number"
									link="#"
									:value="customerX.id"
									@click="testMethod"
									no-chevron>
									<span slot="content">{{ customerX.user.full_name }}</span>
								</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="Y" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerY in yNames" 
									:key="customerY.id"
									:title="customerY.customer_number"
									link="#"
									:value="customerY.id"
									@click="testMethod"
									no-chevron>
									<span slot="content">{{ customerY.user.full_name }}</span>
								</f7-list-item>
							</f7-list-group>
							<f7-list-group class="search-list">
								<f7-list-item title="Z" group-title></f7-list-item>
								<f7-list-item 
									v-for="customerZ in zNames" 
									:key="customerZ.id"
									:title="customerZ.customer_number"
									link="#"
									:value="customerZ.id"
									@click="testMethod"
									no-chevron>
									<span slot="content">{{ customerZ.user.full_name }}</span>
								</f7-list-item>
							</f7-list-group>
						</f7-list>
						<f7-row>
							<f7-block class="padding margin"></f7-block>
						</f7-row>
					</div>
				</div>
			</f7-card-content>
		</f7-card>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from 'vuex';

export default {
	name: "selectCustomerComponent",
	mixins: [],
	components: {},
	props: {

	},
	data() {
		return {};
	},
	methods: {
		testMethod(e) {
			console.log("this.shippingForm ");
		}
	},
	computed: {
		...mapState(["Invoices", "Users"]),
		...mapGetters(["GET_CUSTOMER_LIST", "GET_EMPLOYEE_LIST"]),
		aNames() {
			let newArray = this.GET_CUSTOMER_LIST.filter(elem => elem.user.full_name.startsWith('A'));
			return newArray;
		},
		bNames() {
			let newArray = this.GET_CUSTOMER_LIST.filter(elem => elem.user.full_name.startsWith('B'));
			return newArray;
		},
		cNames() {
			let newArray = this.GET_CUSTOMER_LIST.filter(elem => elem.user.full_name.startsWith('C'));
			return newArray;
		},
		dNames() {
			let newArray = this.GET_CUSTOMER_LIST.filter(elem => elem.user.full_name.startsWith('D'));
			return newArray;
		},
		eNames() {
			let newArray = this.GET_CUSTOMER_LIST.filter(elem => elem.user.full_name.startsWith('E'));
			return newArray;
		},
		fNames() {
			let newArray = this.GET_CUSTOMER_LIST.filter(elem => elem.user.full_name.startsWith('F'));
			return newArray;
		},
		gNames() {
			let newArray = this.GET_CUSTOMER_LIST.filter(elem => elem.user.full_name.startsWith('G'));
			return newArray;
		},
		hNames() {
			let newArray = this.GET_CUSTOMER_LIST.filter(elem => elem.user.full_name.startsWith('H'));
			return newArray;
		},
		iNames() {
			let newArray = this.GET_EMPLOYEE_LIST.filter(elem => elem.user.full_name.startsWith('I'));
			return newArray;
		},
		jNames() {
			let newArray = this.GET_EMPLOYEE_LIST.filter(elem => elem.user.full_name.startsWith('J'));
			return newArray;
		},
		kNames() {
			let newArray = this.GET_EMPLOYEE_LIST.filter(elem => elem.user.full_name.startsWith('K'));
			return newArray;
		},
		lNames() {
			let newArray = this.GET_EMPLOYEE_LIST.filter(elem => elem.user.full_name.startsWith('L'));
			return newArray;
		},
		mNames() {
			let newArray = this.GET_EMPLOYEE_LIST.filter(elem => elem.user.full_name.startsWith('M'));
			return newArray;
		},
		nNames() {
			let newArray = this.GET_EMPLOYEE_LIST.filter(elem => elem.user.full_name.startsWith('N'));
			return newArray;
		},
		oNames() {
			let newArray = this.GET_EMPLOYEE_LIST.filter(elem => elem.user.full_name.startsWith('O'));
			return newArray;
		},
		pNames() {
			let newArray = this.GET_EMPLOYEE_LIST.filter(elem => elem.user.full_name.startsWith('P'));
			return newArray;
		},
		qNames() {
			let newArray = this.GET_EMPLOYEE_LIST.filter(elem => elem.user.full_name.startsWith('Q'));
			return newArray;
		},
		rNames() {
			let newArray = this.GET_EMPLOYEE_LIST.filter(elem => elem.user.full_name.startsWith('R'));
			return newArray;
		},
		sNames() {
			let newArray = this.GET_EMPLOYEE_LIST.filter(elem => elem.user.full_name.startsWith('S'));
			return newArray;
		},
		tNames() {
			let newArray = this.GET_EMPLOYEE_LIST.filter(elem => elem.user.full_name.startsWith('T'));
			return newArray;
		},
		uNames() {
			let newArray = this.GET_EMPLOYEE_LIST.filter(elem => elem.user.full_name.startsWith('U'));
			return newArray;
		},
		vNames() {
			let newArray = this.GET_EMPLOYEE_LIST.filter(elem => elem.user.full_name.startsWith('V'));
			return newArray;
		},
		wNames() {
			let newArray = this.GET_EMPLOYEE_LIST.filter(elem => elem.user.full_name.startsWith('W'));
			return newArray;
		},
		xNames() {
			let newArray = this.GET_EMPLOYEE_LIST.filter(elem => elem.user.full_name.startsWith('X'));
			return newArray;
		},
		yNames() {
			let newArray = this.GET_EMPLOYEE_LIST.filter(elem => elem.user.full_name.startsWith('Y'));
			return newArray;
		},
		zNames() {
			let newArray = this.GET_EMPLOYEE_LIST.filter(elem => elem.user.full_name.startsWith('Z'));
			return newArray;
		},

	},
	created() {},
	mounted() {}
};
</script>

<style style="scss">

	
</style>
