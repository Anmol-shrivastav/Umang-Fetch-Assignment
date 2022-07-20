var loader = document.querySelector(".spinner-border");
var input_id_field = document.querySelector("#id-input");
var submitBtn = document.querySelector("#submit-btn");
var output = document.querySelector(".display-output");
var postsData;
var commentsData;

loader.style.display = "block";   //Show loader

//get User id from url and set it in input field
var url = window.location.href;
var id = url.substring(url.indexOf('=') + 1);
input_id_field.value = id;

isPostsDataPresentInLocalStorage();

function isPostsDataPresentInLocalStorage(){
    const[flag, message] = isIdValid(id);
    if(flag === false){
        alert(message);
        return;
    }

    let data = localStorage.getItem("AllPosts");

    if(data === null){
        fetchUsersData().then((result) => {
            postsData = result;
            localStorage.setItem("AllPosts", JSON.stringify(result));
            
            loadUI(id);
        });
    }else{
        postsData = JSON.parse(localStorage.getItem("AllPosts"));
        loadUI(id);
    }
}

function isIdValid(id){
    if(id === null || id === undefined || id === ''){
        return [false, "Enter User Id."];
    }else if(id < 1 || id > 10){
        return [false, "User Id Can't be smaller than 1 and greater than 10."];
    }else{
        return [true, "Everything looks fine."]
    }
}

async function fetchUsersData() {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts").catch((error) => {
        output.innerHTML = "Error = " + error.message + "; Check Your internet connection and try again.";
    });
    return response.json();
}

function loadUI(id){
    loader.style.display = "none";   

    output.innerHTML = "";
     
    for(let i = (id - 1) * 10; i <= (id - 1) * 10 + 9; i++){
        let postContainer = document.createElement("div");
        postContainer.classList.add("post-container");
        postContainer.setAttribute("data-opened", false);

        let post = document.createElement("p");
        post.innerText = JSON.stringify(postsData[i]);

        postContainer.appendChild(post);
        output.appendChild(postContainer);

        postContainer.addEventListener("click", openComments);
    }
}

function openComments(e){
   let dataOpened = e.currentTarget.getAttribute('data-opened');

    if(dataOpened === "false"){
        e.currentTarget.dataset.opened = "true";
        isCommentFetched() === false && fetchComments(e);

    }else{
        e.currentTarget.dataset.opened = "false";
    }
}

function isCommentFetched(){
    return localStorage.getItem("AllComments") === null ? false : true;
}

async function fetchComments(e){
    let response = await fetch("https://jsonplaceholder.typicode.com/comments").catch((error)=>{
        
    });

    return response.json();
}



