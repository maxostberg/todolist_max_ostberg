const form = document.querySelector('.todo-form');
const list = document.querySelector('.todolist');
form.addEventListener('submit',addItemToList);

function addItemToList(event){

    let data = loadDataFromLocal()

    const input = document.querySelector('#input');
    
    if(input.value !== ''){
        event.preventDefault();
        const listItem = document.createElement('li');
        listItem.classList.add('list-item');

        const listItemText = document.createElement('p');
        listItemText.classList.add('item-text');
        listItemText.textContent = input.value;

        const iconBox = document.createElement('div');
        iconBox.classList.add('icon-box');

        const checkCircleIcon = document.createElement('i');
        const editIcon = document.createElement('i');
        const deleteIcon = document.createElement('i');
        checkCircleIcon.classList.add('far', 'fa-check-circle');
        editIcon.classList.add('far', 'fa-edit');
        deleteIcon.classList.add('far', 'fa-times-circle');

        iconBox.appendChild(checkCircleIcon);
        iconBox.appendChild(editIcon);
        iconBox.appendChild(deleteIcon);

        listItem.appendChild(listItemText);
        listItem.appendChild(iconBox);
        console.log(listItem);

        list.appendChild(listItem);

        data.push(input.value);
        localStorage.setItem('tasks', JSON.stringify(data))

        input.value = '';


    } else {
        console.log('error')
    }
}

list.addEventListener('click', function(event){
    const idOfListItem = event.target.parentElement.parentElement;
    const input = document.querySelector('#input');
    
    if(event.target.classList.contains('fa-times-circle')){
        
        list.removeChild(idOfListItem);
    }

    if(event.target.classList.contains('fa-check-circle')){
        const listItemTextDone = event.target.parentElement.parentElement.firstElementChild;
        
        listItemTextDone.classList.toggle('done-style');
    }

    if(event.target.classList.contains('fa-edit')){
        const removedText = list.removeChild(idOfListItem);
        const editText = removedText.firstElementChild;
        
        input.value = editText.textContent;
    }
});

const removeAllBtn = document.querySelector('.clear-all');
removeAllBtn.addEventListener('click', function(){
    list.innerHTML = '';
    localStorage.clear();
});


document.addEventListener('DOMContentLoaded', loadData)


function loadData(){
   let data = loadDataFromLocal()

    for(let i = 0; i < data.length; i++){

    const listItem = document.createElement('li');
    listItem.classList.add('list-item');

    const listItemText = document.createElement('p');
    listItemText.classList.add('item-text');
    listItemText.textContent = data[i];

    const iconBox = document.createElement('div');
    iconBox.classList.add('icon-box');

    const checkCircleIcon = document.createElement('i');
    const editIcon = document.createElement('i');
    const deleteIcon = document.createElement('i');
    checkCircleIcon.classList.add('far', 'fa-check-circle');
    editIcon.classList.add('far', 'fa-edit');
    deleteIcon.classList.add('far', 'fa-times-circle');

    iconBox.appendChild(checkCircleIcon);
    iconBox.appendChild(editIcon);
    iconBox.appendChild(deleteIcon);

    listItem.appendChild(listItemText);
    listItem.appendChild(iconBox);
    console.log(listItem);

    list.appendChild(listItem);

    }
}




function loadDataFromLocal(){
    let data;

    if(localStorage.getItem('tasks') == null){
        data = [];
    } else {
        data = JSON.parse(localStorage.getItem('tasks'))
    }

    return data;
}





