from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Plan, Opinion

class PlanSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')

    class Meta:
        model = Plan
        fields = '__all__'

class OpinionSerializer(serializers.ModelSerializer):
    citizen = serializers.ReadOnlyField(source='citizen.username')

    class Meta:
        model = Opinion
        fields = ['id', 'plan', 'voice_note', 'transcribed_text', 'created_at', 'citizen']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'is_staff']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email']
        )
        return user
