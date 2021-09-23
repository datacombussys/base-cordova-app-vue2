<template>
  <base-section
    id="map"
    space="0"
  >
    <iframe
      allowfullscreen
      aria-hidden="false"
      frameborder="0"
      height="500"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.4951164779245!2d-112.09775128480531!3d33.696135143859344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b65801c529d91%3A0x835635f282c625a1!2s23026%20N%2016th%20Ln%2C%20Phoenix%2C%20AZ%2085027!5e0!3m2!1sen!2sus!4v1608604959474!5m2!1sen!2sus"
      style="border:0; display: block;"
      tabindex="0"
      width="100%"
    />
  </base-section>
</template>

<script>
  export default {
    name: 'SectionMap',

    provide: {
      heading: { align: 'center' },
    },
  }
</script>
