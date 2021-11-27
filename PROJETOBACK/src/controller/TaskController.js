const TaskModel = require('../model/TaskModel')

const now = new Date();
const{
    startOfDay,
    endOfDay,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear,
} = require('date-fns');

class TaskController{
  
    async create(req, res){
    const task = new TaskModel(req.body);
    
    await task
    .save() 
    .then(response => {return res.status(200).json(response)})   
    .catch(error => {return res.status(500).json(error)});   
            
   }  
    
   async update (req, res){  
    
    await TaskModel.findByIdAndUpdate({'_id':req.params.id}, req.body, {new: true})
    .then(response => {return res.status(200).json(response)})
    .catch(error => {return res.status(500).json(error)});
     
}
   async readAll (req, res){  
    
    await TaskModel
    .find({macadress: {'$in': req.params.macadress}})
    .sort('when')
    .then(response => {return res.status(200).json(response)})
    .catch(error => {return res.status(500).json(error)});
     
}

async readById (req, res){  
    
    await TaskModel
    .findById(req.params.id)
    .then(response => {
        if(response)
        return res.status(200).json(response)
     else
        return  res.status(404).json({error: 'Tarefa não encontrada'})
    })
    .catch(error => {return res.status(500).json(error)});
      
}
async delete(req, res){  
    
    await TaskModel
    .deleteOne({'_id':req.params.id})
    .then(response => {return res.status(200).json(response)})
    .catch(error => {return res.status(500).json(error)});
}   
async done(req, res){  
     await TaskModel
        .findByIdAndUpdate({'_id':req.params.id}, {'done':req.params.done}, {new: true})
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});
    
}
async late(req, res){  
    await TaskModel
    .find({'when':{'$lt': now}, 'macadress': {'$in': req.params.macadress}})
    .sort('when')
    .then(response => {return res.status(200).json(response)})
    .catch(error => {return res.status(500).json(error)});
     
}
async today(req, res){  
    await TaskModel
    .find({'macadress': {'$in': req.params.macadress},'when':{'$gte' : startOfDay(now),'$lt': endOfDay(now)} })
    .sort('when')
    .then(response => {return res.status(200).json(response)})
    .catch(error => {return res.status(500).json(error)});
    
}
async week (req, res){  
    await TaskModel
        .find({'macadress': {'$in': req.params.macadress},'when':{'$gte': startOfWeek(now),'$lt': endOfWeek(now)} })
        .sort('when')
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});
}
async month(req, res){  
    await TaskModel
        .find({'macadress': {'$in': req.params.macadress},'when':{'$gte' : startOfMonth(now),'$lt': endOfMonth(now)} })
        .sort('when')
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});
}
async year (req, res){  
    await TaskModel
        .find({'macadress': {'$in': req.params.macadress},'when':{'$gte' : startOfYear(now),'$lt': endOfYear(now)} })
        .sort('when')
        .then(response => {return res.status(200).json(response)})
        .catch(error => {return res.status(500).json(error)});
}
}
        module.exports = new TaskController();       
        

