//loadItems (Fetch json file (shop_items))
function loadItems() {
  return fetch('json/shopping_data.json')
    .then(response => response.json())
    .then(json => json.shop_items);
}

//displayItems
function displayItems(shop_items) {
  const container = document.querySelector('.shop_items');
  container.innerHTML = shop_items.map(item => createHTML_list(item)).join('');
}

//createHTML_list
function createHTML_list(item) {
  return `
    <li class="item">
      <img src="${item.img}" alt="${item.type}" class="item_image">
      <span class="item_contents">${item.gender} - ${item.size}</span>
    </li>
    `;
}

//setEventListener
function setEventListeners(shop_items) {
  const logo = document.querySelector('.shop_logo');
  const buttons = document.querySelector('.imgBtn');
  logo.addEventListener('click', () => displayItems(shop_items));
  buttons.addEventListener('click', event => onButtonClick(event, shop_items)); 
}

//onButtonClick
function onButtonClick(event, shop_items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;
  
  if (key == null || value == null) {
    return;
  }
  displayItems(shop_items.filter(item => item[key] === value));
}

// Load,display Items & Event
loadItems()
  .then(shop_items => {
    displayItems(shop_items);
    setEventListeners(shop_items);
  })
  .catch(console.log);