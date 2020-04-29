//------------------------------------------------------
//----------------VARIABLES------------------------------
//------------------------------------------------------
let selectType= document.getElementById("comm-select-type");
let inputQuant=document.getElementById("comm-input-quant");
let btnAdd=document.getElementById("comm-btn-add");


let totalCommande=[];
let cpt=0;

selectType.onchange=getDefaultRow;
btnAdd.onclick=function (){getNewRow(); getPizza(this);};
let inputQuant=document.getElementById("comm-input-quant");
inputQuant.onchange=verifyInput;


function selectAfter(){

    getNewRow();
    document.getElementById("row"+cpt).remove();


}
function verifyInput(){

    let inputQuant= document.getElementById("comm-input-quant");
    if(inputQuant.value<1){

        inputQuant.title="Veuillez sélectionner une valeur positive";
        inputQuant.value =1;
}
}


//-------------------------------------------
//-------------------ROW---------------------
//-------------------------------------------

//fonction qui permet d'obtenir les éléments de base de la row en
// fonction du select qui permet de choisir soit une pizza menu soit une pizza custom

function getDefaultRow() {

    let divPates = document.getElementById("command-pate");
    let divSauces = document.getElementById("command-sauce");
    let divSelectMenu = document.getElementById("command-menu");
    let divIngre=document.getElementById("command-ingre");

    let selectPate=document.createElement("select");
    selectPate.id = "comm-select-pate";
    selectPate.className = "comm-select-pate";
    selectPate.style.width = "100%";
    divPates.appendChild(selectPate);

    let selectSauce=document.createElement("select");
    selectSauce.id = "comm-select-sauce";
    selectSauce.className = "comm-select-sauce";
    selectSauce.style.width = "100%";
    divSauces.appendChild(selectSauce);

    let selectType=document.getElementById("comm-select-type");
    selectType.onchange=selectAfter;

    let indexType = selectType.selectedIndex;
    let optionType = selectType.options[indexType];

//--------MENU---------------------------------------
    //Si menu est sélectionné
    if (optionType.value === "Menu") {

        if(document.getElementById("comm-label-menu")) {
            document.getElementById("comm-label-menu").id = "0";
        }
        document.getElementById("comm-select-type").onchange=selectAfter;
        let lblSelect=document.createElement("label");
        lblSelect.innerHTML = "Votre pizza";
        lblSelect.id="comm-label-menu";

        let selectMenu=document.createElement("select");
        selectMenu.id = "comm-select-menu";
        selectMenu.className="comm-select-menu";
        selectMenu.style.width = "100%";

        let defaultOption=document.createElement("option");
        defaultOption.value = "-----";
        defaultOption.innerHTML = "----";

        document.getElementById("comm-input-quant").onchange=function (){verifyInput();getMenuPrice();};//Quand on
            // change la
        // valeur
        // de l'input
        // quantité le prix se met à jour

        selectMenu.onchange = function () {getMenuIngre() ;getMenuPrice();}; //Quand on sélectionne une pizza
        // "préfaite" les ingrédients s'affiche et on obtient le prix de la pizza

        selectMenu.appendChild(defaultOption);
        document.getElementById("command-menu").appendChild(lblSelect);
        document.getElementById("command-menu").appendChild(selectMenu);
        document.getElementById("command-row").insertBefore(divSelectMenu, divPates);

        getAllMenu().forEach(function (item) {
            let options = document.createElement("option");
            options.value = item._id;
            options.innerHTML = item.name;
            selectMenu.appendChild(options);
        });
    }

    // ---------CUSTOM-------------------
        //si custom est sélectionné


    else if (options.value === "Custom") {
        document.getElementById("comm-select-type").onchange=selectAfter;

        let selectIngre= document.createElement("select");
        selectIngre.id = "comm-select-ingre";

        let defaultValue=document.createElement("option");
        defaultValue.innerHTML=("-----");

        selectIngre.appendChild(defaultValue);

        getIngByCat("pate").forEach(function (item) {

            let optionPate = document.createElement("option");
            optionPate.value = item._id;
            optionPate.innerHTML = item.name;
            selectPate.appendChild(optionPate);
        });

        getIngByCat("sauce").forEach(function (item) {

            let optionSauce = document.createElement("option");
            optionSauce.value = item._id;
            optionSauce.innerHTML = item.name;
            selectSauce.appendChild(optionSauce);
        });

        getAllIng().forEach(function (item) {

            if (item.categorie !== "pate" && item.categorie !== "sauce") {

                let optionIngre = document.createElement("option");
                optionIngre.value = item._id;
                optionIngre.innerHTML = item.name;
                selectIngre.appendChild(optionIngre);
            }
        });

        let btnAddIngre=document.createElement("button");
        btnAddIngre.id = "btnAddIngre";
        btnAddIngre.innerHTML = "Add";

        divIngre.appendChild(selectIngre);
        divIngre.appendChild(btnAddIngre);
        divIngre.appendChild(document.createElement("br"));

        selectPate.onchange = getCustomPrice;
        selectSauce.onchange = getCustomPrice;

        document.getElementById("comm-input-quant").onchange=function (){getCustomPrice();verifyInput();};
        btnAddIngre.onclick = addIngre;
        getCustomPrice();
    }
}
//--------------------------------------------
//---------ADD-NEW-ROW------------------------
//--------------------------------------------

