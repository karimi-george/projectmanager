let username = document.getElementById('username'),
    project= document.getElementById('project'),
    category= document.getElementById('category'),
    venue = document.getElementById('venue')
submit = document.getElementById('submit')


let arrayOfProjects

let Mode = "create"

let TmpId  // temporary variable to save the Users id 

// let's save informations in localstorage

if(localStorage.arrayOfProjects != null){
    arrayOfProjects= JSON.parse(localStorage.getItem('arrayofProjects'))
}
else{
    arrayOfProjects= JSON.parse(localStorage.getItem('arrayofProjects'))
    arrayOfProjects= JSON.parse(localStorage.getItem('arrayofProjects'))
    = []
}



submit.addEventListener('click', function (e) {
    if(Mode === "create"){

        let ProjectObject = {
            username: username.value,
            project: project.value,
            category: category.value,
            venue: venue.value
        }
        arrayOfProjects.push(ProjectObject)
        localStorage.setItem('arrayOfProjects', JSON.stringify(arrayOfProjects))
        console.log(arrayOfProjects)
        DispayInfos()
        clearText()
    }
    else{
        submit.textContent = "Update"
        UpdateProjects(TmpId)  // here we replace id with TmpId var because id is local variable
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
            <td>${arrayOfProjects[index].category}</td>
            <td>${arrayOfProjects[index].username}</td>
            <td>${arrayOfProjects[index].project}</td>
            <td>${arrayOfProjects[index].venue}</td>
            <td>
                <button class="btn btn-warning" onclick="UpdateProjects(${index})">Reassign</button>
                <button class="btn btn-danger" onclick="DeleteProjects(${index})">Remove</button>
            </td>
        </tr>
        `
        document.getElementById('tbody').innerHTML = table
    }
}
function clearText() {
        category.value = "",
        username.value = "",
        project.value = "",
        venue.value = ""
}


// to delete an Users we should identify him by id

function DeleteProjects(id) {
    arrayOfProjects.splice(id, 1) // deleting 
    localStorage.setItem('arrayOfProjects', JSON.stringify(arrayOfProjects)) // update localstorage
    DispayInfos() // displaying informations after deleting
}



function UpdateProjects(id) {
    TmpId = id
    Mode = "update"
    submit.textContent = "Update"
    // also to modify an Users infos we sould find him by id 


    let ProjectObject = {
        username: username.value,
        project:project.value,
        category: category.value,
        venue: venue.value
    }
       username.value = arrayOfProjects[id].username
       project.value = arrayOfProjects[id].project
       category.value = arrayOfProjects[id].category
       venue.value = arrayOfProjects[id].venue

       arrayOfProjects[TmpId] = ProjectObject
        localStorage.setItem('arrayofProjects', JSON.stringify(arrayOfProjects))
}


DispayInfos()

