import swaggerAutogen from  'swagger-autogen'

const doc = {
    info:{
        title:"Blogging Endpoint",
        description:"Description"
    },
    host:"localhost:3001"
};

const outputFile = './swagger-output.json';
const routes = ['./routes/authRoutes.js']
swaggerAutogen()(outputFile,routes,doc)