//permet d'obtenir une nouvellle row lorsque l'on appuie sur add
//ajout des éléments div par div et modification des ids de la row précédente pour éviter les conflits
function getNewRow(){

    cpt++;

    let divNewRow=document.createElement("div");
    divNewRow.className="row container-fluid";
    divNewRow.style.borderTop="2px solid black";
    document.getElementById("command-row").id="row"+cpt;
    divNewRow.id="command-row";

//-----------------div1-------------------------------------

    let divNewType=document.createElement("div");
    divNewType.className="col-md-1 command-type";
    /*divNewType.style.border="2px solid black";*/
    divNewType.style.marginRight="1%";

    let labelNewType= document.createElement("label");
    labelNewType.for="comm-select-type";
    labelNewType.innerHTML="Catégorie:";

    let selectNewType= document.createElement("select");
    document.getElementById("comm-select-type").disabled=true;
    document.getElementById("comm-select-type").id="row"+cpt+"type";
    selectNewType.className="comm-select-type";
    selectNewType.id="comm-select-type";

    let option1=document.createElement("option");
    option1.value="-----";
    option1.innerHTML="-----";

    let option2=document.createElement("option");
    option2.value="Menu";
    option2.innerHTML="Menu";

    let option3=document.createElement("option");
    option3.value="Custom";
    option3.innerHTML="Custom";

    divNewType.appendChild(labelNewType);
    divNewType.appendChild(selectNewType);
    selectNewType.appendChild(option1);
    selectNewType.appendChild(option2);
    selectNewType.appendChild(option3);

    selectNewType.onchange=getDefaultRow;
//-----------------div2-------------------------------------

    let divNewMenu=document.createElement("div");
    divNewMenu.className="col-md-1 command-menu";
    /*divNewMenu.style.border="2px solid black";*/
    divNewMenu.style.marginRight="1%";

    document.getElementById("command-menu").id="row"+cpt+"menu";
    divNewMenu.id="command-menu";

  if( document.getElementById("comm-select-menu")) {

      document.getElementById("comm-label-menu").id="0";
      document.getElementById("comm-select-menu").disabled=true;
      document.getElementById("comm-select-menu").id = "select" + cpt + "menu";
  }
//-----------------div3-------------------------------------

    let divNewPate=document.createElement("div");
    divNewPate.className="col-md-1 command-pate";
    /*divNewPate.style.border="2px solid black";*/
    divNewPate.style.marginRight="1%";
    document.getElementById("command-pate").id="row"+cpt+"pate";
    divNewPate.id="command-pate";

    let lblNewPate=document.createElement("label");
    lblNewPate.innerHTML="Votre pâte:";
    divNewPate.appendChild(lblNewPate);
    document.getElementById("comm-select-pate").disabled=true;
    document.getElementById("comm-select-pate").id="select"+cpt+"pate";


//-----------------div4-------------------------------------

    let divNewSauce=document.createElement("div");
    divNewSauce.className="col-md-1 command-sauce";
    /*divNewSauce.style.border="2px solid black";*/
    divNewSauce.style.marginRight="1%";
    document.getElementById("command-sauce").id="row"+cpt+"sauce";
    divNewSauce.id="command-sauce";

    let lblNewSauce=document.createElement("label");
    lblNewSauce.innerHTML="Votre sauce:";
    divNewSauce.appendChild(lblNewSauce);

    document.getElementById("comm-select-sauce").disabled=true;
    document.getElementById("comm-select-sauce").id="select"+cpt+"sauce";



//-----------------div5-------------------------------------

    let divNewIngre=document.createElement("div");
    divNewIngre.className="col-md-4 command-ingre";
    /*divNewIngre.style.border="2px solid black";*/
    divNewIngre.style.marginRight="1%";

    document.getElementById("command-ingre").id="row"+cpt+"ingre";
    let br =document.createElement("br");
    divNewIngre.id="command-ingre";

    let lblNewIngre=document.createElement("label");
    lblNewIngre.innerHTML="Vos ingrédient(s):";
    divNewIngre.appendChild(lblNewIngre);
    divNewIngre.appendChild(br);

    let selectIngre=document.getElementById("comm-select-ingre");

    if(selectIngre){

        selectIngre.disabled=true;
        selectIngre.id="null";
    }

    let btnAddIngre=document.getElementById("btnAddIngre");

    if(btnAddIngre) {

        btnAddIngre.disabled = true;
        btnAddIngre.id = "null";
    }

    let allBtnDel= Object.values(document.getElementsByClassName("comm-btnDel"));

    if (allBtnDel){

        for (let keys in allBtnDel){

            allBtnDel[keys].disabled=true;
        }
    }

//-----------------div6-------------------------------------

    let divNewPrix=document.createElement("div");
    divNewPrix.className="col-md-1 command-prix";
    /*divNewPrix.style.border="2px solid black";*/
    divNewPrix.style.marginRight="1%";
    document.getElementById("command-prix").id="prix"+cpt+"total";
    divNewPrix.id="command-prix";

    let lblNewPrix=document.createElement("label");
    lblNewPrix.for="comm-lbl-prix";
    lblNewPrix.innerHTML="Prix total:";

    let inputNewPrix= document.createElement("input");
    document.getElementById("comm-lbl-prix").style.width="50%";
    document.getElementById("comm-lbl-prix").style.marginLeft="20%";
    document.getElementById("comm-lbl-prix").style.marginBottom="7%";
    document.getElementById("comm-lbl-prix").id="prix"+cpt+"input";

    inputNewPrix.id="comm-lbl-prix";
    inputNewPrix.type="text";
    inputNewPrix.readOnly=true;
    divNewPrix.appendChild(lblNewPrix);
    divNewPrix.appendChild(inputNewPrix);

//-----------------div7-------------------------------------

    let divNewQuant= document.createElement("div");
    divNewQuant.className="col-md-1 command-quant";
    /*divNewQuant.style.border="2px solid black";*/
    divNewQuant.style.marginRight="1%";

    let inputNewQuant= document.createElement("input");
    inputNewQuant.type="number";
    inputNewQuant.style.width="50%";
    divNewQuant.appendChild(inputNewQuant);
    document.getElementById("comm-input-quant").style.width="50%";
    document.getElementById("comm-input-quant").style.marginLeft="25%";
    document.getElementById("comm-input-quant").style.marginTop="18%";
    document.getElementById("comm-input-quant").id="quant"+cpt+"input";
    document.getElementById("quant"+cpt+"input").readOnly=true;
    inputNewQuant.className="comm-input-quant";
    inputNewQuant.id="comm-input-quant";
    inputNewQuant.value="1";
    inputNewQuant.min="1";
    inputNewQuant.max="20";
    inputNewQuant.onchange=verifyInput;



//-----------------div8-------------------------------------

    let divNewAdd=document.createElement("div");
    divNewAdd.className="col-md-1";
    /*divNewAdd.style.border="2px solid black";*/
    divNewAdd.style.marginRight="1%";

    let btnNewAdd=document.createElement("button");
    btnNewAdd.innerHTML="Add";

    document.getElementById("comm-btn-add").innerHTML="Delete";
    document.getElementById("comm-btn-add").onclick=deleteRow;
    document.getElementById("comm-btn-add").style.marginTop="22%";
    document.getElementById("comm-btn-add").style.marginLeft="14%";
    document.getElementById("comm-btn-add").id=cpt.toString();

    btnNewAdd.id="comm-btn-add";
    btnNewAdd.onclick=function (){getNewRow();getPizza(this)};
    divNewAdd.appendChild(btnNewAdd);
    btnNewAdd.style.marginTop="22%";
    btnNewAdd.style.marginLeft="18%";


//---------------------------------------------

    divNewRow.appendChild(divNewType);
    divNewRow.appendChild(divNewMenu);
    divNewRow.appendChild(divNewPate);
    divNewRow.appendChild(divNewSauce);
    divNewRow.appendChild(divNewIngre);
    divNewRow.appendChild(divNewQuant);
    divNewRow.appendChild(divNewPrix);
    divNewRow.appendChild(divNewAdd);

    let footerPos=document.getElementById("end");
    let main=document.getElementById("beg");

    main.insertBefore(divNewRow,footerPos);
}

