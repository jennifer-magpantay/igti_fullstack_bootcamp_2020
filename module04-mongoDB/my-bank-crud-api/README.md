# Bank Application CRUD

## IGTI Fullstack Bootcamp | Module 04: MongoDB

### Goals

1. Create a database in MongoDB Atlas and import the data “accounts.json” file to your collection.
2. Implement a model (schema) for this collection, considering that all fields are required and the balance field cannot be less than 0.
3. Create an endpoint to register a deposit in an account. This endpoint should
   receive agency, account number and deposit amount as parameters. This request should update the account balance, increasing it with the amount received as parameter.
4. Create an endpoint to register a withdrawal to an account. This endpoint should
   receive agency, account number and withdrawal amount as parameters. This request should update the account balance, decreasing it with the amount received with
   parameter and charging a withdrawal fee of (1).
5. Create an endpoint to check an account balance. This endpoint should receive as a parameter the agency and the account number, and it must returns the balance.
6. Create an endpoint to delete an account. This endpoint should receive as parameter the agency and the account number and return the number of active accounts for this agency.
7. Create an endpoint to make transfers between accounts. This endpoint should receive as a parameter the source account number, the destination account number and the transfer amount. This endpoint must validate that the accounts are the same agency to carry out the transfer, if the fee is from different agencies transfer (8) must be debited from the source account. The endpoint should return the source account balance.
8. Create an endpoint to see the average customer balance for a given agency. The endpoint must receive the agency as a parameter and must return the average balance of the account.
9. Create an endpoint to consult customers with the lowest account balance. The endpoint should receive as a parameter a numerical value to determine the amount of customers to be listed, and the endpoint should be returned in ascending order by balance the list of clients (branch, account, balance).
10. Create an endpoint to query the bank's wealthiest customers. The endpoint should receive a numerical value as a parameter to determine the number of customers to be listed, and the endpoint should return in descending order by the balance, by name, the list of clients (branch, account, name and balance).
11. Create an endpoint that will transfer the customer with the highest account balance for each agency to private agency agency = 99. The endpoint should return the list of clients of the private agency.
12. Create an endpoint to add a new account, following the schema you have defined.
13. Create a function to validate of agency and an account exist

### Status

In development.

### Tech Stack

JavaScript, MongoDB, Node.js, Postman.

### License

[MIT](https://choosealicense.com/licenses/mit/)
    
### Author

Developed by Jennifer Magpantay 

**Reach me out** 

[![Linkedin Badge](https://img.shields.io/badge/-Jennifer-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/jennifermagpantay/)](https://www.linkedin.com/in/jennifermagpantay/) [![Gmail Badge](https://img.shields.io/badge/-jennifer.magpantay@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:jennifer.magpantay@gmail.com)](mailto:jennifer.magpantay@gmail.com)
 

