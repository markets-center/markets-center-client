<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Markets Center - Client

<p align="right">
  <img height="200" src="https://user-images.githubusercontent.com/86481813/168854600-5f78aaca-b87a-406d-813f-1095d8cd7879.png"/>
</p>

## About
This project consists of the development of a S.P.A (Single Page Application). It is part of the Bootcamp Henry group project, in which a group of 7 developers participated. On this page, you can access as a seller and thus create, edit and delete products that are for sale and view your sales history.
As a buyer you have access to a favorites section, shopping cart, profile with your data and purchase history, you can also make purchases using the Stripe payment gateway. Finally, the admin actor will be able to keep track of the categories, the purchases made and the users.

## Objectives
- Create a profile with your data.
- Create, edit, delete and search products.
- Filter by categories and sellers.
- Sort alphabetically and by price.
- Add products to the shopping cart and buy them.
- Add products to the favorite list.
- Add comments and rating to a bought product.
- Manage users, categories, orders and see statistics graphic of seller orders in admin profile.

## Stack of Technologies
Javascript, React, Redux, Material UI, FireBase, Stripe

[Deploy](https://markets-center.vercel.app/)
<br/>
[Review in Youtube](https://www.youtube.com/watch?v=N0nbWDKR-Cc)

## BoilerPlate

You must create an account in [firebase](https://firebase.google.com/) and create a file called: `.env` 
that has the following form: 

```
REACT_APP_API=localhost
REACT_APP_FIREBASE_API_KEY=firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=firebase_auth_domain
REACT_APP_FIREBASE_STORAGE_BUCKET=firebase_storage_bucket
REACT_APP_FIREBASE_PROJECT_ID=firebase_project_id
REACT_APP_FIREBASE_MESSAGING_ID=firebase_messaging_id
REACT_APP_FIREBASE_APP_ID=firebase_app_id
STRIPE_API_KEY=stripe_api_key
```
REACT_APP_API port must be the same as api.

## Next 
### _Connect the data base_

 - Go to api of Markets Center and run it. Replace all `.env` information with database information

 ### _Install the necesary package to run it_

- Open the project console
    + Inside `client` folder, run the command line, `npm install`.

### _Run the project_

- Open the project console    
    + Inside `client` folder, run the command line, `npm start` and go to `http://localhost:3000/`.

## Project Screens
<p align="center">Home</p>
<p align="center">
<a href='https://markets-center.vercel.app/' width='30%'/><img src='https://user-images.githubusercontent.com/86481813/168861669-26076838-33c5-49cb-a8e1-21c00493d3c6.png' width='75%'/></a>
<a href="https://markets-center.vercel.app/"><img src='https://user-images.githubusercontent.com/86481813/168862109-9fbcc4bc-2975-4d43-b3ac-d6551b8487fd.png' width='16.84%'/></a>
</p>
<p align="center">Detail</p>
<p align="center">
<a href='https://markets-center.vercel.app/' width='30%'/><img src='https://user-images.githubusercontent.com/86481813/168862498-2c85b7e8-2314-413e-a3f3-3cddc029bd85.png' width='75%'/></a>
<a href="https://markets-center.vercel.app/"><img src='https://user-images.githubusercontent.com/86481813/168862566-44130477-a569-4884-95a9-151430b5b584.png' width='16.84%'/></a>
</p>
<p align="center">Searched products</p>
<p align="center">
<a href='https://markets-center.vercel.app/' width='30%'/><img src='https://user-images.githubusercontent.com/86481813/168863677-74c6c518-860d-4f5f-b781-cf238fb169b0.png' width='75%'/></a>
<a href="https://markets-center.vercel.app/"><img src='https://user-images.githubusercontent.com/86481813/168863773-1f2c6109-3350-475f-b7b2-adbada44a38e.png' width='16.65%'/></a>
</p>
<p align="center">Shopping cart</p>
<p align="center">
<a href='https://markets-center.vercel.app/' width='30%'/><img src='https://user-images.githubusercontent.com/86481813/168863917-8f3c8acd-3894-4f8a-98a8-c50532905bfd.png' width='75%'/></a>
<a href="https://markets-center.vercel.app/"><img src='https://user-images.githubusercontent.com/86481813/168863986-49d0fb44-8c10-4707-b5c2-b517db698251.png' width='16.52%'/></a>
</p>
<p align="center">Buyer profile</p>
<p align="center">
<a href='https://markets-center.vercel.app/' width='30%'/><img src='https://user-images.githubusercontent.com/86481813/168864287-2385c466-44a6-44b6-96b2-31b57ccfbd71.png' width='75%'/></a>
<a href="https://markets-center.vercel.app/"><img src='https://user-images.githubusercontent.com/86481813/168864134-88569f6d-bca3-46da-8468-bae4a0f38ae0.png' width='16.75%'/></a>
</p>
<p align="center">Favorite list</p>
<p align="center">
<a href='https://markets-center.vercel.app/' width='30%'/><img src='https://user-images.githubusercontent.com/86481813/168864401-c8820c1f-3cf0-477b-a0e5-e7591da84c88.png'
 width='75%'/></a>
<a href="https://markets-center.vercel.app/"><img src='https://user-images.githubusercontent.com/86481813/168864513-c6540607-919b-4078-b100-1108ac054cde.png' width='16.60%'/></a>
</p>
