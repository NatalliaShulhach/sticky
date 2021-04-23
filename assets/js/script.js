(function () {
	const firstBlockOffset = 1000;
	const secondBlockOffset = 1000;


	class SmoothScroll {
		constructor() {
			this.bindMethod();

			this.data = {
				ease: 0, //scrolling smoothness factor
				current: 0,
				last: 0,
				rounded: 0
			};

			this.dom = {
				el: document.querySelector('[scroll-data]'),
				content: document.querySelector('[scroll-content]')
			};

			this.rAF = null;

			this.init();
		}

		setStyles() {
			Object.assign(this.dom.el.style, {
				//height: '100%', 
				width: '100%',
				position: 'fixed',
				top: 0,
				left: 0
			})
		}

		bindMethod() {
			['scroll', 'run', 'resize']
			.forEach((fn) => this[fn] = this[fn].bind(this));
		}

		setHeightBody() {
			document.body.style.height = `${this.dom.content.getBoundingClientRect().height}px`;
		}

		resize() {
			this.setHeightBody();
			this.scroll();
		}

		scroll() {
			this.data.current = window.scrollY;
		}

		init() {
			this.setStyles();
			this.setHeightBody();
			this.addEvent();

			this.requestAnimationFrame();
		}

		end() {
			this.cancelAnimationFrame();
			this.removeEvent();
		}

		run() {
			this.data.last += (this.data.current - this.data.last) * this.data.ease;
			this.data.rounded = Math.round(this.data.last * 100) / 100;
			this.dom.content.style.transform = `translate3d(0, -${this.data.rounded}px, 0)`;

			this.requestAnimationFrame()
		}
		requestAnimationFrame() {
			this.rAF = requestAnimationFrame(this.run);
		}

		cancelAnimationFrame() {
			cancelAnimationFrame(this.rAF);
		}

		removeEvent() {
			window.removeEventListener('scroll', this.scroll);
		}

		addEvent() {
			window.addEventListener('scroll', this.scroll);
		}
	}

	new SmoothScroll()

	let data = document.querySelectorAll('[scroll-data]');
	let section2 = document.getElementsByClassName('section-2')[0];
	let section4 = document.getElementsByClassName('section-4')[0];

	function changeProgressScrollSections(section, sectionGlobalY, offset) {
		const progressBar = section.getElementsByClassName("progress-bar")[0];
		if (document.body.scrollTop < sectionGlobalY) {
			progressBar.style.height = "0%";
		}
		const scrolledY = document.body.scrollTop - sectionGlobalY;
		const scrolledPercent = scrolledY / (offset / 100);
		progressBar.style.height = scrolledPercent + "%";
		return;
	}

	window.onscroll = () => {
		switch (true) {
			case window.scrollY >= 0 && window.scrollY < 500:
				data[0].style.transform = `translate3d(0, -${window.scrollY}px, 0)`;
				changeProgressScrollSections(section2, 500, firstBlockOffset);
				break;
			case window.scrollY >= 500 && window.scrollY < 500 + firstBlockOffset:
				data[0].style.transform = `translate3d(0, -${500}px, 0)`;
				changeProgressScrollSections(section2, 500, firstBlockOffset);
				break;
			case window.scrollY >= 500 + firstBlockOffset && window.scrollY < 1000 + firstBlockOffset:
				changeProgressScrollSections(section2, 500, firstBlockOffset);
				changeProgressScrollSections(section4, 1000 + firstBlockOffset, secondBlockOffset);
				data[0].style.transform = `translate3d(0, -${window.scrollY - firstBlockOffset}px, 0)`;
				break;
			case window.scrollY >= 1000 + firstBlockOffset && window.scrollY < 1000 + firstBlockOffset + secondBlockOffset:
				data[0].style.transform = `translate3d(0, -${1000}px, 0)`;
				changeProgressScrollSections(section4, 1000 + firstBlockOffset, secondBlockOffset);
				break;
			case window.scrollY >= 1000 + firstBlockOffset + secondBlockOffset:
				changeProgressScrollSections(section4, 1000 + firstBlockOffset, secondBlockOffset);
				data[0].style.transform = `translate3d(0, -${window.scrollY - firstBlockOffset - secondBlockOffset}px, 0)`;
				break;
			default:
				console.log('default, window.scrollY: ', window.scrollY);
		}
	}
})();
