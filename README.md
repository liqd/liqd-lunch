# liqd-lunch
Demo app

## Start!
### Make virtual env and install requirements
```
python3 -m venv venv
source venv/bin/activate
pip install django djangorestframework django-cors-headers
```

### Create superuser
```
python manage.py createsuperuser
```

### run the migrations and start the server
```
cd liqd_lunch/
python manage.py migrate
python manage.py runserver
```

### run react application
In a new terminal:
```
cd liqd_lunch/frontend/
npm start
```

###install axios from npm
```
deactivate
npm install axios --save
``` 