//----------------------------------------
//-------------DEL-ROW--------------------
//----------------------------------------

function deleteRow(){

    let clickId= this.id;
    let delDiv=document.getElementById("row"+clickId);
    delDiv.remove();
    let cpt=0;

    for (let keys in totalCommande){
        if(totalCommande[keys].id===parseInt(clickId)){

            totalCommande.splice(cpt,1);
            insertCommande();
            cpt--;
        }
        cpt++;

    }
}

//--------------------------------------------
//------------DEL-INGRE-----------------------
//--------------------------------------------

function deleteIngre(){

   let delIngre= this.previousSibling;
   delIngre.remove();
   this.remove();
   getCustomPrice();
}


// --------------------------------------------
//------------ADD-INGRE-CUSTOM----------------
//--------------------------------------------

    function addIngre(){

        let selectIngre=document.getElementById("comm-select-ingre");
        let index=selectIngre.selectedIndex;
        let selectedOption= selectIngre.options[index];

        if(selectedOption.innerHTML!="-----") {
            let id = selectedOption.value;
            let selectNewIngre = document.createElement("select");
            let option = document.createElement("option");
            let btnDel = document.createElement("button");
            let btnImg = document.createElement("img");
            btnDel.className = "comm-btnDel";
            btnDel.onclick = deleteIngre;

            option.value = getIngById(id)._id;
            option.innerHTML = getIngById(id).name;
            option.className = "newIngre";

            selectNewIngre.appendChild(option);
            document.getElementById("command-ingre").appendChild(selectNewIngre);
            document.getElementById("command-ingre").appendChild(btnDel);
            btnDel.appendChild(btnImg);
            getCustomPrice();
        }
    }

    //---------------------------------------------
    //---------------GET-INGRE-MENU----------------
    //---------------------------------------------

