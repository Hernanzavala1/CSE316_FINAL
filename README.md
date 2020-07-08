This is a project for my CSE 316 course at Stony Brook University.
The overall idea behind this project is to make app that will allow users, who can sign in and make their own accounts, to create their Logos. The Logos can be design shaped based on the user's desires. 
Below are listed some of the technologies that allowed me to come up with such App:
- React 
- Node.js (runtime environment)
- Express (Server)
- Materialize( Styling ) 
- Bootstrap (Styling)
- Mongoose (ODM)
- MongoDB (Database)
- GraphQL(query language)
- Passport(Authentication)

This project allowed me to delve upon these technologies to a great extent and i will continue to work with them for upcoming projects.


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


