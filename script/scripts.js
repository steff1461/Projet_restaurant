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
        orderString += "Prix total = " + (Math.round(totalPrice*100)/100) + "€";
        var ask = window.confirm(orderString);
        if (ask) {
            sessionStorage.setItem('totalPrice', Math.round(totalPrice*100)/100);
            if (document.getElementById('checkcheck').checked == true){
                sessionStorage.setItem('aStreet', document.getElementById('street').value);
                sessionStorage.setItem('aNumber', document.getElementById('number').value);
                sessionStorage.setItem('aPostcode', document.getElementById('postcode').value);
                sessionStorage.setItem('aCity', document.getElementById('city').value);
            }
            window.alert("Merci d'avoir commandé une pizza d'Alex.\n Vous allez maintenant être redirigé vers la page de paiement.");
            window.location.href = "./ChoixPaiement.html";
        }
    }
}

// to make the address form appear
function showAddress(){
    var checkBox = document.getElementById('checkcheck');
    var text = document.getElementById('address');

    if (checkBox.checked == true){
        text.style.display = 'block';
    } else {
        text.style.display = 'none';
    }
}

// to use directly on the postcode field of the address form
function evalPostcode(){
    var pcfield = document.getElementById('postcode');
    var checkBox = document.getElementById('checkcheck');
    if (checkBox.checked == true){
        if (pcfield.value < 1000 || pcfield.value > 5000){
            window.alert("Ce code postal n'est pas dans notre zone de livraison!");
        }else{
            popConfirmation();
        };
    }else{
        popConfirmation();
    }
}