function getNewMenu(){

    document.getElementById("comm-select-pate").remove();
    document.getElementById("comm-select-sauce").remove();
    document.getElementById("comm-select-menu").remove();
    document.getElementById("comm-label-menu").remove();
    let divIngre= document.getElementById("command-ingre");
    let ingre=Object.values( divIngre.getElementsByTagName("select"));
    ingre.forEach(function (item) {
       item.remove();
    });

    getMenuPrice();
    getDefaultRow();
}
    function getMenuIngre() {

        document.getElementById("comm-input-quant").onchange=function (){getMenuPrice(); verifyInput();};
        document.getElementById("comm-select-menu").onchange=getNewMenu;
        let index = document.getElementById("comm-select-menu").selectedIndex;
        let menuOption= document.getElementById("comm-select-menu").options[index].value;
        let menuId =parseInt(menuOption);



        function getNewMenu() {

            document.getElementById("comm-select-pate").remove();
            document.getElementById("comm-select-menu").remove();
            document.getElementById("comm-select-sauce").remove();
            document.getElementById("comm-label-menu").remove();
            let ingre = Object.values(document.getElementById("command-ingre").getElementsByTagName("select"));

            ingre.forEach(function (item) {

                item.remove();
            });

            getDefaultRow();
        }

        function getMenuIngre() {

            let selectMenu= document.getElementById("comm-select-menu");
            let index = selectMenu.selectedIndex;
            let menuId = selectMenu.options[index].value;
            selectMenu.onchange=getNewMenu;


            let selectPate = document.getElementById("comm-select-pate");
            let selectSauce = document.getElementById("comm-select-sauce");

            let optionPate = document.createElement("option");
            selectPate.appendChild(optionPate);

            let optionSauce = document.createElement("option");
            selectSauce.appendChild(optionSauce);

            getMenuById(menuId).composition.forEach(function (item) {

                let divIngre = document.getElementById("command-ingre");

                if (getIngById(item._id).categorie === "pate") {

                    optionPate.value = getIngById(item).id;
                    optionPate.innerHTML = getIngById(item).name;
                } else if (getIngById(item._id).categorie === "sauce") {

                    optionSauce.value = getIngById(item).id;
                    optionSauce.innerHTML = getIngById(item).name;
                } else {

                    let select = document.createElement("select");
                    let option = document.createElement("option");
                    option.value = getIngById(item._id)._id;
                    option.innerHTML = getIngById(item._id).name;
                    select.appendChild(option);
                    divIngre.appendChild(select);
                }
            });
        }

//----------------------------------------------------
//-----------MENU-PRICE-------------------------------
//----------------------------------------------------
        function getMenuPrice() {


    let selectMenu=document.getElementById("comm-select-menu");
    let index = selectMenu.selectedIndex;
    let id = parseInt(selectMenu.options[index].value);
    let totalPrice=0;
    let inputQuant=document.getElementById("comm-input-quant");
    let totalNumber=inputQuant.value;
    if(totalNumber<1){

        totalNumber=1;
    }

            getMenuById(id).composition.forEach(function (item) {
                totalPrice += getIngById(item._id).prix;
            });


    totalPrice=(totalPrice*totalNumber).toFixed(2);

            let lblPrix = document.getElementById("comm-lbl-prix");
            lblPrix.value = totalPrice;
            lblPrix.innerHTML = totalPrice;
        }

//----------------------------------------------
//----------CUSTOM-PRICE------------------------
//----------------------------------------------

        function getCustomPrice() {


    let totalPrice = 0;
    let selectPate= document.getElementById("comm-select-pate");
    let selectSauce= document.getElementById("comm-select-sauce");
    let indexPate = selectPate.selectedIndex;
    let idPate = parseInt(selectPate.options[indexPate].value);
    let indexSauce = selectSauce.selectedIndex;
    let idSauce = parseInt(selectSauce.options[indexSauce].value);
    let lblPrix=document.getElementById("comm-lbl-prix");
    let divIngre=document.getElementById("command-ingre");
    let inputQuant=document.getElementById("comm-input-quant");
    let totalNumber=inputQuant.value;
    if(totalNumber<1){

        totalNumber=1;
    }
    totalPrice += get_Ingrebyid(idPate).prix + get_Ingrebyid(idSauce).prix;

            let inputQuant = document.getElementById("comm-input-quant");
            let totalNumber = inputQuant.value;

            if (totalNumber < 1) {

                totalNumber = 1;
            }
            totalPrice += getIngById(idPate).prix + getIngById(idSauce).prix;


    totalPrice=(totalPrice*totalNumber).toFixed(2);
    lblPrix.value=totalPrice;
    lblPrix.innerHTML=totalPrice.toString();
}

            for (let i = 0; i < tabIngre.length; i++) {

                totalPrice += getIngById(tabIngre[i].value).prix;
            }

            totalPrice = (totalPrice * totalNumber).toFixed(2);
            lblPrix.value = totalPrice;
            lblPrix.innerHTML = totalPrice.toString();
        }

        function getPizza(arg) {

            let row = arg.parentNode.parentNode;
            let selectType = Object.values(row.getElementsByClassName("comm-select-type"));
            let selectedindex = selectType[0].selectedIndex;
            let inputQuantity = Object.values(row.getElementsByClassName("comm-input-quant"));
            let quantity = inputQuantity[0].value;

            if (selectedindex === 1) {

                let selectMenu = Object.values(row.getElementsByClassName("comm-select-menu"));
                let index = selectMenu[0].selectedIndex;
                let menuId = selectMenu[0].options[index].value;
                let pizza = {

                    id: cpt,
                    prix: getMenuPricebyId(menuId),
                    ingredients: getMenuIngrebyId(menuId),
                    name: getMenuById(menuId).name,
                    quantite: quantity
                };
                totalCommande.push(pizza);
                insertCommande();

            } else if (selectedindex === 2) {

                let selectPate = Object.values(row.getElementsByClassName("comm-select-pate"));
                let indexPate = selectPate[0].selectedIndex;
                let pateId = selectPate[0].options[indexPate].value;

                let selectSauce = Object.values(row.getElementsByClassName("comm-select-sauce"));
                let indexSauce = selectSauce[0].selectedIndex;
                let sauceId = selectSauce[0].options[indexSauce].value;

                let tabIngre = [];
                let totalPrice = 0;
                tabIngre.push(getIngById(pateId));
                tabIngre.push(getIngById(sauceId));

                let divIngre = Object.values(row.getElementsByClassName("col-md-4 command-ingre"));

                let tabIngreOptions = Object.values(divIngre[0].getElementsByClassName("newIngre"));


                tabIngreOptions.forEach(function (item) {

                    tabIngre.push(getIngById(item.value));
                });

                tabIngre.forEach(function (item) {

                    totalPrice += item.prix;
                });

                let pizza = {

                    id: cpt,
                    ingredients: tabIngre,
                    prix: totalPrice,
                    quantite: quantity,
                    name: "Custom"
                };


                totalCommande.push(pizza);
                insertCommande();
            }
        }

        function insertCommande() {

            let totalTab = document.getElementById("comm-panier");

            let totalPrice = 0;
            let totalRow = Object.values(totalTab.getElementsByClassName("comm-panier-row"));
            let tdTotalPrice = document.getElementById("comm-total-panier");

            if (totalRow) {
                for (let keys in totalRow) {

                    totalRow[keys].remove();
                }
            }
            totalCommande.forEach(function (item) {

                let row = document.createElement("tr");
                row.className = "comm-panier-row";
                totalTab.appendChild(row);


                totalPrice += (item.prix * item.quantite);
                tdTotalPrice.innerHTML = totalPrice.toFixed(2);

                let tdName = document.createElement("td");
                let tdPrice = document.createElement("td");
                let tdQuant = document.createElement("td");

                tdName.innerHTML = item.name;
                tdPrice.innerHTML = (item.prix).toFixed(2);
                tdQuant.innerHTML = item.quantite;

                row.appendChild(tdName);
                row.appendChild(tdPrice);
                row.appendChild(tdQuant);
            });

            if (totalCommande.length === 0) {

                tdTotalPrice.innerHTML = " ";
            }

        }

        function selectAfter() {

            getNewRow();
            document.getElementById("row" + cpt).remove();
        }

        function verifyInput() {

            let inputQuant = document.getElementById("comm-input-quant");

            if (inputQuant.value < 1) {

                inputQuant.title = "Veuillez sélectionner une valeur positive";
                inputQuant.value = 1;
                inputQuant.innerHTML="1";
            }

    }