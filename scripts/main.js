let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () =>{
    cart.classList.add("active");
}
closeCart.onclick = () =>{
    cart.classList.remove("active");
}

if (document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons)
    for(var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem);
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for(var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener("change", quantityChanged);
    }
    var addCart = document.getElementsByClassName('add-cart')
    for(var i = 0; i < addCart.length; i++){
        var button = addCart[i]
        button.addEventListener("click", addCartClicked);
    }
    //Buy Button Work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);

}


// Buy Button

function buyButtonClicked(){
    alert('Pedido concluido')
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}
//Remove items Cart
function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateTotal();
}
function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal();
}
// Add Cart

function addCartClicked(event){
    var button = event.target
    var shopPorducts = button.parentElement
    var title = shopPorducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopPorducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopPorducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    
    var cartBoxContent = `
        <img src=${productImg} alt="" class="cart-img" width="100px" height="100px">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <ion-icon name="trash-outline" class="cart-remove"></ion-icon>`;
    
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
    
    updateTotal();
}

// Update Total
function updateTotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0]
    var cartBoxes = cartContent.getElementsByClassName('cart-box')
    var total = 0;
    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName('cart-price')[0]
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace("R$", ""));
        var quantity = quantityElement.value
        total = total + (price * quantity);
    }
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName('total-price')[0].innerText = "R$" + total;
    
}

// Seleciona o ícone do menu e o menu de navegação
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.getElementById('nav-links');

// Adiciona um ouvinte de evento para alternar a classe 'active' no menu
mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

