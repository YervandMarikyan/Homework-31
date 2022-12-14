"use strict";
//	1․ եթե օգտատերը նշում ա որ ֆիլմը ֆավորիտ ա, ապա ֆիլմի անունի գույնը պետք ա փոխվի, 
//	այսինքն ցուցակում պետք ա տարբերբեն այն ֆիլմերը որոնք ֆավորիտ են

//	2․ ստեղծում եք ֆունկցիոնալ, որ ցուցակում 20ից ավել ֆիլմ չլինի, բայց ֆիլմերը պահպանվեն 
//	տվյալների բազայում, ու ամեն մուտքի ժամանակ ֆիլմերի անունները պետք ա ռանդոմ ցույց տա էդ 
//	20 հատի մեջ, եթե 20ից քիչ են ֆիլմերը ապա ռանդոմը չպետք ա աշխատի, ռանդոմի ժամանակ պետք ա նորից սորտավորվեն

const headerImage = document.querySelector("header img");
const filmsBlock = document.querySelector("#films");
const form = document.querySelector("#add");

function init() {
	headerImage.src = "img/bg2.jpg";

	if(headerImage.src.slice(27) === "img/bg1.jpg") {
		headerImage.alt = "Gemini Man";
	} else if (headerImage.src.slice(27) === "img/bg2.jpg") {
		headerImage.alt = "Hitman's Wife's Bodyguard";
	}

	document.querySelectorAll("#main_promo .mp").forEach(adv => adv.remove());
	document.title = headerImage.alt;
}
init();

const _DB = {
	movies: [
		"Logan", "Spider-Man", "The Seven Samurai",
		"Bonnie and Clyde", "Reservoir Dogs", "Doctor Zhivago",
		"The Deer Hunter", "Rocky", "Crid"
	]
};

form.addEventListener("submit", (e) => {
	e.preventDefault();
	let val = e.target.firstElementChild.value.trim();
	const check = document.querySelector('input[type="checkbox"]');

	if (val !== "" && val.charAt(0) !== "<" && val.charAt(0) !== ">" && val.charAt(0) !== "/" && _DB.movies.indexOf(val) === -1) {
		if (check.checked) {
			val =[val];	//added Task 1
			console.log(`this film <${val}> added to favorite`);
		}
		_DB.movies.push(val);
	}

	setSort(_DB.movies);
	createFilmsList(_DB.movies, filmsBlock);
	e.target.reset();
});

function setSort (arr) {
	arr.sort();
}

function createFilmsList (films, parent) {
	parent.innerHTML = "";
	setSort(films);

	if(films.length < 20) {		//added Task 2
		films.forEach((film, index) => {
			parent.innerHTML += `
				${Array.isArray(film) ?		//added Task 1
					`<p style='color:green'>
						${index + 1}. ${film[0].length >= 21 ? film[0].slice(0, 21)+'...' : film[0]} 
						<span data-rm>&#128465;</span>
					</p>` : 
					`<p>
						${index + 1}. ${film.length >= 21 ? film.slice(0, 21)+'...' : film} 
						<span data-rm>&#128465;</span>
					</p>`			
				}						
			`;
			console.log("length: " + _DB.movies.length);		
		});
	} else {
		const nums = [];
		const newFilms = [];
		for(let i = 0; i < films.length; i++) {
			nums.push(i);
		}

		let filmsLength = films.length;
		let notNeeded = filmsLength - 20;

		for(let j = 0; j < notNeeded; j++) {
			let rand = Math.floor(Math.random() * nums.length)
			nums.splice(rand, 1);
		}

		for(let k = 0; k < nums.length; k++) {
			newFilms.push(films[nums[k]]);
		}
		setSort(newFilms);

		newFilms.forEach((film, index) => {
			parent.innerHTML += `
				${Array.isArray(film) ?		//added Task 1
					`<p style='color:green'>
						${index + 1}. ${film[0].length >= 21 ? film[0].slice(0, 21)+'...' : film[0]} 
						<span data-rm>&#128465;</span>
					</p>` : 
					`<p>
						${index + 1}. ${film.length >= 21 ? film.slice(0, 21)+'...' : film} 
						<span data-rm>&#128465;</span>
					</p>`			
				}						
			`;
			console.log("length: " + _DB.movies.length);		
		});
		
		removeFilmFromList("[data-rm]");
	}
}

function removeFilmFromList(selector) {
	setSort(_DB.movies);
	document.querySelectorAll(selector).forEach((btn, i) => {
		btn.addEventListener("click", () => {
			btn.parentElement.remove();
			_DB.movies.splice(i, 1);
			createFilmsList(_DB.movies, filmsBlock);
		});
	});
}

createFilmsList(_DB.movies, filmsBlock);
