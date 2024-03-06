const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express ()
app.use(express.json())

const users = []

const checkUserId = (request,response,next) =>{
    const {id} = request.params
    const index = users.findIndex(user => user.id === id)
    if(index< 0 ){
        return response.status(404).json({ message:"user not founded"})
    }
    request.userIndex = index
    request.userId = id
    next()
}



app.get('/users',(require, response) =>{
    return response.json(users)
})

app.post('/users',(request, response) =>{
    console.log(request.method)
    const {order,clientName,price}= request.body
    const status = "em preparação"
    const user = {id:uuid.v4 (),order,clientName,price,status}
    users.push (user)

    return response.json(user)
    
})

app.put('/users/:id',checkUserId,(request, response) =>{
    const {order,clientName,price,}= request.body
    const index = request.userIndex
    const id = request.userId
    const status = "em preparação"
    const updateUser = {id,order,clientName,price,status}
   
    users [index] = updateUser
    return response.json(updateUser)
})

app.delete('/users/:id',checkUserId,(request, response) =>{
    const index = request.userIndex
    users.splice (index,1)

    return response.json()
})

app.patch('/users/:id',checkUserId,(request, response) =>{
    const {order,clientName,price}= request.body
    const index = request.userIndex
    const id = request.userId
    const status = "pronto"
    const updateUser = {id,order,clientName,price,status}

    users [index] = updateUser
    return response.json(users)
})

app.listen(port, () =>{
    console.log(`server started on port ${port}`)
} )