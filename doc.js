export const swaggerDocument =
{
    "swagger": "2.0",
    "info": {
      "version": "1.0.0",
      "title": "Online Banking API"
    },
    "tags": [
      {
        "name": "Endpoints",
        "description": "Manage bank accounts, account owner and it's balance."
      }
    ],
    "host": "localhost:8080",
    "paths": {
      "/account": {
        "get": {
          "tags": [
            "Endpoints"
          ],
          "summary": "List all accounts",
          "operationId": "getAccounts",
          "produces": [
            "application/json"
          ],
          "responses": {
            "200": {
              "description": "Success"
            },
            "400": {
              "description": "Error occurred"
            }
          }
        },
        "post": {
          "tags": [
            "Endpoints"
          ],
          "summary": "Create new account",
          "operationId": "createAccount",
          "consumes": [
            "application/json"
          ],
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "in": "body",
              "name": "body",
              "description": "Account information",
              "required": true,
              "schema": {
                "$ref": "#/definitions/Account_Create"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success"
            },
            "400": {
              "description": "Error occurred"
            }
          }
        },
        "put": {
          "tags": [
            "Endpoints"
          ],
          "summary": "Update an existing account",
          "operationId": "updateAccount",
          "consumes": [
            "application/json"
          ],
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "in": "body",
              "name": "body",
              "description": "Account information",
              "required": true,
              "schema": {
                "$ref": "#/definitions/Account_Update"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success"
            },
            "400": {
              "description": "Error occurred"
            }
          }
        }
      },
      "/account/updateBalance": {
        "patch": {
          "tags": [
            "Endpoints"
          ],
          "summary": "Update account balance",
          "operationId": "updateBalance",
          "consumes": [
            "application/json"
          ],
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "in": "body",
              "name": "body",
              "description": "Account information",
              "required": true,
              "schema": {
                "$ref": "#/definitions/Account_Update_balance"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success"
            },
            "400": {
              "description": "Error occurred"
            }
          }
        }
      },
      "/account/{accountId}": {
        "get": {
          "tags": [
            "Endpoints"
          ],
          "summary": "Find account by ID",
          "description": "Returns a single account",
          "operationId": "getAccount",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "accountId",
              "in": "path",
              "description": "ID of account to return",
              "required": true,
              "type": "integer",
              "format": "int64"
            }
          ],
          "responses": {
            "200": {
              "description": "Success"
            },
            "400": {
              "description": "Error occurred"
            }
          }
        },
        "delete": {
          "tags": [
            "Endpoints"
          ],
          "summary": "Deletes an account",
          "operationId": "deleteAccount",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "accountId",
              "in": "path",
              "description": "Account id to delete",
              "required": true,
              "type": "integer",
              "format": "int64"
            }
          ],
          "responses": {
            "200": {
              "description": "Success"
            },
            "400": {
              "description": "Error occurred"
            }
          }
        }
      }
    },
    "definitions": {
      "Account_Create": {
        "type": "object",
        "properties": {
          "name": {
            "example": "Lucky Doggo",
            "type": "string",
            "format": "date-time"
          },
          "balance": {
            "example": 105.45,
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "Account_Update": {
        "type": "object",
        "properties": {
          "id": {
            "example": 38,
            "type": "integer",
            "format": "int64"
          },
          "name": {
            "example": "Lucky Doggo",
            "type": "string",
            "format": "date-time"
          },
          "balance": {
            "example": 105.45,
            "type": "integer",
            "format": "int64"
          }
        }
      },
      "Account_Update_balance": {
        "type": "object",
        "properties": {
          "id": {
            "example": 38,
            "type": "integer",
            "format": "int64"
          },
          "balance": {
            "example": 105.45,
            "type": "integer",
            "format": "int64"
          }
        }
      }
    },
    "externalDocs": {
      "description": "GitHub Rep",
      "url": "http://swagger.io"
    }
  };