let input=document.querySelector(".search").getElementsByTagName("input")[0];
let Button=document.querySelector(".btn");

const API_KEY = "faaa5355"; // Replace with your actual API key
const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&`;
const list=document.querySelector(".add_list")
const home=document.querySelector(".home");
const Favourite=document.querySelector(".Favourite");
let favourite=[];

const create=function (value){
    let div=document.createElement("div");
                div.classList.add("box");

                /* Create img Element in the div */
              let img=document.createElement("img");
                img.src=value.Poster;

                /* Create P for Movie Name */
                let p=document.createElement("p");
                p.innerHTML=value.Title;

                /* Create P for Movie release year */
                let p1=document.createElement("p");
                p1.innerHTML=value.Year;

                /* Create Favourite Button  */
                let img1=document.createElement("img");
                img1.id = "img1";
                img1.src=`${"image/star.png"}`;
                div.append(img);
                div.append(p);
                div.append(p1);
                div.append(img1);
                list.append(div);

                img1.addEventListener("click",()=>{
                    input.value='';
                    const currentSrc = img1.src.split('/').pop();
                    if(currentSrc==="click.png"){
                        img1.src=`${"image/star.png"}`

                        /* POSTER OF REMOVE FAVOURITE */
                        let img=img1.parentElement.querySelector("img").src;
                        favourite.forEach(ele=>{
                            /* POSTER OF all FAVOURITE */
                            let img2=ele.querySelector("img").src;
                            if(img2===img){
                                /* Find the index of the ele */
                                let index = favourite.indexOf(ele); 
                                if(index!==-1){
                                    favourite.splice(index,1);
                                }
                            }
                        })
                    }else{
                        favourite.push(img1.parentElement);
                    img1.src=`${"image/click.png"}`
                    

                    }
                })
}
async function fetchMoviesByTitle(title) {
    list.innerHTML='';
    const url = `${BASE_URL}s=${encodeURIComponent(title)}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "True") {
            console.log("Movies found:", data.Search);

            data.Search.forEach(value => {

               create(value);
            });
        } else {
            input.value='';
            alert("Error:  No Movie With the name of  '"+ title +"'")
        }
    } catch (error) {
        input.value='';
        console.error("Fetch error:", error);
    }
}

// Example usage:
Button.addEventListener("click",()=>{
    home.style.color="white";
    Favourite.style.color="white";
    fetchMoviesByTitle(input.value);
})

home.addEventListener("click",()=>{
    home.style.color="red";
    Favourite.style.color="white";
    list.innerHTML="";
    input.value="";
});

Favourite.addEventListener("click",()=>{
    Favourite.style.color="red";
    home.style.color="white";
    list.innerHTML="";
    favourite.forEach(ele=>{
        list.append(ele);
    })
    
})



