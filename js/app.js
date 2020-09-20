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

fetch(unsplashAPI, { cache: "no-cache" })
	.then(
		(response) => {
			if (response.ok) {
				//return response;
				const imgPlacer = document.getElementById("image-placer");
				const imageHolder = new ImiDOM("img", imgPlacer);
				imageHolder.attr("src", response.url);
				return fetch(boredActivityAPI);
			}
			throw new Error("Error getting image");
		},
		(networkError) => {
			console.log(networkError.message);
		}
	)
	.then(
		(response) => {
			if (response.ok) {
				return response.json();
			}
			throw new Error("Error getting message");
		},
		(networkError) => {
			console.log(networkError.message);
		}
	)
	.then((response) => {
		const actPlacer = document.getElementById("activity-placer");

		const bannerHeader = new ImiDOM("h1", actPlacer, response.activity);
		bannerHeader.addClass("heading");
		bannerHeader.setID("main-heading");

		const bannerSubHeader = new ImiDOM("h3", actPlacer, response.type);
		bannerSubHeader.addClass("sub-heading");
	});
