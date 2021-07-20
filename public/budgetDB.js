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




