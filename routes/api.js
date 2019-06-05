const express = require('express');
var rp = require('request-promise');
var BnetStrategy = require('passport-bnet').Strategy;
const fetch = require("node-fetch");
const router = express.Router();



//////////////search for specific item
router.get('/item/:slug/:id', async (req, res) => {
  try{
    const data = await fetch(`https://us.api.blizzard.com/d3/data/item/${req.params.slug}-${req.params.id}?locale=en_US&access_token=${process.env.TOKEN}`
    )
    if(!data.ok){
      throw Error(data.response.statusText)
    }
    const itemJson= await data.json()
 
    res.json(itemJson)
  }catch(err){
    return err
  }

})
//////////Search for item type
router.get('/item-type/:id', async (req, res) => {
  try{
    const data = await fetch(
      `https://us.api.blizzard.com/d3/data/item-type/${req.params.id}?locale=en_US&access_token=${process.env.TOKEN}`
    
    )
    console.log(req.user,'this is the user')
    if(!data.ok){
      throw Error(data.response.statusText)
    }
    const itemJson= await data.json()

    res.json(itemJson)
  }catch(err){
    return err
  }

})

//////////////detailed search infor for skills
router.get('/hero/:class/skills/:id', async (req, res) => {
  console.log('this was hit22222')
  try{
    const data = await fetch(`https://us.api.blizzard.com/d3/data/hero/${req.params.class}/skills/${req.params.id}?locale=en_US&access_token=${process.env.TOKEN}`
    )                         
    if(!data.ok){
      throw Error(data.response.statusText)
    }
    const charJson= await data.json()
 
    res.json(charJson)
  }catch(err){
    return err
  }
   
})
//////search for class infor and skills
router.get('/hero/:class', async (req, res) => {
  console.log('this was hit')
  try{
    const data = await fetch(`https://us.api.blizzard.com/d3/data/hero/${req.params.class}?locale=en_US&access_token=${process.env.TOKEN}`
    )                         
    if(!data.ok){
      throw Error(data.response.statusText)
    }
    const charJson= await data.json()
 
    res.json(charJson)
  }catch(err){
    return err
  }

})
/////////////////////




router.post('/', (req, res) => {
  return res.json({
      body:req.body
  });
});

router.put('/', (req, res) => {
  return res.json({data: 'Received a PUT HTTP method'});
});

router.delete('/', (req, res) => {
  return res.json({data: 'Received a DELETE HTTP method'});
});


module.exports = router;