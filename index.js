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

function showNextAnswer() {
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


function startNewQuestion() {
    setNewQuestionAns()
    setTimer()
    setKeyBoardHandler()
}

function setTimer() {

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


function answerTimerHandler() {

    console.log("got timer event")
    answerTimer.stop()
    let continueTimer = checkAnswerOption()

    if (continueTimer) {
        answerTimer.reset()
        console.log("set timer for next answer")
    }

    console.log("done with correct option")


}

function checkAnswerOption() {
    if (isCurrentOptionCorrect()) {
        alert("you missed correct answer")
        return false
    }
    if (iscurrentoptionLast()) {
        alert("you did not guess any answer")
        return false
    }
    return true

}

window.addEventListener('load', (event) => {
    console.log('Page loaded');
    setNewQuestionAns()
});