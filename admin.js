// ROKI — Admin Dashboard Logic

document.addEventListener('DOMContentLoaded', () => {

  const ADMIN_CODE = 'CNSy7zbs';
  const loginSection = document.getElementById('loginSection');
  const adminDashboard = document.getElementById('adminDashboard');
  const loginBtn = document.getElementById('loginBtn');
  const adminCodeInput = document.getElementById('adminCode');
  const logoutBtn = document.getElementById('logoutBtn');
  const productList = document.getElementById('adminProductList');

  // Check existing session
  if (sessionStorage.getItem('roki_admin') === 'true') {
    showDashboard();
  }

  loginBtn.addEventListener('click', () => {
    if (adminCodeInput.value === ADMIN_CODE) {
      sessionStorage.setItem('roki_admin', 'true');
      showDashboard();
    } else {
      alert('Invalid Access Code');
    }
  });

  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('roki_admin');
    window.location.reload();
  });

  function showDashboard() {
    loginSection.classList.add('hidden');
    adminDashboard.classList.remove('hidden');
    renderAdminProducts();
  }

  function renderAdminProducts() {
    const products = getProducts();
    productList.innerHTML = '';

    products.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card-admin';
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <div>
          <h3 style="margin-bottom: 15px;">${p.name}</h3>
          <div class="admin-form-grid">
            <div class="form-group">
              <label>Price</label>
              <input type="text" value="${p.price}" data-id="${p.id}" data-field="price">
            </div>
            <div class="form-group">
              <label>Quantity</label>
              <input type="number" value="${p.qty}" data-id="${p.id}" data-field="qty">
            </div>
            <div class="form-group" style="grid-column: span 2;">
              <label>Image URL</label>
              <input type="text" value="${p.image}" data-id="${p.id}" data-field="image">
            </div>
            <div class="form-group" style="grid-column: span 2;">
              <label>Description</label>
              <textarea data-id="${p.id}" data-field="desc">${p.desc}</textarea>
            </div>
          </div>
          <button class="btn-primary save-btn" data-id="${p.id}">Update Product</button>
        </div>
      `;
      productList.appendChild(card);
    });

    document.querySelectorAll('.save-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        const inputs = document.querySelectorAll(`[data-id="${id}"]`);
        const updatedData = {};
        inputs.forEach(input => {
          if (input.dataset.field) {
            updatedData[input.dataset.field] = input.dataset.field === 'qty' ? parseInt(input.value) : input.value;
          }
        });

        if (updateProduct(id, updatedData)) {
          alert('Product Updated Successfully');
          renderAdminProducts();
        }
      });
    });
  }
});
