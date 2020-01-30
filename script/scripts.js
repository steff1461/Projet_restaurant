function popConfirmation(){
    if (totalCommande.length == 0){
        window.alert("There is nothing in your commande");
    }
    else{
        let orderString = "Confirmer la commande ?\n";
        let totalPrice = 0;
        for (let index = 0; index < totalCommande.length; index++) {
            const element = totalCommande[index];
            orderString += "Pizza " + element.name + " x"+ element.quantite + " = " + element.prix + "€\n";
            totalPrice += element.prix;            
        }
        orderString += "Prix total = " + Math.round(totalPrice) + "€";
        var ask = window.confirm(orderString);
        if (ask) {
            window.alert("Merci d'avoir commandé une pizza d'Alex.\n Vous allez maintenant être redirigé vers la page d'accueil.");
            window.location.href = "./Accueil.html";
        }
    }
}

// ADDRESS FORM EXAMPLE
{/*
<input type="checkbox" id="checkcheck" onclick="showAddress()">TEST</input>
<br>
<form id="addressTest" style="display:none">
    <label>Rue</label>
    <input type="text" id="street" string="test">
    <br>
    <label>Numéro</label>
    <input type="text" id="number" string="test">
    <label>Code postal</label>
    <input type="text" id="postcode" string="test">
    <br>
    <label>Ville</label>
    <input type="text" id="city" string="test">
    <button>Send</button>
</form> 
<script src="../script/scripts.js"></script>
*/}

// to make the address form appear
function showAddress(){
    var checkBox = document.getElementById('checkcheck');
    var text = document.getElementById('addressTest');

    if (checkBox.checked == true){
        text.style.display = 'block';
    } else {
        text.style.display = 'none';
    }
}

// to use directly on the postcode field of the address form
var pcfield = document.getElementById('postcode');

pcfield.addEventListener("keyup", function(event){
    if (pcfield.value < 1000 || pcfield.value > 5000){
        pcfield.setCustomValidity("Ce code postal n'est pas dans notre zone de livraison!");
    }else{
        pcfield.setCustomValidity("");
    }
});