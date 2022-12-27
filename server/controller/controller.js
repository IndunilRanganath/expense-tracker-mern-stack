const model = require('../models/model');

//post for categories
async function create_categories(req, res){
    const Create = new model.Categories({
        type:"Investment",
        color:"#FCB44"
    })

    Create.save(function(err){
        if(!err) return res.json(Create);
        return res.status(400).json({message:`Error while creating categories${err}`});
    });
}

//get for categories
async function get_categories(req, res){
    let data = await model.Categories.find({})
    let filter = await data.map(v=> Object.assign({}, {type: v.type, color:v.color}));
    
    return res.json(filter);
}

//post for transaction
async function create_transaction(req, res){
    if(!req.body) return res.status(400).json("Post HTTP Data not Provided");
    let {name, type, amount} = req.body;

    const create = await new model.Transaction(
        {
            name,
            type,
            amount,
            date: new Date()
        }
    );

    create.save(function(err){
        if(!err) return res.json(create);
        return res.status(400).json({message:`Error while creating transaction ${err}`});
    });
}

//get for transaction
async function get_transaction(req, res){
    let data = await model.Transaction.find({});
    return res.json(data);
}

// delete transaction
async function delete_transaction(req, res){
    if(!req.body)res.status(400).json({message:"Request body not found"});
    await model.Transaction.deleteOne(req.body, function(err){
        if(!err)res.json("Record Deleted..");
    }).clone().catch(function(err){res.json("Error while deleting transaction Recode")});
}

// get lable
async function get_labels(req, res){
    model.Transaction.aggregate([
        {
            $lookup:{
                from:"categories",
                localField:"type",
                foreignField:"type",
                as:"categories_info"
            }
        },
        {
            $unwind:"$categories_info"
        }
    ]).then(result => {
        let data = result.map(v => Object.assign({}, {_id:v._id, name:v.name, type:v.type, amount:v.amount, color:v.categories_info['color']}));
        res.json(data);
    }).catch(error => {
        res.status(400).json("Looup Collection Error");
    })
}




module.exports={
    create_categories,
    get_categories,
    create_transaction,
    get_transaction,
    delete_transaction,
    get_labels
}