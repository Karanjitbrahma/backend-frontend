/**
 * Bhartiya Sidhant — Universal Razorpay Payment Module
 * Include this script on any page to add Razorpay payment.
 * Usage: openRazorpayModal({ name, price, priceLabel, description, image, type })
 *   - name: Product/Service name
 *   - price: Amount in paise (e.g. 510000 for ₹5,100)
 *   - priceLabel: Display string (e.g. "₹5,100")
 *   - description: Short description
 *   - image: Product image URL (optional)
 *   - type: "product" | "pooja" | "service" | "course" | "report"
 */

(function () {
  // ========== CONFIG ==========
  function getDefaultCheckoutFields(type) {
    const common = [
      { label: 'Full Name', type: 'text', required: true },
      { label: 'Phone (WhatsApp)', type: 'tel', required: true },
      { label: 'Email', type: 'email', required: true }
    ];
    if (type === 'product' || type === 'store' || type === 'storeProducts') {
      return [
        ...common,
        { label: 'Full Address', type: 'textarea', required: true },
        { label: 'City', type: 'text', required: true },
        { label: 'PIN Code', type: 'number', required: true },
        { label: 'Special Notes', type: 'textarea', required: false }
      ];
    } else if (type === 'pooja') {
      return [
        ...common,
        { label: 'Date of Birth', type: 'date', required: true },
        { label: 'Birth Time', type: 'time', required: true },
        { label: 'Birth Place', type: 'text', required: true },
        { label: 'Gotra', type: 'text', required: false },
        { label: 'Special Notes', type: 'textarea', required: false }
      ];
    } else if (type === 'consultation' || type === 'consultAcharya') {
      return [
        ...common,
        { label: 'Gender', type: 'select', required: true, options: 'Male, Female, Other' },
        { label: 'Date of Birth', type: 'date', required: true },
        { label: 'Birth Time', type: 'time', required: true },
        { label: 'Birth Place', type: 'text', required: true },
        { label: 'Special Notes', type: 'textarea', required: false }
      ];
    } else {
      return [
        ...common,
        { label: 'Date of Birth', type: 'date', required: true },
        { label: 'Birth Time', type: 'time', required: true },
        { label: 'Birth Place', type: 'text', required: true },
        { label: 'Special Notes', type: 'textarea', required: false }
      ];
    }
  }

  function getItemCheckoutFields(item) {
    if (item.checkoutFields && item.checkoutFields.length) {
      return item.checkoutFields;
    }

    // Try global fallback
    try {
      const d = JSON.parse(localStorage.getItem('bs_admin_data'));
      if (d && d.settings && d.settings.checkoutForm && d.settings.checkoutForm[item.type] && d.settings.checkoutForm[item.type].length > 0) {
        return d.settings.checkoutForm[item.type];
      }
      // mapping for specific cases
      if (item.type === 'consultAcharya' && d.settings.checkoutForm.consultation && d.settings.checkoutForm.consultation.length > 0) {
         return d.settings.checkoutForm.consultation;
      }
      if (item.type === 'storeProducts' && d.settings.checkoutForm.product && d.settings.checkoutForm.product.length > 0) {
         return d.settings.checkoutForm.product;
      }
    } catch(e){}

    const common = [
      { label: 'Full Name', type: 'text', required: true },
      { label: 'Phone (WhatsApp)', type: 'tel', required: true },
      { label: 'Email', type: 'email', required: true }
    ];

    // Determine flags based on item properties
    let reqShipping = false;
    let reqBirth = false;
    let reqNotes = false;

    if (item.reqShipping !== undefined) {
      reqShipping = item.reqShipping === true;
    } else {
      reqShipping = (item.type === 'product' || item.type === 'store' || item.type === 'storeProducts');
    }

    if (item.reqBirth !== undefined) {
      reqBirth = item.reqBirth === true;
    } else {
      reqBirth = (item.type !== 'product' && item.type !== 'store' && item.type !== 'storeProducts');
    }

    if (item.reqNotes !== undefined) {
      reqNotes = item.reqNotes === true;
    } else {
      reqNotes = true;
    }

    const fields = [...common];

    if (item.type === 'consultation' || item.type === 'consultAcharya') {
      fields.push({ label: 'Gender', type: 'select', required: true, options: 'Male, Female, Other' });
    }

    if (reqBirth) {
      fields.push({ label: 'Date of Birth', type: 'date', required: true });
      fields.push({ label: 'Birth Time', type: 'time', required: true });
      fields.push({ label: 'Birth Place', type: 'text', required: true });
      if (item.type === 'pooja') {
        fields.push({ label: 'Gotra', type: 'text', required: false });
      }
    }

    if (reqShipping) {
      fields.push({ label: 'Full Address', type: 'textarea', required: true });
      fields.push({ label: 'City', type: 'text', required: true });
      fields.push({ label: 'PIN Code', type: 'number', required: true });
    }

    if (reqNotes) {
      fields.push({ label: 'Special Notes', type: 'textarea', required: false });
    }

    return fields;
  }


  function getPayConfig() {
    try {
      const ad = JSON.parse(localStorage.getItem('bs_admin_data') || '{}');
      return ad.paymentConfig || {
        key: 'rzp_test_SyfMicXoixkyOJ',
        businessName: 'Bhartiya Sidhant',
        whatsapp: '919876543210',
        currency: 'INR',
        successMsg: '✅ Payment Successful! Redirecting to WhatsApp to confirm...',
        waPrefix: '🙏 *New Order*\n\n'
      };
    } catch(e) {
      return {
        key: 'rzp_test_SyfMicXoixkyOJ',
        businessName: 'Bhartiya Sidhant',
        whatsapp: '919876543210',
        currency: 'INR',
        successMsg: '✅ Payment Successful! Redirecting to WhatsApp to confirm...',
        waPrefix: '🙏 *New Order*\n\n'
      };
    }
  }
  // ============================

  let modalInjected = false;
  let currentItem = {};

  // Inject modal HTML + Razorpay SDK
  function injectModal() {
    if (modalInjected) return;
    modalInjected = true;

    // Add Razorpay SDK
    const sdk = document.createElement('script');
    sdk.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.head.appendChild(sdk);

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
      .rzp-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:9999;display:none;align-items:center;justify-content:center;backdrop-filter:blur(4px)}
      .rzp-overlay.open{display:flex}
      .rzp-modal{background:#fff;border-radius:18px;width:95%;max-width:500px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.3);animation:rzpIn .35s ease}
      @keyframes rzpIn{from{opacity:0;transform:translateY(30px) scale(.96)}to{opacity:1;transform:none}}
      .rzp-header{display:flex;justify-content:space-between;align-items:center;padding:22px 28px 14px;border-bottom:1px solid #eee}
      .rzp-header h3{font-size:22px;color:#4D0F0F;font-family:'Cormorant Garamond',serif;font-weight:700}
      .rzp-header button{background:none;border:none;font-size:22px;color:#999;cursor:pointer}
      .rzp-body{padding:24px 28px}
      .rzp-product-bar{display:flex;gap:14px;align-items:center;padding:14px;background:#FDF5E6;border-radius:12px;margin-bottom:20px;border:1px solid rgba(200,135,62,.15)}
      .rzp-product-bar img{width:60px;height:60px;object-fit:cover;border-radius:10px;border:2px solid rgba(200,135,62,.2)}
      .rzp-product-bar .rzp-pname{font-size:15px;font-weight:700;color:#4D0F0F;margin-bottom:2px}
      .rzp-product-bar .rzp-pprice{font-size:20px;font-weight:800;color:#C8873E}
      .rzp-fm{margin-bottom:14px}
      .rzp-fm label{display:block;font-size:12px;font-weight:600;color:#2C2C2C;margin-bottom:5px;text-transform:uppercase;letter-spacing:.5px}
      .rzp-fm input,.rzp-fm textarea,.rzp-fm select{width:100%;padding:11px 14px;border:1px solid #ddd;border-radius:10px;font-size:14px;font-family:'Be Vietnam Pro',sans-serif;transition:border .3s;background:#fff}
      .rzp-fm input:focus,.rzp-fm textarea:focus,.rzp-fm select:focus{outline:none;border-color:#C8873E;box-shadow:0 0 0 3px rgba(200,135,62,.12)}
      .rzp-fm textarea{resize:vertical;min-height:60px}
      .rzp-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
      .rzp-divider{font-size:11px;font-weight:700;color:#C8873E;text-transform:uppercase;letter-spacing:1.5px;margin:18px 0 12px;display:flex;align-items:center;gap:8px}
      .rzp-divider i{font-size:13px}
      .rzp-pay-btn{width:100%;padding:16px;background:linear-gradient(135deg,#f9a825,#f57f17);color:#fff;font-weight:700;font-size:16px;border:none;border-radius:12px;cursor:pointer;transition:all .3s;text-transform:uppercase;letter-spacing:.5px;display:flex;align-items:center;justify-content:center;gap:10px;margin-top:6px}
      .rzp-pay-btn:hover{box-shadow:0 6px 25px rgba(249,168,37,.45);transform:translateY(-2px)}
      .rzp-secure{text-align:center;margin-top:12px;font-size:12px;color:#6B6B6B}
      .rzp-secure i{color:#C8873E;margin-right:4px}
      @media(max-width:480px){.rzp-row{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);

    // Add Modal HTML
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="rzp-overlay" id="rzpOverlay" onclick="if(event.target===this)window._rzpClose()">
      <div class="rzp-modal">
        <div class="rzp-header">
          <h3><i class="fa-solid fa-lock" style="color:#C8873E;margin-right:8px"></i> <span id="rzpModalTitle">Secure Checkout</span></h3>
          <button onclick="window._rzpClose()"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="rzp-body">
          <div class="rzp-product-bar">
            <img id="rzpItemImg" src="" alt="Item">
            <div>
              <div class="rzp-pname" id="rzpItemName">Product</div>
              <div class="rzp-pprice" id="rzpItemPrice">₹0</div>
            </div>
          </div>
          <form id="rzpForm" onsubmit="return window._rzpSubmit(event)">
            <div class="rzp-divider"><i class="fa-solid fa-ticket"></i> Coupon Code</div>
            <div class="rzp-fm" style="margin-bottom: 15px;">
              <label>Coupon Code *</label>
              <div style="display: flex; gap: 8px;">
                <input type="text" id="rzpCouponCode" required placeholder="Enter Coupon Code" style="text-transform: uppercase; flex-grow: 1;">
                <button type="button" id="rzpApplyCouponBtn" onclick="window._rzpApplyCoupon()" style="padding: 11px 18px; background: #C8873E; color: #fff; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; transition: background 0.3s; font-size: 13px; text-transform: uppercase;">Apply</button>
              </div>
              <div id="rzpCouponFeedback" style="font-size: 12px; margin-top: 5px; font-weight: 600;"></div>
            </div>

            <div id="rzpDynamicFieldsContainer"></div>

            <button type="submit" class="rzp-pay-btn" style="margin-top: 15px;"><i class="fa-solid fa-lock"></i> Pay <span id="rzpPayLabel">₹0</span> Securely</button>
          </form>
          <div class="rzp-secure"><i class="fa-solid fa-shield-halved"></i> 100% Secure Payment via Razorpay · SSL Encrypted</div>
        </div>
      </div>
    </div>`;
    document.body.appendChild(div);

    // Bind coupon input event listener to reset validation on edit
    const couponInput = document.getElementById('rzpCouponCode');
    if (couponInput) {
      couponInput.addEventListener('input', () => {
        currentItem.appliedCoupon = null;
        currentItem.discountedPrice = null;
        document.getElementById('rzpPayLabel').textContent = currentItem.priceLabel || '₹0';
        const feedback = document.getElementById('rzpCouponFeedback');
        if (feedback) {
          feedback.textContent = '';
          feedback.style.color = '';
        }
      });
    }
  }

  // Open modal
  window.openRazorpayModal = function (item) {
    injectModal();
    currentItem = item;

    // Reset coupon states
    currentItem.appliedCoupon = null;
    currentItem.discountedPrice = null;
    const cpInput = document.getElementById('rzpCouponCode');
    if (cpInput) cpInput.value = '';
    const cpFeedback = document.getElementById('rzpCouponFeedback');
    if (cpFeedback) {
      cpFeedback.textContent = '';
      cpFeedback.style.color = '';
    }

    // Set title based on type
    const titles = {
      product: 'Complete Your Purchase',
      pooja: 'Book This Pooja',
      service: 'Book This Service',
      course: 'Enroll in Course',
      report: 'Order Report'
    };
    document.getElementById('rzpModalTitle').textContent = titles[item.type] || 'Secure Checkout';
    document.getElementById('rzpItemName').textContent = item.name || 'Item';
    document.getElementById('rzpItemPrice').textContent = item.priceLabel || '₹0';
    document.getElementById('rzpPayLabel').textContent = item.priceLabel || '₹0';

    // Image
    const imgEl = document.getElementById('rzpItemImg');
    if (item.image) { imgEl.src = item.image; imgEl.style.display = ''; }
    else { imgEl.style.display = 'none'; }

    // Render dynamic checkout fields
    const fields = getItemCheckoutFields(item);
    currentItem.fields = fields;

    let html = '';
    let addedPersonalDivider = false;
    let addedBirthDivider = false;
    let addedShippingDivider = false;

    fields.forEach((f, i) => {
      const fieldId = `rzp_dyn_${i}`;
      const reqAttr = f.required ? 'required' : '';
      const reqStar = f.required ? ' *' : '';
      const labelLower = f.label.toLowerCase();

      if (!addedPersonalDivider && (labelLower.includes('name') || labelLower.includes('phone') || labelLower.includes('email') || labelLower.includes('contact') || labelLower.includes('whatsapp'))) {
        html += `<div class="rzp-divider"><i class="fa-solid fa-user"></i> Personal Details</div>`;
        addedPersonalDivider = true;
      } else if (!addedBirthDivider && (labelLower.includes('birth') || labelLower.includes('dob') || labelLower.includes('gotra') || labelLower.includes('gender') || labelLower.includes('time') || labelLower.includes('place'))) {
        html += `<div class="rzp-divider"><i class="fa-solid fa-star"></i> Vedic & Birth Details</div>`;
        addedBirthDivider = true;
      } else if (!addedShippingDivider && (labelLower.includes('address') || labelLower.includes('city') || labelLower.includes('pin') || labelLower.includes('postal') || labelLower.includes('shipping') || labelLower.includes('state') || labelLower.includes('country'))) {
        html += `<div class="rzp-divider"><i class="fa-solid fa-truck-fast"></i> Shipping Address</div>`;
        addedShippingDivider = true;
      }

      html += `<div class="rzp-fm">`;
      html += `<label>${f.label}${reqStar}</label>`;
      if (f.type === 'textarea') {
        html += `<textarea id="${fieldId}" ${reqAttr} placeholder="Enter ${f.label.toLowerCase()}"></textarea>`;
      } else if (f.type === 'select') {
        const opts = (f.options || 'Male, Female, Other').split(',').map(o => o.trim());
        html += `<select id="${fieldId}" ${reqAttr}>`;
        html += `<option value="">Select ${f.label}</option>`;
        opts.forEach(o => {
          html += `<option value="${o}">${o}</option>`;
        });
        html += `</select>`;
      } else {
        html += `<input type="${f.type || 'text'}" id="${fieldId}" ${reqAttr} placeholder="Enter ${f.label.toLowerCase()}">`;
      }
      html += `</div>`;
    });
    document.getElementById('rzpDynamicFieldsContainer').innerHTML = html;

    document.getElementById('rzpOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  window._rzpClose = function () {
    const overlay = document.getElementById('rzpOverlay');
    if (overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  // Apply & validate coupon code
  window._rzpApplyCoupon = function () {
    const input = document.getElementById('rzpCouponCode');
    const feedback = document.getElementById('rzpCouponFeedback');
    if (!input || !feedback) return false;

    const enteredCode = input.value.trim().toUpperCase();
    if (!enteredCode) {
      feedback.textContent = 'Please enter a coupon code.';
      feedback.style.color = '#dc2626';
      return false;
    }

    let coupons = [];
    try {
      const ad = JSON.parse(localStorage.getItem('bs_admin_data') || '{}');
      coupons = ad.coupons || [];
    } catch (e) {
      console.error('Failed to load coupons:', e);
    }

    const coupon = coupons.find(c => c.code.toUpperCase() === enteredCode);
    if (!coupon || coupon.status !== 'active') {
      feedback.textContent = 'Invalid or inactive coupon code.';
      feedback.style.color = '#dc2626';
      currentItem.appliedCoupon = null;
      currentItem.discountedPrice = null;
      document.getElementById('rzpPayLabel').textContent = currentItem.priceLabel || '₹0';
      return false;
    }

    const origPricePaise = currentItem.price;
    let discountPaise = 0;

    if (coupon.type === 'percentage') {
      discountPaise = Math.round(origPricePaise * (coupon.value / 100));
    } else if (coupon.type === 'fixed') {
      discountPaise = coupon.value * 100;
    }

    const discountedPricePaise = Math.max(0, origPricePaise - discountPaise);
    currentItem.appliedCoupon = coupon;
    currentItem.discountedPrice = discountedPricePaise;

    const finalAmountRupees = discountedPricePaise / 100;
    const discountAmtRupees = discountPaise / 100;

    feedback.textContent = `Coupon applied! Saved ₹${discountAmtRupees.toLocaleString('en-IN')}`;
    feedback.style.color = '#16a34a';

    document.getElementById('rzpPayLabel').textContent = `₹${finalAmountRupees.toLocaleString('en-IN')}`;
    return true;
  };

  // Submit → open Razorpay
  window._rzpSubmit = async function (e) {
    e.preventDefault();
    
    // Mandatory coupon check
    const couponInput = document.getElementById('rzpCouponCode');
    const enteredCode = couponInput ? couponInput.value.trim().toUpperCase() : '';
    if (!enteredCode) {
      const feedback = document.getElementById('rzpCouponFeedback');
      if (feedback) {
        feedback.textContent = 'Coupon code is mandatory.';
        feedback.style.color = '#dc2626';
      }
      return false;
    }

    // If not validated yet or code was modified, run validation
    if (!currentItem.appliedCoupon || currentItem.appliedCoupon.code !== enteredCode) {
      const isValid = window._rzpApplyCoupon();
      if (!isValid) return false;
    }

    const config = getPayConfig();
    
    // Gather dynamic field values
    const fields = currentItem.fields || [];
    const values = {};
    fields.forEach((f, i) => {
      const el = document.getElementById(`rzp_dyn_${i}`);
      values[f.label] = el ? el.value.trim() : '';
    });

    // Extract common fields for prefill
    const nameLabel = Object.keys(values).find(k => k.toLowerCase().includes('name')) || '';
    const phoneLabel = Object.keys(values).find(k => k.toLowerCase().includes('phone') || k.toLowerCase().includes('contact') || k.toLowerCase().includes('whatsapp')) || '';
    const emailLabel = Object.keys(values).find(k => k.toLowerCase().includes('email')) || '';

    const name = nameLabel ? values[nameLabel] : 'Customer';
    const phone = phoneLabel ? values[phoneLabel] : '';
    const email = emailLabel ? values[emailLabel] : '';

    const typeLabel = (currentItem.type || 'item').charAt(0).toUpperCase() + (currentItem.type || 'item').slice(1);

    const finalAmountPaise = currentItem.discountedPrice !== null ? currentItem.discountedPrice : currentItem.price;
    const finalPriceLabel = currentItem.discountedPrice !== null ? '₹' + (currentItem.discountedPrice / 100) : currentItem.priceLabel;

    try {
      // 1. Fetch Order ID from backend
      const btn = document.querySelector('.rzp-pay-btn');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
      btn.disabled = true;

      // Detect the backend API URL dynamically (fallback to 127.0.0.1:3001 for local/file protocol testing)
      const currentOrigin = window.location.origin;
      const backendBaseUrl = (currentOrigin.includes('localhost') || currentOrigin.includes('127.0.0.1'))
        ? 'http://127.0.0.1:3001'
        : (currentOrigin === 'null' || currentOrigin.startsWith('file:'))
          ? 'http://127.0.0.1:3001'
          : currentOrigin;

      let orderId = null;
      let dynamicKey = null;
      let failReason = 'Unknown error';
      try {
        const orderResponse = await fetch(`${backendBaseUrl}/api/create-order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: finalAmountPaise })
        });
        const orderData = await orderResponse.json();

        if (orderData.success) {
          orderId = orderData.order_id;
          dynamicKey = orderData.key_id || null;
        } else {
          failReason = 'Backend Error: ' + (orderData.message || 'Failed to create order on server');
          console.warn('Backend failed to generate order ID:', orderData.message);
        }
      } catch (err) {
        failReason = `Network Error: Cannot reach backend server at ${backendBaseUrl}. Ensure the server is running. Detail: ` + err.message;
        console.warn(`Backend server not reachable at ${backendBaseUrl}`, err);
      }

      if (!orderId) {
        alert('Payment cannot proceed: Missing secure Order ID.\nReason: ' + failReason);
        btn.innerHTML = originalText;
        btn.disabled = false;
        return false;
      }

      // 2. Open Razorpay Modal
      const options = {
        key: dynamicKey || config.key,
        amount: finalAmountPaise,
        currency: config.currency || 'INR',
        name: config.businessName,
        description: currentItem.name + (currentItem.description ? ' — ' + currentItem.description : ''),
        image: currentItem.image || '',
        prefill: { name: name, email: email, contact: phone },
        theme: { color: '#C8873E' },
        handler: function (response) {
          window._rzpClose();

          // Build WhatsApp message
          let msg = (config.waPrefix || '🙏 *New Order*\n\n') + ' ' + typeLabel + '\n\n';
          msg += '📦 *Item:* ' + currentItem.name + '\n';
          msg += '💰 *Amount Paid:* ' + finalPriceLabel + '\n';
          if (currentItem.appliedCoupon) {
            const discountDesc = currentItem.appliedCoupon.type === 'percentage' ? currentItem.appliedCoupon.value + '%' : '₹' + currentItem.appliedCoupon.value;
            msg += '🏷️ *Coupon Applied:* ' + currentItem.appliedCoupon.code + ' (' + discountDesc + ' Off)\n';
          }
          msg += '🆔 *Payment ID:* ' + response.razorpay_payment_id + '\n\n';
          
          // Append all custom fields dynamically
          fields.forEach(f => {
            const val = values[f.label];
            if (val) {
              msg += `*${f.label}:* ${val}\n`;
            }
          });
          msg += '\nPlease confirm my order. Thank you!';

          // Save lead to admin
          try {
            let ad = JSON.parse(localStorage.getItem('bs_admin_data') || '{}');
            if (!ad.leads) ad.leads = [];
            
            // Construct details string with all custom fields
            const detailsArray = [];
            fields.forEach(f => {
              const val = values[f.label];
              if (val) detailsArray.push(`${f.label}: ${val}`);
            });
            
            if (currentItem.appliedCoupon) {
              const discountDesc = currentItem.appliedCoupon.type === 'percentage' ? currentItem.appliedCoupon.value + '%' : '₹' + currentItem.appliedCoupon.value;
              detailsArray.push(`Coupon: ${currentItem.appliedCoupon.code} (${discountDesc} Off)`);
            }
            
            const leadObj = {
              name: name,
              phone: phone,
              email: email,
              source: typeLabel + ' Purchase',
              product: currentItem.name,
              amount: finalPriceLabel,
              paymentId: response.razorpay_payment_id,
              date: new Date().toISOString(),
              status: 'pending',
              details: detailsArray.join(' | ')
            };

            ad.leads.push(leadObj);
            localStorage.setItem('bs_admin_data', JSON.stringify(ad));

            // Save to server database
            fetch(`${backendBaseUrl}/api/save-lead`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(leadObj)
            }).catch(err => console.warn('Server sync failed:', err));
          } catch (err) { }

          alert((config.successMsg || '✅ Payment Successful!') + '\nPayment ID: ' + response.razorpay_payment_id);
          window.open('https://wa.me/' + (config.whatsapp || '919876543210') + '?text=' + encodeURIComponent(msg), '_blank');

          // Reset form
          document.getElementById('rzpForm').reset();
        },
        modal: { ondismiss: function () { 
            const btn = document.querySelector('.rzp-pay-btn');
            if(btn) {
                btn.innerHTML = '<i class="fa-solid fa-lock"></i> Pay <span id="rzpPayLabel">' + finalPriceLabel + '</span> Securely';
                btn.disabled = false;
            }
        } }
      };

      if (orderId) {
        options.order_id = orderId;
      }

      if (typeof Razorpay !== 'undefined') {
        new Razorpay(options).open();
      } else {
        alert('Payment gateway is loading. Please try again in a moment.');
        const btn = document.querySelector('.rzp-pay-btn');
        if(btn) {
            btn.innerHTML = '<i class="fa-solid fa-lock"></i> Pay <span id="rzpPayLabel">' + finalPriceLabel + '</span> Securely';
            btn.disabled = false;
        }
      }

    } catch (err) {
      console.error(err);
      alert('Error connecting to payment server. Ensure the backend is running.');
      const btn = document.querySelector('.rzp-pay-btn');
      if(btn) {
          btn.innerHTML = '<i class="fa-solid fa-lock"></i> Pay <span id="rzpPayLabel">' + finalPriceLabel + '</span> Securely';
          btn.disabled = false;
      }
    }
    return false;
  };
})();
