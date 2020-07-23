export const FormMixins = {
  data() {
    return {
      //Rules
			phoneRules: {
        X: /[02-9]/
			},
			expirationRules: {
				X: /[0-9]{4}/
      },
      taxIdRules: {
				X: /[0-9]/
			},
			ssnRules: {
				X: /[0-9]/
      },
      //Patterns
      namePattern: /^[^0-9]+$/,
      phonePattern: /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/,
      //Custom Rules - Not useed
      maskRules: {
				// a single character
				S: '$',

				// a regular expression
				H: /[0-9A-F]/,

				// an array of characters
				N: ['$', '%', '&', '@'],

				// a function
				F: function(char) {
					console.log('char', char)
					return char.toUpperCase();
				}
			},

    }
  },
  methods: {
 

  },
  mounted() {

  },
  created() {

  }
}