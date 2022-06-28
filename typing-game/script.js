
const quotes = [
  "A este le dicen Zapata, si no la gana la empata.",
  "A los locos hay que darles siempre la razón.",
  "A caballo regalado no se le mira el diente.",
  "Perro que ladra no muerde.",
  "El que mucho abarca poco aprieta.",
  "El que no llora no mama y el que no afana es un gil.",
  "Del dicho al hecho hay un largo trecho.",
  "El que no corre, vuela.",
  "Donde hubo fuego cenizas quedan.",
  "El zorro pierde el pelo pero no las mañas.",
  "Cuando la limosna es grande hasta el santo desconfía.",
  "El que parte y reparte se queda con la mejor parte.",
  "Es la ley del embudo, la más linda con el más boludo.",
  "Casa con buen cimiento no teme a ningún viento.",
  "Siempre que llovió, paró.",
  "Unos calientan el agua y otros toman el mate.",
  "Por la plata baila el mono.",
  "Aunque la mona se vista de seda, mona se queda.",
  "No dejes para mañana lo que puedas hacer hoy.",
  "A quien madruga Dios le ayuda",
  "Quien tiene tienda, que la atienda y si no que la venda.",
  "Cocodrilo que duerme es cartera.",
  "A Seguro se lo llevaron preso.",
  "El que quiera celeste, que le cueste.",
  "Más vale trote que dure y no galope que canse.",
  "Más vale que sobre y no que falte.",
  "Una mano lava la otra y las dos lavan la cara.",
  ,
];

const tips = [
	'Toca INICIO para comenzar!',
	'No te olvides de los espacios',
	'Acordate de terminar con un punto',
	'Divertite!',
];
// array for storing the words of the current challenge
let words = [];
// stores the index of the word the player is currently typing
let wordIndex = 0;
// default value for startTime (will be set on start)
let startTime = Date.now();

// grab UI items

const tipElement = document.getElementById('tip');
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message')
const typedValueElement = document.getElementById('typed-value');

document.getElementById('start').addEventListener('click', function () {
	// get a quote
	const quoteIndex = Math.floor(Math.random() * quotes.length);
	const quote = quotes[quoteIndex];
	// Put the quote into an array of words
	words = quote.split(' ');
	// reset the word index for tracking
	wordIndex = 0;

	// UI updates
	// Create an array of span elements so we can set a class
	const spanWords = words.map(function(word) { return `<span>${word} </span>`});
	// Convert into string and set as innerHTML on quote display
	quoteElement.innerHTML = spanWords.join('');
	// Highlight the first word
	quoteElement.childNodes[0].className = 'highlight';
	// Clear any prior messages
	messageElement.innerText = '';

	// Setup the textbox
	// Clear the textbox
	typedValueElement.value = '';
	// set focus
	typedValueElement.focus();
	// set the event handler

	// Start the timer
	startTime = new Date().getTime();
});

typedValueElement.addEventListener('input', (e) => {
	// Get the current word
	const currentWord = words[wordIndex];
	// get the current value
	const typedValue = typedValueElement.value;

	if (typedValue === currentWord && wordIndex === words.length - 1) {
		// end of quote
		// Display success
		const elapsedTime = new Date().getTime() - startTime;
		const message = `Terminaste en ${elapsedTime / 1000} segundos.`;
		messageElement.innerText = message;
	} else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
		// end of word
		// clear the typedValueElement for the new word
		typedValueElement.value = '';
		// move to the next word
		wordIndex++;
		// reset the class name for all elements in quote
		for (const wordElement of quoteElement.childNodes) {
			wordElement.className = '';
		}
		// highlight the new word
		quoteElement.childNodes[wordIndex].className = 'highlight';
	} else if (currentWord.startsWith(typedValue)) {
		// currently correct
		// highlight the next word
		typedValueElement.className = '';
	} else {
		// error state
		typedValueElement.className = 'error';
	}
});