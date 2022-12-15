// Scroll fixed on top
document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            document.querySelector('.main__menu-block').classList.add('fixed-top');

            // add padding top to show content behind navbar
            navbar_height = document.querySelector('.main__menu-block').offsetHeight;
            document.body.style.paddingTop = navbar_height + 'px';
            //console.log(navbar_height)
        } else {
            document.querySelector('.main__menu-block').classList.remove('fixed-top');
            //remove padding top from body
            document.body.style.paddingTop = '0';
        }
    });
});

//Pagination && Render Post
var itemPerPage = 8;
var currentPage = 1;
var startPage = 0;
var endPage = itemPerPage; 
var totalPages;




function getCurrentPage(currentPage) {
    startPage = (currentPage - 1) * itemPerPage;
    endPage = currentPage * itemPerPage;
}

var postApi = 'http://localhost:3000/posts/';

function start() {
    getPosts(function (posts) {
        renderPosts(posts, startPage, endPage);
    });
}
start();

//Functions
function getPosts(callback) {
    fetch(postApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function getLength(post) {
    return post.length;
}



/* Pagination
1: 0, 1, 2, 3
2: 4, 5, 6, 7
itemPerPage: 4, currentPage = 1
start = 0, end = itemPage
start = (currentPage - 1)* itemPerPage
end = currentPage * itemPerPage
currentPage = 1 > start = 0*4 = 0, end = 1*4 = 4
currentPage = 2 > start = 1*4 = 4, end = 2*4 = 8 */


function renderPosts(posts, startPage, endPage) {
    var listPostsBlock = document.querySelector('#list-posts');
    posts = posts.reverse(); //phần tử mới nhất được thêm vào đầu mảng, tin tức mới sẽ được hiện đầu tiên
    totalPages = Math.ceil(posts.length / itemPerPage);
    localStorage.setItem('totalPages', totalPages);

    var html = ''
    var content = posts.map(function (post, index) {
        if(index >= startPage && index < endPage) {
            html += `
                    <div class="col my-3" onclick="openPage(${post.id});">
                        <div class="card news__item" >
                            <div class="news__item-img-block">
                                <img src="${post.imgLink}" class="card-img-top news__item-img" alt="...">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title news__item-title text-center fw-bold">${post.title}</h5>
                                <p class="card-text news__item-desc mb-2">${post.description}</p>
                                <p class="card-text text-end"><small class="text-muted">Last updated <span class="time-update">${timeSince(new Date(post.date))}</span> ago</small></p>
                                
                            </div>
                        </div>
                    </div>`    
        }
    return html;
    });
    listPostsBlock.innerHTML = html;
    
}

const ulTag = document.querySelector("ul.pagination.pagination-lg");



function renderPagination(totalPages, page) {
    let liTag = '';
    let activeLi;
    let beforePages = page - 1; //5 - 1 = 4
    let afterPages = page + 1; // 5 + 1 = 6

    if(page > 1) {
        liTag += `<li class="page-item" onclick="renderPagination(totalPages, ${page-1})"><div class="page-link btn-prev" onclick="scrollWin();" aria-label="Previous"><span aria-hidden="true">&laquo;</span></div></li>`
    }

    if(page > 2) {
        liTag += `<li class="page-item" onclick="renderPagination(totalPages, 1)"><a class="page-link"  onclick="scrollWin();">1</a></li>`;
        if(page > 3) {
            liTag += `<li class="page-item"><a class="page-link" >...</a></li>`;
        }
    }

    for(let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
        if(pageLength > totalPages) {
            continue;
        }
        if(pageLength === 0) {
            pageLength = pageLength + 1;
        }
        if(page === pageLength) {
            activeLi = "active";
        }
        else {
            activeLi = "";
        }
        liTag += `<li class="page-item ${activeLi}" onclick="renderPagination(totalPages, ${pageLength})"><a class="page-link" onclick="scrollWin();" >${pageLength}</a></li>`
    }

    if(page < totalPages - 1) {
        if(page < totalPages - 2) {
            liTag += `<li class="page-item"><a class="page-link" >...</a></li>`;
        }
        liTag += `<li class="page-item" onclick="renderPagination(totalPages, ${totalPages})"><a class="page-link"  onclick="scrollWin();">${totalPages}</a></li>`;
    }

    if(page < totalPages) {
        liTag += `<li class="page-item" onclick="renderPagination(totalPages, ${page+1})"><div class="page-link btn-next" onclick="scrollWin();" aria-label="Next"><span aria-hidden="true">&raquo;</span></div></li>`
    }


    ulTag.innerHTML = liTag;
    getCurrentPage(page);
    start();
}

totalPages = localStorage.getItem('totalPages');
renderPagination(totalPages, 1);


function openPage(id) {
    const url = `news.html?id=${id}`
    window.open(url);
}


// Time upload post
function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

// Auto scroll in the middle of screen after click page
function scrollWin() {
    window.scrollTo(0, 510)
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


