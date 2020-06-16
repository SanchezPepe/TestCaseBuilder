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
      buttons: false,
      id: 0
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
                  <button class="button is-small is-success" @click="submit()">✔️</button>
                  <button class="button is-small is-danger " @click="clear()">❌</button>
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
      createCases() {
         if (this.folder !== '') {
            var x = document.getElementById("section_id");
            var y = x.getElementsByTagName("option");
            let i = 0;
            let folderValue = -1;
            do {
               if (y[i].innerText.includes(this.folder)) {
                  folderValue = y[i].value;
               }
               i++;
            } while (i < y.length || folderValue !== '');
            if (folderValue !== -1) {
               x.value = folderValue;
            } else {
               alert("Folder not found");
            }

         } else {
            alert("Select a folder to create the Test Cases")
         }
      }
   },
   template: `
   <div style="height: 5%; display: flex; justify-content:space-between;">
      <div class="form subtitle" style="margin: 0.5% 0.5%; display:flex; vertical-align: middle;   ">
         <label class="label" style="white-space: nowrap; margin: 2% 6% 2% 2%">Testing: </label>
         <input v-model="title" class="input is-small" type="text" placeholder="Test name">
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
				<div class="column">
 						<input class="input" v-model="folder" placeholder="Folder to create cases">							
				</div>
				<div class="column is-one-fifth">
					<a class="button is-link" @click="createCases()">Create Cases</a>
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
      key: Number,
      title: String,
      extraData: String,
      preconditons: String,
      steps: String,
      results: String
   },
   methods: {
      toggleModal() {
         this.activeModal = !this.activeModal;
      }
   },
   components: {
      'Case': cases
   },
   template: `
   <div>
      <div class="columns is-vcentered notification is-success doneCase case" style="padding: 1% 1% 1% 0% !important">
         <a class="column" @click="toggleModal()" style="text-decoration:none">
            {{ title }} {{ steps  }}
         </a>
         <div class="column is-1" style="margin-right: 2%;">
            <button class="delete" v-on:click="$emit(\'remove\')"></button>
            <button v-on:click="$emit(\'copy\')">
               <i class="far fa-copy"></i>
            </button> 
         </div>
      </div>
      <div class="modal" v-bind:class="{ 'is-active' : this.activeModal }">
         <div class="modal-background"></div>
         <div class="modal-content">
            <Case></Case>
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
      'Card': card
   }
})


function dragstart_handler(ev) {
   // Set the drag's format and data. Use the event target's id for the data 
   ev.dataTransfer.setData("text", ev.target.value);
}

function dragover_handler(ev) {
   ev.preventDefault();
}

/**
 * 
 * 
 */