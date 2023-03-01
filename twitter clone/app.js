import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
const tweetInput = document.getElementById('tweet-input')

// tweetBtn.addEventListener('click', function(){
//     console.log(tweetInput.value)
// })


document.addEventListener('click', function(e){
    if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    }

    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }

    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }

    else if(e.target.id === 'tweet-btn'){
        handleTweetBtn()
    }
})


// functions for incrementing or decrementing the like or retweet count

function handleLikeClick(tweetId){
    // console.log(tweetId)
    
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
        
    })[0]

    if(targetTweetObj.isLiked){
        targetTweetObj.likes--
        targetTweetObj.isLiked = false
    }
    else { 
        targetTweetObj.isLiked = false
        targetTweetObj.likes++
        targetTweetObj.isLiked = true
    }
    
    render()
    
}

function handleRetweetClick(tweetId){

    const targetRetweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if(targetRetweetObj.isRetweeted){
        targetRetweetObj.retweets--
        targetRetweetObj.isRetweeted = false
    }
    else {
        targetRetweetObj.isRetweeted = false
        targetRetweetObj.retweets++
        targetRetweetObj.isRetweeted = true
    }

    render()
}


function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')

}


function handleTweetBtn(){
    tweetsData.unshift({
        handle: `@Scrimba`,
        profilePic: `images/scrimbalogo.png`,
        likes: 0,
        retweets: 0,
        tweetText: tweetInput.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4()
    })

    render()
}


function getFeedHtml() {

    let feedHtml = ''
    


    // or alternative -  for(let tweet of tweetsData)
    tweetsData.forEach(function(tweet){ 

        // this renders the color for liking and retweeting
        let likeIconClass = ''
        let retweetIconClass = ''

        if(tweet.isLiked){
            likeIconClass = 'liked'
        }

        if(tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }

        let replyHtml = ''

        if(tweet.replies.length > 0){
            for(let reply of tweet.replies){
                replyHtml += `
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${reply.handle}</p>
                                <p class="tweet-text">${reply.tweetText}</p>
                            </div>
                    </div>
                </div>
                `
            }
        
        }


        feedHtml += `<div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                            <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                            <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                                ${tweet.retweets}
                            </span>
                    </div>
                </div>
            </div>
            <div class="hidden" id="replies-${tweet.uuid}">
                ${replyHtml}
            </div>
        </div>`
    })
    return feedHtml
}


function render() {
    const feed = document.getElementById('feed')
    feed.innerHTML = getFeedHtml()

}

render()