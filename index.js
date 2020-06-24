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
            this.clear();
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
         url: '',
         folder: '',
         webpage: false
      }
   },
   computed: {
      webframe() {
         return '<iframe id="myFrame" src="' + this.url + '" style="border: 2px solid blue; overflow:auto;" width="100%" height="100%"></iframe>';
         //return '<object type="text/html" v-if="webpage" data="'+ this.url + '" width="100%" height="100%" style=" border:5px black"></object>';	
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
			<div class="columns" style="width: 90%;">
				<div class="column">
 						<input class="input" v-model="url" placeholder="URL to visit">							
				</div>
				<div class="column is-1">
					<a class="button is-link" @click="">Create Cases</a>
				</div>
			</div>
			<div class="modal-content" style="width: 90%; height: 86%;">
				<div v-html="webframe" style="height: 100%;">
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

      <div class="modal" v-bind:class="{ 'is-active' : this.activeModal }" @keyup.enter="toggleModal()">
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