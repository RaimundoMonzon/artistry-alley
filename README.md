# portfolio-web
Portfolio web enfocado a ilustraciones/animaciones | Programación 3 - 3.609 UTN-INSPT
npm install mongoose
npm install mongodb salteado
npm install express
npm i bcrypt
npm i jsonwebtoken

-- Steps to Add Content to the API --
Define the Schema:
- Location: /models
- Create a Mongoose schema for the resource (e.g., User, Product) specifying fields, data types, and validation rules.

Create the Model:
- Location: /models
- Use mongoose.model to create the model based on the schema. This allows interaction with the database.

Build the Controller:
- Location: /controllers
- Create a controller to handle logic for each CRUD operation (e.g., create, read, update, delete) on the model. Export each function.

Add Middleware (if necessary):
- Location: /middleware
- Define middleware if specific functionality is needed, like authentication (e.g., token validation) or data validation.

Define Routes:
- Location: /routes
- Set up Express routes for the new API endpoints. Map each route to the corresponding controller function. Import any middleware required.

Integrate Routes in the Server:
- Location: server.js or main server file
- Mount the routes using app.use('/api/users', userRoutes); to integrate the routes into the server.

Example Workflow for CRUD Operations:

1. Schema: Define UserSchema in /models/user.js.
2. Model: Create User model from the schema in /models/user.js.
3. Controller: Write CRUD operations in /controllers/userController.js.
4. Middleware: Add middleware as needed (e.g., validateToken).
5. Routes: Define routes in /routes/userRoutes.js and use middleware.
6. Server: Mount routes with app.use('/api/users', userRoutes); in server.js.