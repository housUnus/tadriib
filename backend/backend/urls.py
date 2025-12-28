
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView


urlpatterns = [
    path('api/v1/admin/', admin.site.urls),
    path('api/v1/dj-auth/', include('authentication.urls')),
    path('api/v1/users', include('users.urls')),
    path('api/v1/dj-auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/dj-auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    # path('accounts/', include('allauth.urls')),
]











# -------------------------------
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
urlpatterns += [
    path('api/schema/', SpectacularAPIView.as_view(api_version='v1'), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]