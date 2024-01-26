let username = document.getElementById('username'),
    project= document.getElementById('project'),
    category= document.getElementById('category'),
    venue = document.getElementById('venue')
submit = document.getElementById('submit')


let arrayOfUsers 

let Mode = "create"

let TmpId  // temporary variable to save the Users id 

// let's save informations in localstorage

if(localStorage.arrayOfUsers != null){
    arrayOfUsers = JSON.parse(localStorage.getItem('arrayOfUsers'))
}
else{
     arrayOfUsers = []
}



submit.addEventListener('click', function (e) {
    if(Mode === "create"){

        let UsersObject = {
            username: username.value,
            project: project.value,
            category: category.value,
            venue: venue.value
        }
        arrayOfUsers.push(UsersObject)
        localStorage.setItem('arrayOfUsers', JSON.stringify(arrayOfUsers))
        console.log(arrayOfUsers)
        DispayInfos()
        clearText()
    }
    else{
        submit.textContent = "Update"
        UpdateUsers(TmpId)  // here we replace id with TmpId var because id is local variable
        DispayInfos()
        submit.textContent = "Create"
        Mode = "create"
    }
    e.preventDefault()
})

function DispayInfos() {
    let table = ''
    for (let index = 0; index < arrayOfUsers.length; index++) {
        table += `
        <tr>
            <th scope="row">${index}</th>
            <td>${arrayOfUsers[index].username}</td>
            <td>${arrayOfUsers[index].project}</td>
            <td>${arrayOfUsers[index].category}</td>
            <td>${arrayOfUsers[index].venue}</td>
            <td>
                <button class="btn btn-warning" onclick="UpdateUsers(${index})">Reassign</button>
                <button class="btn btn-danger" onclick="DeleteUsers(${index})">Remove</button>
            </td>
        </tr>
        `
        document.getElementById('tbody').innerHTML = table
    }
}
function clearText() {
        username.value = "",
        project.value = "",
        category.value = "",
        venue.value = ""
}


// to delete an Users we should identify him by id

function DeleteUsers(id) {
    arrayOfUsers.splice(id, 1) // deleting 
    localStorage.setItem('arrayOfUsers', JSON.stringify(arrayOfUsers)) // update localstorage
    DispayInfos() // displaying informations after deleting
}



function UpdateUsers(id) {
    TmpId = id
    Mode = "update"
    submit.textContent = "Update"
    // also to modify an Users infos we sould find him by id 


    let UsersObject = {
        username: username.value,
        project:project.value,
        category: category.value,
        venue: venue.value
    }
       username.value = arrayOfUsers[id].username
       project.value = arrayOfUsers[id].project
       category.value = arrayOfUsers[id].category
       venue.value = arrayOfUsers[id].venue

       arrayOfUsers[TmpId] = UsersObject
        localStorage.setItem('arrayOfUsers', JSON.stringify(arrayOfUsers))
}


DispayInfos()

