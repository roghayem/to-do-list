
const input = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const list = document.querySelector("#todo-list");
const search = document.querySelector("#search");

const allBtn = document.querySelector("#all-btn");
const activeBtn = document.querySelector("#active-btn");
const completedBtn = document.querySelector("#completed-btn");

const deleteAllBtn = document.querySelector("#delete-all");


let save = JSON.parse(localStorage.getItem("myTask")) || [];

redner()


//saving btn
addBtn.addEventListener("click",()=>{
    let taskes = input.value.trim();
    if(taskes === "")return 
   save.push({
    text: taskes,
    complete: false
});
    localStorage.setItem("myTask" , JSON.stringify(save))
    redner()    
    input.value =""
})


//main function
function redner(items = save){
    list.innerHTML = ""
    items.forEach(function(item , index){
        let li = document.createElement("li");
        let span = document.createElement("span");
        span.classList.add("span");
         span.textContent = item.text;

        if(item.complete){
            li.classList.add("done")
        }
       

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener('click' ,()=>{
            li.remove();
            save.splice(index, 1);
            localStorage.setItem("myTask" , JSON.stringify(save))
            redner();
        })

        let checkbox =document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("check-box");
        checkbox.checked = item.complete;

        checkbox.addEventListener("change" ,()=>{
            item.complete = checkbox.checked;
            localStorage.setItem("myTask" , JSON.stringify(save))
            redner()
        })

        let editBtn =document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.textContent = "edit btn";

        editBtn.addEventListener("click",()=>{
            let editInput = document.createElement("input");
            editInput.classList.add("edit-input")
            editInput.value = item.text;
            

            let saveBtn = document.createElement("button");
            saveBtn.textContent = "save";
            saveBtn.classList.add("save-btn")

            li.replaceChild(editInput , span);
            li.replaceChild(saveBtn,editBtn);

            saveBtn.addEventListener("click",()=>{
                let newText =editInput.value.trim();
                if(newText === "")return
                item.text = newText
            localStorage.setItem("myTask" , JSON.stringify(save))
            redner()

            })
         

        })

        li.append(checkbox,span ,editBtn,deleteBtn);
        list.append(li);
    })
}

//search input
search.addEventListener("input",()=>{
    const searchText = search.value.trim();
    const filteredTodos = save.filter((item)=>{
        return item.text.toLowerCase().includes(searchText);
    })
    redner(filteredTodos)
})

//all task button
allBtn.addEventListener("click",()=>{
    redner(save);
})
//active button
activeBtn.addEventListener("click",()=>{
    let activeTodos =save.filter(function(item){
        return item.complete === false
    })

    redner(activeTodos)
})

//complated button
completedBtn.addEventListener("click",()=>{
    let completedTodos = save.filter(function(item){
        return item.complete === true
    })
    redner(completedTodos);
})

//delete all task button
deleteAllBtn.addEventListener("click",()=>{
    save=[];
     localStorage.setItem("myTask" , JSON.stringify(save));
    redner()
})
