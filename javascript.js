//GLOBAL VARIABLES
let correctsAnswers = [];

//OBTAIN CATEGORIES OF TRIVIA API 
function getCategory() {
  fetch(`https://opentdb.com/api_category.php`)
    .then(response => response.json())
    .then(data => {
      category(data.trivia_categories)
    });
}

// OBTAIN CATEGORIES IN INPUT CATEGORY-TYPE
function category(categories) {
  const categoriesHTML = document.getElementById('category-type');
  categories.forEach(category => {
    const categoryType = `<option value="${category.id}">${category.name}</option>`;
    categoriesHTML.innerHTML += categoryType;
  });
}

// OBTAIN VALUE FOR EACH OPTION IN FORM CONTROL 
function getQuestions() {
    const questionsQuantity = document.getElementById('questions-number').value;
    const categorySelect = document.getElementById('category-type').value;
    const difficulty = document.getElementById('difficulty').value;
    const type = document.getElementById('type').value;
    fetch(`https://opentdb.com/api.php?amount=${questionsQuantity}&category=${categorySelect}&difficulty=${difficulty}&type=${type}`)
        .then(response => response.json())
        .then(data => {
        // The value selected in every option, pass as a parameter to printCards
            printCards(data.results)
        });
}

//OBTAIN ALL ANSWERS IN A RANDOM POSITION
function returnAnswersHTML(correct, incorrects, indexCard) {
    // Introduce correct and incorrects answers in array incorrects
    incorrects.push(correct);
    // Sort to show answers in a random position
    incorrects.sort(function () { return Math.random() - 0.5 });
    // Put every answer with a checkbox
    let answersHTML = '';
    incorrects.forEach((incorrect, index) => {
        answersHTML += `<div class="form-check">
                            <input class="form-check-input" type="radio" name="radios-${indexCard}" id="radio${indexCard}-${index}" value="${incorrect}" required>
                            <label class="form-check-label" for="radio${indexCard}-${index}">${incorrect}</label>
                        </div>`;
    });
    return answersHTML;
}

//ESTRUCTURE OF EACH CARD INFORMATION 
function returnCardHTML(q, indexCard) {
    const card = `<div class="card">
                    <div class="card-body">
                    <h6 class="card-subtitle">${q.question}</h6>
                        ${returnAnswersHTML(q.correct_answer, q.incorrect_answers, indexCard)}           
                    </div>
                </div>`;
    return card;
}

// OBTAIN CORRECT ANSWER ARRAY
function correctAnswers(questions) {
    let correctAns = [];
    questions.forEach(question => correctAns.push(question.correct_answer));
    return correctAns;
}

//DISPLAY ALL CARDS
function printCards(questions) {
  //To show button Results when display all cards
    btn = document.getElementById('btn-results');
        if (btn.style.display === 'none') {
            btn.style.display = 'block';
        }
  //To hide button Results if the section selected is empty, and notice to user with an alert
    const container = document.getElementById('container-cards');
    container.innerHTML = '';
    if (questions.length === 0) {
        if (btn.style.display === 'block') {
            btn.style.display = 'none';
        }
        container.innerHTML = `<div class="alert" role="alert">
                                    ¡Try again, this section is empty!
                                </div>`;
      } else {
      // To show container with all the question and answers cards
        container.classList.add("container-cards")
        container.innerHTML = `<h5 class="card-title">${questions[0].category}</h5>`
        questions.forEach((question, indexCard) => {
            const card = returnCardHTML(question, indexCard);
            container.innerHTML += card;                  
          });
        }
// To get an array of correct answers only of the questions displayed with this function
correctsAnswers = correctAnswers(questions);
}

// OBTAIN HOW MANY CORRECT ANSWERS USER HAS
function results() {
    let rights = 0;
    for (let i = 0; i < correctsAnswers.length; i++) {
        const options = document.getElementsByName(`radios-${i}`);
        options.forEach(option => {
            if (option.checked) {
                if (option.value == correctsAnswers[i]) {
                    rights++
                }
            };
        });
    };
    if (rights === correctsAnswers.length) {
        alert('CONGRATULATIONS! You have ' + rights + ' of ' + correctsAnswers.length + ' answers.');
    }
    if (rights < correctsAnswers.length) {
        alert('¡PLAY AGAIN! You are rigth in ' + rights + ' of ' + correctsAnswers.length + ' anwers.');
    }
}

getCategory();
window.category = category

