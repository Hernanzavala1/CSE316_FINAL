var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var userModel = require('../models/User');
var GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;




var ImagesInput = new GraphQLInputObjectType({
  name: 'imageInput',
  fields: function () {
    return {

      _id: {
        type: GraphQLString
      },
      imageURL: {
        type: GraphQLString
      },
      imageWidth: {
        type: GraphQLInt
      },
      imageHeight: {
        type: GraphQLInt
      }
    }
  }
});



var Images = new GraphQLObjectType({
  name: 'image',
  fields: function () {
    return {

      _id: {
        type: GraphQLString
      },
      imageURL: {
        type: GraphQLString
      },
      imageWidth: {
        type: GraphQLInt
      },
      imageHeight: {
        type: GraphQLInt
      }
    }
  }
});

var TextsInput = new GraphQLInputObjectType({
  name: 'textInput',
  fields: function () {
    return {


      _id: {
        type: GraphQLString
      },
      fontSize: {
        type: GraphQLInt
      },
      color: {
        type: GraphQLString
      },
      text: {
        type: GraphQLString
      }




    }
  }
});


var Texts = new GraphQLObjectType({
  name: 'text',
  fields: function () {
    return {


      _id: {
        type: GraphQLString
      },

      fontSize: {
        type: GraphQLInt
      },
      color: {
        type: GraphQLString
      },
      text: {
        type: GraphQLString
      }


    }
  }
});

var LogosInput = new GraphQLInputObjectType({
  name: 'LogosInput',
  fields: function () {
    return {
      _id: {
        type: GraphQLString
      },
      Texts: {
        type: GraphQLList(TextsInput)
      },
      images: {
        type: GraphQLList(ImagesInput)
      },
      width: {
        type: GraphQLInt
      },
      height: {
        type: GraphQLInt
      },
      backgroundColor: {
        type: GraphQLString
      },
      borderColor: {
        type: GraphQLString
      },
      borderWidth: {
        type: GraphQLInt
      },
      borderRadius: {
        type: GraphQLInt
      }
    }
  }
});

var Logos = new GraphQLObjectType({
  name: 'Logos',
  fields: function () {
    return {

      _id: {
        type: GraphQLString
      },
      Texts: {
        type: GraphQLList(Texts)
      },
      images: {
        type: GraphQLList(Images)
      },
      width: {
        type: GraphQLInt
      },
      height: {
        type: GraphQLInt
      },
      backgroundColor: {
        type: GraphQLString
      },
      borderColor: {
        type: GraphQLString
      },
      borderWidth: {
        type: GraphQLInt
      },
      borderRadius: {
        type: GraphQLInt
      }
    }
  }
});


var UserType = new GraphQLObjectType({
  name: 'User',
  fields: function () {
    return {
      _id: {
        type: GraphQLString
      },
      username: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      },
      Logos: {
        type: GraphQLList(Logos)
      }
    }
  }
});




var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      Users: {
        type: new GraphQLList(UserType),
        resolve: function () {
          const users = userModel.find().exec()
          if (!users) {
            throw new Error('Error')
          }
          return users;
        }
      },
      user: {
        type: UserType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        },
        resolve: function (root, params) {
          const userDetails = userModel.findById(params.id).exec()
          if (!userDetails) {
            throw new Error('Error')
          }
          return userDetails
        }
      },
      logo: {
        type: UserType,
        args: {
          username: {
            name: 'username',
            type: GraphQLString
          },
          logoId: {
            name: 'id',
            type: GraphQLString
          },
          textId: {
            name: 'textId',
            type: GraphQLString
          }
        },
        resolve: function (root, params) {
          // const userLogo = userModel.findOne({'username':params.username, 'Logos._id':params.logoId, 'Logos.Texts._id':params.textId},{'Logos.$':1},{'Logos.Texts.$':1}).exec()
          const userLogo = userModel.findOne({ 'username': params.username, 'Logos._id': params.logoId, 'Logos.Texts._id': params.textId }, function (error, documents) {
            console.log(documents);
          });
          if (!userLogo) {
            throw new Error('Error')
          }
          return userLogo

        }
      },
      singleLogo: {
        type: UserType,
        args: {
          userId: {
            name: 'id',
            type: GraphQLString
          },
          logoId: { 
            name: 'LogoId',
            type: GraphQLString
          }
        },
        resolve: function (root, params) {
          // const userLogo = userModel.findOne({'username':params.username, 'Logos._id':params.logoId, 'Logos.Texts._id':params.textId},{'Logos.$':1},{'Logos.Texts.$':1}).exec()
          const userLogo = userModel.findOne({ '_id': params.userId, 'Logos._id': params.logoId},{'Logos.$':1}, function (error, documents) {
            console.log(documents);
          });
          if (!userLogo) {
            throw new Error('Error')
          }
          return userLogo

        }
      }
    }
  }
}
);



var mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: function () {
    return {
      addUser: {
        type: UserType,
        args: {

          username: {
            type: GraphQLString
          },
          email: {
            type: GraphQLString
          },
          password: {
            type: GraphQLString
          },
          Logos: {
            type: GraphQLList(LogosInput)
          }
        },
        resolve: function (root, params) {
          const model = new userModel(params);
          const user = model.save();
          if (!user) {
            throw new Error('Error');
          }
          return user
        }
      },
      UserAddLogo: {
        type: UserType,
        args: {

          userId: {
            type: GraphQLString
          },
          fontSize: {
            type: GraphQLInt
          },
          color: {
            type: GraphQLString
          },
          backgroundColor: {
            type: GraphQLString
          },
          borderColor: {
            type: GraphQLString
          },
          borderWidth: {
            type: GraphQLInt
          },
          borderRadius: {
            type: GraphQLInt
          },
          text: {
            type: GraphQLString
          },
          imageURL: {
            type: GraphQLString
          },
          width: {
            type: GraphQLInt
          },
          height: {
            type: GraphQLInt
          },
          imageWidth: {
            type: GraphQLInt
          },
          imageHeight: {
            type: GraphQLInt
          }
        },
        resolve: function (root, params) {
          const userLogo = userModel.findOneAndUpdate(
            { '_id': params.userId },
            {
              $push: {
                Logos: {
                  Texts: {
                    text: params.text, fontSize: params.fontSize, color: params.color
                  },
                  images: { imageURL: params.imageURL, imageWidth: params.imageWidth, imageHeight: params.imageHeight },
                  width: params.width, height: params.height, backgroundColor: params.backgroundColor,
                  borderColor: params.borderColor, borderWidth: params.borderWidth, borderRadius: params.borderRadius
                }
              }
            });
          if (!userLogo) {
            throw new Error('Error')
          }
          return userLogo
        }
      },
      LogoAddText: {
        type: UserType,
        args: {

          id: {
            type: GraphQLString
          },
          LogoId: {
            type: GraphQLString
          }, 
          fontSize: {
            type: GraphQLInt
          },
          color: {
            type: GraphQLString
          },
          text: {
            type: GraphQLString
          }

        },
        resolve: function (root, params) {
          var objFriends = null;
          const userLogo= userModel.updateOne({ "_id": params.id, "Logos._id": params.LogoId },
            {
              $push: {
                "Logos.$.Texts": {
                    text:params.text, fontSize:params.fontSize , color:params.color
                }
              }
            });

            if (!userLogo) {
              throw new Error('Error')
            }
            return userLogo
        }
      },
      LogoAddImage: {
        type: UserType,
        args: {

          id: {
            type: GraphQLString
          },
          LogoId: {
            type: GraphQLString
          },
          imageURL: {
            type:GraphQLString
          },
          imageWidth: {
            type: GraphQLInt
          },
          imageHeight: {
            type: GraphQLInt
          }
          

        },
        resolve: function (root, params) {
       
          const userLogo= userModel.updateOne({ "_id": params.id, "Logos._id": params.LogoId },
            {
              $push: {
                "Logos.$.images": {
                    imageURL:params.imageURL, imageWidth:params.imageWidth , imageHeight: params.imageHeight
                }
              }
            });

            if (!userLogo) {
              throw new Error('Error')
            }
            return userLogo
        }
      }
    }
  }
});


module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });