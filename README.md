querying all the logos from the database
{
  logos {
    _id
    text,
    color, 
    backgroundColor, 
    borderColor, 
    fontSize, 
    borderWidth ,
    borderRadius ,
    padding, 
    margin,
    lastUpdate
  }
}


querying a specific logo based on id

{
  logo(id: "5e93792b85b1763c50ba98d9"){
    _id,
  text,
  color, 
  backgroundColor, 
  borderColor, 
  fontSize, 
  borderWidth ,
  borderRadius ,
  padding, 
  margin,
  lastUpdate
    
  }
}


remove logo based on id 

mutation{
  removeLogo(id: "5e93792b85b1763c50ba98d9" ){
    _id
    
  }

}

update a logo based on id

  
mutation{
  updateLogo(id: "5e9384ab85b1763c50ba98da", text: "hello", fontSize:12, color:"#302a2a" , 
    backgroundColor:"#eb3434" , borderColor:"#48b4c2", borderWidth:12, borderRadius:34, padding:12,
  margin:11){
     _id,
  text,
  color, 
  backgroundColor, 
  borderColor, 
  fontSize, 
  borderWidth ,
  borderRadius ,
  padding, 
  margin,
  lastUpdate
  
  }

}

add a new logo to the database:
mutation{
  addLogo( text: "Bye felicia", fontSize:12, color:"#302a2a" , 
    backgroundColor:"#eb3434" , borderColor:"#48b4c2", borderWidth:12, borderRadius:34, padding:12,
  margin:11){
     _id,
  text,
  color, 
  backgroundColor, 
  borderColor, 
  fontSize, 
  borderWidth ,
  borderRadius ,
  padding, 
  margin,
  lastUpdate
  
  }

}


Get all of the logos in the database

query{
  logos{
    _id,
  text,
  color, 
  backgroundColor, 
  borderColor, 
  fontSize, 
  borderWidth ,
  borderRadius ,
  padding, 
  margin,
  lastUpdate
  }
}


