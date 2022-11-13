const express=require("express")
const parser=require("body-parser")
const mong=require("mongoose")
const ejs=require("ejs")
const app=new express();

const nodemailer = require("nodemailer")


app.use(express.static("public"))
app.set("view engine" ,ejs);


app.use(parser.urlencoded({extended:true}));




mong.connect("mongodb+srv://kaushikji:ebY6914I37pP7fJo@cluster0.f6fro.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true},function(err){
    
    
    if(err){
        console.log(err);    }
});


require('dotenv').config();






const jobschema=new mong.Schema(
{
   
   name:String,
  cropage:Number,
  cropcost:Number,
    city:String,
    category:String,
  weight:Number,
    mobile:Number
    
    
})

const NofticationSchema=new mong.Schema({

Content:String

});



const memberschema=new mong.Schema({
    
    name:String,
  adress:String,
    email:String,
    mobile:Number,
    passward:String,
    appliedto:[String]
    
})

const productschema=new mong.Schema({


Name:String,
Category:String,
Status:String,
icon:String


});

const bannerschema=new mong.Schema({



    Image:String,
    Status:String
});

const offerschema=new mong.Schema({


Image:String,
Content:String,
Offer:String


});
const Trendingschema=new mong.Schema({

Image:String,
Content:String


})

const categoryschema=new mong.Schema({
    Image:String,
Content:String



})
const notification=mong.model("Notification",NofticationSchema);
const Category=mong.model("category",categoryschema);


const TrendingOffer=mong.model("TrendingOffer",Trendingschema);

const offer=mong.model("offer",offerschema);

const product=mong.model("products",productschema);

const banner=mong.model("banners",bannerschema);

const user=mong.model("user",memberschema);

const jobpost=mong.model("post",jobschema);



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);









// app.post('/fogetpassword',function(req,res){
// console.log("a request has been therein the system");
//     console.log(req.body);
// 	const transport = nodemailer.createTransport({
// 		service:"gmail",
// 		host: "smtp.gmail.com",
// 		port: 465,
// 		auth: {
// 			user: "automater420@gmail.com",
// 			pass: "hrszqqhjzejspvjx"
// 		}
// 	})
// 	console.log(transport)

// 	transport.sendMail({
// 		from: "dm29phase1@gmail.com",
// 		to: req.body.email,
// 		subject: "Meeting Nofication",
// 		html: `<div className="email" style="
//         border: 1px solid black;
//         padding: 20px;
//         font-family: sans-serif;
//         line-height: 2;
//         font-size: 20px; 
//         ">
//         <h2>Here is your metting link</h2>
// 		<h3>Hi your ${req.body.Company} Meeting has been schedule for ${req.body.Schedule} Please Join by Clicking on the Below Link</h3>
// 		<a href=${req.body.Link}>${req.body.Link}</a>
//         <br>
// 	    <span>Siddhant Kaushik<br>AllSafe<span>
//          </div>
//     `
// 	}).then((result)=>{
//      console.log(result);
// 		res.render("otp.ejs");



// });
// });


app.post("/signin",function(req,res){
    
    const Email=req.body.email;
    user.find({email:Email,passward:req.body.passward},function(err,nesult){
        
        
        if(!err){
            if(nesult.length>0){
           
                
           jobpost.find(function(err,result){

    res.send("you have succesfull logind in to Your Account");
               
    
})
  
            
            
            }
            else{
                
                
             res.send("Either password or Email is not matched")

                
                
            }
            
            
            
        }
    })
    
    
})

app.post("/signUp",function(req,res){
    console.log(req);
    
   if(req.body){
    

    user.find({email:req.body.email},function(err,result){
        if(result.length==0){
          
    
 
     var newuser=new user({
            
            name:req.body.name,
            adress:req.body.lname,
            email:req.body.email,
            // passward:req.body.pswfirst,
         mobile:req.body.mobile
          
            
            
        });

        newuser.save();
             res.send("User Has been Created")
            
        }
        else{
        
      res.send("User already Exist");
        
        }
        
        
        
    })    
    
}
})






// app.post("/otpsend",function(req,res){
//    console.log("we are the greatest in the word");
//     var months=[1120,2500,4500,7800]
//     if(months.indexOf(parseInt(req.body.otp)) !== -1){
      
//    jobpost.find({"email":'varsha@gmail.com'},function(err,result){
    
   
//     res.render("update.ejs",{ray:result})
      
// }) 
//     } else{

//      res.render("otp.ejs")
//     }
    
    
// })












app.post("/user/update",(req,res)=>{


console.log(req.body);

user.updateOne({"email":req.body.email},{$set:{"email":req.body.email,"passward":req.body.passward,"name":req.body.name,"mobile":req.body.mobile}},function(result,response){
  console.log(result);
  console.log(response);
    res.send("data updated succesfully");
      })

})



app.post("/product/create",(req,res)=>{


    const newjobpost=new product(
        {
            
            Name:req.body.Name,
            Category:req.body.Category,
            Status:req.body.Status,
            icon:req.body.Icon
    
            
        });
        newjobpost.save();

product.find((result,err)=>{

console.log(result);




})

});



app.get("/product/show",(req,res)=>{


    product.find((err,results)=>{

        console.log(results);
        
        res.send(JSON.stringify(results));
        
        
        });
   

});

