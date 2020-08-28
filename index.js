var cases = {
   data() {
      return {
         title: '',
         extraData: '',
         preconditons: '',
         steps: '',
         results: '',
         isDraggable: false,
         dataField: false
      }
   },
   props: {
      buttons: false,
      isUpdate: false,
      titleSection: '',
      enableComments: false,
      id: Number
   },
   created(){
      if(this.id !== undefined){
         let data;
         let cases = this.$root.$data.cases;          
         for(let i = 0; i < cases.length; i++){
            if(cases[i].id === this.id){
               data = cases[i];
               break;
            }
         }
         this.title = data.title;
         this.extraData = data.data;
         this.preconditons = data.preconditons;
         this.steps = data.steps;
         this.results = data.results;
      }
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
         if (this.title !== '') {
            let cases = this.$root.$data.cases;          
            let newCase = {
               id: (cases.length > 0) ? cases[cases.length-1].id + 1 : 1,
               title: this.title,
               data: this.extraData,
               preconditons: this.preconditons,
               steps: this.steps,
               results: this.results
            }
            this.$root.$data.cases.push(newCase);
         }
      },
      updateCase() {
         let cases = this.$root.$data.cases;
         let index;
         for(index = 0; index < cases.length; index++){
            if(cases[index].id === this.id){
               break;
            }
         }
         let modifedCase = {
            id: this.id,
            title: this.title,
            data: this.extraData,
            preconditons: this.preconditons,
            steps: this.steps,
            results: this.results
         }
         console.log(this.id, index, modifedCase);
         Vue.set(cases, index, modifedCase);
         this.$parent.toggleModal();
      },
   },
   template: `
   <div class="case has-text-left" @keyup.alt.71="isUpdate ? updateCase() : submit()">
      <div class="box">
         <label class="label has-text-centered">{{ titleSection }}</label>
         <div class="field bottomMargin" v-bind:class="{ 'has-addons' : this.buttons }">
            <div class="control is-expanded">
               <textarea class="textarea is-small" rows="9" placeholder="Test cases to be documented" v-if="enableComments"></textarea>
               <input class="input is-small" placeholder="Test case title" v-model="title" v-else></input>
            </div>
            <div class="control" v-if="buttons">
               <button class="button is-success is-small" v-if="isUpdate" @click="updateCase()" tabindex="-1">✔️</button>
               <button class="button is-success is-small" v-else @click="submit()" tabindex="-1">✔️</button>
            </div>
            <div class="control" v-if="buttons">
               <button class="button is-danger is-small" @click="clear()" tabindex="-1">❌</button>
            </div>
         </div>

         <div>
            <label class="checkbox control">
               <input type="checkbox" v-model="isDraggable">
               Drag & Drop
            </label>
            |
            <label class="checkbox control">
               <input type="checkbox" v-model="dataField">
               Enable Data Input
            </label>
         </div>
      </div>

      <div class="field box" v-if="dataField">
         <label class="label">Data</label>
         <div class="control">
            <textarea class="textarea is-small" rows="2" v-model='extraData' ondragstart="dragstart_handler(event);" :draggable="isDraggable"></textarea>
         </div>
      </div>

      <div class="field box">
         <label class="label">Preconditons</label>
         <div class="control">
            <textarea class="textarea is-small" rows="4" v-model="preconditons" ondragstart="dragstart_handler(event);" :draggable="isDraggable"></textarea>
         </div>
      </div>

      <div class="field box">
         <label class="label">Steps</label>
         <div class="control">
            <textarea class="textarea is-small" rows="10" v-model="steps" ondragstart="dragstart_handler(event);" :draggable="isDraggable"></textarea>
         </div>
      </div>

      <div class="field box">
         <label class="label">Results</label>
         <div class="control">
            <textarea class="textarea is-small" rows="5" v-model="results" ondragstart="dragstart_handler(event);" :draggable="isDraggable"></textarea>
         </div>
      </div>
   </div>
   `
}

