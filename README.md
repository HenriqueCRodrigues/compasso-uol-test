<p align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png" width="250">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://eventos.ecommercebrasil.com.br/forum/wp-content/uploads/sites/108/2020/06/compasso.png" width="300"></p>

## Desafio Compasso UOL
Foi realizado a criação da API de cadastro de clientes<br>

* Utiliza 3 collections(states, cities, customers).
* Todos os requisitos solicitados foram atendidos.



### Bônus
* Foi adicionado os seguintes filtros de pesquisas: Consultar Cliente por Cidade, Consultar Cliente por Estado 

```
+------------+----------------------------------------+
|   Method   |                URI                     |
+------------+----------------------------------------+
|    POST    | state/create                           |
|    GET     | state                                  |
|    POST    | city/create                            |
|    GET     | city                                   |
|    POST    | customer/create                        |
|    GET     | customer                               |
|    GET     | customer/:id                           |
|    PUT     | customer/:id/update                    |
|    DELETE  | customer/:id/delete                    |
+------------+----------------------------------------+
```

####  state/create 
```
Rota do tipo POST, cria um estado.

Exemplo da requisição
{
	"name": "Parana",
	"uf": "PR"
}


Response esperado
{
    "status": 200,
    "data": {
        "_id": "5f8d89a2132cbf22bed345d9",
        "deleted": false,
        "name": "Rio Grande do Sul",
        "uf": "RS",
        "createdAt": "2020-10-19T03:00:00.000Z",
        "updatedAt": "2020-10-19T12:42:10.758Z",
        "__v": 0
    }
}
```
<br>

####  state
```
Rota do tipo GET, retorna todos os estados que atenda os filtros

Filtros são querystring.
Filtros aceitos
{
    _id,
    name,
    uf,
    createdAt,
    updatedAt
}
```
<br>

####  city/create
```
Rota do tipo POST, cria uma cidade.
A requisição pode receber o estado de 3 formas(state_id, state_name, state_uf).
Exemplo da requisição
{
	"name": "Porto Alegre",
	"state_uf": "RS"
}


Response esperado
{
    "status": 200,
    "data": {
        "_id": "5f8d8ba5b6374125d8265f64",
        "deleted": false,
        "name": "Porto Alegre",
        "createdAt": "2020-10-19T03:00:00.000Z",
        "state": {
            "deleted": false,
            "_id": "5f8d89a2132cbf22bed345d9",
            "name": "Rio Grande do Sul",
            "uf": "RS",
            "createdAt": "2020-10-19T03:00:00.000Z",
            "updatedAt": "2020-10-19T12:42:10.758Z",
            "__v": 0
        },
        "updatedAt": "2020-10-19T12:50:45.209Z",
        "__v": 0
    }
}
```
<br>

####  city
```
Rota do tipo GET, retorna todas as cidades que atenda os filtros

Filtros são querystring.
Filtros aceitos
{
    _id,
    name,
    createdAt,
    updatedAt,
    state_id,
    state_uf,
    state_name
}
```
<br>

####  customer/create
```
Rota do tipo POST, cria um cliente.
A requisição pode receber a cidade de 2 formas(city, city_id), ambos deve ser o id da cidade.

Exemplo da requisição
{
	"fullName": "Henrique Rodrigues",
	"sex": "MALE",
	"age": 23,
	"city": "5f8d8ba5b6374125d8265f64",
	"birthedAt": "06/04/1997"
}


Response esperado
{
    "status": 200,
    "data": {
        "sex": "MALE",
        "_id": "5f8d9016b6374125d8265f65",
        "deleted": false,
        "fullName": "Henrique Rodrigues",
        "age": 23,
        "city": {
            "deleted": false,
            "_id": "5f8d8ba5b6374125d8265f64",
            "name": "Porto Alegre",
            "createdAt": "2020-10-19T03:00:00.000Z",
            "state": "5f8d89a2132cbf22bed345d9",
            "updatedAt": "2020-10-19T12:50:45.209Z",
            "__v": 0
        },
        "birthedAt": "1997-06-04T03:00:00.000Z",
        "createdAt": "2020-10-19T03:00:00.000Z",
        "updatedAt": "2020-10-19T13:09:42.453Z",
        "__v": 0
    }
}
```

####  customer
```
Rota do tipo GET, retorna todos os clientes que atenda os filtros

Filtros são querystring.
Filtros aceitos
{
    _id,
    fullName,
    age,
    birthedAt,
    createdAt,
    updatedAt,
    state_id,
    state_uf,
    state_name,
    city_id,
    city_name
}
```
<br>

####  customer/:id
```
Rota do tipo GET, retorna o cliente do id especificado.
:id = 5f8d9016b6374125d8265f65

Response esperado
{
    "status": 200,
    "data": {
        "sex": "MALE",
        "deleted": false,
        "_id": "5f8d9016b6374125d8265f65",
        "fullName": "Henrique Rodrigues",
        "age": 23,
        "city": "5f8d8ba5b6374125d8265f64",
        "birthedAt": "1997-06-04T03:00:00.000Z",
        "createdAt": "2020-10-19T03:00:00.000Z",
        "updatedAt": "2020-10-19T13:09:42.453Z",
        "__v": 0
    }
}
```
<br>

####  customer/:id/update
```
Rota do tipo PUT, atualiza o nome do cliente.
A requisição pode receber o nome de 2 formas(name, fullName).
:id = 5f8d9016b6374125d8265f65

Exemplo da requisição
{
    "name": "Jose"
}

Response esperado
{
    "status": 200,
    "data": {
        "sex": "MALE",
        "deleted": false,
        "_id": "5f8d9016b6374125d8265f65",
        "fullName": "Jose",
        "age": 23,
        "city": "5f8d8ba5b6374125d8265f64",
        "birthedAt": "1997-06-04T03:00:00.000Z",
        "createdAt": "2020-10-19T03:00:00.000Z",
        "updatedAt": "2020-10-19T13:09:42.453Z",
        "__v": 0
    }
}
```
<br>

####  customer/:id/delete
```
Rota do tipo DELETE, deleta o cliente(SOFT).
:id = 5f8d9016b6374125d8265f65

Response esperado
{
    "status": 200,
    "data": "Customer ID(5f8d9016b6374125d8265f65) Deleted"
}
```
<br>