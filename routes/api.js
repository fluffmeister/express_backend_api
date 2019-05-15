const express = require('express');
var rp = require('request-promise');
var BnetStrategy = require('passport-bnet').Strategy;
const fetch = require("node-fetch");
const router = express.Router();



/////
router.get('/item', async (req, res) => {
  try{
    const data = await fetch (`https://us.api.blizzard.com/d3/data/item/corrupted-ashbringer-Unique_Sword_2H_104_x1?locale=en_US&access_token=USojOkHyGAb62Z1bHNsVRA3aAMldeBqxTQ`
      )
    if(!data.ok){
      throw Error(data.response.statusText)
    }
    const itemJson= await data.json()

    res.json(itemJson)
}catch(err){
  console.log(err, 'err in the catch block')
  return err
}})
//////////////////

//////////////search for specific item
router.get('/item/:id', async (req, res) => {
  try{
    const data = await fetch(`https://us.api.blizzard.com/d3/data/item/${req.params.id}?locale=en_US&access_token=USojOkHyGAb62Z1bHNsVRA3aAMldeBqxTQ`
    
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
//////////
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

router.get('/sucessfulnode',(req,res)=>{
  return res.json({req:req.body});
});
module.exports = router;