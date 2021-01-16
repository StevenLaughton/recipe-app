# recipe-app

## Setting up the project
The app is designed to be hosted from [Google's firebase hosting](https://console.firebase.google.com/). 
First create an account on firebase, and set up a new project. 

Navigate to settings, Firebase Sdk snippet, and select the config option. Copy and paste this config into the environments files `app/src/environments`.

You will need the firebase tools installing, this can be done from npm using `npm install -g firebase-tools`.

Log into firebase tools with `firebase login`

From a terminal in the root folder of the project, run `firebase init`, select Hosting and follow the steps. 

set the rule for the firestore to only allow authenticated users
```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Install the dependencies for the project using `npm install`

To run the project locally, serve the project from the angular CLI, `ng serve -o` in the root folder of the project. 

Deploy the project to firebase using `ng deploy`.



## Creating users 

Under authentication on the firebase hosting portal, select authentication and sign in mehtod, Email and Google should be enabled. Add users to the users page, this will need to be the your google login.

when opening the app, log in with your google credentials.

## PWA

The app is to be added to the homescreen, this is done through your browser. 

## Adding recipes

### categories
Categories can either be selected from the dropdown, which is populated by already existing categories, or by selecting to type a new category name. 

The sidebar is populated with existing categories and can be used to filter.

### ingredients
Ingredients are added in the form `<number> <string> .. <number> <string>`. This is so the amounts can be linked and adjusted with the portions.
Example ingredients 
```
225 g butter ..
225 g caster sugar ..
4 large eggs ..
0.5 lemon, zested ..
1 tsp vanilla extract ..
225 g self-raising flour
```
### steps
Steps are sepeerated by a double dot delimeter (..) 
```
step 1 .. 
step 2 .. 
step 3
```
