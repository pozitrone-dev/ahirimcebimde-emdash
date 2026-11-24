/* Behaviour for Ahırım Cebimde page blocks: hero sequence, feature carousel, collage scaling. */
(function () {
	var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	/* Hero: looping sequence of detail cards */
	var art = document.getElementById("heroArt");
	if (art) {
		var q = function (s) { return art.querySelector(s); };
		var steps = [[1200, ".c3"], [2000, ".hl1"], [2100, ".tg1"], [3200, ".c1"], [4200, ".st1"], [5000, ".tg2"], [5300, ".c2"]];
		var cycle = function () {
			steps.forEach(function (s) {
				setTimeout(function () {
					var el = q(s[1]); if (!el) return;
					el.classList.add("on");
					if (el.classList.contains("tag")) setTimeout(function () { el.classList.add("move"); }, 300);
				}, s[0]);
			});
			setTimeout(function () { var h = q(".hl1"); if (h) h.classList.remove("on"); }, 4000);
			setTimeout(function () { art.querySelectorAll(".seq,.hl").forEach(function (el) { el.classList.remove("on", "move"); }); }, 9600);
			setTimeout(cycle, 10400);
		};
		if (reduce) art.querySelectorAll(".seq").forEach(function (el) { el.classList.add("on"); });
		else cycle();
	}

	/* Infinite feature carousel: clone the cards before and after */
	document.querySelectorAll("[data-slider]").forEach(function (slider) {
		var vp = slider.querySelector(".viewport"), track = slider.querySelector(".track");
		var n = track.children.length; if (!n) return;
		var html = track.innerHTML;
		var tmp = document.createElement("div"); tmp.innerHTML = html;
		tmp.querySelectorAll(".fcard").forEach(function (a) { a.setAttribute("aria-hidden", "true"); a.setAttribute("tabindex", "-1"); });
		track.innerHTML = tmp.innerHTML + html + tmp.innerHTML;
		var idx = n;
		function stepW() { return track.children[0].getBoundingClientRect().width + 24; }
		function lead() { var w = vp.clientWidth; return w < 768 ? 20 : Math.max(20, (w - 1280) / 2) + 40; }
		function place(anim) { track.classList.toggle("jump", !anim); track.style.transform = "translate3d(" + (lead() - idx * stepW()) + "px,0,0)"; }
		function go(d) { idx += d; place(true); }
		track.addEventListener("transitionend", function (e) {
			if (e.target !== track) return;
			if (idx >= 2 * n) { idx -= n; place(false); } else if (idx < n) { idx += n; place(false); }
		});
		slider.querySelector(".next").addEventListener("click", function () { go(1); });
		slider.querySelector(".prev").addEventListener("click", function () { go(-1); });
		var sx = null, moved = 0;
		vp.addEventListener("pointerdown", function (e) { sx = e.clientX; moved = 0; });
		vp.addEventListener("pointermove", function (e) { if (sx !== null) moved = e.clientX - sx; });
		vp.addEventListener("pointerup", function () { if (sx !== null && Math.abs(moved) > 40) go(moved < 0 ? 1 : -1); sx = null; });
		vp.addEventListener("click", function (e) { if (Math.abs(moved) > 40) { e.preventDefault(); moved = 0; } }, true);
		window.addEventListener("resize", function () { place(false); });
		place(false);
	});

	/* Collages keep desktop geometry and scale down on narrow screens */
	var arts = [].slice.call(document.querySelectorAll(".chapter-art"));
	function fit() { arts.forEach(function (a) { a.style.zoom = ""; var w = a.parentElement.clientWidth; a.style.zoom = w < 640 ? (w / 640).toFixed(4) : ""; }); }
	if (arts.length) { window.addEventListener("resize", fit); fit(); }
})();
