# Problem Statement

**The integration of computer vision technology and digital billboards provide opportunity to target ads to consumers more effectively.**

- Digital billboards are becoming ubiquitous.
- Cars (make, model, year) provide valuable demographic information to advertisers.
- Using this information, advertisers can target ads according to the predicted demographic of the drivers of cars passing a billboard.

## Use Case

## Data Sources
- PostgreSQL/Express interaction taken from: https://github.com/mjhea0/node-postgres-promises

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
    - 
- Database Layer: PostgreSQL
- Services: Algorithmia
- Overaching components:
    - Cloud hosting: Digital Ocean
    - HTTP Server: express

## 
    
        
