const express = require('express');
const router = express.Router();

const User = require('../models/User')


router.get('/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      res.json({user})
    } catch(err) {
      res.json({err})
    }
});

router.post('/', async (req, res) => {
  console.log('hitttttt')
  try {
    const user=await User.create(req.body)
    console.log(user,'hoott')
    res.json({user})
  } catch(err) {
    res.json({err})
  }
});

router.put('/', (req, res) => {
  return res.json({data: 'Received a PUT HTTP method user'});
});

router.delete('/', (req, res) => {
  return res.json({data: 'Received a DELETE HTTP method user'});
});

router.post('/login', async (req, res) => {
  console.log('hit')
  try {
    const foundUser = await User.findOne({username: req.body.username})
    console.log(foundUser)
    res.json({
      user: foundUser,
      success: foundUser ? false : true
    })
  } catch(err) {
    res.json({err})
  }
})

module.exports = router;