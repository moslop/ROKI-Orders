// ROKI — Order Form Logic
// Sends to Formspree (email) + WhatsApp

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('orderForm');
  if (!form) return;

  // ================================================
  // ⚠️  REPLACE THIS WITH YOUR FORMSPREE ENDPOINT
  //     1. Go to https://formspree.io
  //     2. Sign up with your email
  //     3. Click "New Form"
  //     4. Copy your endpoint like: https://formspree.io/f/xxxxxyyy
  //     5. Paste it below ↓
  // ================================================
  const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID_HERE';

  const WHATSAPP_NUMBER = '213655295217'; // Your WhatsApp number

  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  const successMsg = document.getElementById('successMsg');

  // ===== VALIDATION =====
  function validateField(field) {
    const group = field.closest('.form-group');
    const value = field.value.trim();
    let valid = true;

    if (field.hasAttribute('required') && !value) {
      valid = false;
    }

    if (field.id === 'phone' && value) {
      const phoneRegex = /^[0-9]{9,10}$/;
      if (!phoneRegex.test(value.replace(/\s/g, ''))) {
        valid = false;
      }
    }

    if (group) {
      if (!valid) {
        group.classList.add('has-error');
        field.classList.add('error');
      } else {
        group.classList.remove('has-error');
        field.classList.remove('error');
      }
    }
    return valid;
  }

  // Live validation on blur
  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) validateField(field);
    });
  });

  // ===== PRE-FILL FROM URL =====
  const urlParams = new URLSearchParams(window.location.search);
  const selectedProduct = urlParams.get('product');
  if (selectedProduct) {
    const descriptionField = document.getElementById('description');
    if (descriptionField) {
      descriptionField.value = `Order for: ${decodeURIComponent(selectedProduct)}`;
    }
  }

  // ===== SUBMIT =====
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    let allValid = true;
    form.querySelectorAll('input[required], textarea[required], select[required]').forEach(field => {
      if (!validateField(field)) allValid = false;
    });

    if (!allValid) return;

    // Get values
    const data = {
      firstName:    document.getElementById('firstName').value.trim(),
      lastName:     document.getElementById('lastName').value.trim(),
      phone:        document.getElementById('phone').value.trim(),
      wilaya:       document.getElementById('wilaya').value,
      municipality: document.getElementById('municipality').value.trim(),
      neighborhood: document.getElementById('neighborhood').value.trim(),
      description:  document.getElementById('description').value.trim(),
    };

    // Loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';

    // ===== 1. SEND TO FORMSPREE (EMAIL) =====
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          'First Name':    data.firstName,
          'Last Name':     data.lastName,
          'Phone':         '+213' + data.phone,
          'Wilaya':        data.wilaya,
          'Municipality':  data.municipality,
          'Neighborhood':  data.neighborhood,
          'Description':   data.description,
          '_subject':      `🧥 New ROKI Order — ${data.firstName} ${data.lastName}`,
        })
      });

      if (!response.ok && FORMSPREE_URL.includes('YOUR_FORM_ID_HERE')) {
        console.warn('Formspree not configured yet — skipping email send.');
      }
    } catch (err) {
      console.warn('Email send failed:', err);
    }

    // ===== 2. OPEN WHATSAPP =====
    const waMessage = encodeURIComponent(
      `🧥 *ROKI - New Order*\n\n` +
      `👤 *Name:* ${data.firstName} ${data.lastName}\n` +
      `📱 *Phone:* +213${data.phone}\n` +
      `📍 *Wilaya:* ${data.wilaya}\n` +
      `🏘️ *Municipality:* ${data.municipality}\n` +
      `🏡 *Neighborhood:* ${data.neighborhood}\n` +
      `📝 *Order:* ${data.description}`
    );

    const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

    // Open WhatsApp in new tab
    window.open(waURL, '_blank');

    // ===== SHOW SUCCESS =====
    form.style.display = 'none';
    successMsg.style.display = 'block';
    submitBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
  });

});
