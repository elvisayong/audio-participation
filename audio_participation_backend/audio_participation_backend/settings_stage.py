from .settings import *

DEBUG = False
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'stage_db',
        'USER': 'stage_user',
        'PASSWORD': 'stage_password',
        'HOST': 'stage-db.example.com',
        'PORT': '5432',
    }
}
