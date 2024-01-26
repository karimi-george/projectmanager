// Get HTML elements by their IDs
const categorySelect = document.getElementById('category') as HTMLSelectElement;
const usernameInput = document.getElementById('username') as HTMLInputElement;
const projectInput = document.getElementById('project') as HTMLInputElement;
const venueSelect = document.getElementById('venue') as HTMLSelectElement;
const dateInput = document.getElementById('date') as HTMLInputElement;
const submitButton = document.getElementById('submit') as HTMLButtonElement;
const tbody = document.getElementById('tbody') as HTMLTableSectionElement;

let arrayOfProjects: Array<any>;

let Mode: string = "create";

let TmpId: number;

// Load projects from local storage
if (localStorage.arrayOfProjects != null) {
    arrayOfProjects = JSON.parse(localStorage.getItem('arrayOfProjects')as string);
} else {
    arrayOfProjects = [];
}

submitButton.addEventListener('click', function (e) {
    if (Mode === "create") {
        let projectObject = {
            category: categorySelect.value,
            username: usernameInput.value,
            project: projectInput.value,
            venue: venueSelect.value,
            date: dateInput.value
        };
        arrayOfProjects.push(projectObject);
        localStorage.setItem('arrayOfProjects', JSON.stringify(arrayOfProjects));
        DispayProjectInfos();
        clearText();
    } else {
        submitButton.textContent = "Update";
        UpdateProject(TmpId);
        DispayProjectInfos();
        submitButton.textContent = "Create";
        Mode = "create";
    }
    e.preventDefault();
});

function DispayProjectInfos() {
    let table = '';
    for (let index = 0; index < arrayOfProjects.length; index++) {
        table += `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${arrayOfProjects[index].category}</td>
            <td>${arrayOfProjects[index].username}</td>
            <td>${arrayOfProjects[index].project}</td>
            <td>${arrayOfProjects[index].venue}</td>
            <td>
                <button class="btn btn-warning" onclick="UpdateProject(${index})">Reassign</button>
                <button class="btn btn-danger" onclick="DeleteProject(${index})">Remove</button>
            </td>
        </tr>
        `;
    }
    tbody.innerHTML = table;
}

function clearText() {
    categorySelect.value = "";
    usernameInput.value = "";
    projectInput.value = "";
    venueSelect.value = "";
    dateInput.value = "";
}

function DeleteProject(id: number) {
    arrayOfProjects.splice(id, 1);
    localStorage.setItem('arrayOfProjects', JSON.stringify(arrayOfProjects));
    DispayProjectInfos();
}

function UpdateProject(id: number) {
    TmpId = id;
    Mode = "update";
    submitButton.textContent = "Update";

    categorySelect.value = arrayOfProjects[id].category;
    usernameInput.value = arrayOfProjects[id].username;
    projectInput.value = arrayOfProjects[id].project;
    venueSelect.value = arrayOfProjects[id].venue;
    dateInput.value = arrayOfProjects[id].date;

    arrayOfProjects[TmpId] = {
        category: categorySelect.value,
        username: usernameInput.value,
        project: projectInput.value,
        venue: venueSelect.value,
        date: dateInput.value
    };
    localStorage.setItem('arrayOfProjects', JSON.stringify(arrayOfProjects));
}

DispayProjectInfos();
