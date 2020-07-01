<template>
	<div>
		<f7-col width="100">
			<div id="calculator" class="no-padding no-margin">
				<input
					type="string"
					class="calculator-input"
					:value="calcData.value"
					@keyup.enter="getResult()"
				/>
				<div class="calculator-row">
					<div class="calculator-col">
						<button class="calculator-btn gray action" @click="clear()">C</button>
					</div>
					<div class="calculator-col">
						<button class="calculator-btn gray action" @click="del()">del</button>
					</div>
					<div class="calculator-col">
						<button class="calculator-btn gray action" @click="addExpresion('%')">%</button>
					</div>
					<div class="calculator-col">
						<button class="calculator-btn accent action" @click="addExpresion('/')">/</button>
					</div>
				</div>
				<div class="calculator-row">
					<div class="calculator-col">
						<button class="calculator-btn" @click="addExpresion(7)">7</button>
					</div>
					<div class="calculator-col">
						<button class="calculator-btn" @click="addExpresion(8)">8</button>
					</div>
					<div class="calculator-col">
						<button class="calculator-btn" @click="addExpresion(9)">9</button>
					</div>
					<div class="calculator-col">
						<button class="calculator-btn accent action" @click="addExpresion('*')">*</button>
					</div>
				</div>
				<div class="calculator-row">
					<div class="calculator-col">
						<button class="calculator-btn" @click="addExpresion(4)">4</button>
					</div>
					<div class="calculator-col">
						<button class="calculator-btn" @click="addExpresion(5)">5</button>
					</div>
					<div class="calculator-col">
						<button class="calculator-btn" @click="addExpresion(6)">6</button>
					</div>
					<div class="calculator-col">
						<button class="calculator-btn accent action" @click="addExpresion('-')">-</button>
					</div>
				</div>
				<div class="calculator-row">
					<div class="calculator-col">
						<button class="calculator-btn" @click="addExpresion(1)">1</button>
					</div>
					<div class="calculator-col">
						<button class="calculator-btn" @click="addExpresion(2)">2</button>
					</div>
					<div class="calculator-col">
						<button class="calculator-btn" @click="addExpresion(3)">3</button>
					</div>
					<div class="calculator-col">
						<button class="calculator-btn accent action" @click="addExpresion('+')">+</button>
					</div>
				</div>
				<div class="calculator-row">
					<div class="calculator-col wide">
						<button class="calculator-btn" @click="addExpresion(0)">0</button>
					</div>
					<div class="calculator-col">
						<button class="calculator-btn action" @click="addExpresion('.')">.</button>
					</div>
					<div class="calculator-col">
						<button class="calculator-btn accent action" @click="getResult()">=</button>
					</div>
				</div>
			</div>
		</f7-col>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
var moment = require("moment");

//Mixins
import { UniversalMixins } from "@/mixins/universal-mixins";

//Components


export default {
	name: "calculatorComponent",
	components: {

	},
	mixins: [
		UniversalMixins,
		],
	props: {
		calcData: {
			type: Object,
			required: true,
		}
	},
	data() {
		return {
			//Component Data

			//Main Data
			
			logs: [],



		};
	},
	methods: {
		testingMethod(e) {
			console.log('this.Attendance.holidayList', this.Attendance.holidayList);
		},
		//Calculator
		addExpresion(e) {
			if (Number.isInteger(this.calcData.value)) this.calcData.value = "";
			this.calcData.value += e;
		},
		//Calculator
		getResult() {
			let log = this.calcData.value;
			this.calcData.value = eval(this.calcData.value);
			this.logs.push(log + `=${this.calcData.value}`);
		},
		//Calculator
		clear() {
			this.calcData.value = 0;
		},
		//Calculator
		del() {
			this.calcData.value = this.calcData.value.slice(0, -1);
		},


	},
	computed: {
		...mapState(["Auth", "RetailPOS"]),
		...mapGetters([])

	},
	created() {

	},
	async mounted() {

		
	}
};
</script>

<style scoped lang="less">
//  CALCULATOR  \\
@darker: #1c1c1d;
@dark: #474849;
@gray: #838383;
@white: #fff;
@light: rgb(180, 180, 180);
@accent: #d47f24;

#calculator {
	// height:97%;
	margin: 10px;
	display: flex;
	padding: 0;
	max-width: 100%;
	min-width: 250px;
	flex-direction: column;
	background-color: @light;
	border: 5px solid rgb(65, 64, 64);

	.calculator-logs {
		display: flex;
		position: relative;
		overflow: hidden;
		align-items: flex-end;
		flex-direction: column;
		justify-content: flex-end;
		&:before {
			top: 0;
			left: 0;
			right: 0;
			height: 48px;
			content: "";
			z-index: 5;
			position: absolute;
			background: linear-gradient(to bottom, @darker, rgba(@darker, 0));
		}
		span {
			color: @light;
			opacity: 0.75;
			display: block;
			font-size: 0.8rem;
			text-align: right;
			margin-top: 0.4rem;
			line-height: 1;
			font-weight: lighter;
		}
	}

	.calculator-input {
		color: black;
		height: 4.5rem;
		width: 90%;
		border: none;
		padding: 0.8rem;
		padding-bottom: 1rem;
		display: block;
		font-size: 3.5rem;
		background: none;
		text-align: right;
		font-weight: lighter;
		&:focus,
		&:active {
			outline: none;
		}
	}

	.calculator-row {
		display: flex;
		padding: 0;
		justify-content: space-around;
		.calculator-col {
			width: 25%;
			box-shadow: 0 0 0 2px @darker;
			&.wide {
				flex: 2;
			}
		}
	}

	.calculator-btn {
		width: 100%;
		height: 3.5rem;
		color: @darker;
		border: none;
		cursor: pointer;
		padding: 0.8rem;
		outline: none;
		font-size: 1.6rem;
		transition: all 0.3s ease-in-out;
		font-weight: 200;
		justify-content: center;
		background-color: @light;
		&.accent {
			background-color: @accent;
			color: @white;
		}
		&.gray {
			background-color: @gray;
		}
		&.action {
		}
		&:active {
			background-color: @darker;
		}
	}
}

	
</style>
