import Router from 'vue-router'

console.log('Router', Router)


// new Router({
//   mounted() {
//     var router = this;
//     console.log('router', router)
//   }
// })

//I want to return a specific list of menu itmes depending on the router path.
// eg. Virtual Terminal should have its own set of links in the nav menu


export default [
  {
    text: "Home",
    path: "/home",
    icon: "home"
  },
  {
    text: "Colors",
    path: "/colors",
    icon: "mdi mdi-palette"
  },
  {
    text: "Icons",
    path: "/icons",
    icon: "mdi mdi-emoticon-excited-outline"
  },
  {
    text: "Examples",
    icon: "folder",
    items: [
      {
        text: "Profile",
        path: "/profile"
      },
      {
        text: "Display Data",
        path: "/display-data"
      }
    ]
  }
  ];
