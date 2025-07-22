const express = require("express");

const app = express();

app.use(express.json());

app.use(express.urlencoded({
extended:true
}));

const productData = [];


app.listen(2000, ()=> {
console.log('Connected to server 2000');
}
)

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
