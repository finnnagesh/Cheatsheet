from rest_framework.decorators import api_view
from rest_framework.response import Response 
from rest_framework import status
from .serializers import Tweetserializer, Groupserializer
from .models import Tweet, Group

@api_view(['POST'])
def join(request):
    code = request.data.get("code")
    try:
        account = Group.objects.get(code=code)
        return Response({"message": "Group found", "code": account.id})
    except Group.DoesNotExist:
        return Response({"error": "Invalid group code"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def create_tweet(request):
    serializer = Tweetserializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_group(request):
    serializer = Groupserializer(data=request.data)
    if serializer.is_valid():
        group = serializer.save()  # This returns the saved instance
        return Response({'id': group.id}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def post_data(request, pk):
    tweets = Tweet.objects.filter(group=pk)
    if not tweets.exists():
        return Response({"error": "No posts found"}, status=status.HTTP_404_NOT_FOUND)
    serializer = Tweetserializer(tweets, many=True)
    return Response(serializer.data)

