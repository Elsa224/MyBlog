//Require node modules to use
const express = require( "express" );
const bodyParser = require( "body-parser" );
const mongoose = require( "mongoose" );
const ejs = require( "ejs" );
const _ = require( "lodash" ); //A modern JavaScript utility library delivering modularity, performance & extras.

//Constant variables
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const APP_PORT = "3000";

//Replace the arrays by a database
mongoose.connect( "mongodb+srv://admin:adminRoot@cluster0.aeuat.mongodb.net/myBlogDB" )

//Creating a new app
const app = express(  );


//Create Schema, models and default documents
const postSchema = mongoose.Schema( {
    title: {
        type: String,
        required: [ true, "No title specified !" ]
    },
    content: {
        type: String,
        required: [ true, "Please write at least one letter :(" ]
    }
} );

const Post = mongoose.model( "Post", postSchema ); 


const homePost = new Post( {
    title: "Home",
    content: homeStartingContent
} ); 

const aboutPost = new Post( {
    title: "About",
    content: aboutContent
} );

const contactPost = new Post( {
    title: "Contact",
    content: contactContent
} );


//Setting and uses by app
app.set( 'view engine', 'ejs' );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( express.static( "public" ) );

//GET requests
app.get( "/", ( req, res ) => {
    Post.find( {}, ( error, posts ) => {
        res.render( "home", { homeTitle: homePost.title , homeStartText: homePost.content , posts: posts } );   //send a file.ejs, the { var in the ejs file: var in the app.js file to send back }
    });
});


app.get( "/about", ( req, res ) => {
    res.render( "about", { aboutTitle: aboutPost.title , aboutText: aboutPost.content } );
} );

app.get( "/contact", ( req, res ) => {
    res.render( "contact", { contactTitle: contactPost.title , contactText: contactPost.content } );
} );

app.get( "/compose", ( req, res ) => {
    res.render( "compose", {  } );
} );

//GET request on the specified param in the url
app.get( "/posts/:postId", ( req, res ) => {

    const postId = req.params.postId;

    Post.findOne( { id: postId }, ( error, foundPost ) => {
        if ( !error )
            res.render( "post", { postTitleText: foundPost.title, postContentText: foundPost.content } );
    } );
    
} );

//POST requests
app.post( "/compose", ( req, res ) => {

    //Data from the compose.ejs that we parse
    let postArticle = {
        title: req.body.postTitle,
        content: req.body.postContent,
    };

    const composedPost = new Post( {
        title: postArticle.title,
        content: postArticle.content

    } );

    composedPost.save(); 
    
    //Redirect to the root route
    res.redirect( "/" );    

} );

//Spin up the server
app.listen( APP_PORT, function( )  {
    console.log( `Server started on port ${APP_PORT}...` );
} );