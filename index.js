const form = document.getElementById("registration-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
});

const COLLEGE_LIST_API_URL = "https://rh-proxy.herokuapp.com/colleges";
const AllLettersRegex = /^^[a-zA-Z ]*$/;
const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function submitAction(form) {
  if (!validateForm(form)) {
    return false;
  }

  openSubmitModal(form);
  return true;
}

function validateForm(form) {
  const fname = form.first_name;
  const email = form.email;
  const mobile = form.mobile;
  const gender = form.gender;
  const dob = form.dob;

  return (
    validateName(fname) &&
    validateMobile(mobile) &&
    validateEmail(email) &&
    validateGender(gender) &&
    validateDateOfBirth(dob)
  );
}

function validateName(name) {
  if (name.value.match(AllLettersRegex)) return true;
  alert("Name should not contain numbers and special characters");
  name.focus();
  return false;
}

function validateEmail(email) {
  if (email.value.match(mailRegex)) return true;
  alert("Please enter valid email");
  email.focus();
  return false;
}

function validateMobile(mobile) {
  if (mobile.value.length <= 10) return true;
  alert("Mobile number should have maximum 10 digits");
  mobile.focus();
  return false;
}

function validateGender(gender) {
  if (gender.value) return true;
  alert("Please select your gender");
  return false;
}

function validateDateOfBirth(dob) {
  const date = new Date(dob.value);
  const currDate = new Date();
  if (date <= currDate) return true;
  alert("Enter valid Date of Birth");
  date.focus();
  return false;
}

function openSubmitModal() {
  const name = form.first_name.value + " " + form.last_name.value;
  const gender = form.gender.value;
  const dob = form.dob.value;

  const email = form.email.value;
  const mobile = form.mobile.value;
  const location = form.current_location.value;

  const htmlSkill = form.lang_html.value;
  const cssSkill = form.lang_css.value;
  const jsSkill = form.lang_js.value;

  console.log({ email, mobile, dob });
  overlay.style.display = "flex";
  console.log(document.getElementById("email"));
  document.getElementById("final_name").textContent = name;
  document.getElementById("final_gender").textContent = gender;
  document.getElementById("final_dob").textContent = dob;
  document.getElementById("final_email").textContent = email;
  document.getElementById("final_mobile").textContent = mobile;
  document.getElementById("final_location").textContent = location;
  document.getElementById(
    "final_skills"
  ).textContent = `HTML: ${htmlSkill}\tCSS: ${cssSkill}\tJavaScript: ${jsSkill}`;
}

async function getAndAppendCollegeList() {
  const response = await fetch(COLLEGE_LIST_API_URL);
  const collegeList = await response.json();

  collegeList.forEach((c) => {
    const collegeOption = document.createElement("option");
    collegeOption.value = c;
    collegeOption.text = c.name;
    document.getElementById("college_select_list").appendChild(collegeOption);
  });
}

getAndAppendCollegeList();
