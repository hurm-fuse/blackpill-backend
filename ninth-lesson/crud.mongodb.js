// CRUD OPERATION
use("CrudDb")
// creat one collection
db.createCollection("courses")
// inset only one data
db.courses.insertOne({
    name: "ibrahim web dev free course",
    price: 0,
    projects: 12
})
// inser many data
db.courses.insertMany([
    {
        name: "ibrahim web dev course",
        price: 0
    },
    {
        name: "moaz python course",
        price: 0
    }
])
// find
let find = db.courses.find({name: "moaz python course"})
console.log(find);
console.log(find.count());
console.log(find.toArray());
// only find one
let findone = db.courses.findOne({name: "ibrahim web dev course"})
console.log(findOne);
// update
db.course.updateOne({name: "moaz python course"}, {$set:{name: "maaz python course"}})
db.course.updateMany({name: "ibrahim web dev course"}, {$set:{name: "s. ibrahim ahmad web dev course"}})
// delete
db.course.deleteOne({name: "maaz python course"})
db.course.deleteMany({name: "s. ibrahim ahmad web dev course"})