var optionsMenu = {
   data() {
      return {
         title: '',
         fileName: '',
         file: '',
         active: false,
         notes: '',
         loadFunction: 
         `
         function loadCases() {
            let timeout = 1000;
            var testCase;
            for (let i = 0; i < data.length; i++) {
               // Add new case button
               setTimeout(function () {
                  testCase = data[i];
                  console.log(testCase);
                  document.getElementsByClassName("link")[2].click();
               }, ((i * 7) + 1) * timeout);

               // Title input
               setTimeout(function () {
                  document.getElementsByClassName("form-control-large")[0].value = testCase.title;
               }, ((i * 7) + 2) * timeout);

               // Submit new case
               setTimeout(function () {
                  document.getElementsByClassName("icon-button-accept")[0].click();
               }, ((i * 7) + 3) * timeout);

               // Open the new case
               setTimeout(function () {
                  var newCase = document.getElementsByClassName("caseRow");
                  newCase = newCase[newCase.length - 1];
                  //Open edit panel
                  newCase.getElementsByTagName("a")[5].click();
               }, ((i * 7) + 4) * timeout);

               // Hit panel edit button
               setTimeout(function () {
                  document.getElementsByClassName("button-edit")[1].click();
               }, ((i * 7) + 5) * timeout);

               // Fill test case info
               setTimeout(function () {
                  document.getElementById("custom_test_data").value = testCase.data;
                  document.getElementById("custom_preconds").value = testCase.preconditons;
                  document.getElementById("custom_steps").value = testCase.steps;
                  document.getElementById("custom_expected").value = testCase.results;
               }, ((i * 7) + 6) * timeout);

               // Save test case
               setTimeout(function () {
                  document.getElementById("accept").removeAttribute("disabled");
                  document.getElementById("accept").click();
               }, ((i * 7) + 7) * timeout);
            };
         }
         setTimeout(function () {
            alert("Test cases uploaded");
         }, ((data.length * 7) + 82) * timeout);
         `
      }
   },
   methods: {
      modal() {
         this.active = !this.active;
      },
      exportCases() {
         if (this.title === ''){
            alert("Add the test title")
         } else if (this.$root.$data.cases.length !== 0) {
            this.$root.$data.cases.push(this.notes);
            var content = JSON.stringify(this.$root.$data.cases);
            var fileName = this.title + '_TestCases.json';
            var contentType = 'text/plain';
            var a = document.createElement("a");
            var file = new Blob([content], {
               type: contentType
            });
            a.href = URL.createObjectURL(file);
            a.download = fileName;
            a.click();
         } else {
            alert("No cases")
         }
      },
      fileUpload(event) {
         this.fileName = event.target.files[0].name;
         if (event.target.files.length > 0 && this.fileName.includes('json')) {
            this.title = this.fileName.substring(0, this.fileName.indexOf('_'));
            this.file = event.target.files[0];
            var reader = new FileReader();
            reader.onload = this.onReaderLoad;
            reader.readAsText(event.target.files[0]);
         } else {
            alert("Error when loading the file, verify that it is JSON type");
         }
      },
      onReaderLoad(event) {
         var obj = JSON.parse(event.target.result);
         this.notes = obj.pop(); //Get the notes of the ticket
         this.$root.$data.cases = obj;
      },
      selectText(element) {
         var range;
         if (document.selection) {
           // IE
           range = document.body.createTextRange();
           range.moveToElementText(element);
           range.select();
         } else if (window.getSelection) {
           range = document.createRange();
           range.selectNode(element);
           window.getSelection().removeAllRanges();
           window.getSelection().addRange(range);
         }
       },
      copyToClipboard() {
         this.selectText(this.$refs.codeText);
         document.execCommand("copy");
         alert("Copied to clipboard");
      }
   },
   template: `
      <div class="">
         <div class="columns box case">
            <div class="column">
               <label class="label">Testing</label>
               <input class="input is-small" type="text" v-model="title" placeholder="Ticket number">
            </div>
            <div class="column" style="margin: 12px !important;">
               <div class="columns">
                  <button class="button is-link is-small is-fullwidth" @click="modal()" style="margin-right: 5px; !important">Upload</button>
                  <button class="button is-link is-small is-fullwidth" @click="exportCases()">JSON</button>
               </div>
               <div class="file has-name is-left is-link is-small is-fullwidth">
                  <label class="file-label">
                     <input class="file-input" type="file" name="resume" @change="fileUpload">
                     <span class="file-cta">
                        <span class="file-icon">
                           <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">
                           <strong style="color: white">Load File</strong>
                        </span>
                     </span>
                     <span class="file-name"> {{ fileName }} </span>
                  </label>
               </div>
            </div>

            <div class="modal" v-bind:class="{ 'is-active' : this.active }">
               <div class="modal-background"></div>
               <div class="modal-content" style="width: 45%; height: 86%; padding: 0.5%;">
                  <div class="columns is-vcentered subtitle" style="margin-bottom: 2%;">
                     <p class="column box subtitle has-text-centered">
                        Copy and paste in Web Browser Console
                     </p>
                     <a class="column box subtitle has-text-dark has-text-centered has-background-primary"
                        @click="copyToClipboard()">
                        Copy to Clipboard
                     </a>
                  </div>
                  <pre class="box has-text-left" ref="codeText">
                     var data = {{ this.$root.$data.cases }};
                  </pre>
               </div>
               <button class="modal-close is-large" aria-label="close" @click="modal()"></button>
            </div>
         </div>

         <div class="box case">
            <label class="label">Notes</label>
            <textarea class="textarea is-small" rows="36" placeholder="Notes from the ticket description" v-model="notes"></textarea>
         </div>

      </div>
   `
}

