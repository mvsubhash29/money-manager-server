const Categories = require('../../../models/Categories');

async function getCategories(req, res, next) {
  try {
    const categories = await Categories.find({});

    const filteredCategoryList = {
      expense: [],
      income: []
    };

    categories.forEach((category) => {
      category.type === 'expense'
        ? filteredCategoryList.expense.push(category)
        : filteredCategoryList.income.push(category);
    });

    res.send(filteredCategoryList);
  } catch (error) {
    next({ statusCode: 404, status: "categories doesn't exist!" });
  }
}

async function postCategories(req, res, next) {
  try {
    const category = new Categories({
      title: req.body.title,
      icon: req.body.icon,
      name: req.body.name,
      type: req.body.type
    });
    await category.save();
    res.send(category);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCategories,
  postCategories
};
