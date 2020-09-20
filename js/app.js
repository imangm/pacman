class ImiDOM {
	constructor(elem, prnt, cont, id, clss) {
		this._element = elem;
		this._id = id;
		this._class = clss;
		this._content = cont;
		this._parent = prnt;

		this._itemHolder = document.createElement(this._element);

		let item_holder = this._itemHolder;
		if (this._id) item_holder.setAttribute("id", this._id);
		if (this._class) item_holder.setAttribute("class", this._class);
		if (this._content) {
			let item_content = document.createTextNode(this._content);
			item_holder.appendChild(item_content);
		}
		this._parent.appendChild(item_holder);
	}

	addClass(className) {
		let currentClass = this._itemHolder.getAttribute("class");
		if (currentClass) {
			this._itemHolder.setAttribute("class", currentClass + " " + className);
		} else {
			this._itemHolder.setAttribute("class", className);
		}
	}

	setID(id) {
		this._itemHolder.setAttribute("id", id);
	}

	attr(name, value) {
		this._itemHolder.setAttribute(name, value);
	}
}

const unsplashAPI = "https://picsum.photos/800/800";
const boredActivityAPI = "https://www.boredapi.com/api/activity/";

fetch(unsplashAPI)
	.then((x) => {
		const imgPlacer = document.getElementById("image-placer");
		const imageHolder = new ImiDOM("img", imgPlacer);
		imageHolder.attr("src", x.url);
		return fetch(boredActivityAPI);
	})
	.then((x) => {
		return x.json();
	})
	.then((x) => {
		const actPlacer = document.getElementById("activity-placer");

		const bannerHeader = new ImiDOM("h1", actPlacer, x.activity);
		bannerHeader.addClass("heading");
		bannerHeader.setID("main-heading");

		const bannerSubHeader = new ImiDOM("h3", actPlacer, x.type);
		bannerSubHeader.addClass("sub-heading");
	})
	.catch((err) => {
		console.log(err);
	});
