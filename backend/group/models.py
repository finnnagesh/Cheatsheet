from django.db import models

class Group(models.Model):
    name = models.CharField( max_length=50)
    code = models.CharField( unique=True ,max_length=120)

class Tweet(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    title = models.CharField(max_length=50, null=True, blank=True)
    content = models.TextField()


class Securetweet(models.Model):
    tweet_id = models.OneToOneField(Tweet, on_delete=models.CASCADE)
    is_secure = models.BooleanField(default=False)
    secret_code = models.CharField(default = "", max_length=120, null=True, blank=True)


# Create your models here.
