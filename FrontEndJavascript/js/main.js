const fetchData = async ()=>{
    const data = await fetch('http://localhost:3000/posts');
    const posts = await data.json();
    return posts;
}
const postData = async (title, description)=>{
    const data = {title, description};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch('http://localhost:3000/posts', options);
    const jsonResponse = await response.json();
    addPost(jsonResponse.title, jsonResponse.description, jsonResponse._id);
}
const updatePost = async (id, title, description) => {
    const data = {title, description};
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(`http://localhost:3000/posts/${id}`, options)
    const jsonResponse = await response.json();
    newPost(id, jsonResponse.title, jsonResponse.description);
}
const deletePost = async (id) => {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await fetch(`http://localhost:3000/posts/${id}`, options)
    const jsonResponse = await response.json();
    removePost(id);
}
const newPost = (id, newTitle, newDescription)=>{
    let post = document.querySelector(`#post_${id}`);
    post.querySelector('h1').innerText = newTitle;
    post.querySelector('p').innerText = newDescription; 
}
const removePost = (id)=>{
    let container = document.querySelector('#add-posts');
    let post = document.querySelector(`#post_${id}`);
    container.removeChild(post);
}
const addPost = (title, description, id)=>{
    let post = document.createElement('div');
    let newTitle  = document.createElement('h1');
    let newDescription = document.createElement('p');
    let container = document.querySelector('#add-posts');
    let deleteButton = document.createElement('button');
    let editButton = document.createElement('button');

    newTitle.innerText = title;
    newDescription.innerText = description;
    post.classList.add('post');
    post.id = `post_${id}`;
    deleteButton.innerText = 'X';
    deleteButton.classList.add('delete');
    editButton.innerText = '...';
    editButton.classList.add('edit-button');
    
    post.appendChild(newTitle);
    post.appendChild(newDescription);
    post.appendChild(deleteButton);
    post.appendChild(editButton);
    container.appendChild(post);

    deleteButton.addEventListener('click', ()=>{
        deletePost(id)
    });
    editButton.addEventListener('click', ()=>{
        let form = document.querySelector('#update-form');
        let newTitle = form.querySelector('#new-title');
        let newDescription = form.querySelector('#new-description');
        let updateButton = form.querySelector('#update');
        let info = document.querySelector(`#post_${id}`);
        newTitle.value = info.querySelector('h1').innerText;
        newDescription.value = info.querySelector('p').innerText;
        form.classList.remove('hidden');
        updateButton.addEventListener('click', () => {
            updatePost(id,newTitle.value, newDescription.value);
            form.classList.add('hidden');
        });
        
    });
}
const main = async ()=>{
    
    let button = document.querySelector('#register');
    let newTitle = document.querySelector('#title');
    let newDescription = document.querySelector('#description');
    const posts = await fetchData();
    posts.forEach(postData => {
        let title = postData.title;
        let description = postData.description;
        let id = postData._id;
        addPost(title, description, id);
    });
    button.addEventListener('click', ()=>{
        postData(newTitle.value, newDescription.value);
    });
    

}



main();