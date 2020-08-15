//I want to return a specific list of menu itmes depending on the router path.
// eg. Virtual Terminal should have its own set of links in the nav menu


const Main = [
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
      },
      {
        text: "Test Page",
        path: "/test-page"
      }
    ]
  }
];

const Datacom = [
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

];

export {Main}
export {Datacom}