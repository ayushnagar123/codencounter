const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    var id = req.query.qs;
    console.log(id);
    var query=`select * from info where City like '${id}' or PLACES like '${id}';`;
    // weather.setLang('it');
    // weather.setCity(`new york`);
    // weather.getTemperature(function(err, temp){
    //     console.log(temp);
    // });
    var city;
    conn.query(query,function(err,cit){
        if(err){
            throw err;
        }
        city=cit[0];
    })
    
    var linklist=[];
    var query=`select * from links where City ='${id}';`;
        conn.query(query,(err,link)=>{
        if(err){
            console.log(err);
        }
        else{
            // console.log(link[0].city)
        
    //         var resultArray = Object.values(JSON.parse(JSON.stringify(link)))
            linklist.push({link:link[0].link1})
            linklist.push({link:link[0].link2})
            linklist.push({link:link[0].link3})
            linklist.push({link:link[0].link4})
            linklist.push({link:link[0].link5})
            // resultArray.forEach(function(v){ linklist.push(v) })
            
    var query = `select * from comments where City = '${id}' or PLACES='${id}'`
    conn.query(query,(err,feeds)=>{
    
    var query=`select heading from info where City ='${id}' or PLACES='${id}';`;
    conn.query(
        query,function(err,explore){
            if(err){
                console.log(err)
                res.redirect('/registration')
            }
            else{
                query=`select food from info where City ='${id}' or PLACES='${id}';`;
                conn.query(query,function(err,food){
                    if(err){
                        console.log(err)
                        res.redirect('/registration')
                    }
                    else{
                        query=`select culture from info where City ='${id}' or PLACES='${id}';`;
                        conn.query(query,function(err,culture){
                            if(err){
                                console.log(err)
                                res.redirect('/registration')
                            }
                            else{
                                query=`select places_v from info where City ='${id}' or PLACES='${id}';`;
                                conn.query(query,function(err,places){
                                    if(err){
                                        console.log(err)
                                        res.redirect('/registration')
                                    }
                                    else{
                                        var query = `Select * from comments where City='${city}'`;
                                        var feed=[]
                                        conn.query(query,(err,result)=>{
                                            if(err) throw err;
                                            
                                            result.forEach(element => {
                                                feed.push()
                                            });
                                            console.log(feed)
                                        res.render('city',{
                                            city:id,
                                            explore:explore[0].heading,
                                            food:food[0].food,
                                            culture:culture[0].culture,
                                            places:places[0].places_v,
                                            link1:linklist[0].link,
                                            link2:linklist[1].link,
                                            link3:linklist[2].link,
                                            link4:linklist[3].link,
                                            link5:linklist[4].link,
                                            feeds:feeds
                                            // map:`https://www.google.com/maps/embed/v1/place?q=${id}, India&amp;key=AIzaSyAjbPOrGWgy6Phep5WvcBQrIo_l8bO5f44`
                                        })
                                    })
                                    }
                                })
                            }
                        })
                    }
                })
            }})
        })
}
})
})
module.exports=router