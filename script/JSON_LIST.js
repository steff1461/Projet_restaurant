let tab_temp_result=[];
let temp_result;


let menu = [

    {
        id:0,
        name:"Kebab",
        ingredients:[1,3,12,13,9,20]
    }
    ,
    {
        id:1,
        name:"Bolognaise",
        ingredients:[0,31,10,3,14]
    }
    ,
    {
        id:2,
        name:"Hawai",
        ingredients:[0,24,10,3,19,21]
    }
    ,
    {
        id:3,
        name:"Végétarienne",
        ingredients:[1,3,10,14,17,19,5,5,4,5,20]
    }
    ,
    {
        id:4,
        name:"Chevrette",
        ingredients:[2,27,11,3,4,19,20]
    }
];

let categories=[

    {
        id:0,
        name:"Pâtes",

    }
    ,
    {
        id:1,
        name:"Fromages"

    }
    ,
    {
        id:2,
        name:"Sauces",

    }
    ,
    {
        id:3,
        name:"Condiments",

    }
    ,
    {
        id:4,
        name:"Viandes",

    }

];

let ingredients = [

    {
        id: 0,
        name: "Pâte classique",
        prix: 1.8,
        cat_id:0
    }
    ,
    {
        id: 1,
        name: "Pâte croustillante",
        prix: 2,
        cat_id:0
    }
    ,
    {
        id: 2,
        name: "Pâte USA",
        prix: 1.9,
        cat_id:0
    }
    ,
    {
        id: 3,
        name: "Fromage",
        prix: 1.8,
        cat_id:1
    }
    ,
    {
        id: 4,
        name: "Chèvre",
        prix: 2,
        cat_id:1
    }
    ,
    {
        id: 5,
        name: "Brie",
        prix: 1.9,
        cat_id:1
    }
    ,
    {
        id: 6,
        name: "Parmesan",
        prix: 1.6,
        cat_id:1
    },
    {
        id: 7,
        name: "Camembert",
        prix: 1.6,
        cat_id:1
    },
    {
        id: 8,
        name: "Reblochon",
        prix: 1.6,
        cat_id:1
    },

    {
        id: 9,
        name: "Feta",
        prix: 2.2,
        cat_id:1
    }
    ,

    {
        id: 10,
        name: "Tomate",
        prix: 1.8,
        cat_id:2
    }
    ,
    {
        id: 11,
        name: "Fromage",
        prix: 2,
        cat_id:2
    }
    ,
    {
        id: 12,
        name: "Ail",
        prix: 1.9,
        cat_id:2
    }
    ,
    {
        id: 13,
        name: "Crème",
        prix: 1.6,
        cat_id:2
    }
    ,
    {
        id: 14,
        name: "Champignons",
        prix: 3,
        cat_id:3
    }
    ,
    {
        id: 15,
        name: "Anchois",
        prix: 2.5,
        cat_id:3
    }
    ,
    {
        id: 16,
        name: "Olives",
        prix: 2.3,
        cat_id:3
    }
    ,
    {
        id: 17,
        name: "Poivrons",
        prix: 2.9,
        cat_id:3
    }
    ,
    {
        id: 18,
        name: "Oeufs",
        prix: 3,
        cat_id:3
    }
    ,
    {
        id: 19,
        name: "Origan",
        prix: 3.5,
        cat_id:3
    }
    ,
    {
        id: 20,
        name: "Oignons",
        prix: 3.7,
        cat_id:3

    }
    ,
    {
        id: 21,
        name: "Ananas",
        prix: 3,
        cat_id:3
    }
    ,
    {
        id: 22,
        name: "Pomme de terre",
        prix: 2.8,
        cat_id:3

    }
    ,
    {
        id: 23,
        name: "Kebab",
        prix: 3,
        cat_id:4
    }
    ,
    {
        id: 24,
        name: "Jambon",
        prix: 2.5,
        cat_id:4
    }
    ,
    {
        id: 25,
        name: "Poulet",
        prix: 2.3,
        cat_id:4
    }
    ,
    {
        id: 26,
        name: "Boeuf",
        prix: 2.9,
        cat_id:4
    }
    ,
    {
        id: 27,
        name: "Lardon",
        prix: 3,
        cat_id:4
    }
    ,
    {
        id: 28,
        name: "Saumon",
        prix: 3.5,
        cat_id:4
    }
    ,
    {
        id: 29,
        name: "Scampis",
        prix: 3.7,
        cat_id:4
    }
    ,
    {
        id: 30,
        name: "Merguez",
        prix: 3,
        cat_id:4
    }
    ,
    {
        id: 31,
        name: "Viande hachée",
        prix: 2.8,
        cat_id:4
    }
    ,
    {
        id: 32,
        name: "Thon",
        prix: 3,
        cat_id:4
    }
];

function getAllCat() {
    return categories;
}

function getCatById(arg){

    categories.forEach(function (item) {
        if(item.id===arg){

            temp_result=item;
        }
    });
    return temp_result;
}

function getAllIng(){
    return ingredients;
}

function getIngById(arg){

    ingredients.forEach(function (item) {
        if(item.id===arg){
            temp_result=item;
        }
    });

    return temp_result;
}


function getIngByCat(arg){
    tab_temp_result=[];
    ingredients.forEach(function (item) {

        if(item.cat_id===arg){
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

        if(item.id===arg){

            temp_result=item;
        }
    });

    return temp_result;
}

function getMenuIngrebyId( arg){
    let tabIngre=[];
    get_Menubyid(arg).ingredients.forEach(function(item){


        tabIngre.push(get_Ingrebyid(item));
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


function create_ingre(name,prix,cat_id){

    let ingre={

        id:get_Allingre().length,
        name:name,
        prix:prix,
        cat_id:cat_id
    };

    ingredients.push(ingre);
}


function update_ingr(id,name,prix){


    get_Ingrebyid(id).name=name;
    get_Ingrebyid(id).prix=prix;
}
//
// get_Menubyid(2).ingredients.forEach(function (item) {
//
//     console.log(get_Ingrebyid(item).name);
//
// });

