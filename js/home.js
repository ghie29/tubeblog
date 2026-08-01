async function renderHome(){


const app=document.getElementById("app");


const params=new URLSearchParams(
window.location.search
);


let page=parseInt(params.get("page")) || 1;



app.innerHTML="Loading movies...";



const response=await apiGet(
"/api/movies?page="+page
);



if(!response || !response.movies){

app.innerHTML="No movies found";

return;

}



let html="";



response.movies.forEach(movie=>{


html += `

<div class="movie">


<a href="?p=movie&slug=${encodeURIComponent(movie.slug)}">


<img src="${movie.cover_url}" loading="lazy">


<h3>${movie.title}</h3>


</a>


</div>


`;


});




let totalPages=Math.ceil(
response.total / response.limit
);



html += renderPagination(
page,
totalPages
);



app.innerHTML=html;



}




function renderPagination(current,total){


let html=`


<div class="pagination">


`;



if(current>1){

html += `

<a href="?page=${current-1}">
Prev
</a>

`;

}



let start=Math.max(
1,
current-2
);


let end=Math.min(
total,
current+2
);



if(start>1){

html+=`

<a href="?page=1">
1
</a>


<span>...</span>

`;

}



for(let i=start;i<=end;i++){


if(i===current){


html+=`

<span class="active">
${i}
</span>

`;


}else{


html+=`

<a href="?page=${i}">
${i}
</a>

`;


}


}




if(end<total){


html+=`

<span>...</span>


<a href="?page=${total}">
${total}
</a>

`;


}



if(current<total){


html+=`

<a href="?page=${current+1}">
Next
</a>

`;


}



html+=`

</div>

`;



return html;


}