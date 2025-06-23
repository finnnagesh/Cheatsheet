from rest_framework import serializers
from .models import Group,Tweet
class Groupserializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'

class Tweetserializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = '__all__'
