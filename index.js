
import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

// This function works when the user Click on the icons (Like, Retweet, Reply)

document.addEventListener('click',function(e){
    if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handlereplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === ('tweet-btn')){
        handleTweetBtnClick()
    }
    
    
})

//  This function Works after the user the click icon and it increment and decrement the Likes 

function handleLikeClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){   
        return tweet.uuid === tweetId
    })[0]    
    
    if(targetTweetObj.isLiked){
        targetTweetObj.likes--
    }else{
        targetTweetObj.likes++
    }
    
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    
    render()
}




function handleRetweetClick(tweetId){
    const targetRetweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if(targetRetweetObj.isRetweeted){
        targetRetweetObj.retweets --
    }else{
        targetRetweetObj.retweets ++
    }
    targetRetweetObj.isRetweeted = !targetRetweetObj.isRetweeted
    render()
}

// this function show and hide the comments on tweets when user clicks on reply icon

function handlereplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtnClick(){
    const tweetInput = document.getElementById("tweet-input")
    if(tweetInput.value){
        tweetsData.unshift({
            handle: `Twimba`,
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
        tweetInput.value = ""
    }


}

// this is the main function which show the tweets and do the all process 

function getFeedHtml(){
    let feedHtml = ''
    tweetsData.forEach(function(tweet){

        let likeIconClass = ''
        let retweetIconClass = ''

        if(tweet.isLiked){
            likeIconClass = 'liked'
        }

        if(tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }

        let repliesHtml = ''

        tweet.replies.forEach(function(reply){
            repliesHtml += `<div class="tweet-reply">
                                <div class="tweet-inner">
                                    <img src= "${reply.profilePic}" class="profile-pic">
                                        <div>
                                            <p class="handle">${reply.handle}</p>
                                            <p class="tweet-text">${reply.tweetText}</p>
                                        </div>
                                    </div>
                            </div>`
        })


        feedHtml += `
                        <div class="tweet">
                            <div class="tweet-inner">
                                <img src="${tweet.profilePic}" class="profile-pic">
                                <div>
                                    <p class="handle">${tweet.handle}</p>
                                    <p class="tweet-text">${tweet.tweetText}</p>
                                    <div class="tweet-details">
                                        <span class="tweet-detail">
                                        <i class="fa-sharp fa-regular fa-comment-dots" 
                                        data-reply="${tweet.uuid}"
                                        ></i>
                                            ${tweet.replies.length}
                                        </span>
                                        <span class="tweet-detail">
                                        <i class="fa-solid fa-heart ${likeIconClass}"
                                        data-like="${tweet.uuid}"
                                        ></i>
                                            ${tweet.likes}
                                        </span>
                                        <span class="tweet-detail">
                                        <i class="fa-solid fa-retweet ${retweetIconClass}"
                                        data-retweet="${tweet.uuid}"
                                        ></i>
                                            ${tweet.retweets}
                                        </span>
                                    </div>   
                                </div>            
                            </div>
                            <div class="hidden" id="replies-${tweet.uuid}">
                                ${repliesHtml}
                            </div>  
                        </div>`

    })
        
    
    return feedHtml
}

function render(){
  document.getElementById("feed").innerHTML = getFeedHtml()
    
}
render()