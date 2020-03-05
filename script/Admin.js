
let ingListId = "ing-list";
let ingIdPrefix = "ing-crud-";
let ingUpdateModalId = "update-ing-modal";
let ingSelectCatId = "select-cat";
let euroIcon = "<i class=\"fa fa-eur\" aria-hidden=\"true\"></i>";

$(document).ready(function(){
    loadCategories();
    loadIngredients();
});

// Delete un element selectionné d'une liste donné s'il en est le seul selectionné
// puis le supprime l'élément correspondant dans la base de donnée s'il est encore là.
function deleteSelectedFromIngList(id) {
    let selectedId = getSelectedFromIngListId(id);
    if(selectedId == null)
        throw new Error("erreur de selection");

    let option = document.getElementById(selectedId);
    if( confirm("Êtes-vous sûr de vouloir supprimer l'élément suivant: \n"+ option.innerText) )
        option.parentElement.removeChild(option);
}

// Retourne un <option> selectionné unique enfants de l'élément dont l'id est passé en paramètre
// Si le nbr de selectionné dans la liste n'est pas égale à 1 ou la list n'existe pas, retourne null.
function getSelectedFromIngListId(id) {
    let selecteds = [];

    // Récupère la liste des ingrédients chargés
    let list = document.getElementById(id);
    if(list == null)
        return null;
    // Récupère les ingrédients selectionnés
    for (let i = 0; i < list.options.length; i++) {
        if (list.options[i].selected)
            selecteds.push(list.options[i]);
    }

    // Si le nombre de selectionné n'est pas 1, on averti l'utilisateur.
    if (selecteds.length === 0) {
        alert("veuillez selectionner un élément à supprimer.");
        return null;
    } else if (selecteds.length > 1)
    {
        alert("veuillez ne pas selectionner plus d'un élément à supprimer");
        return null;
    }
    // Si le nombre de selectionnés est bien égal à 1, on supprime le selectionné
    else
    {
        return selecteds[0].id;
    }
}

// Prépare
function setupUpdateModalIng(listId, modalId){
    let selectedId = getSelectedFromIngListId(listId);
    if(selectedId == null)
        throw new Error("erreur de selection");

    let ingObject = getIngById( parseInt(selectedId.substr(9)) );

    let modalSuffix = modalId.substr(0, 11);

    document.getElementById( modalSuffix + "name").setAttribute("value", ingObject.name);
    document.getElementById(modalSuffix + "cost").setAttribute("value", ingObject.prix);
    document.getElementById(modalSuffix + "id").setAttribute("value", ingObject.id);

    $("#"+ ingUpdateModalId).modal('toggle');
}

function addOptionToSelectCat(categorie)
{
    // a faire
}

function loadCategories(){
    let select_cat_create_ing = document.getElementById(ingSelectCatId);
    getAllCat().forEach(e =>
    {
        let element = document.createElement("option");
        element.value = e.id;
        element.id = "ing-cat-" + e.id;
        element.innerText = e.name;
        select_cat_create_ing.append(element);
    })
}

function loadIngredients() {
    let listIng = getAllIng();
    let htmlIngList = document.getElementById(ingListId);
    listIng.forEach((element) =>
    {
        let toAdd = document.createElement("option");
        toAdd.value = element.id;
        toAdd.id = ingIdPrefix+""+element.id;
        toAdd.innerText= element.name;

        // on ajoute
        let euroPart = document.createElement("span");
        euroPart.innerText ="( "+ element.prix  +" euro )";
        toAdd.appendChild(euroPart);

        htmlIngList.appendChild(toAdd);
    })
}

function createIng(){
    console.log("ok");
}