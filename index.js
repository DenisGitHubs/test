"use strict";
import { data } from "./src/data.js";


const renderListServices = () => {
    const ListOfServices = document.getElementById('list');
    const UsedData = []
const newElement = (el) => {
    const ServiceHtml = `<ol>${el.name}. стоимость: ${el.price}</ol>`
    ListOfServices.innerHTML = ListOfServices.innerHTML + ServiceHtml
    UsedData.push(el)
}
const newUl = (el) => {
    const ServicesList = `<ul class='root-folder' id=${el.id}><b>${el.name}</b></ul>`
    ListOfServices.innerHTML = ListOfServices.innerHTML + ServicesList
    UsedData.push(el)
}
const addDocumentInFolder = (el, masterId) => {
    const folder = document.getElementById(masterId)
    const newDocumentHtml = `<ol class='hide'>${el.name}. стоимость: ${el.price}</ol>`
    folder.innerHTML = folder.innerHTML + newDocumentHtml
    UsedData.push(el)
}

const AddFolderInFolder = (el, masterId) => {
    const masterFolder = document.getElementById(masterId)
    const folderHtml = `<ul class='folders hide' id=${el.id}><b>${el.name}</b></ul>`
    masterFolder.innerHTML = masterFolder.innerHTML + folderHtml
    UsedData.push(el)
}

  const comparison = () => {
    if(data.services.length > UsedData.length) {
        for (let i = 0; i < data.services.length; i++) {
            const el = data.services[i]
            const masterId = data.services[i].head
            const doc = document.getElementById(el.id)
            if(doc === null && el.node === 0 && el.head !== null) {
                addDocumentInFolder(el, masterId)
            } else if (doc === null && el.node === 1 && el.head !== null) {
                AddFolderInFolder(el, masterId)
            } else if (doc === null && el.node === 1 && el.head === null) {
                newUl(el)
            } else if (doc === null && el.node === 0 && el.head === null) {
                newElement(el)
            }
            
        }
      }
  }
  comparison()

  const addButton = () => {
    const firstButton = document.getElementById('h3')
    const rootList = document.getElementById('list');
    firstButton.addEventListener("click",  () => {
        if(rootList.classList.value === "hide") {
            hideToShow(rootList)
        } else { 
            showToHide(rootList)
         }
    })
  }
  const hideToShow = (el) => {
    el.classList.remove("hide")
    el.classList.add('show')
}
const showToHide = (el) => {
    el.classList.remove("show")
    el.classList.add("hide")
}
  const othersButtons = () => {
    const rootButton = document.getElementsByClassName('root-folder')
    const allFolders = document.getElementsByClassName('folders')
    rootButton[0].firstChild.addEventListener('click', () => {
        for (let i = 0; i < rootButton[0].childNodes.length; i++) {
            const el = rootButton[0].childNodes[i]
            if(el.classList.value === "hide") {
                hideToShow(el)
            } else if (el.classList.value === "show"){ 
                showToHide(el)
             }
             if(el.classList.value === "folders hide") {
                hideToShow(el)
            } else if(el.classList.value === "folders show") { 
                showToHide(el)
             }
        }

    })
    for (let i = 0; i < allFolders.length; i++) {
        const child = allFolders[i].childNodes
        allFolders[i].firstChild.addEventListener('click', () => {
            for (let j = 0; j < allFolders[i].childNodes.length; j++) {
                if(child[j].classList.value === "hide") {
                    child[j].classList.remove("hide")
                    child[j].classList.add('show')
                } else if(child[j].classList.value === "show") { 
                    child[j].classList.remove("show")
                    child[j].classList.add('hide')
                 }
                
            }
        })
        
    }
}
  addButton()
  othersButtons()

}
renderListServices()