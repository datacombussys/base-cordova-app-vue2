<template>
  <div>
    <base-info-card
      :title="title"
      :subtitle="subtitle"
      space="4"
      color="primary"
    />

		<v-form
			v-model="validForm"
			ref="formRef">
			<base-text-field :rules="[rules.required]" label="Name" v-model="contactForm.name"/>

			<base-text-field :rules="emailRules" label="Email" v-model="contactForm.email"/>

			<base-text-field :rules="[rules.required]" label="Subject" v-model="contactForm.subject"/>

			<base-textarea
				class="mb-6"
				label="Your Needs & Description"
				v-model="contactForm.body"
			/>
		</v-form>
    

    <base-btn
      :color="!theme.isDark ? 'accent' : 'white'"
			@click="testButton"
      outlined
      target="_blank"
    >
      Send message
			<v-progress-circular
				v-if="showProgress"
				:size="25"
				class="ml-3"
				width="2"
				color="error"
				indeterminate
			></v-progress-circular>
    </base-btn>
		<div class="text-red-600" v-if="isMsgSent">
			Message has been sent
		</div>


		

  </div>
</template>

<script>
import axios from "axios"

import { FormMixins } from "@/mixins/form-mixins"

  export default {
		name: 'BaseContactForm',
		mixins: [
			FormMixins
		],

    // Injected from the Vuetify Themeable mixin
    inject: ['theme'],

    props: {
      subtitle: String,
      title: {
        type: String,
        default: 'Send YOUR MESSAGE',
      },
		},
		data: () => ({
			showProgress: false,
			isMsgSent: false,
			validForm: false,
			dialog: false,
			contactForm: {
				name: "",
				email: "",
				subject: "",
				body: "",
			}
		}),
		methods: {
			testButton() {
				console.log("this.contactForm", this.contactForm)
				
				let valid = this.$refs.formRef.validate()
				if(valid) {
					this.showProgress = true
					axios({
						method: 'post',
						url: '/node/email/contact-us',
						data: this.contactForm
					}).then(response => {
						console.log('response', response)
						this.showProgress = false
						this.isMsgSent = true
						if(response.status === 200) {
							// this.$refs.formRef.reset()
							// for(let key in this.contactForm) {
							// 	this.contactForm[key] = null
							// }
							setTimeout(() => {
								this.isMsgSent = false
							}, 10000)
						}
					})
				} 

				

				
			}
		}
  }
</script>
