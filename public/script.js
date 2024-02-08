async function getDinoImage() {
	const response = await fetch('/dinosaurimage'); // fetching data from route
	const dinoImage = await response.json();
	console.log(dinoImage);

	let img = document.createElement('img'); 
	img.id = 'dinoImage';
	img.src = dinoImage[0].urls.regular;
	img.alt = 'dino-image';
	document.querySelector('#dinoWrapper').appendChild(img);
}


async function getDinoName() {
	const response = await fetch('/dinosaur');
	const data = await response.json();
	let dinoName = data[0].join(' ');
	console.log(dinoName);

	let dinoNameDiv = document.createElement('div');
	dinoNameDiv.id = 'dinoName';
	dinoNameDiv.textContent = dinoName;
	document.querySelector('#dinoWrapper').appendChild(dinoNameDiv);

	getDinoImage();
}


document.querySelector('#btnLoad').addEventListener('click', () => {
	// if there is a #dinoName initialize , it removes it
	//preventing it from duplicate
	if (document.querySelector('#dinoName') !== null) {
		document.querySelector('#dinoName').remove();
	}
	if (document.querySelector('#dinoImage') !== null) {
		document.querySelector('#dinoImage').remove();
	}
	getDinoName();
});