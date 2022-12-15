// Create post, delete post, update post

var postApi = 'http://localhost:3000/posts/';

var createBtn = document.querySelector('#create');
var updateBtn = document.querySelector('#update');
updateBtn.style.display = "none";

function start() {
    handleCreatePost();
    getPosts(function (posts) {
        renderPosts(posts)
    })
}

start();

function getPosts(callback) {
    fetch(postApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}


function createPost(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(postApi, options)
        .then(function (response) {
            response.json();
        })
        .then(callback);
}


function handleCreatePost() {

    createBtn.onclick = function () {

        var title = document.querySelector('input[name="title"]');
        var imgLink = document.querySelector('input[name="img-link"]');
        var description = document.querySelector('textarea[name="description"]');
        var content = CKEDITOR.instances.editor1;

        if (checkNull(title, imgLink, description, content)) {
            var date = new Date();

            var postData = {
                imgLink: imgLink.value,
                title: title.value,
                description: description.value,
                content: content.getData(),
                date: date
            };

            createPost(postData, getPosts);
        }
    }
}

function checkNull(title, imgLink, description, content) {
    
    if (title.value === "") {
        alert("Vui lòng nhập tiêu đề");
        title.focus();
        return false
    }
    if (imgLink.value === "") {
        alert("Ảnh không được để trống");
        imgLink.focus();
        return false
    }
    if (description.value === "") {
        alert("Vui lòng nhập mô tả ngắn");
        description.focus();
        return false;
    }
    if (content.getData() === "") {
        alert("Nội dung không được để trống");
        content.focus();
        return false;
    }
    return true;
}


var tableData = document.querySelector('.table-info table tbody')

function renderPosts(posts) {
    posts = posts.reverse();
    var html = ''
    posts.map(function (post) {
        html += `
                <tr>
                    <td>${post.id}</td>
                    <td>${post.title}</td>
                    <td><img src="${post.imgLink}" alt="" style="height: 100px; object-fit: cover;"></td>
                    <td>
                    <button type="button" class="btn btn-success update-btn rounded-pill" style="width: 78px;" value="${post.id}" onclick="updateId(${post.id})">Update</button>
                    <button type="button" class="btn btn-danger delete-btn rounded-pill mt-3" style="width: 78px;" value="${post.id}" onclick="deleteId(${post.id})">Delete</button>
                    </td>
                </tr>
        `
    })
    tableData.innerHTML += html;

}



function updateId(id) {
    var urlUpdate = postApi + id;

    updateBtn.style.display = "block";
    createBtn.style.display = "none";

    getPosts(function (posts) {
        handleUpdatePosts(posts, id, urlUpdate)
    })

}

function handleUpdatePosts(posts, id, urlUpdate) {
    var content = posts.map(function (post) {
        if (post.id === id) {
            var title = document.querySelector('input[name="title"]');
            var imgLink = document.querySelector('input[name="img-link"]');
            var description = document.querySelector('textarea[name="description"]');
            var content = CKEDITOR.instances.editor1;

            title.value = post.title;
            imgLink.value = post.imgLink;
            description.value = post.description;
            content.setData(post.content);
            title.focus();
        }
    })

    updateBtn.onclick = function () {
        var title = document.querySelector('input[name="title"]');
        var imgLink = document.querySelector('input[name="img-link"]');
        var description = document.querySelector('textarea[name="description"]');
        var content = CKEDITOR.instances.editor1;

        if (checkNull(title, imgLink, description, content)) {
            var date = new Date();

            var postData = {
                imgLink: imgLink.value,
                title: title.value,
                description: description.value,
                content: content.getData(),
                date: date
            };

            updatePost(postData, getPosts, urlUpdate);
        }
    }

}


function updatePost(data, callback, url) {
    var options = {
        method: 'PUT',
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(url, options)
        .then(function (response) {
            response.json();
        })
        .then(callback);
}




function deleteId(id) {
    var urlDelete = postApi + id;
    deletePost(urlDelete);
}

function deletePost(urlDelete) {
    var options = {
        method: 'DELETE',
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify(data)
    };

    fetch(urlDelete, options)
        .then(function (response) {
            response.json();
        })
        //.then(callback);
}





// function selection() {
//     var inputBlock = document.querySelector('.selectionBlock input');
//     var getType = inputBlock.getAttribute("type");
//     if(getType === "text") {
//         inputBlock.setAttribute("type", "file");
//     }
//     else {
//         inputBlock.setAttribute("type", "text");
//     }
// }

