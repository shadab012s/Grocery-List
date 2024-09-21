$(function() {
    // Function to update the item counts
    function updateCounts() {
        $('#need-count').text($('#need-list li').length);
        $('#have-count').text($('#have-list li').length);
    }

    // Function to check if an item already exists in the list
    function findItem(list, itemName) {
        var existingItem = null;
        list.find('li').each(function() {
            var listItem = $(this).find('.item-name').text().trim().toLowerCase();
            if (listItem === itemName.toLowerCase()) {
                existingItem = $(this);
                return false; // Exit each loop
            }
        });
        return existingItem;
    }

    // Function to handle adding items
    function addItem(event) {
        event.preventDefault();
        var itemInput = $('#item'),
            quantityInput = $('#quantity'),
            itemValue = itemInput.val().trim(),
            quantityValue = parseInt(quantityInput.val().trim(), 10),
            need = ($(event.target).attr('id') === 'addNeed'),
            list = need ? $('#need-list') : $('#have-list');

        itemInput.val("");
        quantityInput.val("1").focus();

        if (itemValue === "" || isNaN(quantityValue) || quantityValue <= 0) return;

        // Check if the item already exists in the list
        var existingItem = findItem(list, itemValue);
        if (existingItem) {
            // Increase the quantity of the existing item
            var currentQuantity = parseInt(existingItem.find('.quantity-input').val(), 10);
            existingItem.find('.quantity-input').val(currentQuantity + quantityValue);
        } else {
            // Create a new item
            var item = $('<li><input type="checkbox" name="item"> <span class="item-name">' + itemValue + '</span> <input type="number" value="' + quantityValue + '" min="1" class="quantity-input"> <a href="#">&#10006;</a></li>');

            if (!need) {
                item.find('input[type=checkbox]').prop('checked', true);
            }
            item.appendTo(list);
        }
        updateCounts();
    }

    // Function to handle removing items
    function removeItem(event) {
        event.preventDefault();
        $(event.target).closest('li').remove();
        updateCounts();
    }

    // Function to handle toggling items between lists
    function toggleItem(event) {
        var listItem = $(event.target).closest('li'),
            list = event.target.checked ? $('#have-list') : $('#need-list');
        listItem.appendTo(list);
        updateCounts();
    }

    // Event listeners for add buttons
    $('#addHave, #addNeed').on('click', addItem);
    
    // Event listener for removing items
    $('body').on('click', '.list li a', removeItem);
    
    // Event listener for toggling items
    $('body').on('change', '.list input[type=checkbox]', toggleItem);

    // Initial count update
    updateCounts();
});
