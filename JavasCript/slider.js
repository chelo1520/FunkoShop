const sliderContainer = document.querySelector('.slider-container');
const slider = document.querySelector('.slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const cardsPerSlide = 3;
let currentSlide = 0;
let cards = [];

// Obtener los datos del archivo JSON
async function fetchCards() {
  try {
    const response = await fetch('/JavasCript/json-data.json');
    if (!response.ok) {
      throw new Error('Error al cargar los datos');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Generar las tarjetas a partir de los datos
function generateCards(cards) {
  const fragment = document.createDocumentFragment();
  cards.forEach(cardData => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img style="margin: auto;" width="100%" id="img-slider" src="${cardData.img}" alt="${cardData.title}">
      <p id="nuevo-slider">NUEVO</p>
      <div id="info-slider">
        <h2 class="serie-slider">${cardData.title}</h2>
        <p class="name-slider">${cardData.name}</p>
        <p class="precio-slider">${cardData.precio}</p>
        <p class="cuotas-slider">${cardData.cuotas}</p>
      </div>
    `;
    fragment.appendChild(card);
  });
  return fragment;
}

//Actualizar la posición del slider
function updateSliderPosition() {
  const cardWidth = sliderContainer.offsetWidth / cardsPerSlide;
  const translateX = -(currentSlide * cardWidth);
  slider.style.transform = `translateX(${translateX}px)`;
  if(currentSlide > 1){
    let cont = 10;
    cont+=6;
    slider.style.transform = `translateX(${translateX - cont}px)`;
  }
}


// Avanzar al siguiente slide
function nextSlide() {
  if (currentSlide <= cards.length - 4) {
     currentSlide++;
   }
  const cardWidth = sliderContainer.offsetWidth / cardsPerSlide;
  let translateX = -(currentSlide * cardWidth);
  updateSliderPosition();
}

// Retroceder al slide anterior
function prevSlide() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = 0;
  }
  updateSliderPosition();
}

// Inicializar el slider
async function initializeSlider() {
  cards = await fetchCards();
  const cardFragment = generateCards(cards);
  // slider.innerHTML = '';
  slider.appendChild(cardFragment);

  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  updateSliderPosition();
}

initializeSlider();


