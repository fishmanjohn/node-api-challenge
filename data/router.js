const express = require('express');
const projectDb = require('./helpers/projectModel');
const actionDb = require('./helpers/actionModel');
const router = express.Router();

//create
router.post('/', (req,res)=>{
projectDb.insert(req.body)
.then(proj=>{
    console.log(proj)
    res.status(200).json(proj)
})
.catch(err=>{
    console.log(err)
    res.status(500).json({error: "There was an error while saving the post to the database"})
})
});

router.post('/:id/actions',(req,res)=>{
const project_id = req.params.id
const actInfo = req.body
const submit = {project_id,...actInfo}
console.log(submit)
actionDb.insert(submit)
.then(act=>{console.log(act)
    res.status(200).json(act)
    })
.catch(err=>{console.log(err)
    res.status(500).json({error: "There was an error while saving the post to the database"})
    })
})

//read
router.get('/', (req,res)=>{
projectDb.get()
.then(proj=>{
    console.log(proj)
    res.status(200).json(proj)})
    .catch(err=>{console.log(err)
      res.status(500).json({error: "There was an error while saving the post to the database"})
      })
});

router.get('/:id', (req,res)=>{
    id = req.params.id
    projectDb.get(id)
    .then(proj=>{
      res.status(200).json(proj)})
    .catch(err=>{console.log(err)
      res.status(500).json({error: "There was an error while saving the post to the database"})
    })
});

router.get('/:id/actions', (req,res)=>{
    id = req.params.id
    actionDb.get(id)
.then(act=>{
  res.status(200).json(act)})
.catch(err=>{console.log(err)
  res.status(500).json({error: "There was an error while saving the post to the database"})
  })

});

router.get('/:id/projectactions', (req,res)=>{
    id = req.params.id
    projectDb.getProjectActions(id)
    .then(proj=>{
      res.status(200).json(proj)})
    .catch(err=>{console.log(err)
      res.status(500).json({error: "There was an error while saving the post to the database"})
      })
});

//update
router.put('/:id',(req,res)=>{
   const id = req.params.id
    const changes= req.body
    console.log(`CHANGES ${changes}`)
    projectDb.update(id,changes)
          .then(proj => {
                console.log(proj)
              res.status(200).json(proj) 
          })
          .catch(err => {
              res.status(500).json({ error: "The post information could not be modified.", error: err })
          })
});

router.put('/:id/actions',(req,res)=>{
    const id = req.params.id
     const changes= req.body
     console.log(`CHANGES ${changes}`)
     actionDb.update(id,changes)
           .then(proj => {
                 console.log(proj)
               res.status(200).json(proj) 
           })
           .catch(err => {
               res.status(500).json({ error: "The post information could not be modified.", error: err })
           })
 });
//destroy
router.delete('/:id',(req,res)=>{
id = req.params.id
projectDb.remove(id)
.then(count => {
    if (count > 0) {
      res.status(200).json({ message: 'The project has been removed' });
    } else {
      res.status(404).json({ message: 'The project could not be found' });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error removing the project',
    });
  });

});

router.delete('/:id/actions',(req,res)=>{
    id = req.params.id
    actionDb.remove(id)
    .then(count => {
        if (count > 0) {
          res.status(200).json({ message: 'The action has been removed' });
        } else {
          res.status(404).json({ message: 'The action could not be found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error removing the action',
        });
      });
    
    });
module.exports = router