app.post("/product/Update",(req,res)=>{

product.updateOne({"_id":req.body.id},{"Name":req.body.Name,"Category":req.body.Category,"Status":req.body.Status,"Icon":req.body.Icon},function(result,response){

    console.log(response);
    console.log(result);

});
res.send("update succefully");

})


app.post("/product/delete",(req,res)=>{

product.deleteOne({"_id":req.body.id},function(response,result){

console.log(result);

})

res.send("deleted Successfully");

});



app.post("/banner/create",(req,res)=>{


    const newjobpost=new banner(
        {
            
          Image:req.body.Image,
          Status:req.body.Status
    
            
        });
        newjobpost.save();

banner.find((result,err)=>{

console.log(result);

res.send("created Succesfully");


})

});



app.get("/banner/show",(req,res)=>{


    banner.find((err,results)=>{

        console.log(results);
        
        res.send(JSON.stringify(results));
        
        
        });
   

});

app.post("/banner/Update",(req,res)=>{

banner.updateOne({"_id":req.body.id},{"Image":req.body.Image,"Status":req.body.Status},function(result,response){

    console.log(response);
    console.log(result);

});
res.send("update succefully");

})


app.post("/banner/delete",(req,res)=>{

banner.deleteOne({"_id":req.body.id},function(response,result){

console.log(result);

})

res.send("deleted Successfully");

});




// offer api
app.get("/offer/show",(req,res)=>{


    offer.find((err,results)=>{

        console.log(results);
        
        res.send(JSON.stringify(results));
        
        
        });
   

});

app.post("/offer/Update",(req,res)=>{

    offer.updateOne({"_id":req.body.id},{"Image":req.body.Image,"Content":req.body.Content},function(result,response){
    
        console.log(response);
        console.log(result);
    
    });
    res.send("update succefully");
    
    })
app.post("/offer/create",(req,res)=>{


        const newjobpost=new offer(
            {
                
              
Image:req.body.Image,
Content:req.body.Content,
Offer:req.body.Offer

        
                
            });
            newjobpost.save();
    
    offer.find((result,err)=>{
    
    console.log(result);
    
    res.send("created Succesfully");
    
    
    })
    
    });
    
//Trending offer

app.get("/TrendingOffer/show",(req,res)=>{


    TrendingOffer.find((err,results)=>{

        console.log(results);
        
        res.send(JSON.stringify(results));
        
        
        });
   

});

app.post("/TrendingOffer/Update",(req,res)=>{

    TrendingOffer.updateOne({"_id":req.body.id},{"Image":req.body.Image,"Content":req.body.Content},function(result,response){
    
        console.log(response);
        console.log(result);
    
    });
    res.send("update succefully");
    
    })

app.post("/TrendingOffer/create",(req,res)=>{


        const newjobpost=new TrendingOffer(
            {
                
              
Image:req.body.Image,
Content:req.body.Content,

        
                
            });
            newjobpost.save();
    
            TrendingOffer.find((result,err)=>{
    
    console.log(result);
    
    res.send("created Succesfully");
    
    
    })
    
    });

app.post("/otp/verify",(req,res)=>{

if(req.body.otp==1120){

res.send("verified Scuccefully");

}
else{

    res.send("Try Again")
}



});


app.get("/category/show",(req,res)=>{

    Category.find((err,results)=>{

        console.log(results);
        
        res.send(JSON.stringify(results));
        
        
        });
   


});

app.post("/category/create",(req,res)=>{


    const newjobpost=new Category(
        {
            
          
Image:req.body.Image,
Content:req.body.Content,

    
            
        });

        newjobpost.save();

        Category.find((result,err)=>{

console.log(result);

  res.send("created Succesfully");



})

});

app.post("/category/update",(req,res)=>{

Category.updateOne({"id":req.body.id},{"Image":req.body.Image,"Content":req.body.Content},function(result,response){
    
        console.log(response);
        console.log(result);
    
    });
    res.send("updated succefully");

    

})

app.post("/Notification/create",(req,res)=>{



    const newjobpost=new notification(
        {
            
          

Content:req.body.Content


    
            
        });
        newjobpost.save();

notification.find((result,err)=>{

console.log(result);

res.send("created Succesfully");


})




})


app.get("/Notification/show",(req,res)=>{

    notification.find((err,results)=>{

        console.log(results);
        
        res.send(JSON.stringify(results));
        
        
        });
   


});


async function datageter(){
let data={
banner:"",
Category:"",
offer:"",
TrendingOffer:""




};

   await banner.find((err,results)=>{

        console.log("the banner data is"+results);
        
      data.banner=results
        // data.push(JSON.stringify(results));
        
        
        });

       await Category.find((err,result)=>{
            data.Category=result;
            
            
            });

        await  offer.find((err,results)=>{
                data.offer=results;
                });


        await TrendingOffer.find((err,results)=>{
                    
                    data.TrendingOffer=results;
                    
                    });


return data;
}

app.post("/Notification/update",(req,res)=>{

    notification.updateOne({"id":req.body.id},{"Content":req.body.Content},function(result,response){
        
            console.log(response);
            console.log(result);
        
        });
        res.send("updated succefully");
    
        
    
    })

app.post("/Home/Show",(req,res)=>{

var data=["kaushik"];

   
datageter().then(

    function(value){

        res.send(value)
    },
    function(error){

        res.send(error);
    }
)
});