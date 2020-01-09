let array = []
db.Test.find().forEach((it)=> { 
      if(it.name == "pate croustillante"){ array.push(it)};
      if (it.name == "fromage") {array.push(it)};
      if (it.name == "Crème") {array.push(it)};
      if (it.name == "Ail") {array.push(it)};
      if (it.name == "Feta") {array.push(it)};
      if (it.name == "Oignons") {array.push(it)};
});
print(array);

