const ApiUrl="https://api.github.com/users/";
const main=document.querySelector(".main")
const getUser=async(username)=>{
    try{
    console.log("Fetching data for:", username); 
  const response=await fetch(`https://api.github.com/users/${username}`)
  if(response.status==404){
    main.innerHTML=`<h2>User Not Found</h2>`;
    return;
  }
  if(response.status==403){
    main.innerHTML=`<h2>limit exceed</h2>`;
    return;
  }
  const data= await response.json();
  console.log(data);
  const card=`    <div class="card">
            <div>
                <img src="${data.avatar_url}" alt="">
            </div>
            <div class="user">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>
                <ul class="info">
                    <li>### <strong>${data.followers}</strong></li>
                    <li>### <strong>${data.following}</strong></li>
                    <li>### <strong>${data.public_repos}</strong></li>
                </ul>
                <div id="repos">
                  

                </div>
            </div>
        </div> `;
        if (main) {
            main.innerHTML = card;
            getRepo(username);
          } else {
            console.error("Element with class 'main' not found.");
          }
        }
        catch{
            console.log("error");
        }
}

const getRepo=async (username)=>{
    const repos=document.querySelector("#repos");
   const response=await fetch(`https://api.github.com/users/${username}/repos`);
   const data=await response.json();
   console.log(data);
   if (Array.isArray(data)) {
    data.forEach(item => {
        const elem = document.createElement("a");
        elem.classList.add("repo");
        elem.href = item.html_url;
        elem.innerText = item.name;
        elem.target = "_blank";
        repos.appendChild(elem);
    });
}
}
const formSubmit=()=>{
    
    const searchbox=document.querySelector("#search");
    if(searchbox.value){
        console.log(searchbox.value)
        getUser(searchbox.value);
        searchbox.value="";
        return false;
    }
  
   
}

