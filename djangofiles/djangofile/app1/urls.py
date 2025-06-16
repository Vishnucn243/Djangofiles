from django.urls import path
from . import views

urlpatterns = [
    path("", views.bookview, name="bookview"),
    path("bookuploadupload/", views.bookupload, name="bookupload"),
    path('secure-media/<path:path>', views.secure_media, name='secure_media'),
]