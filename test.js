var data = {
   1 : {
      "title": "TEST",
      "preconditons": "KJFÑLSAKDFJDSAÑLFKJ",
      "steps": "LKJSLÑKFJDSÑLFKJ",
      "results": "KLFJSDAÑLFKJDSASAÑ"
   }
}


function createCases(folder) {
   var x = document.getElementById("section_id");
   var y = x.getElementsByTagName("option");
   let i = 0;
   let folderValue = -1;
   while (i < y.length) {
      if (y[i].innerText.includes(folder)) {
         folderValue = y[i].value;
         break;
      }
      i++;
   }
   if (folderValue !== -1) {
      x.value = folderValue;
      let fieldsToFill = ["title","custom_test_data","custom_preconds","custom_steps","custom_expected"]
      fieldsToFill.forEach(f => {
         let elem = document.getElementById(f);
         elem.value = "TEST TEST TEST";
      })
   } else {
      alert("Folder not found");
   }
   return folderValue;
}