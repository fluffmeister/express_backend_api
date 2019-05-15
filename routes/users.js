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
  try {
    const item = await fetch('https://us.api.blizzard.com/d3/data/item/corrupted-ashbringer-Unique_Sword_2H_104_x1?locale=en_US&access_token=US8PwUayCLRXkKuwcxJEhyXoh9iuy2yiyo').then(res.json({item}))
    res.json({item})
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
    res.json({
      user: foundUser,
      success: true
    })
  } catch(err) {
    res.json({err})
  }
})

module.exports = router;