// On new command submission...
const commandForm = document.getElementById('new-command');
console.log(commandForm)
commandForm.addEventListener('submit', function (e) {
	// Use FormData interface to easily pull out values from form.
	const formData = new FormData(commandForm);
	e.preventDefault();

	// Display the key/value pairs.
	const fields = {};
	for (var pair of formData.entries()) {
		console.log(pair[0] + ', ' + pair[1]);
		fields[pair[0]] = pair[1];
	}
	console.log(fields)

	// Send to endpoint that handles adding commands.
	fetch('/add-command', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(fields)
	})
		.then(res => {
			if (res.ok) return res.json();
		})
		.then(data => {
			console.log(data);
			window.location.reload();
		});
});