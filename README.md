
# RolesProject
### Contribution Guidelines
The API  provide functionality to create a unique and easy-to-remember short URL for a given long URL.
### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
- To get started, you will need an MongoDB for your application. It is necessary to create a .env file where you can specify the username and password for the database user.
### Routes
###### Create 50 random new urls
Method: POST \
URL: `http://localhost:3000/urls` 

###### Get all urls
Method: Get \
URL: `http://localhost:3000/urls` 

###### Update Url With Old Url
Method: POST \
URL: `http://localhost:3000/urls/update` \
BODY: {
	"linkOld": "https://hdtoday.tv/watch-tv/watch-the-summer-i-turned-pretty-hd-82873.9758536"
} 
###### Get Link Old From Link New
Method: POST \
URL: `http://localhost:3000/urls/getLinkOld` \
BODY: {
	"linkNew": "d85am10"
} 


