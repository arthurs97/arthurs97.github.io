console.log("lover of script loaded");

const passions = [
	"lifelong learning",
	"computer science",
	"innovative technology",
	"well-built software",
	"math",
	"modern art",
	"philosophy",
	"communities that care",
	"big visions",
	"discovering new music",
	"lofi hiphop",
	"people",
	"good food with friends",
	"soft tofu",
	"hot, black coffee",
	"winning with a team",
	"entrepreneurial spirit",
	"hustle and grit",
	"nice easy swims",
	"a good workout",
	"code that clicks",
	"nighttime city walks",
	"genuine smiles",
	"laughter",
	"quality work",
	"Super Smash Bros. Melee",
	"electronic music",
	"the piano",
	"classical music",
	"creative beats",
	"getting lost in a good book",
	"conquering challenges",
	"Fyodor Dostoevsky",
	"great leadership",
	"expressing voice through writing",
	"the power of communication",
	"personal development",
	"positive thinking",
	"strategic thinking",
	"game theory",
	"being in the present",
	"organizing",
	"clean design",
	"design thinking",
	"efficient processes",
	"chilled watermelon on a hot day",
	"empowering others",
	"fresh fruit",
	"lasting relationships",
	"the abundance mindset",
	"a good debate",
	"discovering new perspectives",
	"fresh bread",
	"cute dogs",
	"Mediterranean food",
	"live music",
	"Asian food"
];

let alreadyDisplayed = {};

function resetAlreadyDisplayed() {
	for (let i = 0; i < passions.length; ++i) {
		alreadyDisplayed[i] = false;
	}
}

resetAlreadyDisplayed();

window.setInterval(function() {
	//reset alreadyDisplayed vals if necessary
	let allUsed = true;
	for (key in alreadyDisplayed) {
		if (!alreadyDisplayed[key]) {
			allUsed = false;
			break;
		}
	}
	if (allUsed) {
		resetAlreadyDisplayed();
	}

	let idx = Math.floor(Math.random() * passions.length);
	while (alreadyDisplayed[idx]) {
		idx = Math.floor(Math.random() * passions.length);
	}
	$('#loverOf').text(passions[idx]);
	alreadyDisplayed[idx] = true;
}, 1800);

