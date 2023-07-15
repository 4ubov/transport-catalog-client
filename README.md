# React js client to implement <a href="https://github.com/4ubov/transport-catalog-api">Transport-Catalog REST-API</a>

## How to start:

In the project directory, you can run:

### `npm intall`

### `npm start`


### `npm run build` fails to minify


## Important Information: 
### Запросы в коде отпраляются на адресс без указания сервера.
### Пример: 
    useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category/');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.log('Error:', response.status);
        }
      } catch (error) {
        console.log(error);
      }
    };
    
### Запрос отправляется по адрессу /api/category/ , вместо обычного http://localhost:8080/api/category/

</br>

## UI screenshots 

### Starter page: "http://localhost:3000/"
![image](https://github.com/4ubov/transport-catalog-api/assets/46792640/10f66009-36e1-4970-814e-f0103d4f72ac)


### Edit page
![image](https://github.com/4ubov/transport-catalog-api/assets/46792640/ca791fa6-f349-41c8-9a0d-49df88829289)

### Add new Vehicle page
![image](https://github.com/4ubov/transport-catalog-api/assets/46792640/93a0fe87-3666-4ee1-abb2-d89cc8cfef32)

### Drop-down menu view
![image](https://github.com/4ubov/transport-catalog-api/assets/46792640/1d3eafec-ea01-4b4d-99c6-d94db79a0db8)

### Display Exception 
![image](https://github.com/4ubov/transport-catalog-client/assets/46792640/fcdc2c8c-6516-4e03-a5b6-bd77b6908138)


