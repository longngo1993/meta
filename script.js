// Simple image rotator for the hero section
document.addEventListener('DOMContentLoaded', function () {
  const images = ['images/hero1.png', 'images/hero2.png', 'images/hero3.png'];
  let currentIndex = 0;
  const heroImg = document.getElementById('hero-image');
  // If a hero image exists on the page (e.g., the homepage), rotate it.
  if (heroImg) {
    setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      heroImg.src = images[currentIndex];
    }, 5000);
  }

  /**
   * Load the shared header from header.html if a placeholder exists.
   * After the header is loaded, initialize search suggestions.
   */
  function loadHeaderAndInit() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
      fetch('header.html')
        .then(function (response) { return response.text(); })
        .then(function (html) {
          headerContainer.innerHTML = html;
          setupSearchSuggestions();
        })
        .catch(function (err) {
          console.error('Error loading header:', err);
          // Even if loading fails, attempt to initialize suggestions
          setupSearchSuggestions();
        });
    } else {
      setupSearchSuggestions();
    }
  }

  /**
   * Initialize search suggestions functionality. This function should be
   * called after the header (containing the search input) has been
   * inserted into the DOM. If the necessary elements are not found,
   * the function safely returns without doing anything.
   */
  function setupSearchSuggestions() {
    const searchInput = document.getElementById('search-input');
    const suggestionsPopup = document.getElementById('suggestions-popup');
    const searchContainer = document.getElementById('search-container');
    if (!searchInput || !suggestionsPopup || !searchContainer) {
      return;
    }
    // Define a static list of suggested products
    const suggestions = [
      {
        name: 'Quạt máy làm mát',
        brand: 'Thương hiệu A',
        price: '299.000đ',
        icon: 'icons/fan.svg'
      },
      {
        name: 'Điều hòa inverter',
        brand: 'Thương hiệu B',
        price: '4.490.000đ',
        icon: 'icons/snowflake.svg'
      },
      {
        name: 'Máy giặt LG',
        brand: 'Thương hiệu LG',
        price: '3.290.000đ',
        icon: 'icons/soap.svg'
      },
      {
        name: 'Tủ lạnh Panasonic',
        brand: 'Thương hiệu Panasonic',
        price: '2.450.000đ',
        icon: 'icons/ice-cream.svg'
      },
      {
        name: 'Máy sấy quần áo',
        brand: 'Thương hiệu C',
        price: '2.990.000đ',
        icon: 'icons/shirt.svg'
      },
      {
        name: 'Máy rửa chén bát',
        brand: 'Thương hiệu D',
        price: '1.899.000đ',
        icon: 'icons/print.svg'
      },
      {
        name: 'Laptop Dell',
        brand: 'Dell',
        price: '8.990.000đ',
        icon: 'icons/laptop.svg'
      },
      {
        name: 'Tai nghe Bluetooth',
        brand: 'Thương hiệu E',
        price: '590.000đ',
        icon: 'icons/headphones.svg'
      }
    ];
    function renderSuggestions(filter = '') {
      const filtered = suggestions.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      );
      if (filtered.length > 0) {
        const html = filtered
          .map(item => {
            return `
              <div class="suggestion-item">
                <img src="${item.icon}" alt="${item.name}">
                <div class="suggestion-details">
                  <span class="suggestion-name">${item.name}</span>
                  <span class="suggestion-brand">${item.brand}</span>
                </div>
                <span class="suggestion-price">${item.price}</span>
              </div>
            `;
          })
          .join('');
        suggestionsPopup.innerHTML = html;
      } else {
        suggestionsPopup.innerHTML = '<div class="no-suggestions">Không tìm thấy gợi ý</div>';
      }
    }
    // Event bindings
    searchInput.addEventListener('focus', () => {
      renderSuggestions(searchInput.value);
      suggestionsPopup.style.display = 'block';
    });
    searchInput.addEventListener('input', () => {
      renderSuggestions(searchInput.value);
      suggestionsPopup.style.display = 'block';
    });
    document.addEventListener('click', (event) => {
      if (!searchContainer.contains(event.target)) {
        suggestionsPopup.style.display = 'none';
      }
    });
    suggestionsPopup.addEventListener('click', (event) => {
      let target = event.target;
      while (target && !target.classList.contains('suggestion-item')) {
        target = target.parentElement;
      }
      if (target && target.classList.contains('suggestion-item')) {
        const nameElement = target.querySelector('.suggestion-name');
        if (nameElement) {
          searchInput.value = nameElement.textContent;
        }
        suggestionsPopup.style.display = 'none';
      }
    });
  }

  /**
   * Load the shared promo bar and header fragments into their respective
   * containers. After the header is inserted, initialize the search
   * suggestion functionality. If containers are not found on the page,
   * gracefully degrade by still running search suggestions if possible.
   */
  function loadHeaderAndPromo() {
    const promoContainer = document.getElementById('promo-container');
    const headerContainer = document.getElementById('header-container');
    /* Predefined HTML for the promo bar and header. These fragments mirror
       the contents of promo.html and header.html respectively, allowing
       pages to reuse the same markup without relying on fetch() calls,
       which can fail under the file:// protocol. */
    const promoHTML =
      '<div class="promo-bar">' +
        '<span>META.vn - Nơi thợ chọn đồ!</span>' +
        '<span>Freeship • Giảm tới 40%</span>' +
      '</div>';
    const headerHTML =
      '<header class="main-header">' +
        '<div class="logo">META</div>' +
        '<div class="search" id="search-container">' +
          '<input type="text" id="search-input" placeholder="Bạn cần tìm kiếm sản phẩm gì?">' +
          '<button>Tìm kiếm</button>' +
          '<div id="suggestions-popup" class="suggestions-popup" style="display: none;"></div>' +
        '</div>' +
        '<div class="header-icons">' +
          '<div class="icon-item">' +
            '<img src="icons/cart-shopping.svg" alt="Giỏ hàng">' +
            '<span>Giỏ hàng</span>' +
          '</div>' +
          '<div class="icon-item">' +
            '<img src="icons/phone.svg" alt="Hotline">' +
            '<span>Hotline</span>' +
          '</div>' +
          '<div class="icon-item">' +
            '<img src="icons/user.svg" alt="Đăng nhập">' +
            '<span>Đăng nhập</span>' +
          '</div>' +
        '</div>' +
      '</header>';
    // Insert the promo bar markup if a container exists
    if (promoContainer) {
      promoContainer.innerHTML = promoHTML;
    }
    // Insert the header markup if a container exists and initialize suggestions
    if (headerContainer) {
      headerContainer.innerHTML = headerHTML;
      setupSearchSuggestions();
    } else {
      setupSearchSuggestions();
    }
  }

  /**
   * Initialize quantity selectors and capacity option buttons on
   * the product detail page. This allows users to increment or
   * decrement the desired quantity and choose among available
   * capacity options. If these elements are not present on the page,
   * this function exits gracefully without any errors.
   */
  function initProductDetailControls() {
    // Quantity selector handling
    const qtyMinus = document.querySelector('.qty-btn.minus');
    const qtyPlus = document.querySelector('.qty-btn.plus');
    const qtyInput = document.querySelector('.qty-input');
    if (qtyMinus && qtyPlus && qtyInput) {
      qtyMinus.addEventListener('click', function () {
        let val = parseInt(qtyInput.value) || 1;
        if (val > 1) {
          qtyInput.value = val - 1;
        }
      });
      qtyPlus.addEventListener('click', function () {
        let val = parseInt(qtyInput.value) || 1;
        qtyInput.value = val + 1;
      });
    }
    // Capacity option buttons handling
    const capacityButtons = document.querySelectorAll('.capacity-option');
    if (capacityButtons && capacityButtons.length > 0) {
      capacityButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          capacityButtons.forEach(function (b) { b.classList.remove('active'); });
          this.classList.add('active');
        });
      });
    }
  }

  // Load the shared header and promo bar when the page loads
  loadHeaderAndPromo();

  // Initialize product detail controls (quantity selector and capacity option buttons)
  // If these elements are not present (e.g., on other pages), the function will do nothing.
  initProductDetailControls();

  /**
   * Hover panel for side menu categories
   * When a user hovers over a category in the left side menu, a panel
   * appears to the right showing a list of subcategories. This simulates
   * the behaviour on META.vn where hovering reveals additional options.
   */
  const hoverPanel = document.getElementById('hover-panel');

  // Mapping of top-level categories to their subcategories. Each subcategory
  // includes a name and an icon for visual context. Feel free to extend
  // or modify this list to better match real data.
  const categoryMapping = {
    'Điện máy': [
      { name: 'Quạt cây, quạt bàn', icon: 'icons/fan.svg' },
      { name: 'Điều hòa', icon: 'icons/snowflake.svg' },
      { name: 'Tivi', icon: 'icons/tv.svg' },
      { name: 'Tủ lạnh', icon: 'icons/ice-cream.svg' },
      { name: 'Máy giặt', icon: 'icons/soap.svg' },
      { name: 'Máy rửa chén', icon: 'icons/print.svg' },
      { name: 'Máy sấy quần áo', icon: 'icons/shirt.svg' },
      { name: 'Máy làm đá', icon: 'icons/icicles.svg' }
    ],
    'Đồ gia dụng': [
      { name: 'Nồi cơm điện', icon: 'icons/house-chimney.svg' },
      { name: 'Máy xay đa năng', icon: 'icons/industry.svg' },
      { name: 'Lò vi sóng', icon: 'icons/house.svg' },
      { name: 'Lò nướng', icon: 'icons/screwdriver-wrench.svg' },
      { name: 'Máy pha cà phê', icon: 'icons/camera.svg' },
      { name: 'Ấm đun nước', icon: 'icons/print.svg' }
    ],
    'Công cụ & Dụng cụ': [
      { name: 'Máy khoan', icon: 'icons/screwdriver-wrench.svg' },
      { name: 'Máy cắt', icon: 'icons/industry.svg' },
      { name: 'Máy hàn', icon: 'icons/print.svg' },
      { name: 'Máy bào', icon: 'icons/car.svg' },
      { name: 'Bộ dụng cụ đa năng', icon: 'icons/bars.svg' }
    ],
    'Y tế & Sức khỏe': [
      { name: 'Máy đo huyết áp', icon: 'icons/briefcase-medical.svg' },
      { name: 'Máy massage', icon: 'icons/spa.svg' },
      { name: 'Máy đo đường huyết', icon: 'icons/briefcase-medical.svg' },
      { name: 'Máy khí dung', icon: 'icons/industry.svg' }
    ],
    'Thiết bị văn phòng': [
      { name: 'Máy in', icon: 'icons/print.svg' },
      { name: 'Máy scan', icon: 'icons/print.svg' },
      { name: 'Máy fax', icon: 'icons/print.svg' },
      { name: 'Mực in', icon: 'icons/print.svg' }
    ],
    'Thiết bị số, Phụ kiện': [
      { name: 'Điện thoại', icon: 'icons/mobile-screen-icon.svg' },
      { name: 'Laptop', icon: 'icons/laptop.svg' },
      { name: 'Máy tính bảng', icon: 'icons/mobile-screen-icon.svg' },
      { name: 'Tai nghe', icon: 'icons/headphones.svg' },
      { name: 'Chuột & Bàn phím', icon: 'icons/truck.svg' },
      { name: 'Sạc dự phòng', icon: 'icons/industry.svg' }
    ],
    'Thiết bị công nghiệp': [
      { name: 'Máy nén khí', icon: 'icons/industry.svg' },
      { name: 'Máy phát điện', icon: 'icons/industry.svg' },
      { name: 'Máy cắt plasma', icon: 'icons/industry.svg' },
      { name: 'Máy hàn hồ quang', icon: 'icons/industry.svg' }
    ],
    'Thể thao & Ngoài trời': [
      { name: 'Xe đạp', icon: 'icons/car.svg' },
      { name: 'Bóng đá', icon: 'icons/football.svg' },
      { name: 'Tennis & Cầu lông', icon: 'icons/football.svg' },
      { name: 'Dụng cụ gym', icon: 'icons/spa.svg' }
    ],
    'Nhà cửa & Đời sống': [
      { name: 'Đèn trang trí', icon: 'icons/house.svg' },
      { name: 'Chăn ga gối', icon: 'icons/house-chimney.svg' },
      { name: 'Bàn ghế', icon: 'icons/house.svg' },
      { name: 'Rèm cửa', icon: 'icons/house.svg' }
    ],
    'Làm đẹp': [
      { name: 'Máy sấy tóc', icon: 'icons/shirt.svg' },
      { name: 'Máy uốn tóc', icon: 'icons/shirt.svg' },
      { name: 'Mỹ phẩm', icon: 'icons/spa.svg' },
      { name: 'Gương trang điểm', icon: 'icons/camera.svg' }
    ],
    'Mẹ và Bé': [
      { name: 'Sữa bột', icon: 'icons/baby.svg' },
      { name: 'Tã, bỉm', icon: 'icons/baby.svg' },
      { name: 'Xe đẩy', icon: 'icons/car.svg' },
      { name: 'Nôi, cũi', icon: 'icons/house-chimney.svg' },
      { name: 'Đồ chơi', icon: 'icons/spa.svg' }
    ],
    'Phụ kiện ô tô, xe hơi': [
      { name: 'Camera hành trình', icon: 'icons/camera.svg' },
      { name: 'Bơm lốp', icon: 'icons/car.svg' },
      { name: 'Máy hút bụi xe', icon: 'icons/truck.svg' },
      { name: 'Bọc ghế da', icon: 'icons/car.svg' }
    ],
    'Thời trang & Du lịch': [
      { name: 'Áo thun', icon: 'icons/bag-shopping.svg' },
      { name: 'Quần jeans', icon: 'icons/briefcase-medical.svg' },
      { name: 'Vali du lịch', icon: 'icons/suitcase-rolling.svg' },
      { name: 'Mũ, nón', icon: 'icons/house.svg' },
      { name: 'Túi xách', icon: 'icons/bag-shopping.svg' }
    ],
    'Bách hóa tổng hợp': [
      { name: 'Đồ ăn vặt', icon: 'icons/bag-shopping.svg' },
      { name: 'Đồ uống', icon: 'icons/ice-cream.svg' },
      { name: 'Khăn giấy', icon: 'icons/print.svg' },
      { name: 'Hóa mỹ phẩm', icon: 'icons/spa.svg' }
    ]
  };

  // Render the hover panel for a given category name
  function renderHoverPanel(categoryName) {
    const items = categoryMapping[categoryName] || [];
    let html = '';
    // Panel header shows the category name
    html += `<div class="hover-panel-header">${categoryName}</div>`;
    html += '<div class="hover-panel-grid">';
    items.forEach(item => {
      html += `<div class="hover-panel-item"><img src="${item.icon}" alt="${item.name}"><span>${item.name}</span></div>`;
    });
    html += '</div>';
    hoverPanel.innerHTML = html;
  }

  // Position the hover panel beneath the side menu header, aligned horizontally
  // with the start of the category list. This ensures the popup appears at
  // a consistent vertical position regardless of which category is hovered.
  function positionHoverPanel(menuItem) {
    // Compute the position of the main content container and the category list.
    const mainContent = document.querySelector('.main-content');
    const categoryList = document.querySelector('.side-categories');
    // If for some reason the elements are not found, default to top: 0
    if (!mainContent || !categoryList) {
      hoverPanel.style.top = '0px';
      return;
    }
    const mainRect = mainContent.getBoundingClientRect();
    const listRect = categoryList.getBoundingClientRect();
    // The offset is the difference between the top of the category list and
    // the top of the main content. Using getBoundingClientRect() ensures
    // values are relative to the viewport; subtracting yields the offset
    // relative to the positioned parent (.main-content).
    const offset = listRect.top - mainRect.top;
    hoverPanel.style.top = offset + 'px';
  }

  const sideItems = document.querySelectorAll('.side-categories li');

  // Timers used to control delayed hiding and simulated loading
  let hideTimeout;
  let loadTimeout;

  // Show the hover panel with a loading indicator, then populate it
  function showHoverPanel(menuItem) {
    clearTimeout(hideTimeout);
    clearTimeout(loadTimeout);
    // Mark the currently hovered item as active so it stays highlighted
    activateMenuItem(menuItem);
    // Display loading indicator
    hoverPanel.innerHTML =
      '<div class="hover-panel-loading"><div class="spinner"></div><span>Đang tải...</span></div>';
    positionHoverPanel(menuItem);
    hoverPanel.style.display = 'block';
    // After a short delay, render the actual subcategories
    loadTimeout = setTimeout(() => {
      const categoryName = menuItem.querySelector('span').textContent.trim();
      renderHoverPanel(categoryName);
    }, 400);
  }

  // Mark a menu item as active and clear active state from others.
  function activateMenuItem(menuItem) {
    sideItems.forEach(item => item.classList.remove('active'));
    menuItem.classList.add('active');
  }

  // Hide the panel if the mouse is no longer over the menu or panel
  function scheduleHide() {
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      // Only hide if neither the panel nor any menu item is hovered
      const menuHovered = Array.from(sideItems).some(item => item.matches(':hover'));
      if (!menuHovered && !hoverPanel.matches(':hover')) {
        hoverPanel.style.display = 'none';
        // Remove active highlight when the panel hides
        sideItems.forEach(item => item.classList.remove('active'));
      }
    }, 200);
  }

  sideItems.forEach(item => {
    // Show the hover panel on mouseenter
    item.addEventListener('mouseenter', function () {
      showHoverPanel(this);
    });
    // Also show on mouseover as a fallback for environments where mouseenter
    // doesn't trigger reliably
    item.addEventListener('mouseover', function () {
      showHoverPanel(this);
    });
    item.addEventListener('mouseleave', function () {
      // Schedule hide when leaving a menu item
      scheduleHide();
    });
    // Prevent click propagation and also show the hover panel on click. This acts
    // as a fallback for environments where hover events may not fire properly.
    item.addEventListener('click', function (e) {
      e.stopPropagation();
      showHoverPanel(this);
    });
  });

  // When the mouse enters the hover panel, cancel the hide timeout
  hoverPanel.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout);
  });
  // When leaving the hover panel, schedule hide
  hoverPanel.addEventListener('mouseleave', () => {
    scheduleHide();
  });

  // Hide the panel when clicking outside the menu or panel
  document.addEventListener('click', (event) => {
    const clickedInsideMenu = Array.from(sideItems).some(item => item.contains(event.target));
    const clickedInsidePanel = hoverPanel.contains(event.target);
    if (!clickedInsideMenu && !clickedInsidePanel) {
      hoverPanel.style.display = 'none';
    }
  });

});
