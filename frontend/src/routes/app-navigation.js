const permissions = {
	'superuser': 1,
	'administrator': 2,
	'merchant': 3,

}

const main = [
  { title: 'Home', icon: 'mdi-home', path: '/', permission: permissions.superuser },
  { title: 'Dashboard', icon: 'mdi-gauge', path: '/', permission: permissions.superuser },
  { title: 'Admin', icon: 'mdi-account-supervisor-circle', path: '/admin', permission: permissions.superuser },
  { title: 'Vendors', icon: 'mdi-cube-send', path: '/vendor', permission: permissions.superuser },
  { title: 'Teachers', icon: 'mdi-teach', path: '/teacher', permission: permissions.superuser },
  { title: 'Parents', icon: 'mdi-account-child-circle', path: '/parent', permission: permissions.superuser }
]

const superuser = [
  { title: 'Home', icon: 'mdi-home', path: '/', permission: permissions.superuser },
	{ title: 'Dashboard', icon: 'mdi-gauge', path: '/superuser', permission: permissions.superuser },
	{ title: 'Manage Schools', icon: 'mdi-school', path: '/superuser/schools', permission: permissions.superuser },
	{ title: 'Manage SuperUsers', icon: 'mdi-account-tie', path: '/superuser/superuser', permission: permissions.superuser },
  { title: 'Manage Admins', icon: 'mdi-account-cog', path: '/superuser/admin', permission: permissions.superuser }
]




export { main, superuser }


