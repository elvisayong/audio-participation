from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from planning.views import PlanViewSet, OpinionViewSet
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to Audio Participation!")

router = DefaultRouter()
router.register(r'plans', PlanViewSet)
router.register(r'opinions', OpinionViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/', include('planning.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', home, name='home'),
]
