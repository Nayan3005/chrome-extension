let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const ulEl = document.getElementById("ul-el")
inputBtn.addEventListener("click", saveLead)
deleteBtn.addEventListener("dblclick",deleteLead)
tabBtn.addEventListener("click",saveTab)

//localStorage.setItem("myLeads","www.examplelead.com")
//console.log(localStorage.getItem("myLeads"))
//localStorage.clear()

let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


function render(leads){
    let listItems = ""
    for(let i=0; i<leads.length; i++){
        listItems += `<li>
                        <a href="${leads[i]}" target="_blank">
                            ${leads[i]}
                        </a>
                    </li>`
    }
    ulEl.innerHTML = listItems
}

function saveTab(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })

}

function saveLead(){
    myLeads.push(inputEl.value)
    inputEl.value=""

    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
}

function deleteLead(){
    myLeads=[]
    ulEl.innerHTML = ""
    localStorage.clear()
    render(myLeads)
}


//localStorage methods
// localStorage.setItem(key, value)
// localStorage.getItem(key)
// localStorage.clear()

//used to store arrays in localStorage
//JSON.stringify(), converts array to string
//JSON.parse(), converts string to array

