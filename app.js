//Require node modules to use
const express = require( "express" );
const bodyParser = require( "body-parser" );
const ejs = require( "ejs" );
const _ = require( "lodash" ); //A modern JavaScript utility library delivering modularity, performance & extras.

//Constant variables
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const API_PORT = "3000";

//Global variables
const postArticles = [ ];   //which contains the postArticle object

//Creating a new app
const app = express(  );

//Setting and uses by app
app.set( 'view engine', 'ejs' );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( express.static( "public" ) );

//GET requests
app.get( "/", ( req, res ) => {
    res.render( "home", { homeStartText: homeStartingContent, posts: postArticles } );   //send a file.ejs, the { var in the ejs file: var in the app.js file to send back }
} );

app.get( "/about", ( req, res ) => {
    res.render( "about", { aboutText: aboutContent } );
} );

app.get( "/contact", ( req, res ) => {
    res.render( "contact", { contactText: contactContent } );
} );

app.get( "/compose", ( req, res ) => {
    res.render( "compose", {  } );
} );

//GET request on the specified param in the url
app.get( "/posts/:postName", ( req, res ) => {

    //forEach method to test if each post.title from the posts array === the param
    postArticles.forEach( postArticle => {

        //Example : postArticle.title  = test || Test || Second-test || ...
        if ( postArticle.title=== req.params.postName   //Normal case
            || _.lowerCase( postArticle.title ) === _.lowerCase( req.params.postName )    //Using lowerCase() of _ (Lodash)
            || _.kebabCase( postArticle.title ) === _.kebabCase( req.params.postName ) )  //Using kebabCase() of _ (Lodash)
        {
            res.render( "post", { postTitleText: postArticle.title, postContentText: postArticle.content } );
        } 
    } );

    
} );

//POST requests
app.post( "/compose", ( req, res ) => {

    //Data from the compose.ejs that we parse
    let postArticle = {
        title: req.body.postTitle,
        content: req.body.postContent,
    };
    
    //Append every article to the postArticles array 
    postArticles.push( postArticle );   
    
    //Redirect to the root route
    res.redirect( "/" );    

} );


//Spin up the server
app.listen( API_PORT, function( )  {
    console.log( `Server started on port ${API_PORT}...` );
} );


