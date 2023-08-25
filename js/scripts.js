//UI Element
let form = document.querySelector("#book-form")
let booklist = document.querySelector("#book-list")

//Book Class
class Book{
    constructor(title,author,isbn){
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

//UI Class
class UI{
    static addBookList(book){
        let list = document.querySelector("#book-list")
        let row = document.createElement("tr")
        row.innerHTML = 
        `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="" class="delete">X</a></td>
        `
        list.appendChild(row)
    }

    static showAlert(msg,className){
        let div = document.createElement("div")
        div.className =`alert ${className}`
        div.appendChild(document.createTextNode(msg))
        let container = document.querySelector(".container")
        let form = document.querySelector("#book-form")
        container.insertBefore(div,form)
        setTimeout(function(){
            document.querySelector(".alert").remove()
        },3000)
    }

    static deleteFromBook(target){
        if(target.hasAttribute("href")){
            target.parentElement.parentElement.remove()
            Store.deleteBook(target.parentElement.previousElementSibling.textContent.trim())
            UI.showAlert("Book deleted successfully","success")
        }
    }

    static clearFields(){
        document.querySelector("#title").value = ''
        document.querySelector("#author").value = ''
        document.querySelector("#isbn").value = ''
    }
}

//Define functions
function newBook(event){
    event.preventDefault()
    let title = document.querySelector("#title").value
    let author = document.querySelector("#author").value
    let isbn = document.querySelector("#isbn").value
    if(title === '' || author === '' || isbn === ''){
        UI.showAlert("Please fill all the fields","error");
    }else{
        let book = new Book(title,author,isbn)
        UI.addBookList(book)
        Store.addBook(book)
        UI.showAlert("Book Added Successfully","success")
        UI.clearFields()
    }
}

function removeBook(event){
    event.preventDefault()
    UI.deleteFromBook(event.target)
}

//Local storage handeler
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem("books") === null){
            books = []
        }else{
            books = JSON.parse(localStorage.getItem("books"))
        }
        return books
    }

    static addBook(book){
        let books = Store.getBooks()
        books.push(book)
        localStorage.setItem("books",JSON.stringify(books))
    }

    static displayBooks(){
        let books = Store.getBooks()
        books.forEach(book => {
            UI.addBookList(book)
        });
    }

    static deleteBook(isbn){
        let books = Store.getBooks()
        books.forEach((book,index)=>{
            if(book.isbn === isbn){
                books.splice(index,1)
            }
        })
        localStorage.setItem("books",JSON.stringify(books))
    }
}

//Event listener
form.addEventListener("submit",newBook)
booklist.addEventListener("click",removeBook)
document.addEventListener("DOMContentLoaded",Store.displayBooks())