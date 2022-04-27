const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
	console.log("GET: diagnostics");
	readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
	console.log("POST: diagnostics ", req.body);

	const { errors } = req.body;

	if (errors && (errors.tip || errors.topic || errors.username)) {
		console.log("POST: diagnostics - inside if");
		const newDiagnostic = { time: Date.now(), error_id: uuidv4(), errors };
		readAndAppend(newDiagnostic, './db/diagnostics.json');

		const response = { status: 'success', body: newDiagnostic };
		res.json(response);
		// res.json(`Diagnostic added successfully 🚀`);
	} else {
		console.log("POST: diagnostics - ELSE");
		res.json('Error in posting diagnostics');
		// res.error('Error in adding diagnostics');
	}
});

module.exports = diagnostics;
