

let tab_temp_result=[];
let temp_result;
let ingredients;



let menu;

    $(document).ready(function() {

        $.ajax({

            url: 'http://localhost:3000/getPizza',
            type: 'GET',
            dataType: 'json',

            success: function (response) {


                menu=response;
            },

            error: function () {

                alert("erreur");
            }
        });
    });



   $(document).ready(function(){

        $.ajax({

            url:'http://localhost:3000/getIngredient',
            type:'GET',
            dataType:'json',
            success : function (response) {

                ingredients=response;
            },

            error : function () {

            },

            complete : function () {

            }
        });

    });




function getAllIng(){

    return ingredients;
}

function getIngById(arg){

    ingredients.forEach(function (item) {
        if(item._id===arg){

            temp_result=item;
        }
    });

    return temp_result;
}

function getIngByCat(arg){
    tab_temp_result=[];
    ingredients.forEach(function (item) {


        if(item.categorie===arg){
            tab_temp_result.push(item);
        }
    });
    return tab_temp_result;
}

function getAllMenu(){

    return menu;
}

function getMenuById(arg){

    menu.forEach( function (item) {

        if(item._id===arg){
            temp_result=item;
        }
    });

    return temp_result;
}

function getMenuIngrebyId( arg){
    let tabIngre=[];
    getMenuById(arg).composition.forEach(function(item){


        tabIngre.push(getIngById(item._id));
    });

    return tabIngre;
}

function getMenuPricebyId(arg){

    let totalPrice=0;
    getMenuIngrebyId(arg).forEach(function(item){

       totalPrice+=item.prix;
    });

    return totalPrice;
}




