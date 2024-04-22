const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});
let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

var cartData = [];

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        cartData.push({name: search.name, count: item, total: item*search.price,})
        return `
      <div class="cart-item">
        <img width="100"   border-radius: 5px; src=${search.img} alt="" />
        <div class="details">
          <div class="title-price-x">
              <h4 class="title-price">
                <p>${search.name}</p>
                <p class="cart-item-price">&#8358;${search.price}</p>
              </h4>
              <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          </div>
          
          <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>
          <h3>&#8358;${item * search.price}</h3>
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="chome.html">
      <button class="HomeBtn">Back to home</button>
    </a>
    `;
  }
};

generateCartItems();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

var amount;

let TotalAmount = () => {
  if (basket.length !== 0) {
    amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    label.innerHTML = `
    <h2>Total Bill : &#8358;${amount}</h2>
    <a href="chome.html">
      <button class="removeAll">Back</button>
    </a>
    <button onclick="clearCart()" class="checkout">Clear cart</button>
    `;
  } else return;
};

TotalAmount();



var delfee;
var entries;
var entry;

let TotalFee = () => {
  entries = {
    abule: 200,
    agege: 300,
    agidingbi: 500,
    aguda: 300,
    ajah: 200,
    ajegunle: 500,
    ajeromiIfelodun: 200,
    akerele: 300,
    akoka: 200,
    alaba: 300,
    alausa: 500,
    alimosho: 300,
    apapa: 200,
    badagry: 300,
    bariga: 500,
    coker: 300,
    dopemu: 200,
    ebuteMetta: 300,
    epe: 200,
    festacTown: 500,
    gbagada: 200,
    idumota: 300,
    ifakoIjaye: 200,
    ijesha: 500,
    ikeja: 200,
    ikorodu: 300,
    ikoyi: 500,
    ilupeju: 300,
    iyanaIpaja: 500,
    ketu: 300,
    lagosIsland: 200,
    lagosMainland: 300,
    lawanson: 200,
    lekki: 300,
    marina: 200,
    maryland: 500,
    mazaMaza: 200,
    mende: 300,
    mile2: 200,
    mushin: 300,
    obalende: 200,
    ogba: 300,
    ojo: 200,
    ojoduBerger: 500,
    ojota: 200,
    ojuelegba: 300,
    onipanu: 500,
    oregun: 300,
    oshodiIsolo: 200,
    palmgrove: 500,
    satelliteTown: 200,
    shomolu: 300,
    surulere: 500,
    takwaBay: 300,
    tinubuSquare: 200,
    victoriaIsland: 500,
    yaba: 500,
    others:1000
  };
  document.querySelector("#select").addEventListener("change", (e) => {
    entry = e.target.value;
    delfee = entries[entry]
    document.querySelector("#input").innerHTML = `Your delivery fee is <b>${delfee}</b> ✅`
    console.log(delfee)
  })

};
TotalFee();
var desc = JSON.stringify(cartData);
let hidePop = document.getElementById("hidePop");


console.log({amount, delfee})
const form = document.getElementById("payForm");
form.addEventListener("submit", payNow);

function payNow(e) {
  e.preventDefault();

  const txRef = "ckr_" + Math.floor(Math.random() * 1000000000 + 1); //Generate a random id for the transaction reference
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const region = document.getElementById("select").value;

  console.log(delfee)
  totalAmountpaid = amount+delfee+50

  FlutterwaveCheckout({
    public_key: "FLWPUBK-885089a62863b6373ec238181e97688a-X",
    tx_ref: txRef,
    amount: totalAmountpaid,
    currency: "NGN",
    redirect_url: "https://ckr-ssa.vercel.app/success.html",
   
    meta: {
      address: address,
      date: date,
      phone_number: phone,
      time: time,
      region: region,
      itemSelected: desc,
    },

    customer: {
      email: email,
      phone_number: phone,
      name: name,
    },
    customizations: {
      title: "Chefs Kitchen Restaurant",
      description: "Payment for purchase",
      logo: "https://ckr-ssa.vercel.app/assets/images/fav.png",
    },
    onclose: function () {},
    // callback: function (data) {
    //   const reference = data.tx_ref;
    //   console.log("This is the data returned after a charge", data);
    //   if (data.tx.chargedata == "00" || data.tx.chargedata == "0") {
    //     window.location = "https://ckr-lipeunim.vercel.app/success.html";
    //     // redirect to a success page
    //   } else {
    //     window.location = "https://ckr-lipeunim.vercel.app/failure.html";
    //     // redirect to a failure page.
    //   }
    // },
  });

  basket = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));

  hidePop.classList.add("hidePop");
}
