from django.db import models

class Group(models.Model):
    name = models.CharField( max_length=50)
    code = models.CharField( unique=True ,max_length=120)

class Tweet(models.Model):
    group = models.ForeignKey(Group , on_delete=models.CASCADE)
    title = models.CharField(null=True ,max_length=50)
    content = models.CharField()
    created_at = models.DateTimeField(auto_now_add=True)
# Create your models here.
