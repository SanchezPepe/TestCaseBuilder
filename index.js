var Cases = {
   template: `
      <div class="case box">
         <strong>Data</strong>
         <textarea class="textarea is-small" rows="7"></textarea>
         <strong class="">Preconditions</strong>
         <textarea class="textarea is-small" rows="7"></textarea>
         <strong class="">Steps</strong>
         <textarea class="textarea is-small" rows="7"></textarea>
         <strong class="">Results</strong>
         <textarea class="textarea is-small" rows="7"></textarea>
      </div> `
}

var navbar = {
   template: `
      <div style="height: 5%; display: flex; justify-content:space-between;">
         <div class="subtitle">
            Test Case Builder
         </div>

         <div class="buttons">
            <a class="button is-link">
               <strong>Import</strong>
            </a>
            <a class="button is-link">
               <strong>Save cases</strong>
            </a>
         </div>
      </div> `
}

new Vue({
   el: '#app',
   components: {
      'Case': Cases,
      'Navbar' : navbar
   }
})




var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
   showDivs(slideIndex += n);
}

function showDivs(n) {
   var i;
   var x = document.getElementsByClassName("mySlides");
   if (n > x.length) {
      slideIndex = 1
   }
   if (n < 1) {
      slideIndex = x.length
   }
   for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
   }
   x[slideIndex - 1].style.display = "block";
}