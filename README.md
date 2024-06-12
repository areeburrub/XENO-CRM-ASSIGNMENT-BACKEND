# XENO - CRM - ASSIGNMENT - BACKEND

## Description
This is a backend application for a CRM system. It is built using Node Js Rest Framework.

## Tech Stack

- Node Js
- Express Js
- Prisma ORM
- Supabase Database (Postgres)
- Google OAuth
- Redis for Message Broker (Pub/Sub)

## Features

- User Authentication
- CRUD Operations on Customers, Orders, Audiance, Campaigns...
- Uses PUB/SUB Model for data ingestion
- Uses Prisma ORM for database operations
- Uses PUB/SUB for Email Campaigns

## Endpoints

- User
  - _/auth/login/success_ - Get User Info
  - _/auth/google/callback_ - Google OAuth Callback
  - _/auth/google_ - Google OAuth Consent Redirect
- Customer
  - _/customers/count_ - Get Customer Count (GET)
  - _/customers/_ - Get All Customers (GET)
  - _/customers/_ - Create Customer (POST)
  - _/customers/:id_ - Get Customer By Id (GET)
  - _/customers/:id_ - Update Customer By Id (PUT)
  - _/customers/_ - Delete Customer By Id (DELETE) ```{Body: {ids: [id1, id2,...]}}```
  - _/customers/add-visit/:id_ - Add Visit to Customer (PUT)
- Order
  - _/orders/count_ - Get Order Count (GET)
  - _/orders/_ - Get All Orders (GET)
  - _/orders/_ - Create Order (POST)
  - _/orders/:id_ - Get Order By Id (GET)
  - _/orders/:id_ - Update Order By Id (PUT)
  - _/orders/_ - Delete Order By Id (DELETE) ```{Body: {ids: [id1, id2,...]}}```
- Notifications
  - _/notifications/_ - Get All Notifications (GET)
  - _/notifications/:id_ - Delete Notification By Id (DELETE)
- Audience
  - _/audience/size_ - Get Audience Size (POST) 

    ```json
    //Body for Audience Size
    {
        "rules": [
            {
                "field": "totalSpends",
                "value": 4000,
                "operator": "AND"
            }          
            
        ]
    }
    ```
  - _/audience/_ - Create Audience (POST)
  - _/audience/_ - Get All Audiences (GET)
  - _/audience/:id_ - Delete Audience By Id (Delete) 
- Campaign
  - _/campaigns/_ - Create Campaign (POST)
  - _/campaigns/_ - Get All Campaigns (GET)
  - _/campaigns/:id_ - Get Campaign By Id (GET)
  - _/campaigns/:id_ - Update Campaign By Id (PUT)
  - _/campaigns/_ - Delete Campaign By Id (DELETE) ```{Body: {ids: [id1, id2,...]}}```
  - _/campaigns/start/:id_ - Start Campaign (PUT)
  - _/campaigns/logs/:id_ - Get Communication Logs By Campaign Id (GET)