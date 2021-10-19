// selectors
let add = document.getElementById('add-note');
let noteCtr = document.getElementById('note-ctr');
let textInp = document.getElementById('get input');
let filter = document.getElementById('filter');

//events
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
         note.remove();
      })  
   }

   if (temp.tagName == "INPUT" && temp.checked) {
      temp.parentNode.classList.add("checked");
   }
   else {
      temp.parentNode.classList.remove("checked")
   }
}

function filterNotes(e) {
   console.log(e.target.value);
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
