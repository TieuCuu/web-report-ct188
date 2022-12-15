//THEM TEN SAU KHI DANG NHAP
var fname = localStorage.getItem('full-name');
document.getElementById('f-name').textContent = fname;

var ltrid = localStorage.getItem('lect-id');
document.getElementById('lect-id').textContent = ltrid;

var college = localStorage.getItem('college');
document.getElementById('college').textContent = college;

var position = localStorage.getItem('position');
document.getElementById('position').textContent = position;

var gender = localStorage.getItem('gender');
document.getElementById('gender').textContent = gender;

var age = localStorage.getItem('age');
document.getElementById('age').textContent = age;

var home = localStorage.getItem('home');
document.getElementById('home').textContent = home;

var level = localStorage.getItem('level');
document.getElementById('level').textContent = level;

var rank = localStorage.getItem('rank');
document.getElementById('rank').textContent = rank;

var username = localStorage.getItem('username');
document.getElementById('username').textContent = username;

var phone = localStorage.getItem('phone');
document.getElementById('phone').textContent = phone;

var fname = localStorage.getItem('full-name');
document.getElementById('full-name').textContent = fname;


if (document.getElementById('full-name').textContent === "Thien Nhan") {
    var nckhnhan = document.getElementById('nckh-nhan');
    document.getElementById("profile-avatar").src = "assets/img/profile-avatar-male-1.jpg";
    nckhnhan.style.display = "block";
}
if (document.getElementById('full-name').textContent === "Admin") {
  var nckhadmin = document.getElementById('nckh-admin');
  document.getElementById("profile-avatar").src = "assets/img/profile-avatar-male-2.jpg";
  nckhadmin.style.display = "block";
}