from django.urls import path,include
# from .views import RegisterView
from .import views
from rest_framework import routers
from .views import send_email
from .views import update_user

router = routers.DefaultRouter()
router.register(r'', views.UserViewSet)
urlpatterns = [
    # path('register',RegisterView.as_view()),
    # path('login',Loginview.as_view()),
    path('login/', views.signin, name='login'),
    path('logout/<int:id>/', views.signout, name='signout'),
    path('', include(router.urls)),
    path('send-email/', send_email, name='send_email'),
    path('update-user/<int:id>/', update_user, name='update_user'),
]
