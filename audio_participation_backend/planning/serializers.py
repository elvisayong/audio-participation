from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Plan, Opinion, Reply
from django.utils import timezone


class PlanSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')
    opinion_count = serializers.IntegerField(source='opinions.count', read_only=True) 

    class Meta:
        model = Plan
        fields = ['id', 'created_by', 'title', 'description', 'created_at', 'expiration_date', 'opinion_count']

class ReplySerializer(serializers.ModelSerializer):
    replied_by = serializers.ReadOnlyField(source='replied_by.username')

    class Meta:
        model = Reply
        fields = ['id', 'replied_by', 'reply_text', 'created_at']

class OpinionSerializer(serializers.ModelSerializer):
    citizen = serializers.ReadOnlyField(source='citizen.username')
    plan = PlanSerializer(read_only=True)
    replies = ReplySerializer(many=True, read_only=True)  

    class Meta:
        model = Opinion
        fields = ['id', 'plan', 'voice_note', 'transcribed_text', 'created_at', 'citizen', 'replies']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'is_staff']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email']
        )
        user.is_staff = validated_data.get('is_staff', False)
        user.save()
        return user
