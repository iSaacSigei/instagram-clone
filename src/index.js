// write your code here
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('form').addEventListener('submit', postComment)
});

let button = document.getElementById("like-button")
let result = document.getElementById("like-count")
let count = 0
button.addEventListener("click", () => {
  count += 1
  result.innerHTML = `${parseInt(count)} Likes`
})

function postComment(e) {
  e.preventDefault()
  let postedComment = {
    content: e.target.comment_input.value,
  }
  fetchComment(postedComment)
  analyzeData(postedComment)
}

function getData() {
  return fetch('http://localhost:3000/comments')
    .then(res => res.json())
    .then(dataObtain => analyzeData(dataObtain))

}

function fetchComment(postedComment) {
  return fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(postedComment)
    })
    .then(response => response.json())
    .then(comment => console.log(comment))


}
function deleteComment(delComment){
  return fetch(`http://localhost:3000/comments${id}`,{
    method:'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(postedComment)
  })
  .then(response => response.json())
  .then(commentDeleted => console.log(commentDeleted))
  }

function analyzeData(comments) {
  comments.forEach(comment => {
    const ul = document.getElementById('comments-list');
    const li = document.createElement('li')
    li.innerHTML += comment.content;
    ul.appendChild(li)
  })
}

function init() {
  getData()
}
init()
