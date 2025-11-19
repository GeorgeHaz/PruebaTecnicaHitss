{
	"info": {
		"_postman_id": "6cf4d26c-58c4-45f7-ad44-dd503e1b81e1",
		"name": "PruebaHits",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "27915712"
	},
	"item": [
		{
			"name": "AuthService",
			"item": [
				{
					"name": "Login",
					"request": {
						"auth": {
							"type": "jwt",
							"jwt": [
								{
									"key": "algorithm",
									"value": "HS256",
									"type": "string"
								},
								{
									"key": "isSecretBase64Encoded",
									"value": false,
									"type": "boolean"
								},
								{
									"key": "payload",
									"value": "{}",
									"type": "string"
								},
								{
									"key": "addTokenTo",
									"value": "header",
									"type": "string"
								},
								{
									"key": "headerPrefix",
									"value": "Bearer",
									"type": "string"
								},
								{
									"key": "queryParamKey",
									"value": "token",
									"type": "string"
								},
								{
									"key": "header",
									"value": "{}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n  \"email\": \"dora@gmail.com\",\r\n  \"password\": \"Admin231\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://192.168.16.1:5000/api/auth/login",
							"protocol": "http",
							"host": [
								"192",
								"168",
								"16",
								"1"
							],
							"port": "5000",
							"path": [
								"api",
								"auth",
								"login"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Customer-ORDER-Service",
			"item": [
				{
					"name": "Clients-register",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJkb3JhQGdtYWlsLmNvbSIsImZhbWlseV9uYW1lIjoiZG9yYUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiZG9yYUBnbWFpbC5jb20iLCJ1bmlxdWVfbmFtZSI6ImYyNTU5M2I5LTNiYmItNDFmNi04N2FiLTUwMTE3ZDhmN2E4NSIsImp0aSI6IjJiZGY5Mjk3LTMzZDEtNGM0ZC05ODM0LTc3NzM4ZjYxYzc3NiIsImlhdCI6MTc2MzU4MjEwOSwiZXhwIjoxNzY0ODc4MTA5LCJpc3MiOiJodHRwczovL2doYXouY29tLmVjLyIsImF1ZCI6Imh0dHBzOi8vZ2hhei5jb20uZWMvIn0.9lWTUjs6gvqHZuzbZaNthkRpAymL8VtFQUsNMNTNcks",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"first_name\": \"Juan\",\r\n    \"last_name\": \"Perez\",\r\n    \"email\": \"juan.perez@ejemplo.com\",\r\n    \"phone\": \"0991234567\",\r\n    \"address\": \"Av. Siempre Viva 123, Quito\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:8000/api/clients",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "8000",
							"path": [
								"api",
								"clients"
							]
						}
					},
					"response": []
				},
				{
					"name": "Order-List-consul",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJkb3JhQGdtYWlsLmNvbSIsImZhbWlseV9uYW1lIjoiZG9yYUBnbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiZG9yYUBnbWFpbC5jb20iLCJ1bmlxdWVfbmFtZSI6ImYyNTU5M2I5LTNiYmItNDFmNi04N2FiLTUwMTE3ZDhmN2E4NSIsImp0aSI6IjBjNTk1OTg5LWVmYzYtNGI0OS05YjlkLTAzZDdjNDc5NjMwMyIsImlhdCI6MTc2MzU4MjI1MSwiZXhwIjoxNzY0ODc4MjUxLCJpc3MiOiJodHRwczovL2doYXouY29tLmVjLyIsImF1ZCI6Imh0dHBzOi8vZ2hhei5jb20uZWMvIn0.IMPFv2cnFP9fT_EfmmySsPMWAqnCpVZyGUoVz70R_Fk",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"client_id\": 1,\r\n    \"order_date\": \"2025-11-19\",\r\n    \"total\": 150.50,\r\n    \"status\": \"pending\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:8000/api/orders",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "8000",
							"path": [
								"api",
								"orders"
							]
						}
					},
					"response": []
				}
			]
		}
	]
}
