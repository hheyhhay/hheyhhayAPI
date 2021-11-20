const express  = require('express');
const app = express();
const projectData = require('./project-data');
const cors = require("cors");

app.use(cors())

app.set('port', process.env.PORT || 8080)
app.locals.title = 'hheyhhay';
app.locals.projects = projectData;

app.get('/', (request, response) => {
  response.send('hheyhhay.com')
});

app.get('/api/v1/projects', (request, response) => {
  response.json({ projectData })
})

app.get('/api/v1/pets/:id', (request, response) => {
  const matchedProject = app.locals.projects.find(project => {
    return request.params.id === project.id
  })

  if(!matchedProject) {
    response.status(404).json(`There is no project with an id of ${request.params.id}`)
  }

  response.status(200).json(matchedProject)
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
