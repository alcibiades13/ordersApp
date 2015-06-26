$( function(){

    'use strict';

    appCore.initialize();

    // push order in the cart
    $( document ).delegate( '.add-item', 'click', function(){

        var $orderRow = $( this ).closest( 'tr' );
 
        $( '.order-table' ).append( $orderRow.clone() ).find( 'span.span-ok' ).removeClass( 'glyphicon-ok' ).addClass( 'glyphicon-remove' ).parent().removeClass( 'add-item' ).addClass( 'remove-item' ).find( 'span.item-count' ).remove();
        // $(this).parent().find('span.item-count').remove();
			
        var itemCount = $( this ).parent().find( 'span.item-count' ).html();
        $( this ).parent().find( 'span.item-count' ).html( ++itemCount );
        // return itemCount;

        totalPrice();

    } );

    // remove order from cart
    $( document ).delegate( '.remove-item', 'click', function(){

    	// var itemNameToRemove = ($( this ).parent().find('.item-name')).html();
    	// think through this
    	// if($('.item-name').html() === itemNameToRemove) {
   		console.log('hello');
        var $orderRow = $( this ).closest( 'tr' );
 
        $orderRow.remove();

        // when click on remove item from orders, decrease the item counter in the corresponding menu

        totalPrice();

    } );

    function totalPrice () {

        var totPrice = 0;
        var $price = $( '.order-table .price' );
        $price.each( function ( key, val ){

            var curPrice = ( $( val ).html() ) * 1;
            totPrice += curPrice;
            totPrice = Math.round( totPrice * 1000 ) / 1000;

        } );
        // return totalPrice;
        $( '.order-price' ).html( totPrice );

    }

    totalPrice();

} );
