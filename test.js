var data = [{
      "id": 3,
      "title": "TEST A",
      "data": "A",
      "preconditons": "A",
      "steps": "A",
      "results": "A"
   },
   {
      "id": 3,
      "title": "TEST B",
      "data": "B",
      "preconditons": "B",
      "steps": "B",
      "results": "B"
   },
   {
      "id": 3,
      "title": "TEST C",
      "data": "A",
      "preconditons": "A",
      "steps": "A",
      "results": "A"
   },
   {
      "id": 3,
      "title": "TEST D",
      "data": "B",
      "preconditons": "B",
      "steps": "B",
      "results": "B"
   }
]

function loadCasesTR() {
   let timeout = 1000;
   var testCase;
   for (let i = 0; i < data2.length; i++) {
      // Add new case button
      setTimeout(function () {
         testCase = data2[i];
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


function checkTime(n) {
   let timeout = 1000;
   for (let i = 0; i < n; i++) {
      // Add new case button
      setTimeout(function () {
         console.log("Segundos: ", ((i * 7) + 1), "i = ", i + 1)
      }, ((i * 7) + 1) * timeout);
      // Title input
      setTimeout(function () {
         console.log("Segundos: ", ((i * 7) + 2), "i = ", i + 1)
      }, ((i * 7) + 2) * timeout);

      // Submit new case
      setTimeout(function () {
         console.log("Segundos: ", ((i * 7) + 3), "i = ", i + 1)
      }, ((i * 7) + 3) * timeout);

      // Open the new case
      setTimeout(function () {
         console.log("Segundos: ", ((i * 7) + 4), "i = ", i + 1)
      }, ((i * 7) + 4) * timeout);

      // Hit panel edit button
      setTimeout(function () {
         console.log("Segundos: ", ((i * 7) + 5), "i = ", i + 1)
      }, ((i * 7) + 5) * timeout);

      // Fill test case info
      setTimeout(function () {
         console.log("Segundos: ", ((i * 7) + 6), "i = ", i + 1)
      }, ((i * 7) + 6) * timeout);

      // Save test case
      setTimeout(function () {
         console.log("Segundos: ", ((i * 7) + 7), "i = ", i + 1)
      }, ((i * 7) + 7) * timeout);
   };
}