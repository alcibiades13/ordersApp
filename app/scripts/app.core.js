// application
var appCore = ( function (){

	'use strict';

    var config = {
        wrapper : '.menu-coffee',
        urlbase : 'api/coffeeorders/'
    };

    var initialize = function(){

        $.extend( appCore.config, config );
        populateDrinks( '.menu-drinks' );
        populateCoffee( '.menu-coffee' );
        populateFood( '.menu-food' );

    };

    // populate the menus from the backend

    // structure

    // url - api/coffeeorders/menuname.json
    // [{
    //  "name": name,
    //  "price": price
    // }]

    var buildUrl = function ( menu ){

        return config.urlbase + menu + '.json';

    };

    var populateMenu = function ( menu, wrapper ){

        var url = buildUrl( menu );
        $.getJSON( url, function ( data ){

            $.each( data, function ( key, val ){

                var tableRow = createTableRow( val.name, val.price );

                $( wrapper ).append( tableRow );

            } );

        } );

    };

    // add new item to menu
    var addMenuItem = function (){

        var name = $( 'input#name' ).val();
        var price = $( 'input#price' ).val();
        var tableRow = createTableRow( name, price );

        var selectedChoice = $( '#select-menu' ).val();
        console.log( selectedChoice ); // coffe | drinks | food
        switch( selectedChoice ) {
            case 'coffee':
                $( '.menu-coffee tbody' ).append( tableRow );
                break;
            case 'drinks':
                $( '.menu-drinks tbody' ).append( tableRow );
                break;	
            case 'food':
                $( '.menu-food tbody' ).append( tableRow );
                break;
        }
		
        // activate when backend is there
        // var buildurl = buildUrl(selectedChoice);

        // var newItem = {
        // 	name: $('input#name').val(),
        // 	price: $('input#price').val()
        // };

        // $.ajax({
        // 	type: 'POST',
        // 	dataType: "json",
        // 	url: buildurl,
        // 	data: newItem
        // });

    };

    // create table row and return it
    var createTableRow = function ( name, price ){

        var tableCoffeeName = '<td class="item-name">' + name + '</td>';
        var tableCoffeePrice = '<td class="price">' + price + '</td>';
        var tableRemoveItem = '<td class="add-item"><span class="glyphicon glyphicon-ok span-ok"></span><span class="item-count"></span></td>';		
        var tableRow = '<tr>' + tableCoffeeName + tableCoffeePrice + tableRemoveItem + '</tr>';	
        return tableRow;

    };

    $( document ).delegate( '.submit-item', 'click', function( e ){

        e.preventDefault();
        addMenuItem();

    } );

    var populateDrinks = function ( wrapper ){

        config.wrapper = wrapper;
        populateMenu( 'drinks', wrapper );

    };

    var populateCoffee = function ( wrapper ){

        config.wrapper = wrapper;
        populateMenu( 'coffee', wrapper );

    };

    var populateFood = function ( wrapper ){

        config.wrapper = wrapper;
        populateMenu( 'food', wrapper );

    };

    return {
        initialize : initialize,
    };

} )();
