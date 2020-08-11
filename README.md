# Very Simple Medicine API

* A very simple medicine CRUD api with nodejs, express, mongodb and docker  
---
## Requirements


#### 1. Development
1. You will need node.js, mongodb, npm installed in your environement.
2. Change name of .env.example file to .env
3. Run npm start for develope or npm test for testing.
#### 2. Production 
1. Docker must be installed 
2. Run docker-compose up

#### 3. API endpoints
* All api call must have api-key = 12345 on header

* POST /medicine/save 
    * payload {	
      	"name": "Panadol",
        "expiredDate": "2012/09/12",
      	"price": 20000,
        "amount": 12,
        "unit": "BOX",
        "note": "sadsa" 
      }
* GET /medicine/remove-by-name?name=${medicineName} 

* GET /medicine/find-by-name?name=${medicineName} 