var card = {
   data() {
      return {
         activeModal: false,
      }
   },
   props: {
      index: Number,
      obj: String
   },
   methods: {
      toggleModal() {
         this.activeModal = !this.activeModal;
      },
      remove() {
         this.$root.$data.cases.splice(this.index, 1)
      },
      copy(){
         let cases = this.$root.$data.cases;
         let newCase = {'id':cases[cases.length-1].id + 1,'title': 'CopyOf_' + cases[this.index].title,'data':cases[this.index].data,'preconditons':cases[this.index].preconditons,'steps':cases[this.index].steps,'results':cases[this.index].results };
         this.$root.$data.cases.push(newCase);
      }
   },
   components: {
      'Case': cases
   },
   template: 
   `
   <div class="box columns is-vcentered casesTable has-text-left" style="padding: 0% !important;">
      <a class="column documentedCase subtitle is-four-fifths is-size-7 has-text-black " @click="toggleModal()">
         {{ obj.title }}
      </a>
      <div class="columns is-vcentered documentedCase buttons has-text-centered">
         <button @click="copy" class="button is-success is-small cardbutton">
            <span class="icon is-small">
               <i class="far fa-copy"></i>
            </span>
         </button>
         <button @click="remove" class="button is-danger is-small cardbutton">
            <span class="icon is-small">
               <i class="fas fa-times"></i>
            </span>
         </button>
      </div>

      <div class="modal" v-bind:class="{ 'is-active' : this.activeModal }" @keyup.alt.71="toggleModal()">
         <div class="modal-background"></div>
         <div class="modal-content">
            <Case v-bind:id="obj.id" buttons="true" isUpdate="true"></Case>
         </div>
         <button class="modal-close is-large" aria-label="close" @click="toggleModal()"></button>
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
      'Case': cases,
      'Menus': optionsMenu,
      'row': card
   }
})

function dragstart_handler(ev) {	
   // Set the drag's format and data. Use the event target's id for the data 	
   ev.dataTransfer.setData("text", ev.target.value);	
}	

function dragover_handler(ev) {	
   ev.preventDefault();	
   var data = ev.dataTransfer.getData("text");	
   /* If you use DOM manipulation functions, their default behaviour it not to 	
      copy but to alter and move elements. By appending a ".cloneNode(true)", 	
      you will not move the original element, but create a copy. */	
   var nodeCopy = document.getElementById(data).cloneNode(true);	
   ev.target.appendChild(nodeCopy);	
 }
