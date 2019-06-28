const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const TOYS_URL = "http://localhost:3000/toys"

// array of all Toys
let arrayToys = []

// creating HTML Tags
function code(HTMLTag) {
  return document.createElement(HTMLTag)
} 

// YOUR CODE HERE

document.addEventListener('DOMContentLoaded', getToys)

// getting all Toys from Server
function getToys() {
  fetch(TOYS_URL)
    .then(function(response){
      return response.json()
    }).then(function(toys){
      arrayToys = toys
      createToyCards(toys)
    })

  // Creating Toy Cards from Server
  function createToyCards(array){
    let cardID = 0
    array.forEach(function(toy){
      toyCard = code("div")
      toyCard.className = "card"
      toyCard.id = `${toy.id}`
      
      // Header
      toyHeader = code("h2")
      toyHeader.innerHTML = `${toy.name}`
      toyCard.append(toyHeader)

      // Image
      toyImage = code("img")
      toyImage.className = "toy-avatar"
      toyImage.src = `${toy.image}`
      toyCard.append(toyImage)

      // # of Likes
      toyLikes = code("p")
      toyLikes.className = "likes"
      toyLikes.innerHTML = `${toy.likes} likes`
      toyLikes.setAttribute("likesId", `${toyCard.id}`)
      toyCard.append(toyLikes)

      // Like Button
      toyButton = code("button")
      toyButton.className = "like-btn"
      toyButton.innerHTML = "Like"
      toyButton.setAttribute("buttonId", `${toyCard.id}`)
      toyButton.addEventListener('click', addLike)
      toyCard.append(toyButton)
      let i = toy.likes
      // adding Likes
      function addLike() {
        thisButton = this
        toyId = thisButton.parentElement.id
        i += 1

        // communicating with the server
        fetch(`${TOYS_URL}/${toyId}`,  {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            "likes": i
          })          
        })
        // reassigning new "likes" value
        let testing = thisButton.parentElement.querySelector(".likes")
        testing.innerHTML = `${i} likes`
      }

      document.getElementById("toy-collection").append(toyCard)})
      }
  }


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    let form = document.querySelector("input.submit")
    form.addEventListener('click', createToy)

    // Create New Toy
    function createToy() {
      // gets newly assigned values
      toyName = document.querySelector("input.input-text").value
      toyImage = document.querySelectorAll("input.input-text")[1].value
      
      // communicates to Server with POST
      fetch(TOYS_URL, {
        method: "POST",
        headers: {
          "Content-Type":"application/json", 
          "Accept":"application/json"
        },
        // converts data to JSON format - which API can read
        body: JSON.stringify({
        "name": toyName, 
        "image": toyImage,
        "likes": 0
      })
      })
    }

    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})




// OR HERE!
