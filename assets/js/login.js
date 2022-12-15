//JSON ARRAY

var giaovien = [];

var gv1 = {
  "fullname": "Thien Nhan",
  "lectid": "B2005767",
  "gender": "Nam",
  "age": "20",
  "level": "Tiến sĩ",
  "rank": "Giáo sư",
  "college": "Truyền thông đa phương tiện",
  "position": "Phó chủ nhiệm",
  "home": "Ninh Kiều, Cần Thơ",
  "username": "nhan@cit.ctu.edu.vn",
  "password": "nhanhihi",
  "phone": "0987654321"
};

var gv2 = {
  "fullname": "Admin",
  "lectid": "A2005767",
  "gender": "Nam",
  "age": "21",
  "level": "Tiến sĩ",
  "rank": "Giáo sư",
  "college": "Truyền thông đa phương tiện",
  "position": "Chủ nhiệm",
  "home": "Cái Răng, Cần Thơ",
  "username": "admin@cit.ctu.edu.vn",
  "password": "adminhihi",
  "phone": "0908070605"
};
giaovien.push(gv1);
giaovien.push(gv2);
localStorage.setItem("giaovien", JSON.stringify(giaovien));


//CAPTCHA CODE
//Initial References
let submitButton = document.getElementById("signin-btn");
let userInput = document.getElementById("user-input");
let canvas = document.getElementById("canvas");
let reloadButton = document.getElementById("reload-button");
let text = "";
const givenSet = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789";

//Generate Text
const textGenerator = () => {
  let generatedText = "";
  /* String.fromCharCode gives ASCII value from a given number */
  // total 9 letters hence loop of 3
  for (let i = 0; i < 5; i++) {
    let pos = Math.floor(Math.random() * givenSet.length);
    generatedText += givenSet[pos];
  }
  return generatedText;
};


//Generate random numbers between a given range
const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

//Canvas part
function drawStringOnCanvas(string) {
  //The getContext() function returns the drawing context that has all the drawing properties and functions needed to draw on canvas
  let ctx = canvas.getContext("2d");
  //clear canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //array of text color
  const textColors = ["rgb(0,0,0)", "rgb(130,130,130)"];
  //space between letters
  const letterSpace = 150 / string.length;
  //loop through string
  for (let i = 0; i < string.length; i++) {
    //Define initial space on X axis
    const xInitialSpace = 25;
    //Set font for canvas element
    ctx.font = "20px Roboto Mono";
    //set text color
    ctx.fillStyle = textColors[randomNumber(0, 1)];
    ctx.fillText(
      string[i],
      xInitialSpace + i * letterSpace,
      randomNumber(25, 40),
      100
    );
  }
}

//Initial Function
var captchavar = 0;
function triggerFunction() {
  //clear Input
  userInput.value = "";
  text = textGenerator();
  console.log(text);
  //Randomize the text so that everytime the position of numbers and small letters is random
  text = [...text].sort(() => Math.random() - 0.5).join("");
  drawStringOnCanvas(text);
}

//call triggerFunction for reload button
reloadButton.addEventListener("click", triggerFunction);

//call triggerFunction when page loads
window.onload = () => triggerFunction();

//When user clicks on submit
submitButton.addEventListener("click", () => {
  //check if user input  == generated text
  if (userInput.value === text) {
    captchavar = 1;
  } else {
    triggerFunction();
  }
});

//LOGIN CHECK USER-PWD
function frmValidate() {
  var frm = document.forms['login'];
  var user = frm.user;
  var pw = frm.pw;
  
  for (var i = 0; i <= giaovien.length - 1; i++) {
    if ((user.value == giaovien[i].username) && (pw.value == giaovien[i].password) && captchavar == 1) {
      //alert('Đăng nhập thành công!');
      localStorage.setItem('full-name', giaovien[i].fullname);
      localStorage.setItem('lect-id', giaovien[i].lectid);
      localStorage.setItem('college', giaovien[i].college);
      localStorage.setItem('position', giaovien[i].position);
      localStorage.setItem('gender', giaovien[i].gender);
      localStorage.setItem('age', giaovien[i].age);
      localStorage.setItem('level', giaovien[i].level);
      localStorage.setItem('rank', giaovien[i].rank);
      localStorage.setItem('home', giaovien[i].home);
      localStorage.setItem('username', giaovien[i].username);
      localStorage.setItem('password', giaovien[i].password);
      localStorage.setItem('phone', giaovien[i].phone);
      return true;
    }
  }
  if(captchavar == 1) {
    alert('Tài khoản hoặc mật khẩu sai!');
    location.reload();
    return false;
  }
  else if(captchavar == 0) {
    alert('Mã xác thực không hợp lệ!');
    location.reload();
    return false;
  }
}

//LOGIN CHECK USER-SĐT
function frmValidateForgot() {
  var frm = document.forms['forgot-pwd'];
  var user = frm.user;
  var phonenum = frm.phone;

  for (var i = 0; i <= giaovien.length - 1; i++) {
    if ((user.value == giaovien[i].username) && (phonenum.value == giaovien[i].phone)) {
      alert("Xác nhận tài khoản thành công!");
      return true;
    }
  }
  alert('Địa chỉ email và số điện thoại không trùng khớp!');
  document.getElementById('forgot-pw').reset();
  return false;
}

//WARNING CAPLOCK PASSWORD
var input = document.getElementById("floatingPassword");
var capslock = document.getElementById("capslock");
input.addEventListener("keyup", function (event) {

  if (event.getModifierState("CapsLock")) {
    capslock.style.display = "block";
  } else {
    capslock.style.display = "none"
  }
});


// WARNING EMAIL FORMAT
const email = document.querySelector('#email');
const signin = document.querySelector('#signin-btn');

signin.addEventListener('click', () => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity('Vui lòng nhập đúng định dạng email!');
  } else {
    email.setCustomValidity('');
  }
})


//CHANGE PASSWORD
function frmResetPass() {
  var frm = document.forms['reset-pass'];
  var newpass = frm.newpass;
  var renewpass = frm.renewpass;
  var strongRegex = /^[a-zA-Z0-9!@#$%^&*]{8,}$/;
  if (newpass.value.length < 8) {
    alert("Mật khẩu phải tối thiểu 8 ký tự!");
    newpass.focus();
    return false;
  }
  else if (!strongRegex.test(newpass.value)) {
    alert("Mật khẩu không được chứa khoảng cách hoặc ký tự đặc biệt không cho phép!");
    newpass.focus();
    return false;
  }
  else if (newpass.value != renewpass.value) {
    alert("Mật khẩu nhập lại không trùng khớp!");
    document.getElementById('reset-pw').reset();
    return false;
  }
  else {
    alert("Đặt lại mật khẩu thành công!");
    //var gv2 = { "fullname": "Thien Nhan", "username": "nhan@cit.ctu.edu.vn", "password": "nhanhihi", "phone": "0987654321" }
    //giaovien.push(gv2);
    //giaovien[giaovien.length - 1].password = newpass.value;
    // localStorage.setItem('full-name',giaovien[giaovien.length-1].fullname); 
    // localStorage.setItem('pass-word',giaovien[giaovien.length-1].password); 
    //localStorage.setItem("giaovien", JSON.stringify(giaovien));
    return true;
  }

}