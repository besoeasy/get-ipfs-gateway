const axios = require('axios');

const gateways = require('./nodes.json');

async function axioscall(url) {
	return await axios
		.get(url, { timeout: 9000 })
		.then(function (response) {
			return response.data;
		})
		.catch(function () {
			return false;
		});
}

async function getGateway() {
	for (let i = gateways.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[gateways[i], gateways[j]] = [gateways[j], gateways[i]];
	}

	for (let i = 0; i < gateways.length; i++) {
		try {
			var gateway = gateways[i].trim();

			var checkIPFSr = await axioscall(gateway + 'QmWj4nCkPT92VsqvybK4eDXcSVGY54FAURpTE9ryk5ahXa');

			if (checkIPFSr.server) {
				console.log(`GOOD : ${gateway}`);
				return gateway;
			} else {
				console.log(`BAD : ${gateway}`);
			}
		} catch (error) {
			console.log(error);
		}
	}

	return null;
}

exports.getGateway = getGateway;
