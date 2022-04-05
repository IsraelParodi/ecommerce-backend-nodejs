const slugify = require("slugify");
const Category = require("../models/Category");

module.exports.createCategory = (req, res) => {
    const objCategory = {
        name: req.body.name,
        slug: slugify(req.body.name),
    };

    if (req.body.parentId) {
        objCategory.parentId = req.body.parentId;
    }
    if (req.file) {
        objCategory.categoryImage = process.env.API + '/public/' + req.file.filename;
    }
    const cat = new Category(objCategory);
    cat.save((error, category) => {
        if (error) return res.status(400).json({error});
        if (category) return res.status(201).json({category});
    });
};

module.exports.getCategories = (req, res) => {
    Category.find({}).exec((error, categories) => {
        if (error) return res.status(400).json({error});
        if (categories) {
            const categoryList = createChildrenCategories(categories);
            return res.status(201).json({categoryList});
        }
    });
};

function createChildrenCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter((cat) => cat.parentId == undefined);
    } else {
        category = categories.filter((cat) => cat.parentId == parentId);
    }

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            children: createChildrenCategories(categories, cate._id),
        });
    }

    return categoryList;
}
