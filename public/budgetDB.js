//const { get } = require("mongoose");

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

request.onsuccess = function (e) {
  console.log('success')
  dataB = e.target.result;
}


if (navigator.online){
  console.log('backend online')
  workingDB()
}








function workingDB() {

let transaction = dataB.transaction(['BudgetStore'], 'readwrite');

const store = transaction.objectStore('BudgetStore');

const getAll = store.getAll()

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
          
            if (res.length !== 0) {
              
              transaction = db.transaction(['BudgetStore'], 'readwrite');
  
 
              const currentstore = transaction.objectStore('BudgetStore');
              currentstore.clear();
              console.log("clearing store");
            }
          });
      }}}

request.onsuccess = function (e) {
    console.log('success');
    db = e.target.result;

    if (navigator.onLine) {
        console.log('Backend online!');
        workingDB();
      }
    };

const storeRecord = (record) => {
    console.log('store record invoked');
    const transaction = db.transaction(['BudgetStore'], 'readwrite');
    const store = transaction.objectStore('BudgetStore');
    store.add(record);
  };

  window.addEventListener('online', checkDatabase);