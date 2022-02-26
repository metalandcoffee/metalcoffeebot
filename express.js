// External dependencies.
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Home Endpoint.
export const home = (req, res) => {
	res.sendFile(`${__dirname}/views/index.html`);
}

export const addCommand = (req, res) => {
	console.log('adding new command...')
}
