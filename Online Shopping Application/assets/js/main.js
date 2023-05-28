window.addEventListener("load", initEvents);

function initEvents() {
    document.querySelector("#save").addEventListener("click", saveChanges);
    document.querySelector("#search").addEventListener("keyup", searchProduct);

    showProducts();
    loadProducts();
}

function saveChanges() {
    if (window.localStorage) {
        var json = JSON.stringify(obj.itemList);
        localStorage.setItem('cartProducts', json);


    } else {
        alert("Your Browser Doen't support Local storage feature");
    }
}

function loadProducts() {
    if (localStorage.cartProducts) {
        var data = JSON.parse(localStorage.cartProducts);
        obj.itemList = data;
        displayCartItem()


    }

}


function searchProduct() {
    var toSearch = event.srcElement.value;
    products = products.filter(function(obj) {
        return obj.p_name.toLowerCase().includes(toSearch.toLowerCase());

    });
    console.log(products);

    showProducts();

}


var row;

function showProducts() {
    var section = document.querySelector("#products");
    section.innerHTML = "";
    row = document.createElement("div");
    row.className = "row";
    products.forEach(function(obj) {
        var div = document.createElement("div");
        div.className = "products col-lg-4 col-md-6 col-sm-12";
        div.setAttribute('title', obj.p_id);
        var p_name = document.createElement("span");
        p_name.innerHTML = obj.p_name;

        var p_price = document.createElement("span");
        p_price.innerHTML = obj.p_price;

        var p_image = document.createElement("img");
        // p_image.src = obj.p_image;
        p_image.setAttribute('src', obj.p_image);
        var cart_button = document.createElement("button");
        cart_button.innerHTML = "ADD TO CART";
        cart_button.className = "btn btn-primary w-100";
        cart_button.addEventListener("click", add);
        div.appendChild(p_image);
        div.appendChild(p_name);
        div.appendChild(p_price);
        div.appendChild(cart_button);

        row.appendChild(div);


    })
    var container = document.createElement("div");
    container.className = "container-fluid";
    container.appendChild(row);
    section.appendChild(container);


}

function add() {
    var elem = event.srcElement.parentNode;
    var product = elem.childNodes;
    var elemId = elem.title;
    obj.addItem(elemId, product[1].innerHTML, product[2].innerHTML, product[0].src);
    // console.log(obj.itemList);
    displayCartItem();
}

function displayCartItem() {
    var ul = document.querySelector("#cartItems");
    ul.innerHTML = "";
    ul.className = "list-group"
    obj.itemList.forEach(function(elem) {
        var li = document.createElement("li");
        li.className = "product list-group-item";
        li.setAttribute('title', elem.id);


        var p_name = document.createElement("span");
        p_name.innerHTML = elem.name;

        var p_price = document.createElement("span");
        p_price.innerHTML = elem.price;

        var p_image = document.createElement("img");
        p_image.setAttribute('src', elem.image);
        p_image.className = "productImage";

        var delete_btn = document.createElement('button');
        delete_btn.className = "btn btn-danger text-white ml-auto";
        delete_btn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        delete_btn.addEventListener("click", deleteProducts);

        li.appendChild(p_image);

        li.appendChild(p_name);


        li.appendChild(p_price);

        li.appendChild(delete_btn);
        ul.appendChild(li);



    });



}

function deleteProducts() {
    var elem = event.srcElement.parentElement;
    var id = elem.title;
    obj.deleteItem(id);
    console.log(obj.itemList);
    displayCartItem()
}