// global variables
var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var deleteBtn;
var visitBtn;
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");
var bookmarks;

// lma t3ml JSON.stringify b edk al t3ml  JSON.parse =) Eng: nourhan  

if (localStorage.getItem("bookmarksList")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
  for (var x = 0; x < bookmarks.length; x++) {
    displayBookmark(x);
  }
}

//  innerHTML to create a row for desc about bookmark  

function displayBookmark(i) {
  var newBookmark = `
              <tr>
                <td>${i + 1}</td>
                <td>${bookmarks[i].siteName}</td>              
                <td>
                  <button class="btn btn-visit" data-index="${i}">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button class="btn btn-delete pe-2" data-index="${i}">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
            `;
  tableContent.innerHTML += newBookmark;



  //  delete buttons

  deleteBtn = document.getElementsByClassName("btn-delete");
  if (deleteBtn) {
    for (var i = 0; i < deleteBtn.length; i++) {
      deleteBtn[i].addEventListener("click", function (e) {
        deleteBookmark(e);
      });
    }
  }

  // visit buttons

  visitBtn = document.querySelectorAll(".btn-visit");
  if (visitBtn) {
    for (var l = 0; l < visitBtn.length; l++) {
      visitBtn[l].addEventListener("click", function (e) {
        visitWebsite(e);
      });
    }
  }
}

//  Clear Input Function

function clearInput() {
  siteName.value = "";
  siteURL.value = "";
}

//  

function capitalize(e) {
  var strArr = e.split("");
  strArr[0] = strArr[0].toUpperCase();
  return strArr.join("");
}

//  Submit btn

submitBtn.addEventListener("click", function () {
  if (
    siteName.classList.contains("is-valid") &&
    siteURL.classList.contains("is-valid")
  ) {
    var bookmark = {
      siteName: capitalize(siteName.value),
      siteURL: siteURL.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    displayBookmark(bookmarks.length - 1);
    clearInput();
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
  } else {
    boxModal.classList.replace("d-none", "d-flex");
  }
});

//  Delete Function

function deleteBookmark(e) {
  tableContent.innerHTML = "";
  var deletedIndex = e.target.dataset.index;
  bookmarks.splice(deletedIndex, 1);
  for (var k = 0; k < bookmarks.length; k++) {
    displayBookmark(k);
  }
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}

//  Visit Function

function visitWebsite(e) {
  var websiteIndex = e.target.dataset.index;
  open(bookmarks[websiteIndex].siteURL);
}

//  validation regex

var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^https:\/\/[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\.com\/?$/;

// validation siteName

siteName.addEventListener("input", function () {
  validate(siteName, nameRegex);
});

// validation siteURL

siteURL.addEventListener("input", function () {
  validate(siteURL, urlRegex);
});

// if values valid make the class list is valid and  vice versa is invalid

function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

//Close Function

function closeModal() {
  boxModal.classList.add("d-none");
}


// closed btn on click 

closeBtn.addEventListener("click", closeModal);

//close btn when press on Esc 

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeModal();
  }
});

// closed when click out side box

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("box-info")) {
    closeModal();
  }
});