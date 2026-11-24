/* Shared header behaviour: app banner, Keşfet menu, mobile drawer */
(function () {
	var header = document.getElementById("header"),
		appbar = document.getElementById("appbar");
	if (!header) return;
	function setNavH() {
		document.documentElement.style.setProperty("--nav-h", header.offsetHeight + "px");
	}
	if (appbar) {
		try {
			if (sessionStorage.getItem("ab-hide")) appbar.classList.add("hide");
		} catch (e) {}
		appbar.querySelector(".ab-x").addEventListener("click", function () {
			appbar.classList.add("hide");
			try {
				sessionStorage.setItem("ab-hide", "1");
			} catch (e) {}
			setNavH();
		});
	}
	window.addEventListener("resize", setNavH);
	setNavH();

	var drop = document.getElementById("drop");
	if (drop) {
		var dropBtn = drop.querySelector("button"), t;
		function openDrop(o) {
			drop.classList.toggle("open", o);
			dropBtn.setAttribute("aria-expanded", o);
		}
		drop.addEventListener("mouseenter", function () { clearTimeout(t); openDrop(true); });
		drop.addEventListener("mouseleave", function () { t = setTimeout(function () { openDrop(false); }, 120); });
		dropBtn.addEventListener("click", function () { openDrop(!drop.classList.contains("open")); });
		document.addEventListener("keydown", function (e) { if (e.key === "Escape") openDrop(false); });
		drop.querySelectorAll(".mega a").forEach(function (a) { a.addEventListener("click", function () { openDrop(false); }); });
	}

	var tog = header.querySelector(".nav-toggle");
	function setMenu(o) {
		header.classList.toggle("open", o);
		tog.setAttribute("aria-expanded", o);
		tog.setAttribute("aria-label", o ? "Menüyü kapat" : "Menüyü aç");
		document.body.classList.toggle("locked", o);
	}
	tog.addEventListener("click", function () { setMenu(!header.classList.contains("open")); });
	header.querySelectorAll(".drawer a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
	header.querySelectorAll(".d-acc").forEach(function (acc) {
		acc.querySelector("button").addEventListener("click", function () {
			var o = acc.classList.toggle("open");
			this.setAttribute("aria-expanded", o);
		});
	});

	/* FAQ rows (SSS, Destek) */
	document.querySelectorAll(".faq-row button").forEach(function (b) {
		b.addEventListener("click", function () {
			var r = b.parentElement, o = r.classList.toggle("open");
			b.setAttribute("aria-expanded", o);
		});
	});
})();
