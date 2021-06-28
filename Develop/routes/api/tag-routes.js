const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {
      model: Product
    }
  })
  .then(tags => res.status(200).send(tags))
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: {
      model: Product
    }
  })
  .then(tag => res.status(200).send(tag))
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(newTag => res.status(200).send(newTag))
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.findByPk(req.params.id)
  .then(foundTag => {
    if (!foundTag){
      res.status(404).send({message: 'Unable to find tag'});
      return;
    }
    foundTag.update({
      tag_name: req.body.tag_name
    })
    .then((updatedTag) => {
      res.status(200).send(updatedTag);
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.findByPk(req.params.id)
  .then(foundTag => {
    if (!foundTag){
      res.status(404).send({message: 'Unable to find tag'});
      return;
    }
    foundTag.destroy()
    .then(() => {
      res.status(200).send({message: 'Tag deleted successfull'});
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
});

module.exports = router;
