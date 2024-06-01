var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");


var bookMarksList;
if (localStorage.getItem("books") == null) {
    bookMarksList = [];
} else {
    bookMarksList = JSON.parse(localStorage.getItem("books"));
    display();
}
function addBookMark() {
    if (
        siteNameInput.classList.contains("is-valid") &&
        siteUrlInput.classList.contains("is-valid") 
      ) {

        var bookMark = {
        bookName : siteNameInput.value,
        url : siteUrlInput.value
    };

    bookMarksList.push(bookMark);
    localStorage.setItem("books", JSON.stringify(bookMarksList));
    display()
    clear();
      }

      else {
        document.getElementById("validationPrompat").classList.remove("visually-hidden");
        document.getElementById("validationPrompat").classList.add("visible");
      }
    
}

function display() {
    var box = ``;
    for (var i = 0; i < bookMarksList.length; i++) {
      box += `
      <tr>
            <td class="text-center">${i+1}</td>
            <td class="text-center">${bookMarksList[i].bookName}</td>
            <td class="text-center">
                <button class="btn btn-success">
                <a href="${bookMarksList[i].url}" target="_blank" >
                    <i class="fa-solid fa-eye pe-0"></i>
                    visit
                </button>
            </td>
            <td class="text-center">
                <button onclick="deletebook(${i})" class="btn btn-danger">
                    <i class="fa-solid fa-trash-can d-inline-block"></i>
                    Delete
                </button>
            </td>
          </tr>   
      `;
    }
    document.getElementById("data").innerHTML = box;
  }

  function clear() {
    siteNameInput.value = null;
    siteUrlInput.value = null;
  }

  function deletebook(deletedIndex) {
    bookMarksList.splice(deletedIndex, 1);
    localStorage.setItem("books", JSON.stringify(bookMarksList));
    display();
  }


  function validateInput(element) {
    var regex = {
        siteName: /^.{3,20}$/,
      siteUrl: /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/\S*)?$/,
    };
  
    if (regex[element.id].test(element.value)) {
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
      element.nextElementSibling.classList.replace("d-block", "d-none");
    } else {
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
      element.nextElementSibling.classList.replace("d-none", "d-block");
    }
  }

  function exit() {
    var validationPrompat  = document.getElementById("validationPrompat");
    validationPrompat.classList.add("visually-hidden");

  }
 