var arrayIngredient = []
db.Test.find().forEach((it)=> { 
      if(it.name == "pate croustillante"){ arrayIngredient.push(it); console.log(arrayIngredient)};
      if (it.name == "fromage") {arrayIngredient.push(it)};
      if (it.name == "Crème") {arrayIngredient.push(it)};
      if (it.name == "Ail") {arrayIngredient.push(it)};
      if (it.name == "Feta") {arrayIngredient.push(it)};
      if (it.name == "Oignons") {arrayIngredient.push(it)};
});
print(arrayIngredient);


db.menu.insert({ name : "kebab" , composition : arrayIngredient })