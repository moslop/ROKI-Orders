// ROKI — Admin Dashboard Logic

document.addEventListener('DOMContentLoaded', () => {

  const ADMIN_CODE = 'CNSy7zbs';
  const loginSection = document.getElementById('loginSection');
  const adminDashboard = document.getElementById('adminDashboard');
  const loginBtn = document.getElementById('loginBtn');
  const adminCodeInput = document.getElementById('adminCode');
  const logoutBtn = document.getElementById('logoutBtn');
  const productList = document.getElementById('adminProductList');

  // Form Fields for Adding Product
  const newName = document.getElementById('newName');
  const newPrice = document.getElementById('newPrice');
  const newQty = document.getElementById('newQty');
  const newDesc = document.getElementById('newDesc');
  const newImgFile = document.getElementById('newImgFile');
  const newImgPreview = document.getElementById('newImgPreview');
  const addProductBtn = document.getElementById('addProductBtn');

  let base64Image = "";

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

  // Handle Image Upload for New Product
  newImgFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        base64Image = event.target.result;
        newImgPreview.src = base64Image;
        newImgPreview.classList.remove('hidden');
      };
      reader.readAsDataURL(file);
    }
  });

  addProductBtn.addEventListener('click', () => {
    if (!newName.value || !newPrice.value || !newQty.value || !base64Image) {
      alert('Please fill all fields and upload an image.');
      return;
    }

    const newProduct = {
      name: newName.value,
      price: newPrice.value,
      qty: parseInt(newQty.value),
      desc: newDesc.value,
      image: base64Image
    };

    addProduct(newProduct);
    alert('Product added successfully!');
    clearAddForm();
    renderAdminProducts();
  });

  function clearAddForm() {
    newName.value = '';
    newPrice.value = '';
    newQty.value = '';
    newDesc.value = '';
    newImgFile.value = '';
    newImgPreview.src = '';
    newImgPreview.classList.add('hidden');
    base64Image = '';
  }

  function renderAdminProducts() {
    const products = getProducts();
    productList.innerHTML = '';

    // Render from newest to oldest
    [...products].reverse().forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card-admin';
      card.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
          <img src="${p.image}" alt="${p.name}">
          <label class="file-input-label" for="editFile-${p.id}" style="font-size: 12px; padding: 5px 10px;">Change Image</label>
          <input type="file" id="editFile-${p.id}" class="edit-file-input" data-id="${p.id}" accept="image/*">
        </div>
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
              <label>Description</label>
              <textarea data-id="${p.id}" data-field="desc">${p.desc}</textarea>
            </div>
          </div>
          <div class="admin-actions">
            <button class="btn-primary save-btn" data-id="${p.id}">Update Product</button>
            <button class="btn-delete delete-btn" data-id="${p.id}">Delete</button>
          </div>
        </div>
      `;
      productList.appendChild(card);
    });

    // Event Listeners for existing products
    document.querySelectorAll('.save-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        const inputs = document.querySelectorAll(`[data-id="${id}"]:not(.edit-file-input)`);
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

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        if (confirm('Are you sure you want to delete this product?')) {
          deleteProduct(id);
          renderAdminProducts();
        }
      });
    });

    document.querySelectorAll('.edit-file-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const id = parseInt(e.target.dataset.id);
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const base64 = event.target.result;
            if (updateProduct(id, { image: base64 })) {
              alert('Image Updated Successfully');
              renderAdminProducts();
            }
          };
          reader.readAsDataURL(file);
        }
      });
    });
  }
});
