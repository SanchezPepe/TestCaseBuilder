var Cases = {
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
         if(this.title === ''){
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
            //this.clear();
         }
      }
   },
   template: `,
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
   template: `
   <div style="height: 5%; display: flex; justify-content:space-between;">
      <div class="subtitle" style="margin: 0.5% 0.5% ">
         <strong>
            Test Case Builder
         </strong>
      </div>
      <div class="columns is-vcentered">
         <div>
            <a class="button is-small is-link">
               <strong>Save</strong>
            </a>
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


new Vue({
   el: '#app',
   data() {
      return {
         cases: []
      }
   },
   components: {
      'Case': Cases,
      'Navbar': navbar
   }
})


function dragstart_handler(ev) {
   // Set the drag's format and data. Use the event target's id for the data 
   ev.dataTransfer.setData("text", ev.target.value);
}

function dragover_handler(ev) {
   ev.preventDefault();
}

function drop_handler(ev) {
   ev.preventDefault();
   // Get the data, which is the id of the drop target
   var data = ev.dataTransfer.getData("text");
   ev.target.value = data;
   // Clear the drag data cache (for all formats/types)
   ev.dataTransfer.clearData();
}