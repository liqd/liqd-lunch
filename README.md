# liqd-lunch
Demo app

## Start!
### Make virtual env and install requirements
```
python3 -m venv venv
source venv/bin/activate
pip install django djangorestframework django-cors-headers
deactivate
npm install axios --save
```

### Create superuser
```
python manage.py createsuperuser
```
You can go to `localhost:8000/admin`, login with your superuser and add restaurants.

### run the migrations and start the server
```
cd liqd_lunch/
python manage.py migrate
python manage.py runserver
```
You can look at your restaurants and create a new one via `localhost:8000/api/restaurants`. With `localhost:8000/api/restaurants/<pk>` you can get, update and delete single restaurant instances.

### run react application
In a new terminal:
```
cd liqd_lunch/frontend/
npm start
```
