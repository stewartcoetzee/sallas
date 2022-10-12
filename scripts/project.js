const scrolls = [...$('.project')];
let recentlyHidden = null;

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry, i) => {
			if (entry.isIntersecting){
				const anime = animations.get(entry.target);

				if (scrolls.indexOf(entry.target) < scrolls.indexOf(recentlyHidden))
					animations.get(recentlyHidden).play();
				else
					anime.play();
			} else {
				recentlyHidden = entry.target;
			}
		});
	},
	{
		threshold: .9,
	}
);

scrolls.forEach((el) => observer.observe(el));

const animations = new Map();
$('svg').each((i, svg) => {
	animations.set(
		scrolls[i],
		anime({
			easing: "easeInOutExpo",
			targets: $(svg).find('.original').get(0),
			autoplay: false,
			width: [0, '100px'],
			complete: (anim) => anim.reverse()
		})
	);
});
