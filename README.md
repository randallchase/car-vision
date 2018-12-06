# Smart Ads

**The integration of computer vision technology and digital billboards provide opportunity to target ads to consumers more effectively.**

## Tecnologies Used
- HTML/CSS
- JavaScript
- Node.js
    - express
    - request-promise
    - pg-promise
- postgreSQL
- 3rd Party API: Sighthound

## Software Architecture
![](diagram.png)
- User Interface Layer
    - UI Components
    - UI Process Components
    - Camera: replicated by a folder of photos
    - Billboard
- Business Layer
    - Ad choice
    - Analytics
        - Traffic
        - Ad presentation
- Persistence Layers
    - Data access components
- Database Layer: PostgreSQL
- Services: Sighthound
- Overaching components:
    - Cloud hosting: Digital Ocean
    - HTTP Server: express


## Resources Used
- BadBank Methodology
- Setting up the server with .bin/www/ for continuous server while developing: https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize
- Setting up RESTful API with express and Postgres: https://mherman.org/blog/designing-a-restful-api-with-node-and-postgres/