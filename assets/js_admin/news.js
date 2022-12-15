// Scroll fixed on top
document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener('scroll', function () {
        if (window.scrollY > 80) {
            document.querySelector('.main__menu-block').classList.add('fixed-top');
            // add padding top to show content behind navbar
            navbar_height = document.querySelector('.main__menu-block').offsetHeight;
            //document.body.style.paddingTop = navbar_height + 'px';
            //console.log(navbar_height)
        } else {
            document.querySelector('.main__menu-block').classList.remove('fixed-top');
            //remove padding top from body
            //document.body.style.paddingTop = '0';
        }
    });
});

var url = document.URL;
var stuff = url.split('id=');
var id = parseInt(stuff[stuff.length - 1]);

var postApi = 'http://localhost:3000/posts/';

function start() {
    getPosts(function (posts) {
        renderPosts(posts, id)
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

function renderPosts(posts, id) {
    var html = ''
    posts.map(function (post) {
        if (post.id === id) {

            html += `
            <div class="img-content">
                <div class="post-title text-center w-100 position-relative overflow-hidden">
                    <img src="${post.imgLink}" class="img-fluid" alt="">
                </div>
            </div>

            <div class="post-content container">

                <div class="breadcrumb mt-5">
                    <div style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="index.html" class="text-decoration-none text-muted">Home</a></li>
                            <li class="breadcrumb-item" aria-current="page"><a href="listNews.html" class="text-decoration-none text-muted">Tin tức</a></li>
                            <li class="breadcrumb-item active fw-bold" aria-current="page">${post.title}</li>
                        </ol>
                    </div>
                </div>

                <div class="title-content">
                    <h2 class="pb-2 border-bottom text-center py-3 text-heading-style">${post.title}</h2>

                </div>

                <div class="main-content mt-5">${post.content}</div>
            </div>
            `
            return html;
        }
    })
    var newsBlock = document.querySelector('.news-content');
    newsBlock.innerHTML += html;
    //tableData.innerHTML += html;

}


// Button click back to top

let mybutton = document.getElementById("btn-back-to-top");

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } 
    else {
        mybutton.style.transitionDuration = "2s";
            mybutton.style.display = "none";
    }
}

mybutton.addEventListener("click", backToTop);

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}