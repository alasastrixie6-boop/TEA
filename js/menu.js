
const PRODUCTS = [
  // ==================== DRINKS ====================
  {
    id: 'd1',
    name: 'Bubble Tea',
    cat: 'Drinks',
    base: 120,
    img: 'Bubble Tea.jpg',
    avail: true
  },
  {
    id: 'd2',
    name: 'Caramel Frappuccino',
    cat: 'Drinks',
    base: 150,
    img: 'Caramel Frappuccino.jpg',
    avail: true
  },
  {
    id: 'd3',
    name: 'Coconut Macchiato',
    cat: 'Drinks',
    base: 145,
    img: 'Coconut Macchiato.jpg',
    avail: true
  },
  {
    id: 'd4',
    name: 'Creamy Strawberry Frappuccino',
    cat: 'Drinks',
    base: 150,
    img: 'Creamy Strawberry frappuccino.jpg',
    avail: true
  },
  {
    id: 'd5',
    name: 'Iced Matcha Latte',
    cat: 'Drinks',
    base: 150,
    img: 'Iced Matcha Latte.jpg',
    avail: true
  },
  {
    id: 'd6',
    name: 'Iced Mocha Frappuccino',
    cat: 'Drinks',
    base: 155,
    img: 'Iced Mocha Frappuccino.jpg',
    avail: true
  },
  {
    id: 'd7',
    name: 'Okinawa',
    cat: 'Drinks',
    base: 135,
    img: 'Okinawa.png',
    avail: true
  },
  {
    id: 'd8',
    name: 'Strawberry Matcha Latte',
    cat: 'Drinks',
    base: 160,
    img: 'Strawberry Matcha Latte.jpg',
    avail: true
  },
  {
    id: 'd9',
    name: 'Taro Latte',
    cat: 'Drinks',
    base: 135,
    img: 'Tarro Latte.jpg',
    avail: true
  },

  // ============== FOOD & DESSERTS ==============
  {
    id: 'f1',
    name: 'Biscoffee',
    cat: 'Food & Desserts',
    base: 120,
    img: 'Biscoffee.jpg',
    avail: true
  },
  {
    id: 'f2',
    name: 'Blackberries Cheesecake',
    cat: 'Food & Desserts',
    base: 140,
    img: 'Blackberries Cheesecake.jpg',
    avail: true
  },
  {
    id: 'f3',
    name: 'Cheesecake Oreo Sans Cuisson',
    cat: 'Food & Desserts',
    base: 145,
    img: 'Cheesecake Oreo Sans Cuisson.jpg',
    avail: true
  },

  {
    id: 'f5',
    name: 'Cookie Butter Cupcakes',
    cat: 'Food & Desserts',
    base: 110,
    img: 'Cookie Butter Cupcakes.jpg',
    avail: true
  },
  {
    id: 'f6',
    name: 'Hershey Chocolate Cake',
    cat: 'Food & Desserts',
    base: 130,
    img: 'Hershey Chocolate Cake.jpg',
    avail: true
  }
];

// ==================== CUSTOMIZATION ====================

const SIZES = {
  Small: 0,
  Medium: 20,
  Large: 40
};

const SUGARS = ['0%', '25%', '50%', '75%', '100%'];

const ICES = [
  'No Ice',
  'Less Ice',
  'Normal Ice',
  'Extra Ice'
];

const ADDONS = {
  Pearls: 25,
  Pudding: 30,
  'Cheese Foam': 45,
  'Crystal Boba': 20
};

let currentFilter = 'All';
let currentSearch = '';

// ==================== RENDER MENU ====================

