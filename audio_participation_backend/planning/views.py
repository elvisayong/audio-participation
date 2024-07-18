import logging
import openai
from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from .models import Plan, Opinion
from .serializers import PlanSerializer, OpinionSerializer, UserSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

logger = logging.getLogger(__name__)

class PlanViewSet(viewsets.ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            self.permission_classes = [IsAdminUser]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class OpinionViewSet(viewsets.ModelViewSet):
    queryset = Opinion.objects.all()
    serializer_class = OpinionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        opinion = serializer.save(citizen=self.request.user)
        if opinion.voice_note:
            transcription = transcribe_voice_note(opinion.voice_note.path)
            opinion.transcribed_text = transcription
            opinion.save()

def transcribe_voice_note(file_path):
    openai.api_key = 'sk-proj-bKCE7bVa0aHY606pYL7HT3BlbkFJFl6lGeoVrzPLIT3cis9J'
    audio_file = open(file_path, 'rb')
    response = openai.Audio.transcriptions.create(
        file=audio_file,
        model="whisper-1"
    )
    return response['text']

@method_decorator(csrf_exempt, name='dispatch')
class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        logger.debug(f'Received request data: {request.data}')
        response = super().create(request, *args, **kwargs)
        logger.debug(f'Response data: {response.data}')
        return response

class CurrentUserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
