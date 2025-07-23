from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import Tweetserializer, Groupserializer, Securityserializer
from .models import Tweet, Group, Securetweet


@api_view(['POST'])
def join(request):
    code = request.data.get("code")
    try:
        account = Group.objects.get(code=code)
        return Response({"message": "Group found", "id": account.id})
    except Group.DoesNotExist:
        return Response({"error": "Invalid group code"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def post_auth(request, pk):
    try:
        postdata = Securetweet.objects.get(tweet_id=pk)
        return Response({"is_secure": postdata.is_secure}, status=status.HTTP_200_OK)
    except Securetweet.DoesNotExist:
        return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as exc:
        return Response({"error": f"Exception: {exc}"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def check_pass(request, pk):
    try:
        postdata = Securetweet.objects.get(tweet_id=pk, secret_code=request.data.get("password"))
        return Response({"message": "Password is correct"}, status=status.HTTP_200_OK)
    except Securetweet.DoesNotExist:
        return Response({"error": "Incorrect password or post not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def create_tweet(request):
    serializer = Tweetserializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_secure_tweet(request):
    serializer = Securityserializer(data=request.data)
    if serializer.is_valid():
        tweet = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_group(request):
    serializer = Groupserializer(data=request.data)
    if serializer.is_valid():
        group = serializer.save()
        return Response({'id': group.id}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def post_data(request, pk):
    tweets = Tweet.objects.filter(group=pk)
    if not tweets.exists():
        return Response({"error": "No posts found"}, status=status.HTTP_404_NOT_FOUND)
    serializer = Tweetserializer(tweets, many=True)
    return Response(serializer.data)


@api_view(['PUT', 'DELETE'])
def edit_post(request, pk):
    tweet = Tweet.objects.get(id=pk)
    

    if request.method == 'PUT':
        serializer = Tweetserializer(tweet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        tweet.delete()
        return Response({"message": "Post deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
