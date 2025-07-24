const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded({
extended:true
}));

const productData = [];

//connect to mongoose

mongoose.connect("mongodb://localhost:27017/")
.then(() => {
  console.log("Connected to MongoDB using Mongoose");
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});


//post method/API
app.post('/api/add_product', (req,res) => {

console.log('Result ',req.body);

const pdata = {
"id": productData.length+1,
"name": req.body.pname,
"price":req.body.pprice,
"desc":req.body.pdesc,
};

productData.push(pdata);
console.log("Final Product Data: ", pdata);

res.status(200).send({
"status_code":200,
"message": "Product added successfully!",
"product": pdata
})

}
)

//get method 
app.get('/api/get_product', (req,res) => {

if(productData.length >0) {
res.status(200).send({
"status_code": 200,
"products": productData
})
}
else{
res.status(200).send({
"status_code": 200,
"products": []
})
}

})

//put - update the whole product data, patch - update only the certain product object
app.put ('/api/update/:id', (req,res) => {
    let id = req.params.id *1;
    let productToUpdate = productData.find(p=>p.id === id);
    let index = productData.indexOf(productToUpdate);

    let body = req.body;
    productData[index] =req.body;

    console.log ('Updated data: ', body);

    res.status(200).send({
    'status': "Success",
    'message': "Product Updated"
    })
})

app.post('/api/delete/:id', (req, res) => {
  let id = Number(req.params.id);
  let productToUpdate = productData.find(p => p.id === id);

  if (!productToUpdate) {
    return res.status(404).send({ message: "Product not found" });
  }

  let index = productData.indexOf(productToUpdate);
  productData.splice(index, 1);
  return res.status(204).send({
    status: "Success",
    message: "Product Deleted"
  });
});

