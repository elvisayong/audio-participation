import logging
from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from .models import Plan, Opinion, Reply 
from .serializers import PlanSerializer, OpinionSerializer, UserSerializer, ReplySerializer  
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

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

    def get_queryset(self):
        plan_id = self.request.query_params.get('plan', None)
        if plan_id is not None:
            return self.queryset.filter(plan_id=plan_id)  
        return self.queryset

    def perform_create(self, serializer):
        plan_id = self.request.data.get('plan')
        if plan_id is None:
            raise ValidationError("Plan ID is required.")
        
        try:
            plan = Plan.objects.get(id=plan_id)
        except Plan.DoesNotExist:
            raise ValidationError("Plan does not exist.")
        
        serializer.save(citizen=self.request.user, plan=plan)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def reply(self, request, pk=None):
        opinion = self.get_object()
        if request.user.is_staff and request.user == opinion.plan.created_by:
            serializer = ReplySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(replied_by=request.user, opinion=opinion)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"detail": "Not authorized to reply to this opinion."}, status=status.HTTP_403_FORBIDDEN)

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
