var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var config={
    user:'remyagirish',
    database:'remyagirish',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
    
};
var app = express();
app.use(morgan('combined'));

var articles={
        'articleone' :{
        title:'ArticleOne |Remya Ramachandran',
        heading:'Article On Html',
        date:'Oct 12,2016',
        content:`
        <p>Hypertext Markup Language HTML</p>
        <p>HTML was created by Berners-Lee in late 1991 but "HTML 2.0" was the first standard HTML specification which was published in 1995. HTML 4.01 was a major version of HTML and it was published in late 1999.</p>`
        },
        //names have to be same as in the url here articleone cannot be articleOne 
        'articletwo' :{
            title:'ArticleTwo |Remya Ramachandran',
            heading:'Article on CSS',
            date:'Oct 13,2016',
            content:`
            <p> Hello CSS.Cascading Style Sheets (CSS) </p>`
            },
        'articlethree' :{
            title:'ArticleThree |Remya Ramachandran',
            heading:'Article On Javascript',
            date:'Oct 14,2016',
            content:`<p>JavaScript ("JS" for short) is a full-fledged dynamic programming language that, when applied to an HTML document, can provide dynamic interactivity on websites.</p>`
            }
        
    };
function createTemplate(data){
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
        var htmlTemplate=`
        <html>
            <head>
                <title>${title}</title>
                <meta name='vimport' content="width=device-width initial-scale=1"/>
                <link href="/ui/style.css" rel="stylesheet"/>
            </head>
            <body>
                <div class="container">
                    
                <div>
                    <a href='/'>Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading} 
                </h3>
                <div>
                ${date.toDateString()}
                </div>
                 <div>
                   ${content}
                    </div>
                </div>
           </body> 
        </html>
        `;
    return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var pool = new Pool(config);

app.get('/test-db',function(req,res){
    //made a select request
    //return a response with the results
    pool.query('select * from test',function(err,result){
        if(err){
            res.status(500).send(err.toString()); 
            
        } else{
            res.send(JSON.stringify(result.rows));
        }
    });
});

var counter =0;
app.get('/counter', function(req,res){
   counter=counter+1;
   res.send(counter.toString());
});

app.get('/articles/:articleName', function(req,res){
    //articleName==articleone
    //articles[articleName]=={}content object for article one
    
    pool.query("SELECT * FROM article WHERE title = $1" ,[req.params.articleName],function(err,result){
        if(err){
            res.status(500).send(err.toString());
            } else {
                if(result.rows.length===0){
                    res.status(404).send('Article not Found');
                } else {
                    var articleData=result.rows[0];
                    res.send(createTemplate(articleData));
                }
            }
        });
    });
  
app.get('/articletwo', function(req,res){
   res.sendFile(path.join(__dirname, 'ui', 'articletwo.html'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
//app.get('/articlethree', function(req,res){
  // res.sendFile(path.join(__dirname, 'ui', 'articlethree.html'));
//});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
