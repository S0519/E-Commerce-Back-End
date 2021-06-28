const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll(
    {
      include: {
        model: Product
      }
    }
  )
  .then(categories => res.status(200).send(categories))
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: {
      model: Product
    }
  })
  .then(category => res.status(200).send(category))
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(newCategory => res.status(200).send(newCategory))
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.findByPk(req.params.id)
  .then(category => {
    category.update({
      category_name: req.body.category_name
    })
    .then(updatedCategory => res.status(200).send(updatedCategory));
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.findByPk(req.params.id)
  .then(category => {
    if (!category){
      res.status(404).send({message: 'Unable to find category'});
      return;
    }
    category.destroy()
    .then(() => {
      res.status(200).send({message: 'Category deleted successfull'});
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
});

module.exports = router;
