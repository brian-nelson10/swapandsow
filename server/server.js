const path = require('path');
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const cloudinary = require('cloudinary').v2;
//import MiddleWare
const { authMiddleware } = require('./utils/auth');
// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const PORT = process.env.PORT || 3001;

cloudinary.config({
  cloud_name: "dlseow4te",
  api_key: "233834848735683",
  api_secret: "2ovGrJ6usJdSXwC8lE9krRXlBTQ"
});

// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
  allowedHeaders: '*',
}));


// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.post('/uploads', (req, res) => {
  req.pipe(req.busboy);

  req.busboy.on('file', (fieldname, file, filename) => {
    const uploadPath = `${__dirname}/uploads/${filename}`;
    const writeStream = createWriteStream(uploadPath);
    file.pipe(writeStream);

    writeStream.on('close', async () => {
      try {
        const uploadResult = await cloudinary.uploader.upload(uploadPath);
        res.json({ imageUrl: uploadResult.secure_url  });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to upload image' });
      }
    })
  });
});
// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
await server.start();
// integrate our Apollo server with the Express application as middleware
server.applyMiddleware({ app });

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      // log where we can go to test our GQL API
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);