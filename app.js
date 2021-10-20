// selectors
let add = document.getElementById('add-note');
let noteCtr = document.getElementById('note-ctr');
let textInp = document.getElementById('get input');
let filter = document.getElementById('filter');
//events
document.addEventListener('DOMContentLoaded', fetchLocal) 
add.addEventListener('click', addNote);
noteCtr.addEventListener("click", deleteCheckNote); // intresting eve approach   
filter.addEventListener("click", filterNotes);



//functions
function addNote(e) {
   e.preventDefault();
   const createNote = document.createElement("li");
   createNote.classList.add("note");

   // create p tag
   const createP = document.createElement("p");
   createP.innerText = textInp.value;
   saveToLocal(textInp.value);
   textInp.value = '';
   
   // create input tag
   const createCheck = document.createElement("input");
   const createInpType = document.createAttribute("type")
   createInpType.value = "checkbox";
   createCheck.setAttributeNode(createInpType);
   createCheck.classList.add("check")

   // create button tag
   const createTrash = document.createElement("button");
   createTrash.classList.add("delete");
   createTrash.innerHTML = '<i class="fas fa-multiply">';   

   // add note
   createNote.appendChild(createP);
   createNote.appendChild(createCheck);
   createNote.appendChild(createTrash);
   noteCtr.appendChild(createNote);
}

function deleteCheckNote(e) {
   let temp = e.target;
   if (temp.className === "delete") {
      let note = temp.parentNode;
      note.classList.add("fall-animation");
      note.addEventListener('transitionend', (e) => {
         // this is happening twice ??
         note.remove();
      })
      // calculate index of note in notes
      removeFromLocal(note);
   }

   if (temp.tagName == "INPUT" && temp.checked) {
      temp.parentNode.classList.add("checked");
   }
   else {
      temp.parentNode.classList.remove("checked")
   }
}

function filterNotes(e) {
   let cond = e.target.value;
   const note = document.getElementsByClassName('note')
   Array.from(note).forEach(function (iter) {
      switch(cond) {
         case("completed"):
            if (!iter.classList.contains("checked")) {
              iter.style.display = "none";
            }
            else
               iter.style.display = "flex";
            break

         case("incompleted"):
            if (iter.classList.contains("checked")) {
              iter.style.display = "none";
            }
            else
               iter.style.display = "flex";
            break

         default:
            iter.style.display = "flex";
      }
   });
}

function saveToLocal(note) {
   // console.log('ues');
   let notes;
   // console.log(localStorage.getItem('notes'))
   if (localStorage.getItem('notes') === null) {
      notes = [];
   }
   else {
      notes = JSON.parse(localStorage.getItem('notes'));
   }
   notes.push(note);
   localStorage.setItem('notes', JSON.stringify(notes));
} 

function removeFromLocal(node) {
   let sibling = node.previousSibling, count = 0;
   while(sibling !== null) {
      count++;
      sibling = sibling.previousSibling;
   }
   
   let notes = JSON.parse(localStorage.getItem('notes'));
   notes.splice(count, 1);
   localStorage.setItem('notes', JSON.stringify(notes));
   console.log(notes);
}

function fetchLocal() {
   let notes = JSON.parse(localStorage.getItem('notes'));

   if (notes === null) { //not to get null error
      localStorage.setItem('notes', JSON.stringify([]));
   }

   notes.forEach(function (note) {
      const createNote = document.createElement("li");
      createNote.classList.add("note");

      // create p tag
      const createP = document.createElement("p");
      createP.innerText = note;
         
      // create input tag
      const createCheck = document.createElement("input");
      const createInpType = document.createAttribute("type")
      createInpType.value = "checkbox";
      createCheck.setAttributeNode(createInpType);
      createCheck.classList.add("check")

      // create button tag
      const createTrash = document.createElement("button");
      createTrash.classList.add("delete");
      createTrash.innerHTML = '<i class="fas fa-multiply">';   
      
      // add note
      createNote.appendChild(createP);
      createNote.appendChild(createCheck);
      createNote.appendChild(createTrash);
      noteCtr.appendChild(createNote);
   });
}

