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

const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbar-example'
})

//THEM TEN SAU KHI DANG NHAP
var fname = localStorage.getItem('full-name');
document.getElementById('full-name').textContent = fname;

if (document.getElementById('full-name').textContent === fname) {
    var loginindex = document.getElementById('login-index');
    var dropicon = document.getElementById('drop-icon');
    loginindex.style.display = "none";
    dropicon.style.display = "block";
    var exitsub = document.getElementById('exit-submenu');
    exitsub.style.display = "block";
}

var exitindex = document.getElementById('exit-index');
exitindex.onclick = function () {
    localStorage.clear();
    window.location.reload();
}
