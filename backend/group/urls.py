from django.urls import path
from . import views

urlpatterns = [
    path('create-group/', views.create_group, name='create_group'),
    path('create-tweet/', views.create_tweet, name='create_tweet'),
    path('join/', views.join, name='join_group'),
    path('create-secure-tweet/', views.create_secure_tweet, name='create_secure_tweet'),
    path('post-data/<int:pk>/', views.post_data, name='post_data'),
    path('post-auth/<int:pk>/', views.post_auth, name='post_auth'),
    path('post-check/<int:pk>/', views.check_pass, name='post_auth'),
    path('edit-post/<int:pk>/', views.edit_post, name='edit-post'),

]
