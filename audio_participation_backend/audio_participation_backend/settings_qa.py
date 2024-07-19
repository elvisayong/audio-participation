from .settings import *

DEBUG = False
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'qa_db',
        'USER': 'qa_user',
        'PASSWORD': 'qa_password',
        'HOST': 'qa-db.example.com',
        'PORT': '5432',
    }
}
