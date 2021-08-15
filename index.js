const axios = require('axios');
const ProgressBar = require('./ProgressBar');
const config = require('./config.json');
const Bar = new ProgressBar();
const list = config.sites;
const serversAmount = !config.guilds || config.guilds == 0 ? undefined : config.guilds;
const shardsAmount = !config.shards || config.shards == 0 ? undefined : config.shards;
let log;

const requestBuilder = (list) => {
	let result = {
		url: list.url,
		method: list.method || 'POST',
		headers: {
			authorization: list.token,
			'content-Type': 'application/json'
		},
		data: {}
	};

	result.data[list.serversPar] = serversAmount;
	if (list.shardsPar) result.data[list.shardsPar] = shardsAmount;
	return result;
};

const logger = (i, list, startReq, message, color) => {
	const finishReq = new Date();
	log += `${color}${`[${`${i + 1}`.padStart(2, '0')}/${`${list.length}`.padStart(2, '0')}]`.padEnd(7)} | ${`${list[
		i
	].url
		.slice('https://'.length)
		.split('/')[0]}`.padEnd(26)} | ${`${((finishReq - startReq) / 1000).toFixed(2)} sec`.padStart(
		10
	)} | ${message}\x1b[0m\n`;
};

const dataPuster = async () => {
	log = `${`COUNT`.padEnd(7)} | ${`BOT SITE BASE URL`.padEnd(26)} | ${`TIME (SEC)`.padEnd(
		10
	)} | STATUS MESSAGE/ERROR\n${``.padEnd(85, '=')}\n`;
	const start = new Date();
	for (let i = 0; i < list.length; i++) {
		const startReq = new Date();
		if (!list[i].url || !list[i].token || !list[i].serversPar) {
			Bar.update(i + 1);
			return;
		}

		const request = requestBuilder(list[i]);
		await axios(request)
			.then((rsp) => {
				Bar.update(i + 1);
				if (rsp.status !== 200 && rsp.status !== 204) {
					logger(i, list, startReq, `Reply back wasn't OK (reply: ${rsp.status})`, '\x1b[33m');
				} else {
					logger(i, list, startReq, `Data has been send successfully`, '\x1b[32m');
				}
			})
			.catch((err) => {
				Bar.update(i + 1);
				if (!err.message) {
					logger(i, list, startReq, `Website unreachable or offline`, '\x1b[31m');
				} else {
					logger(i, list, startReq, err.message, '\x1b[31m');
				}
			});
	}

	log += `${``.padEnd(85, '=')}`;
	console.log(log);
	const finish = new Date();
	console.log(`[PUSHER] Pusher has finished, it took ${((finish - start) / 1000).toFixed(2)} seconds to fully finish.`);
};

if (list.length <= 0) {
	console.log(`\x1b[31m[ERROR] There aren't any bot sites to push, make sure to add them in config.json.\x1b[0m`);
	process.exit();
} else if (!serversAmount) {
	console.log(`\x1b[31m[ERROR] The server count is 0 or not set, server count is required.\x1b[0m`);
	process.exit();
} else {
	console.log(`[PUSHER] Pusher has started, it will now push to ${list.length} sites.`);
	Bar.init(list.length);
	dataPuster();
}
