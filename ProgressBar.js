module.exports = class ProgressBar {
	constructor() {
		this.total;
		this.current;
		this.bar_length = 50;
	}

	init(total) {
		this.total = total;
		this.current = 0;
		this.update(this.current);
	}

	update(current) {
		this.current = current;
		const current_progress = this.current / this.total;
		this.draw(current_progress);
	}

	draw(current_progress) {
		const filled_bar_length = (current_progress * this.bar_length).toFixed(0);
		const empty_bar_length = this.bar_length - filled_bar_length;

		const filled_bar = this.get_bar(filled_bar_length, ' ', '\x1b[47m');
		const empty_bar = this.get_bar(empty_bar_length, '-');
		const percentage_progress = (current_progress * 100).toFixed(2);

		process.stdout.clearLine();
		process.stdout.cursorTo(0);
		process.stdout.write(
			`[PUSHER] Progress: [${filled_bar}${empty_bar}] | ${percentage_progress}% ${percentage_progress === '100.00'
				? '\n\n'
				: ''}`
		);
	}

	get_bar(length, char, color) {
		let str = '';
		for (let i = 0; i < length; i++) {
			str += char;
		}
		return `${!color ? '' : color}${str}\x1b[0m`;
	}
};
