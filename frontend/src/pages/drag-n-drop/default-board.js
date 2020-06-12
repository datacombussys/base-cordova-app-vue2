function uuid() {
	return Math.random().toString(16).slice(2)
}

export default {
	name: 'workshop',
	rowss: [
		{
			name: "Row 1",
			tasks: [
				{
					name: "Task 1",
					description: "",
					id: uuid(),
					userAssigned: null
				},
				{
					name: "Task 2",
					description: "",
					id: uuid(),
					userAssigned: null
				},
				{
					name: "Task 3",
					description: "",
					id: uuid(),
					userAssigned: null
				},
				
			]
		},
		{
			name: "Row 2",
			tasks: [
				{
					name: "Task One",
					description: "",
					id: uuid(),
					userAssigned: null
				},
				{
					name: "Task Two",
					description: "",
					id: uuid(),
					userAssigned: null
				},
				{
					name: "Task Three",
					description: "",
					id: uuid(),
					userAssigned: null
				},
				
			]
		},
		{
			name: "Row 3",
			tasks: [
				{
					name: "Tasking One",
					description: "",
					id: uuid(),
					userAssigned: null
				},
				{
					name: "Tasking Two",
					description: "",
					id: uuid(),
					userAssigned: null
				},
				{
					name: "Tasking Three",
					description: "",
					id: uuid(),
					userAssigned: null
				},
				
			]
		}
	]
}