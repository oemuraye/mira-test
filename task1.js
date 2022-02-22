const usersTableList = document.getElementById("tbody");

const submitBtn = document.querySelector('.submit-button')
const updateBtn = document.querySelector('.update-button')

const formSubmit = document.getElementById('formSubmit')
const titleValue = document.getElementById('title')
const bodyValue = document.getElementById('body')
const userIdValue = document.getElementById('userId')
const idNumber = document.getElementById("id-num");
const identificationNum = document.getElementById("identification-num");

const url = "https://jsonplaceholder.typicode.com/posts";

// Create user
formSubmit.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    let titleInit = titleValue.value
    let bodyInit = bodyValue.value
    let userIdInit = userIdValue.value
    
    console.log(titleInit, bodyInit, userIdInit);
    
    if (updateBtn.classList.contains('hide')) {
        createUser(titleInit, bodyInit, userIdInit);
        alert('Data Created');
    }
    if (submitBtn.classList.contains('hide')) {
      const id = identificationNum.value
      updateUser(id);
      alert('Data Updated');
    } 
    
    formSubmit.reset()
    
    if (submitBtn.classList.contains('hide')) {
        submitBtn.classList.remove('hide')
        updateBtn.classList.add('hide')
        idNumber.classList.add('hide')
    }
})

// Posting to Api
const createUser = async ( titleInit, bodyInit, userIdInit ) => {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        title: titleInit,
        body: bodyInit,
        userId: userIdInit,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

// Fetching Data of Users
const fetchUsers = async () => {
    try {
        const response = await fetch(url);
        const users = await response.json();
        return users;
    } catch (error) {
        console.log(error);
    }
};

const showTableList = async () => {
    const users = await fetchUsers();
    let list = "";
    users.map((user) => {
        let tableList = `
        <tr id="tr">
            <td>${user.id}</td>
            <td>${user.userId}</td>
            <td>${user.title}</td>
            <td>${user.body}</td>
            <td>
                <button id="${user.id}" class="edit-button">Edit</button>
                <button id="${user.id}" class="delete-button">Delete</button>
            </td>
        </tr>
        `;
        list += tableList;
    });
    usersTableList.innerHTML = list;
};

showTableList(); //fetch all users function

// Updating and deleting data
const fetchOneUser = async (id) => {
  const response = await fetch(`${url}/${id}`)
  const user = await response.json()
  return user
}

usersTableList.addEventListener('click', async (e) => {
  e.preventDefault()
  let deleteBtn = e.target.classList[0] == "delete-button";
  let editBtn = e.target.classList[0] == "edit-button";
  
  // to update data
  if (editBtn) {
    const id = e.target.id;
    const { title, body, userId } = await fetchOneUser(id)

    submitBtn.classList.add("hide");
    updateBtn.classList.remove('hide')
    idNumber.classList.remove('hide')
    
    titleValue.value = title,
    bodyValue.value = body,
    userIdValue.value = userId
    identificationNum.value = id
  }

  // to delete data
  if(deleteBtn) {
    const id = e.target.id
    await fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => location.reload());
      alert("Data Created")
    }
  })

  // Update User 
  const updateUser = async (id, titleInit, bodyInit, userIdInit) => {
    
    await fetch(`${url}/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: titleInit,
        body: bodyInit,
        userId: userIdInit,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };






