# Citibank Hackathon 
## Team 14: Natalie Yeo, Jorina Lim, Sabrina Yeo, Gu YunTian
## _CitiLife: FrontEnd Mobile Application_. Powered by VueJS, Ionic and Firebase

#### CitiLife is a cloud-enabled, mobile-ready, Ionic-Vue-powered Application with Firebase's Cloud Firestore as the database.
## Features

- Frontend Application [Mobile App]
    - Customer
        - Authentication
        - View available vouchers [In QR Code Format]
        - Purchase vouchers using cash or points either through adding to cart then buy, or buy and instantly use
        - Present QR Code to Cashier for redemption
        - Share vouchers
    - Cashier [Merchant Side]
        - Authentication
        - Scan QR Code presented by Customer to redeem it
        - View redeemed vouchers and redemption details
- Server Application:
    - Authentication for merchants
    - Create and upload vouchers
    - View All Transactions (Voucher Purchases and Voucher Redemptions)

# Running CitiLife
```
cd <GITCLONED_PROJECT_DIRECTORY>
npm i
ionic serve --open
```
