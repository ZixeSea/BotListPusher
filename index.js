const axios = require('axios');
const ProgressBar = require('./ProgressBar');
const config = require('./config.json');
const Bar = new ProgressBar();
const list = config.sites;
const serversAmount = !config.guilds || config.guilds == 0 ? undefined : config.guilds;
const shardsAmount = !config.shards || config.shards == 0 ? undefined : config.shards;
let log = '';

const addSpace = (text) => {
	while (text.length < 26) {
		text += ' ';
	}
	return text;
};

const logger = (i, list, message, color) => {
	log += `${color}[${i + 1 < 10 ? `0${i + 1}` : i + 1}/${list.length < 10
		? `0${list.length}`
		: list.length}] | ${addSpace(`${list[i].url.slice('https://'.length).split('/')[0]}`)} | ${message}\x1b[0m\n`;
};

const dataPuster = async () => {
	const start = new Date();
	for (let i = 0; i < list.length; i++) {
		if (!list[i].url || !list[i].token) return;

		await axios({
			url: list[i].url,
			method: 'POST',
			headers: {
				authorization: list[i].token,
				'content-Type': 'application/json'
			},
			data: {
				server_count: serversAmount,
				guild_count: serversAmount,
				serverCount: serversAmount,
				guildCount: serversAmount,
				servers: serversAmount,
				guilds: serversAmount,
				shard_count: shardsAmount,
				shardCount: shardsAmount,
				shard: shardsAmount
			}
		})
			.then((rsp) => {
				Bar.update(i + 1);
				if (rsp.status !== 200 && rsp.status !== 204) {
					logger(i, list, `Reply back wasn't OK (reply: ${rsp.status}).`, '\x1b[33m');
				} else {
					logger(i, list, `Data has been send successfully.`, '\x1b[32m');
				}
			})
			.catch((err) => {
				Bar.update(i + 1);
				if (!err.message) {
					logger(i, list, `Website unreachable or offline.`, '\x1b[31m');
				} else {
					logger(i, list, err.message, '\x1b[31m');
				}
			});
	}

	console.log(log);
	const finish = new Date();
	console.log(`[PUSHER] Pusher has finished, it took ${((finish - start) / 1000).toFixed(2)} seconds to finish.`);
};

if (list.length <= 0) {
	console.log(
		`\x1b[31m[ERROR] There aren't any bot sites to push the data to, make sure to add them in list.json.\x1b[0m`
	);
	process.exit();
} else if (!serversAmount) {
	console.log(`\x1b[31m[ERROR] The server count is 0 or not set, server count is required so please set one.\x1b[0m`);
	process.exit();
} else {
	console.log(
		`[PUSHER] Pusher has been started and will now push to ${list.length} sites, please wait until it's done.`
	);
	Bar.init(list.length);
	dataPuster();
}
