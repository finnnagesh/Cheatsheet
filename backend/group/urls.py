from django.urls import path
from . import views

urlpatterns = [
    path('create-group/', views.create_group, name='create_group'),
    path('create-tweet/', views.create_tweet, name='create_tweet'),
    path('join/', views.join, name='join_group'),
    path('post-data/<int:pk>/', views.post_data, name='post_data'),
]
