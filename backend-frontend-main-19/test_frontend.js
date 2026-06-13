const fs = require('fs');

const d = {
    consultAcharya: [
        {
            title: 'Quick Guidance',
            reqShipping: false,
            reqBirth: true,
            reqNotes: true,
            checkoutFields: [
                { label: 'Full Name', type: 'text', required: true },
                { label: 'Custom Field', type: 'text', required: false }
            ]
        }
    ]
};

let plan = 'Quick Guidance';
let index = -1;
if (plan === 'Quick Guidance') index = 0;
else if (plan === 'Deep Analysis') index = 1;
else if (plan === 'Complete Life Reading') index = 2;

let checkoutFields;
if (d && d.consultAcharya && index !== -1) {
    const item = d.consultAcharya[index];
    if (item) {
        checkoutFields = item.checkoutFields;
    }
}

console.log("Extracted checkout fields:", checkoutFields);

function getItemCheckoutFields(item) {
    if (item.checkoutFields && item.checkoutFields.length) {
        return item.checkoutFields;
    }
    return null;
}

const razorpayFields = getItemCheckoutFields({ checkoutFields: checkoutFields });
console.log("Razorpay fields:", razorpayFields);
