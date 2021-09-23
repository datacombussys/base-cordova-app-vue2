<template>
	
</template>

<script>
  export default {
    name: 'ElemSpinner',

    props: {
      color: {
        type: String,
        default: 'primary',
      },
      depressed: {
        type: Boolean,
        default: true,
      },
      minWidth: {
        type: [Number, String],
        default: 164,
      },
      tile: {
        type: Boolean,
        default: true,
      },
    },
  }
</script>