function renderMenu() {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;

  grid.innerHTML = '';

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory =
      currentFilter === 'All' ||
      product.cat === currentFilter;

    const matchesSearch =
      product.name.toLowerCase().includes(
        currentSearch.toLowerCase()
      );

    return matchesCategory && matchesSearch;
  });

  if (filteredProducts.length === 0) {
    grid.innerHTML = '<p>No products found.</p>';
    return;
  }

  const categories = currentFilter === 'All'
    ? ['Drinks', 'Food & Desserts']
    : [currentFilter];

  categories.forEach(category => {
    const products = filteredProducts.filter(
      product => product.cat === category
    );

    if (products.length === 0) return;

    const heading = document.createElement('h2');
    heading.textContent = category;
    heading.style.gridColumn = '1 / -1';
    grid.appendChild(heading);

    products.forEach(product => {
      const isDrink = product.cat === 'Drinks';
      const card = document.createElement('div');
      card.className = 'card';

      // Product image
      const img = document.createElement('img');

      // Assumes images are stored beside index.html
      img.src = encodeURI(product.img);
      img.alt = product.name;
      img.loading = 'lazy';

      img.onerror = function () {
        this.onerror = null;
        this.alt = product.name + ' image unavailable';
        this.style.display = 'none';
      };

      card.appendChild(img);

      // Product name
      const name = document.createElement('h3');
      name.textContent = product.name;
      card.appendChild(name);

      // Availability
      const badge = document.createElement('span');
      badge.className =
        'badge ' + (product.avail ? 'ok' : 'soldout');

      badge.textContent =
        product.avail ? 'Available' : 'Sold Out';

      card.appendChild(badge);

      // Base price
      const price = document.createElement('p');
      price.className = 'price';
      price.textContent = TH.money(product.base);
      card.appendChild(price);

      // Size selection
      const sizeGroup = document.createElement('div');
      sizeGroup.className = 'form-group';
      sizeGroup.innerHTML = '<label>Size</label>';

      const sizeSelect = document.createElement('select');
      sizeSelect.className = 'size';

      Object.keys(SIZES).forEach(size => {
        const option = document.createElement('option');
        option.value = size;
        option.textContent = size;
        sizeSelect.appendChild(option);
      });

      sizeGroup.appendChild(sizeSelect);
      card.appendChild(sizeGroup);

      let sugarSelect = null;
      let iceSelect = null;
      let addonSelect = null;

      // Drink customization only
      if (isDrink) {
        const sugarGroup = document.createElement('div');
        sugarGroup.className = 'form-group';
        sugarGroup.innerHTML = '<label>Sugar</label>';

        sugarSelect = document.createElement('select');
        sugarSelect.className = 'sugar';

        SUGARS.forEach(sugar => {
          const option = document.createElement('option');
          option.value = sugar;
          option.textContent = sugar;
          sugarSelect.appendChild(option);
        });

        sugarGroup.appendChild(sugarSelect);
        card.appendChild(sugarGroup);

        const iceGroup = document.createElement('div');
        iceGroup.className = 'form-group';
        iceGroup.innerHTML = '<label>Ice</label>';

        iceSelect = document.createElement('select');
        iceSelect.className = 'ice';

        ICES.forEach(ice => {
          const option = document.createElement('option');
          option.value = ice;
          option.textContent = ice;
          iceSelect.appendChild(option);
        });

        iceGroup.appendChild(iceSelect);
        card.appendChild(iceGroup);

        const addonGroup = document.createElement('div');
        addonGroup.className = 'form-group';
        addonGroup.innerHTML = '<label>Add-ons</label>';

        addonSelect = document.createElement('select');
        addonSelect.className = 'addon';

        const none = document.createElement('option');
        none.value = '';
        none.textContent = 'None';
        addonSelect.appendChild(none);

        Object.entries(ADDONS).forEach(([addon, cost]) => {
          const option = document.createElement('option');
          option.value = addon;
          option.textContent =
            `${addon} (+${TH.money(cost)})`;

          addonSelect.appendChild(option);
        });

        addonGroup.appendChild(addonSelect);
        card.appendChild(addonGroup);
      }

      // Dynamic price
      const liveRow = document.createElement('p');
      liveRow.append('Price: ');

      const livePrice = document.createElement('strong');
      livePrice.className = 'liveprice';
      livePrice.textContent = TH.money(product.base);

      liveRow.appendChild(livePrice);
      card.appendChild(liveRow);

      function calculatePrice() {
        let amount =
          product.base + SIZES[sizeSelect.value];

        if (addonSelect && addonSelect.value) {
          amount += ADDONS[addonSelect.value];
        }

        return amount;
      }

      function updatePrice() {
        livePrice.textContent = TH.money(calculatePrice());
      }

      sizeSelect.addEventListener('change', updatePrice);

      if (addonSelect) {
        addonSelect.addEventListener('change', updatePrice);
      }

      // Add to cart
      const addButton = document.createElement('button');
      addButton.className = 'btn addBtn';
      addButton.textContent = 'Add to Cart';
      addButton.disabled = !product.avail;

      addButton.addEventListener('click', () => {
        if (!product.avail) {
          TH.toast('Sold out');
          return;
        }

        const cart = TH.loadCart();

        cart.push({
          id: Date.now() + Math.random(),
          drinkId: product.id,
          productId: product.id,
          name: product.name,
          category: product.cat,
          size: sizeSelect.value,
          sugar: sugarSelect ? sugarSelect.value : 'N/A',
          ice: iceSelect ? iceSelect.value : 'N/A',
          addon: addonSelect && addonSelect.value
            ? addonSelect.value
            : 'None',
          price: calculatePrice(),
          qty: 1
        });

        TH.saveCart(cart);
        TH.toast('Added to cart');
        renderCart();
      });

      card.appendChild(addButton);
      grid.appendChild(card);
    });
  });
}

