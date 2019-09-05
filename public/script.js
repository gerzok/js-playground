let question = 0;
let bar = 1;
const showQuestions = ['questionOne', 'questionTwo', 'questionThree', 'questionFour'];

const progressBar = () => {
  const percentage = bar * 100 / 4;
  const setWidth = document.querySelector('.progress-bar');
  setWidth.style.width = `${percentage}%`;
  bar++;
}

const restaurantsList = () => {
  const headers = {
    method: 'GET',
    headers: {
      'user-key': '0b64aba7bb4a689ed581a9e6971753f5',
      'Accept': 'application/json'
    }
  }

  const getRestaurantDetails = async(id) => {
    const res = await fetch(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${id}`, headers);
    const data = await res.json();
    return data;
  }

  const getCollection = async(city) => {
    const res = await fetch(`https://developers.zomato.com/api/v2.1/collections?city_id=${city}`, headers);
    const data = await res.json()
    return data;
  }

  getCollection(302)
  .then(data => {
    const limitData = data.collections.filter((el, index) => index < 3);
    const favoriteRestaurant = document.querySelector('.restaurant');
    favoriteRestaurant.innerHTML += '<h4>Select your favorite San Diego restaurant:</h4>';

    limitData.forEach(item => {
      const { title, image_url, description } = item.collection;
      favoriteRestaurant.innerHTML += `<div class="resbox">
        <div class="minicontainer">
          <div class="thumbnail">
            <img src="${image_url}" />
          </div>
          <div class="details">
            <div class="more">
              <div class="title">
                <h1>${title}</h1>
              </div>
              <div class="rating">
                <div class="boxr">
                  <span class="bign">4.7</span> <smal>/5</smal>
                </div>
                <p>243 votes</p>
              </div>
            </div>
            <div class="comments">
              ${description}
            </div>
            <div class="openfrom">
              <ul>
                <li>Open Now</li>
                <li>Mexican</li>
                <li>Costs $40 for two</li>
              </ul>
            </div>
          </div>
        </div>
      </div>`;
    });
  })
  .catch(err => console.log(err));
}

const nextQuestion = () => {
  const allQuestions = document.querySelectorAll('article');

  allQuestions.forEach(el => {
    if( el.getAttribute('id') === showQuestions[question] ) {
      el.classList.add('show');
    } else {
      if( el.classList.contains('show') )
        el.classList.remove('show');
    }
  });

  if( showQuestions[question] === 'questionFour' ) {
    const liElems = document.querySelectorAll('li');
    liElems[0].classList.remove('hide');
    liElems[1].classList.add('hide');
  }

  progressBar();
  question++;
};

const myResults = () => {
  const next = document.querySelector('#next');
  next.style.display = 'none';

  const palindrome = (str) => str.toLowerCase().split('').reverse().join('');

  // QUESTION ONE
  const questionOne = document.querySelector('#questionOne');
  const getSelectedAnswerOne = document.querySelector('#questionOne select').value;
  const getQuestionOneAnswers = document.querySelectorAll('#questionOne select option');
  const questionOneAnswers = Object.keys(getQuestionOneAnswers).map(el => getQuestionOneAnswers[el].text);
  questionOne.querySelector('select').remove();

  questionOneAnswers.forEach(el => {
    if(el === getSelectedAnswerOne) {
      questionOne.innerHTML += `<p><span class="highlighting">${el}</span></p>`
    }
  });

  questionOne.classList.add('mb40');

  // QUESTION TWO
  const questionTwo = document.querySelector('#questionTwo');
  const getSelectedAnswersTwo = document.querySelectorAll('#questionTwo select option:checked');
  const questionTwoAnswers = Object.keys(getSelectedAnswersTwo).map(el => getSelectedAnswersTwo[el].text);
  const correctAnswers = ['AngularJS', 'Ember', 'VueJS'];
  const validAnswers = correctAnswers.every(val => questionTwoAnswers.indexOf(val) !== -1);
  const iconTwo = validAnswers ? '&#10004;' : '&#10008;';
  questionTwo.querySelector('select').remove();

  questionTwo.innerHTML += `<p class="tick">${iconTwo}</p>`;

  questionTwo.classList.add('mb40');

  // QUESTION THREE
  const questionThree = document.querySelector('#questionThree');
  const getSelectedAnswerThree = questionThree.querySelector('input').value;
  const reverseSelectedAnswerThree = palindrome(getSelectedAnswerThree);
  const iconThree = getSelectedAnswerThree.toLocaleLowerCase() && getSelectedAnswerThree.toLocaleLowerCase() === reverseSelectedAnswerThree ? '&#10004;' : '&#10008;';

  questionThree.querySelector('input').remove();

  questionThree.innerHTML += `<p class="tick">${iconThree}</p>`;

  questionThree.classList.add('mb40');

  // QUESTION FOUR
  const questionFour = document.querySelector('#questionFour');
  const getSelectedAnswersFour = questionFour.querySelectorAll('input');
  const questionFourAnswers = Object.keys(getSelectedAnswersFour).map(el => getSelectedAnswersFour[el].value);
  const correctAnswer = questionFourAnswers.reduce((a, b) => a.toLocaleLowerCase() === palindrome(b));
  const iconFour = questionFourAnswers.length > 0 && correctAnswer ? '&#10004;' : '&#10008;';

  questionFourAnswers.forEach(val => {
    const input = questionFour.querySelector('input');
    input.outerHTML = `<p class="mb20">${val}</p>`;
  });

  questionFour.innerHTML += `<p class="mb40 tick">${iconFour}</p>`;

  document.querySelector('#wrapper').style.height = '100%';
  document.querySelector('footer').style.display = 'none';
  document.querySelector('#container').style.overflow = 'initial';

  const allQuestions = document.querySelectorAll('article');
  allQuestions.forEach(el => {
    el.classList.add('show');
  });

  restaurantsList();
}

nextQuestion();