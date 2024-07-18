from django.urls import path
from .views import UserCreate, CurrentUserView

urlpatterns = [
    path('users/', UserCreate.as_view(), name='user-create'),
    path('me/', CurrentUserView.as_view(), name='current-user'),
]
