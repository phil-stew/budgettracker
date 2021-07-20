const { get } = require("mongoose");

let dataB
let newBudget

const request = window.indexedDB.open('BudgetData', newBudget || 21)

request.onupgradeneeded = function (e) {
    console.log('Upgraded Needed')

    const { oldVersion } = e;
    const newVersion = e.newVersion || dataB.version
console.log(`DB Updated from version ${oldVersion} to ${newVersion}`)

dataB = e.target.result;

if (dataB.objectStoreNames.lenth === 0) {
    dataB.createObjectStore('BudgetStore', {autoIncrement: true })
}};

request.onerror = function (e) {
    console.log(`Woops! ${e.target.errorCode}`);
  };

function workingDB() {

let transaction = dataB.transaction(['BudgetStore'], 'readwrite');

const save = transaction.objectStore('BudgetStore');

const getAll = save.getAll()

getAll.onsucess = function() {

    if (getAll.result.length > 0) {
        fetch('/api/transaction/bulk', {
          method: 'POST',
          body: JSON.stringify(getAll.result),
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((res) => {
            // If our returned response is not empty
            if (res.length !== 0) {
              // Open another transaction to BudgetStore with the ability to read and write
              transaction = db.transaction(['BudgetStore'], 'readwrite');
  
              // Assign the current store to a variable
              const currentStore = transaction.objectStore('BudgetStore');
              currentStore.clear();
              console.log("clearing store");
            }
          });
      }

}

}
