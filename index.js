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
         <div class="field bottomMargin" v-bind:class="{ 'has-addons' : this.buttons }">
            <div class="control is-expanded">
               <input class="input is-small" placeholder="Test case title" v-model="title"></input>
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
            <textarea class="textarea is-small" rows="1" v-model='extraData' ondragstart="dragstart_handler(event);" :draggable="isDraggable"></textarea>
         </div>
      </div>

      <div class="field box">
         <label class="label">Preconditons</label>
         <div class="control">
            <textarea class="textarea is-small" rows="3" v-model="preconditons" ondragstart="dragstart_handler(event);" :draggable="isDraggable"></textarea>
         </div>
      </div>

      <div class="field box">
         <label class="label">Steps</label>
         <div class="control">
            <textarea class="textarea is-small" rows="7" v-model="steps" ondragstart="dragstart_handler(event);" :draggable="isDraggable"></textarea>
         </div>
      </div>

      <div class="field box">
         <label class="label">Results</label>
         <div class="control">
            <textarea class="textarea is-small" rows="4" v-model="results" ondragstart="dragstart_handler(event);" :draggable="isDraggable"></textarea>
         </div>
      </div>
   </div>
   `
}

var navbar = {
   data() {
      return {
         title: '',
         fileName: '',
         file: '',
         active: false,
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
   <div style="height: 5%; display: flex; justify-content:space-between;">
      <div class="columns is-vcentered" style="margin: 0.5%;">
         <label class="column is-one-third label" style="white-space: nowrap; margin: 2% 0% 2% 2%; padding-right: 0%;">Testing:</label>
         <input class="column input is-small" v-model="title"  type="text" placeholder="Test name">
      </div>
	  <div class="columns is-vcentered" style="margin: 1%">
		<div class="column">
			<a class="button is-small is-link" @click="modal()">
				<strong>Create Test Cases</strong>
			</a>	
		</div>
        <div class="column">
            <button class="button is-small is-link" @click="exportCases()">
               <strong>Export JSON</strong>
            </button>
         </div>
         <div id="file-js" class="column file is-small has-name is-right is-link">
            <label class="file-label">
               <input class="file-input" type="file" name="resume" @change="fileUpload">
               <span class="file-cta">
                  <span class="file-icon">
                     <i class="fas fa-upload"></i>
                  </span>
				  <span class="file-label">
					<strong style="color: white">Load file</strong>
                  </span>
               </span>
			   <span class="file-name"> {{ fileName }} </span>
            </label>
         </div>
	  </div>
	  <div class="modal" v-bind:class="{ 'is-active' : this.active }">
			<div class="modal-background"></div>
			<div class="modal-content" style="width: 90%; height: 86%;">
            <div style="height: 100%;">
            <div class="box is-success subtitle">
               <p class="subtitle">
                  Copy and paste this in console to upload tests 
                  <br>
                  <a class="button is-small is-success" @click="copyToClipboard()">Copy to Clipboard</a>
               </p>
            </div>
            <pre ref="codeText">var data = {{ this.$root.$data.cases }};
               {{ loadFunction }}
            </pre>
				</div>
			</div>
			<button class="modal-close is-large" aria-label="close" @click="modal()"></button>
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
   <div class="columns is-vcentered has-background-primary-dark casesTable">
      <a class="column documentedCase subtitle is-size-6" @click="toggleModal()">
         {{ obj.title }}
      </a>
      <div class="column is-2 documentedCase buttons">
         <button @click="copy">
            <i class="far fa-copy"></i>
         </button>
         <button @click="remove">
            <i class="far fa-trash-alt"></i>
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
      'Navbar': navbar,
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