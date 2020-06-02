# liqd-lunch
Demo app

## Start!
### Make virtual env and install requirements
```
python3 -m venv venv
source venv/bin/activate
cd liqd_lunch/
pip install -r requirements.txt
```

### Run the migrations
```
python manage.py migrate

```

### Create superuser
```
python manage.py createsuperuser
```

### Start the server
```
python manage.py runserver
```
You can look at your restaurants and create a new one via `localhost:8000/api/restaurants`. With `localhost:8000/api/restaurants/<pk>` you can get, update and delete single restaurant instances.
You can go to `localhost:8000/admin`, login with your superuser and add restaurants.

### run react application
In a new terminal:
```
cd liqd_lunch/frontend/
npm install
npm start
```
