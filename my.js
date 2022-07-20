var loading = document.querySelector(".spinner-border");
var output = document.querySelector(".display-output");
loading.style.display = "block";    //show loader
console.log("loading");

async function fetchUsersData(){
    let response = await fetch("https://jsonplaceholder.typicode.com/users").catch((error)=>{
        output.innerHTML = "Error = " + error.message +  "; Check Your internet connection and try again.";
        console.log(error.message);
    });
    return response.json();
}

fetchUsersData().then((result)=>{
    console.log("loaded");
    loading.style.display = "none";     //hide loader
    loadUI(result);
});


function loadUI(data){
    output.innerHTML = "";

    let rowCount = (data.length / 5) + (data.length % 5);

    for(let j = 0; j < rowCount; j++){
        let row = document.createElement("div");
        row.classList.add("row");

        for(let i = j*5; i<((j+1)*5); i++){
            let col = document.createElement("div");
            col.classList.add("col-lg-2", "col-md-6", "col-sm-6", "col-6", "user-container");
    
            let name = document.createElement("p");
            name.innerText = "Name : " + data[i].name;
            name.classList.add("name");
            
            let mail = document.createElement("p");
            mail.innerText = "Mail : " + data[i].email;
            mail.classList.add("mail");
    
            let postBtn = document.createElement("button");
            postBtn.innerText = "Post";
            postBtn.onclick = function () {location.href = "post.html?id=" + data[i].id;};

            let albumBtn = document.createElement("button");
            albumBtn.innerText = "Album";
            albumBtn.onclick = function () {location.href = "album.html"};

            let todosBtn = document.createElement("button");
            todosBtn.innerText = "Todos";
            todosBtn.onclick = function () {location.href = "todos.html";};

            let wrapper = document.createElement("div");
            wrapper.classList.add("wrapper");
            wrapper.append(name, mail, postBtn, albumBtn, todosBtn);
    
            col.appendChild(wrapper);

            row.appendChild(col);
        }
        output.appendChild(row);
    }
}