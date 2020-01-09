let array = []
db.menu.find({name:"kebab"}).forEach((it)=> { 
      console.log(it.composition)
});
   
