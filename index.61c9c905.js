!function(){function n(n){return fetch(function(n){var t=new URLSearchParams({key:"37132018-4dabe95031a531ae3f58f9204",q:n,image_type:"photo",orientation:"horizontal",safesearch:"true"}).toString();return"".concat("https://pixabay.com/api/","?").concat(t)}(n)).then((function(n){return n.json()})).then((function(n){return console.log(n)}))}document.getElementById("search-form").addEventListener("submit",(function(t){t.preventDefault(),console.dir(this);var e=this.searchQuery.value;console.log("input",e),n(e).then((function(n){return function(n){console.log(n)}(n)}))}))}();
//# sourceMappingURL=index.61c9c905.js.map
