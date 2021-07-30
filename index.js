import { maxNumber, utilityFunction } from './utils.js'

let currentQA = {
    num1: 0,
    num2: 0,
    num3: 0,
    correctAnswer: 0,
    randomAnswerSequnce: [0],
    currentPosition: -1

}


const elemNum1 = document.getElementById("num1");
const elemNum2 = document.getElementById("num2");
const elemNum3 = document.getElementById("num3");


function setNewQuestionAns() {
    let num1 = getNum1()
    let num2 = getNum2()
    currentQA.num1 = num1
    currentQA.num2 = num2
    currentQA.correctAnswer = getAnswer(num1, num2)
    currentQA.randomAnswerSequnce = getrandomOptionList(currentQA.correctAnswer)
    currentQA.currentPosition = -1
    console.log(JSON.stringify(currentQA))
}

function showNewQuestion() {
    elemNum1.value = currentQA.num1
    elemNum2.value = currentQA.num2
    let num3 = currentQA.randomAnswerSequnce[0]
    currentQA.currentPosition = 0
    currentQA.num3 = num3
    elemNum3.value = num3
    resetTimer()
}

function showNextOption() {
    currentQA.currentPosition = currentQA.currentPosition + 1
    currentQA.num3 = currentQA.randomAnswerSequnce[currentQA.currentPosition]
    elemNum3.value = currentQA.randomAnswerSequnce[currentQA.currentPosition]
    console.log("showing next option " + elemNum3.value)
    resetTimer()
}

function getNum1() {
    return Math.floor(Math.random() * 9) + 1;
}

function getNum2() {
    return Math.floor(Math.random() * 9) + 1;
}

function getAnswer(num1, num2) {
    let answer = num1 + num2
    console.log(`answer = ${answer}`)
    return answer
}

const passSound = 'https://www.soundjay.com/misc/bell-ringing-04.mp3'
const failSound = 'https://www.soundjay.com/misc/fail-buzzer-03.mp3'

const audioPass = new Audio(passSound);
const audioFail = new Audio(failSound);

function playPassFail(status) {

    if (status) {
        audioPass.play()
    } else {
        audioFail.play()
    }
    console.log("playing audio for - " + (status));
}



let input = document.getElementById("num3")
input.addEventListener("keyup", function(KeyboardEvent) {
    if (KeyboardEvent.keyCode === 13) {
        stopTimer()
        checkAnswer()
    }

})


function checkAnswer() {
    if (currentQA.correctAnswer == currentQA.num3) {
        playPassFail(true)
        setTimeout(function() {
            // alert("Congratulations! You got the correct answer");
            modalBox()
        }, 200)
    } else {
        playPassFail(false)
        setTimeout(function() {
            // alert("Oops! You got the wrong answer");
            modalBox()
        }, 200)
    }
}

function startNewQuestion() {
    setNewQuestionAns()
    showNewQuestion()
    resetTimer()
}

function Timer(fn, t) {
    var timerObj = setInterval(fn, t);

    this.stop = function() {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }

    // start timer using current settings (if it's not already running)
    this.start = function() {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    }

    // start with new or original interval, stop current interval
    this.reset = function(newT = t) {
        t = newT;
        return this.stop().start();
    }
}

let answerTimer = null;
const timeToShowAnswer = 8;


function answerTimerHandler() {

    stopTimer()

    if (currentQA.num3 == currentQA.correctAnswer) {
        console.log("correct answer missed")
        playPassFail(false)
        setTimeout(function() {
            let modal = document.getElementById("myModal")
            console.log("this is modal box")
            let span = document.getElementById("close");
            document.getElementById("modalContent").innerText = "You missed the correct answer"
            modal.style.display = "block";
            span.style.display = "block";
            span.onclick = function() {
                    modal.style.display = "none";
                    startNewQuestion();
                }
                // alert("correct answer missed")
        }, 200)

        return true
    }

    if (currentQA.currentPosition >= currentQA.randomAnswerSequnce.length - 1) {
        console.log("last option question over")
        alert("You did not select any option!")
        startNewQuestion()
        return true
    }

    showNextOption()



}

function stopTimer() {
    console.log("stop timer")
    if (answerTimer) {
        answerTimer.stop()
    } else {
        console.log("stopTimer: timer not set")
    }
}

function resetTimer() {
    console.log("reset timer")
    if (answerTimer) {
        answerTimer.reset()
    } else {
        console.log(" resetTimer: timer not set")
    }
}

function generateRandomSequence(numberInList) {
    let randomSequence = {
        "sequence": []
    }

    let originalList = []
    for (let i = 1; i <= numberInList; i++) {
        originalList.push(i)
    }

    for (let i = 1; i <= numberInList; i++) {

        let selectedNumber = Math.floor(Math.random() * originalList.length)
        let element = originalList[selectedNumber]
        originalList = removeElementFromList(originalList, selectedNumber)
        randomSequence.sequence.push(element)


    }

    console.log("final sequence:" + JSON.stringify(randomSequence))
    return randomSequence.sequence
}

function removeElementFromList(aList, index) {
    let myValue = aList[index]

    function removeNumber(num) {
        return num != myValue
    }

    let filteredList = aList.filter(removeNumber)
    return filteredList

}

function getAnswerlist(correctAnswer) {
    let options = [correctAnswer, correctAnswer - 1, correctAnswer + 1, correctAnswer + 2, correctAnswer - 2]
    return options

}

function getrandomOptionList(correctAnswer) {
    let answerList = getAnswerlist(correctAnswer)
    let randomlist = generateRandomSequence(answerList.length)
    console.log("randomlist" + randomlist)
    let randomAnswerList = []
    randomlist.forEach(element => {
        randomAnswerList.push(answerList[element - 1])
    });
    return randomAnswerList
}

function modalBox() {
    let modal = document.getElementById("myModal")
    console.log("this is modal box")
    let span = document.getElementById("close");

    if (currentQA.num3 == currentQA.correctAnswer) {
        document.getElementById("modalContent").innerText = "Congratulations! You got the correct answer"
        modal.style.display = "block";
        span.style.display = "block";
        span.onclick = function() {
            modal.style.display = "none";
            startNewQuestion()
        }

    } else {
        document.getElementById("modalContent").innerText = "Oops! You got the wrong answer \n Correct answer is  " + currentQA.correctAnswer
        modal.style.display = "block";
        span.style.display = "block";
        span.onclick = function() {
            modal.style.display = "none";
            startNewQuestion()
        }

    }
}



window.addEventListener('load', (event) => {
    console.log('Page loaded');
    setNewQuestionAns()
    answerTimer = new Timer(answerTimerHandler, timeToShowAnswer * 1000);
    showNewQuestion()


});