var Cases = {
   template: 
   `
      <div class="case has-text-left">
      <div class="field box">
         <label class="label">Data</label>
         <div class="control">
            <textarea class="textarea" rows="1"></textarea>
         </div>
      </div>
      <div class="field box">
         <label class="label">Preconditons</label>
         <div class="control">
            <textarea class="textarea" rows="2"></textarea>
         </div>
      </div>
      <div class="field box">
         <label class="label">Steps</label>
         <div class="control">
            <textarea class="textarea" rows="7"></textarea>
         </div>
      </div>
      <div class="field box">
         <label class="label">Results</label>
         <div class="control">
            <textarea class="textarea" rows="3"></textarea>
         </div>
      </div>
      <div>
   `
}

var navbar = {
   template: `
   <div style="height: 5%; display: flex; justify-content:space-between;">
      <div class="subtitle">
         Test Case Builder
      </div>
      <div class="columns is-vcentered">
         <div>
            <a class="button is-small is-link">
               <strong>Save</strong>
            </a>
         </div>
         <div id="file-js-example" class=" column file is-small has-name">
            <label class="file-label">
               <input class="file-input" type="file" name="resume">
               <span class="file-cta">
                  <span class="file-icon">
                     <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">
                     Cargar archivo
                  </span>
               </span>
               <span class="file-name">
                  N/A
               </span>
            </label>
         </div>
      </div>
   </div>
   `
}

new Vue({
   el: '#app',
   components: {
      'Case': Cases,
      'Navbar': navbar
   }
})


const fileInput = document.querySelector('#file-js-example input[type=file]');
fileInput.onchange = () => {
   if (fileInput.files.length > 0) {
      const fileName = document.querySelector('#file-js-example .file-name');
      fileName.textContent = fileInput.files[0].name;
   }
}