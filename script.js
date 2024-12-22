// JSON Data
const menuData = {
    "range": "Sheet1!A1:D10",
    "majorDimension": "ROWS",
    "values": [
      ["Name", "Image URL", "Price", "Category"],
      ["Special Salad", "images/special_salad.jpg", "700 Birr", "Salads 🥗"],
      ["Basic Salad", "images/basic_salad.jpg", "900 Birr", "Salads 🥗"],
      ["Egg on toast", "images/toast.png", "700 Birr", "Brunch 🥖"],
      ["Baguette", "images/baguette.png", "900 Birr", "Brunch 🥖"],
      ["Tea", "images/tea.png", "300 Birr", "Drinks ☕️"],
      ["Red tea", "images/red-tea.png", "400 Birr", "Drinks ☕️"],
      ["Espresso", "images/espresso.png", "5 Birr", "Drinks ☕️"],
      ["Coffee", "images/coffee.png", "3 Birr", "Drinks ☕️"],
      ["Cappuccino", "images/cappuccino.jpg", "4 Birr", "Drinks ☕️"]
    ]
  };
  
  
  // Process Data
  const menuItems = menuData.values.slice(1); // Exclude headers
  const categories = {};
  
  // Group items by categories
  menuItems.forEach(([name, imageUrl, price, category]) => {
    if (!categories[category]) categories[category] = [];
    categories[category].push({ name, imageUrl, price });
  });
  
  // Generate Sticky Header Links
  const categoryNav = document.getElementById('category-nav');
  Object.keys(categories).forEach(category => {
    const link = document.createElement('a');
    link.textContent = category;
     const categoryId = category.replace(/\s/g, ''); // Remove spaces
    link.href = `#${categoryId}`;
    categoryNav.appendChild(link);
  });
  
  // Render Menu Items by Category
  const menuContainer = document.getElementById('menu-container');
  Object.entries(categories).forEach(([category, items]) => {
    // Create Section
    const section = document.createElement('section');
    const categoryId = category.replace(/\s/g, ''); // Remove spaces
     section.id = categoryId;
    section.className = 'category-section';
  
    // Add Header (Make it a link now)
    const headerLink = document.createElement('a');
     headerLink.href = `#${categoryId}`;
     headerLink.innerHTML = `<h2 class="category-header">${category}</h2>`;
     section.appendChild(headerLink);
  
    // Add Items
    items.forEach(({ name, imageUrl, price }) => {
      const menuItem = document.createElement('div');
      menuItem.className = 'menu-item';
      menuItem.innerHTML = `
      <img src="${imageUrl}" alt="${name}">
      <i class="fas fa-heart heart-icon"></i>
          <h3>${name}</h3>
          <p class="price">${price}</p>
      `;
      section.appendChild(menuItem);
    });
  
    menuContainer.appendChild(section);
  });

  // Add event listeners to the heart icons
  menuContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('heart-icon')) {
          event.target.classList.toggle('liked');
      }
  });