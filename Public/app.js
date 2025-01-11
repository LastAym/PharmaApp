// Fetch products from the server
fetch('/api/products')
    .then(response => response.json())
    .then(products => {
        const productTable = document.getElementById('productTable');
        products.forEach(product => {
            const row = document.createElement('tr');
            
            const selectCell = document.createElement('td');
            const selectCheckbox = document.createElement('input');
            selectCheckbox.type = 'checkbox';
            selectCheckbox.value = product.name;
            selectCell.appendChild(selectCheckbox);
            row.appendChild(selectCell);
            
            const nameCell = document.createElement('td');
            nameCell.textContent = product.name;
            row.appendChild(nameCell);
            
            const priceCell = document.createElement('td');
            priceCell.textContent = `${product.price.toFixed(2)}`;
            row.appendChild(priceCell);
            
            const discountCell = document.createElement('td');
            const discountInput = document.createElement('input');
            discountInput.type = 'number';
            discountInput.min = '0';
            discountInput.max = '100';
            discountInput.value = '0';  // Default discount is 0%
            discountCell.appendChild(discountInput);
            row.appendChild(discountCell);
            
            const quantityCell = document.createElement('td');
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.min = '1';
            quantityInput.value = '1';
            quantityCell.appendChild(quantityInput);
            row.appendChild(quantityCell);
            
            productTable.appendChild(row);
        });
    });

function calculateTotal() {
    const productTable = document.getElementById('productTable');
    const rows = productTable.getElementsByTagName('tr');
    let totalPrice = 0;

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const checkbox = row.cells[0].querySelector('input[type="checkbox"]');
        const quantityInput = row.cells[4].querySelector('input[type="number"]');
        const discountInput = row.cells[3].querySelector('input[type="number"]');

        if (checkbox.checked) {
            const productName = checkbox.value;
            const quantity = parseInt(quantityInput.value);
            const discount = parseFloat(discountInput.value);
            const price = parseFloat(row.cells[2].textContent.replace('', ''));

            const discountedPrice = price - (price * discount / 100);
            totalPrice += discountedPrice * quantity;
        }
    }

    document.getElementById('result').textContent = `Total Price: ${totalPrice.toFixed(2)}`;
}
