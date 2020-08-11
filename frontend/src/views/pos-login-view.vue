<template>
  <div>  
		<v-text-field
			id="emailInput"
			v-model="loginForm.email"
			label="Email"
			placeholder="John@Doe.com"
			@focus="changeFocus($event)"
		>
		</v-text-field>
		<v-text-field
			id="passwordInpuit"
			v-model="loginForm.password"
			label="Password"
			placeholder="**********"
			@focus="changeFocus($event)"
		>
		</v-text-field>

    <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress"/>
		<div class="row pt-4">
			<dx-button
				type="default"
				text="Login"
				width="100%"
				@click="testButton"
			/>
		</div>
		
  </div>	
</template>

<script>
import SimpleKeyboard from "@/components/elements/keyboard/keyboard-component"
import DxButton from "devextreme-vue/button";

export default {
	name: "POSLoginView",
  components: {
		SimpleKeyboard,
		DxButton
  },
  data() {
    return {
			input: "",
			loginForm: {
				email: null,
				password: null
			}
    };
  },
  methods: {
		testButton() {
			console.log("this.input", this.input);
			console.log("this.loginForm", this.loginForm);
		},
		onChange(input) {
			if(this.input === "emailInput") {
				this.loginForm.email = input
			} else {
				this.loginForm.password = input
			}
     
    },
    onKeyPress(button) {
      console.log("button", button);
    },
    onInputChange(e) {
			console.log('onInputChange e', e)
      this.input = e.target.value;
		},
		changeFocus(e) {
			console.log('changeFocus e', e)
			this.input = e.target.id
		}
  
	}
}
</script>

<style lang="scss" scoped>
input {
  width: 100%;
  height: 100px;
  padding: 20px;
  font-size: 20px;
  border: none;
  box-sizing: border-box;
}

.simple-keyboard {
  max-width: 850px;
}
</style>