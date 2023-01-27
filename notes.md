# Module 18: NoSQL
- [18.1: MongoDB](#18.1-mongodb)
- [18.2: Introduction to Mongoose](#18.2-introduction-to-mongoose)
- [18.3: Advanced Mongoose](#18.3-advanced-mongoose)

---
- NoSQL is any database that isn’t a relational database.
- For example, document (key-value stores) and graph (column-oriented) databases.
- NoSQL is good for flexibility.

## 18.1: MongoDB
- Mongo stores data as JSON.
- Uses binary JSON.
- Good match with JavaScript.
- You work with objects and key-value pairs.
- No tables. There are collections, instead.
- No schema.
- There are also embedded documents.
- Is an embedded doc a object within an object?
- Related data is nested in embedded doc.
- You can change data structure as you go.
- It scales easily.
- You can add a schema and change it later without needing to rebuild your entire database.

---
### Compass
- What’s a collection?
- Mongo doesn’t actually store databases, it stores collections.
- Collections are equivalent to tables.
- Collections hold objects, looks like.
- Mongo behaves a lot like JavaScript.

---
### Create, Read
- For our projects, we install `mongodb`.
- There’s a bunch of things that are different in the `server.js` file.
- There’s `insertOne()`, `insertMany()`, and `find()`.
- It’s very object-oriented.
- You add documents not rows.

```
db.collection("petCollection")
	.find()
	.toArray((err, results) => {
		if (err) throw err
		res.json(results)
	})
```

---
### Update, Delete
- There’s `updateOne()` also:

```
db.collection.updateOne(
	{ "item": "banana" },
	{$set: { "item": "apple" }}
)
```

- And `deleteOne()`:

```
db.collection.deleteOne({ "_id": ObjectId("32453563657456") })
```

---
### Embedded Documents
- You can create relationship between documents with a key that has the same value.
- Or you can use embedded documents.
- You can create one-to-one and one-to-many.
- You can access embedded documents with dot notation (similar to JavaScript).
- If you find an embedded object that matches your criteria, it will return the entire object/document (I think).
- When you change your data structure, you can use versions to manage changes to the data structures.

---
### Cursor Methods
- You can use this to control how data is returned. Mongo uses `sort()`, `skip()`, and `limit()` to do this.
- `skip()` is similar to SQL `OFFSET`.

---
## 18.2: Introduction to Mongoose
- Mongoose is analogous to Sequelize.
- Read the docs to truly understand the difference!

### Models Schemas
```
const groceryShema = new mongoose.Schema({
	item: { type: String, required: true },
	stockCount: Number,
	price: Number,
	inStock: Boolean,
	lastAccessed: { type: Date, default: Date.now },
})

const Item = mongoode.model("Item", grocerySchema)

const handleError = (err) => console.error(err)

Item.create(
	{
		item: "banana",
		stockCount: 10,
		price: 1,
		inStock: true,
	},
	(err) => {
		if (err) {
			handleError(err)
		} else {
			...
		}
	}
)
```

---
### CRUD Mongoose
- Mongoose comes with Mongo, so you only need to install it as a dependency.

```
app.post("/new-dept/:dept", (req, res) => {
	const newDept = new Department({ name: req.params.department })
	newDept.save()
	...
})
```
---
### Models Instances Methods
```
const Dept = mongoose.model("Dept", deptSchema)
const produce = new Dept({ name: "Produce", totalStock: 100 })
```
---
### Subdocuments
- Subdocuments are like JOINs.
- The end result is there are docs with their own IDs in a complex object.
 
```
const managerSchema = new mongoose.Schema({
	name: { type: String, required: true },
	salary: Number,
})

const employeeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	salary: Number,
}) 

const departmentSchema = new mongoose.Schema({
	name: { type: String, required: true},
	manager: { type: managerSchema, required: true},
	employees: [employeeSchema],
	lastAccessed: { type: Date, default: Date.now }
})
```

---
### Aggregates
- Similar to GROUP BY, COUNT, SUM, etc.
- Look at 14 for how to not duplicate data.

```
app.get("sum-price", (req, res) => {
	Item.aggregate(
		[
			{ $match: { price: { $lte: 5 } } },
			{
				$group: {
					_id: null,
					sum_price: { $sum: "$price" },
					avg_price: { $avg: "$price" },
					max_price: { $max: "$price" },
					min_price: { $min: "$price" },
				},
			},
		]
		(err, result) => {
			if (err) {
				res.status(500).send(err)
			} else {
				res.status(200).send(result)	
			}
		}
	)
})
```

---
## 18.3: Advanced Mongoose
- There are different ways to organizing controllers and routes.
- Controllers to some are more to control business logic, and may include functions, etc.
- There are references instead of the actual documents (more on that later).

---
### Virtual
- There is such a thing as a commuted value that’s not stored. Instead, you use a function to compute a value. This is called a virtual.
- Kind of like a SQL view, but it runs in your code, not on the database server.
- In the example, we’re creating a comment count that’s not in the database (we’re using comments.length of an array to get that value).
- This is useful for calculating values when you get make an API call.
- It helps keep the database lean and clean (storing such values would be difficult and inefficient).

```
module.exports = {
	getPosts(req, res) {
		Post.find()
			.then(posts) => {
				const postJson = JSON.stringify(post)
				const postObj = JSON.stringify(postJson)
				postObj.extraField = "foo"
				console.log(postObj)
			}
			
	}
}
...
postSchema.virtual("extraField2").get( function() {
	console.log("We called the get for extraField2)
	return "also foo"
})
...

```

- There are some similarities to Sequelize hooks (such as beforeCreate). We take care of it in one place and there’s less of an issue.
- A virtual is part of the schema and at a lower level.
- Great when you have a value in the database, and can derive something useful that you wouldn’t necessarily want to store in the database.
- For example, if you want a the first X words of an entry for a blurb.
- Can be convenient, but not something you have to use.

---
### Subdoc Population
- A subdoc makes it easier to find something and isolate it.
- A subdoc contains something that’s similar to a foreign key in SQL.
- How do you set it up?
- Use $addToSet in API. Confusing.
- `-__v` is a document version? It’s a mongoose thing.
- What is `.populate()`? It’s kind of like include in Sequelize?
- This is “syntactical sugar.” Kind of like async/await.
- First, you must update the schema. Then, you use `.populate()` in the API call to populate data (rather than return a reference to an object).
- It might be better to understand this from the mongo perspective (rather than the mongoose perspective).

```
const userSchema = new Schema(
	{
		first: String,
		last: String,
		age: Number,
		posts: [
			{
				type: Schema.Types.ObjectId,
				ref: "post",
			}
		]
	}
)

const User = 
```

---
### CRUD Subdoc
- Create, read, update, delete on subdocs.

```
const userSchema = new Schema(
	{
		...
		videos: [
			{
				...
			}		
		],
	}
)
```

---
### NPM Packages
- We’re doing NPM packages, instead of GitHub packages (this should be more useful).
- It’s important to differentiate between prod and dev dependencies.
- You can also specify versions for the engines, such as node.
- This would be great for our README generator.
- We can actually set up a repo to function as a modules/dependency. You don’t even have to add this to npm.
- To add something to nom, you have to create an account.
- Publishing to npm is serious. If something is in the registry for longer than 15 minutes, you can’t delete it.

---
### Mini-Project Alternative
- A better mongoose!
- Requirements:
	- A nested document is a doc within a doc (nested object).
	- Sub docs need to be connected with a somehow with a doc.
	- Schemas are useful, even though MongoDB doesn’t care.
	- Types of data: integer/number, string, boolean, date.

### MongoDB Atlas (Extra)
- MongoDB Atlas is like ClearDB for MySQL (for using DBs with something like Heroku).
- Serverless is edge computing (whatever that means).
- A cluster is a database?
- To set this up for Heroku, you have to choose the Cloud Environment option in MongoDB Atlas.
- There are docs for the deets. This is different than accessing it from your local machine (obviously).
- In the end, you get the connection string from MongoDB Atlas, and save it in Heroku as an environment variable.
- Then, in the code, use process.env.MONGO_URL (or whatever you called it).

---
