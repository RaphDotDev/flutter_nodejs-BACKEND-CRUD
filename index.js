const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require("./product");
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const productData = [];

//connect to mongoose

mongoose.connect("mongodb://localhost:27017/FlutterNodeJsCrud")
    .then(() => {
        console.log("Connected to MongoDB using Mongoose");

        //post method/API
        app.post('/api/add_product',async (req, res) => {

            console.log('Result ', req.body);

            let data = Product(req.body);

            try{
               let dataToStore = await data.save();
               res.status(200).json(dataToStore);
            }catch( errror ) {
                res.status(400).json({
                    'status': errror.message
                })
            }

            // const pdata = {
            //     "id": productData.length + 1,
            //     "name": req.body.pname,
            //     "price": req.body.pprice,
            //     "desc": req.body.pdesc,
            // };

            // productData.push(pdata);
            // console.log("Final Product Data: ", pdata);

            // res.status(200).send({
            //     "status_code": 200,
            //     "message": "Product added successfully!",
            //     "product": pdata
            // })

        }
        )

        //get method 
        app.get('/api/get_product/', async (req, res) => {

            // if (productData.length > 0) {
            //     res.status(200).send({
            //         "status_code": 200,
            //         "products": productData
            //     })
            // }
            // else {
            //     res.status(200).send({
            //         "status_code": 200,
            //         "products": []
            //     })
            // }

            try {
                //to get specific product
            //   let data = await Product.findById(
            //     req.params.id
            //   )

            // to get all rpduct data
               let data = await Product.find()
              res.status(200).json(data);
            }catch(error) {
                 res.status(500).json({
                    'status': errror.message
                })
            }

        })

        //put - update the whole product data, patch - update only the certain product object
        app.put('/api/update/:id', async (req, res) => {
        //     let id = req.params.id * 1;
        //     let productToUpdate = productData.find(p => p.id === id);
        //     let index = productData.indexOf(productToUpdate);

        //     let body = req.body;
        //     productData[index] = req.body;

        //     console.log('Updated data: ', body);

        //     res.status(200).send({
        //         'status': "Success",
        //         'message': "Product Updated"
        //     })
        // })

        try {

            let id = req.params.id;
        let updateData = req.body;

        let options = {new :true};

        const data = await Product.findByIdAndUpdate(id,updateData, options);
        res.send(data);

        } catch(error) {
              res.send(error.message)
            }
        })


        app.delete('/api/delete/:id', async (req, res) => {
            // let id = Number(req.params.id);
            // let productToUpdate = productData.find(p => p.id === id);

            // if (!productToUpdate) {
            //     return res.status(404).send({ message: "Product not found" });
            // }

            // let index = productData.indexOf(productToUpdate);
            // productData.splice(index, 1);
            // return res.status(204).send({
            //     status: "Success",
            //     message: "Product Deleted"
            // });

            let id = req.params.id;

            try {
                const data = await Product.findByIdAndDelete(id);
                res.json(
                    {
                        "status": "Deleted the product ${data.pname} from database"
                    }
                )
            }catch (error) {
                res.json({
                    "status": error.message,
                })
            }
        });

    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });


app.listen(2000, () => {

    console.log("Connected to server 2000");

})