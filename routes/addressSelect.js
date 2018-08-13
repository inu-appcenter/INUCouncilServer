const express=require('express');
const router=express.Router();
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var mysql=require('mysql');
var pool=mysql.createPool({
  host:'localhost',
  user:'root',
  password:'qkrthgus1558',
  database:'inunion',
  connectionLimit:10
});
passport.deserializeUser(function(id, done) {
  console.log('deserializeUser',id)
  var sql='SELECT * FROM users WHERE username=?';
  pool.getConnection((err,connection) =>{
    if(err) throw err;
    else{
      connection.query(sql,[id],function(err,results){
        if(err){
          console.log(err);
          done('There is no user des');
        } else{
          done(null,results[0]);
        }
        connection.destroy();
      })

    }
  });

});


router.post('/',function(req,res){
    var sql= 'select name FROM address_db ORDER BY name';
    var name= req.body.name;
    pool.getConnection((err,connection) =>{
      if(err) throw err;
      else{
    connection.query(sql,function(err,result){
      if(err){
        console.log('Address Seletion is fail');
      }else{
        console.log(result);
        res.send(result);
      }
      connection.destroy()
    })
}

    })
})




module.exports=router;