// ==================== RENDER CART ====================

function renderCart() {
  const box = document.getElementById('cartBox');
  if (!box) return;

  const cart = TH.loadCart();
  const totalElement = document.getElementById('cartTotal');

  if (cart.length === 0) {
    box.innerHTML = '<p>Your cart is empty.</p>';

    if (totalElement) {
      totalElement.textContent = TH.money(0);
    }

    return;
  }

  box.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const row = document.createElement('div');
    row.className = 'cart-item';

    const details = document.createElement('span');
    details.textContent =
      `${item.name} (${item.size}; ` +
      `Sugar: ${item.sugar}; Ice: ${item.ice}; ` +
      `Add-ons: ${item.addon})`;

    const controls = document.createElement('span');
    controls.append(`${TH.money(item.price)} x `);

    const quantity = document.createElement('input');
    quantity.type = 'number';
    quantity.min = '1';
    quantity.value = item.qty;
    quantity.style.width = '50px';

    quantity.addEventListener('change', event => {
      item.qty = Math.max(
        1,
        parseInt(event.target.value, 10) || 1
      );

      cart[index] = item;
      TH.saveCart(cart);
      renderCart();
    });

    const removeButton = document.createElement('button');
    removeButton.className = 'qty-btn rem';
    removeButton.textContent = 'x';

    removeButton.addEventListener('click', () => {
      cart.splice(index, 1);
      TH.saveCart(cart);
      renderCart();
    });

    controls.append(quantity, ' ', removeButton);
    row.append(details, controls);
    box.appendChild(row);
  });

  if (totalElement) {
    totalElement.textContent = TH.money(total);
  }
}

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  renderCart();

  document.getElementById('searchInput')
    ?.addEventListener('input', event => {
      currentSearch = event.target.value;
      renderMenu();
    });

  document.getElementById('catFilter')
    ?.addEventListener('change', event => {
      currentFilter = event.target.value;
      renderMenu();
    });

  document.querySelectorAll('.catBtn')
    .forEach(button => {
      button.addEventListener('click', () => {
        currentFilter = button.dataset.cat;

        const filter = document.getElementById('catFilter');
        if (filter) filter.value = currentFilter;

        renderMenu();
      });
    });
});

// Compatibility with existing project scripts
window.TH_DRINKS = PRODUCTS;
window.TH_PRODUCTS = PRODUCTS;
