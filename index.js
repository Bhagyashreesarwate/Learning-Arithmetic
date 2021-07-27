import { maxNumber, utilityFunction } from './utils.js'

let currentQA = {
    num1: 0,
    num2: 0,
    num3: 0,
    correctAnswer: 0,
    randomAnswerSequnce: [0],
    currentPosition: -1

}

const numberOfAnswerOptions = 5;
const elemNum1 = document.getElementById("num1");
const elemNum2 = document.getElementById("num2");
const elemNum3 = document.getElementById("num3");


function setNewQuestionAns() {
    let num1 = getNum1()
    let num2 = getNum2()
    currentQA.num1 = num1
    currentQA.num2 = num2
    currentQA.correctAnswer = getAnswer(num1, num2)
    currentQA.randomAnswerSequnce = generateRandomSequence(numberOfAnswerOptions)
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

function showNextanswer() {
    if (currentQA.currentPosition >= currentQA.randomAnswerSequnce.length - 1) {
        console.error("Already at last position")
        return false
    }


    currentQA.currentPosition = currentQA.currentPosition + 1
    elemNum3.value = currentQA.randomSequence[currentQA.currentPosition]
    return true
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



let input = document.getElementById("num3")
input.addEventListener("keyup", function(KeyboardEvent) {
    if (KeyboardEvent.keyCode === 13) {
        stopTimer()
        checkAnswer()
        startNewQuestion()
    }

})


function checkAnswer() {
    if (currentQA.correctAnswer = currentQA.num3) {
        alert("got correct answer")
    } else {
        alert("got wrong answer")
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
const timeToShowAnswer = 10;

let iscurrentoptionLast = false;
let isCurrentOptionCorrect = false;

function answerTimerHandler() {

    console.log("got timer event")
    stopTimer()
    if (iscurrentoptionLast) {
        console.log("last option question over")
        alert("no answer selected, all options over")
        startNewQuestion()
        return true
    }

    if (isCurrentOptionCorrect) {
        console.log("correct answer missed")
        alert("correct answer missed")
        startNewQuestion()
        return true
    }

    console.log("show next option")
    showNextoption()
        // resetTimer()
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
            // console.log(`selectedNumber = ${selectedNumber} element = ${element}`)
        originalList = removeElementFromList(originalList, selectedNumber)
        randomSequence.sequence.push(element)
            // console.log(originalList)

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

// function checkAnswerOption() {
//     if (isCurrentOptionCorrect()) {
//         alert("you missed correct answer")
//         return false

//     }
//     if (iscurrentoptionLast()) {
//         alert("you did not guess any answer")
//         return false
//     }
//     return true

// }


window.addEventListener('load', (event) => {
    console.log('Page loaded');
    setNewQuestionAns()
    answerTimer = new Timer(answerTimerHandler, timeToShowAnswer * 1000);
    showNewQuestion()


});