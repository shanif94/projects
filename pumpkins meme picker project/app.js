import { catsData } from '/data.js'

const emotionRadioDiv = document.getElementById('emotion-radios')
const getImgBtn = document.getElementById('get-image-btn')
const gifOption = document.getElementById('gifs-only-option')
const memeModal = document.getElementById('meme-modal')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeCloseButton = document.getElementById('meme-modal-close-btn')



getImgBtn.addEventListener('click', renderCat)

function getMatchingCatsArray() {

    if(document.querySelector('input[type="radio"]:checked')){

        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifOption.checked

        const  matchingSelectedEmotion = catsData.filter(function(catEmotion){

            if(isGif === true){
                return catEmotion.emotionTags.includes(selectedEmotion) && catEmotion.isGif === true
            }
            else {
                return catEmotion.emotionTags.includes(selectedEmotion)
            }
            
        })
        return matchingSelectedEmotion
    }
}

// randomizes the meme images/gifs per cat mood.

function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    if(catsArray.length === 1){
        return catsArray[0]
    }
    else {
        const randomCatsArray = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomCatsArray]
    }
}

// renders cat images/gifs when get image button is clicked

function renderCat(){
    const catObject = getSingleCatObject()

    memeModalInner.innerHTML = `
    <img
    class="cat-img"
    src="./images/${catObject.image}"
    alt="${catObject.alt}">`
    memeModal.style.display = 'flex'
}

memeCloseButton.addEventListener('click', function(){
    memeModal.style.display = 'none'
})



emotionRadioDiv.addEventListener('change', highlightCheckedOption)

function highlightCheckedOption(e){
    const highlightRadio = document.getElementsByClassName('radio')

    for(let radio of highlightRadio){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
    
}



function getEmotionsArr(){

    const emotionsArr = []

    for(let cats of catsData){
        for(let emotion of cats.emotionTags){

            // if emotions array DOES NOT  include the emotion, only then do we push in the emotion into the the array
            if(!emotionsArr.includes(emotion)){
                emotionsArr.push(emotion)
            }
        }
    }
    return emotionsArr
}



function renderEmotionsRadios(cats){

    let radioItems = `` 

    const emotions = getEmotionsArr(cats)
    for(let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            name="cat-emotions"
            value="${emotion}">
        </div>`
    }
    emotionRadioDiv.innerHTML = radioItems
}


renderEmotionsRadios(catsData)