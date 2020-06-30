# BotListPusher, simple data pusher for discord bot sites
[![Discord Badge](https://discordapp.com/api/guilds/98834803738054656/embed.png)](https://discordapp.com/invite/bZt8WkS)
[![Version Badge](https://img.shields.io/badge/Version-1.0.0-green.svg)](https://github.com/ZixeSea/BotListPusher)
[![In progress Badge](https://img.shields.io/badge/In%20progress-yes-green.svg)](https://zixesea.com)

**This is a small JS app that pushes data to discord bot list sites, is also give nice feedback if something goes wrong.**

## License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/ZixeSea/BotListPusher/blob/master/LICENSE.md) file for details

## Requirements
- `git` Command line ([Windows](https://git-scm.com/download/win)|[Linux](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)|[MacOS](https://git-scm.com/download/mac)) installed
- `node` [Version 8.0.0 or higher](https://nodejs.org)
- `config file` Required a config file that holds links and toklens for the sites

## Downloading
In a command prompt in your project's folder (wherever that may be) run the following:

`git clone https://github.com/ZixeSea/BotListPusher.git`

Once finished:

- In the folder from where you ran the git command, run `cd BotListPusher` and then run `npm i`, this will install all required packages.

- Now go to `BotListPusher/config.json` and open it, and add sites like this (the list is an array so you can add more with `,`)
```
{
    "url": "https://example.com/12342423/stats",
    "token": "g4353fdwsf342"
}
```

After adding all the sites add your server and shard count on the top of the config file.

- Now run the program by running `npm .` in a command prompt.
