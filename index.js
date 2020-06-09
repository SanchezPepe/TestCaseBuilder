var cases = {
   data() {
      return {
         title: '',
         extraData: '',
         preconditons: '',
         steps: '',
         results: ''
      }
   },
   props: {
      buttons: false
   },
   methods: {
      clear() {
         this.title = '',
         this.extraData = '',
         this.preconditons = '',
         this.steps = '',
         this.results = ''
      },
      submit() {
         if(this.title !== ''){
            let cases = this.$root.$data.cases.length;
            let newCase = {
               id: cases + 1,
               title: this.title,
               data: this.data,
               preconditons: this.preconditons,
               steps: this.steps,
               results: this.results
            }
            this.$root.$data.cases.push(newCase);
            this.clear();
         }
      }
   },
   template: `
      <div class="case has-text-left">
         <div class="field box has-text-centered">
            <div class="columns is-vcentered">
               <div class="column">
                  <input class="input" placeholder="Test case title" v-model="title" ondragstart="dragstart_handler(event);" draggable="true"></input>
               </div>
               <div class="column is-one-quarter" v-if='buttons'>
                  <button class="button is-small is-success is-rounded" @click="submit()">✔</button>
                  <button class="button is-small is-danger is-rounded" @click="clear()">❌</button>
               </div>
            </div>
         </div>

         <div class="field box">
            <label class="label">Data</label>
            <div class="control">
               <textarea class="textarea" rows="1" v-model='extraData' ondragstart="dragstart_handler(event);" draggable="true"></textarea>
            </div>
         </div>

         <div class="field box">
            <label class="label">Preconditons</label>
            <div class="control">
               <textarea class="textarea" rows="2" v-model="preconditons" ondragstart="dragstart_handler(event);" draggable="true"></textarea>
            </div>
         </div>

         <div class="field box">
            <label class="label">Steps</label>
            <div class="control">
               <textarea class="textarea" rows="4" v-model="steps" ondragstart="dragstart_handler(event);" draggable="true"></textarea>
            </div>
         </div>

         <div class="field box">
            <label class="label">Results</label>
            <div class="control">
               <textarea class="textarea" rows="2" v-model="results" ondragstart="dragstart_handler(event);" draggable="true"></textarea>
            </div>
         </div>
      <div>
   `
}

var navbar = {
   data() {
      return {
         title: ''
      }
   },
   methods: {
      save() {
         var content = JSON.stringify(this.$root.$data.cases);
         var fileName = this.title + '_TestCases.json';
         var contentType = 'text/plain';
         var a = document.createElement("a");
         var file = new Blob([content], {type: contentType});
         a.href = URL.createObjectURL(file);
         a.download = fileName;
         a.click();
     }
   },
   template: `
   <div style="height: 5%; display: flex; justify-content:space-between;">
      <div class="form subtitle" style="margin: 0.5% 0.5%; display:flex; vertical-align: middle;   ">
         <label class="label" style="white-space: nowrap; margin: 2% 6% 2% 2%">Testing: </label>
         <input v-model="title" class="input is-small" type="text" placeholder="Test name">
      </div>
      <div class="columns is-vcentered">
         <div>
            <button class="button is-small is-link" @click="save()">
               <strong>Export JSON</strong>
            </button>
         </div>
         <div id="file-js" class=" column file is-small has-name">
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

var card = {
   props:{
      title: String,
      extraData: String,
      preconditons: String,
      steps: String,
      results: String   
   },
   template: 
   `
   <div class="notification is-primary doneCase case" v-on:remove="cases.splice(index, 1)">
      {{ title }}
      <button class="delete" v-on:click="$emit(\'remove\')"></button>
   </div>
   `
}


new Vue({
   el: '#app',
   data() {
      return {
         cases: []
      }
   },
   components: {
      'Case': cases,
      'Navbar': navbar,
      'Card': card,
   }
})


function dragstart_handler(ev) {
   // Set the drag's format and data. Use the event target's id for the data 
   ev.dataTransfer.setData("text", ev.target.value);
}

function dragover_handler(ev) {
   ev.preventDefault();
}
