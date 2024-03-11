from rest_framework import routers
from django.urls import path, include

# from .views import OrderViewSet,add
from . import views
router = routers.DefaultRouter()
router.register(r'', views.OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('add/<str:id>/<str:token>/', views.add, name='order.add'),
]
