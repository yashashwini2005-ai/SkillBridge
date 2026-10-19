from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import LearningProgram, LearningGoal
from .serializers import (
    LearningProgramSerializer,
    LearningGoalSerializer,
)


class LearningProgramViewSet(viewsets.ModelViewSet):
    queryset = LearningProgram.objects.all().order_by("-created_at")
    serializer_class = LearningProgramSerializer
    permission_classes = [AllowAny]


class LearningGoalViewSet(viewsets.ModelViewSet):
    queryset = LearningGoal.objects.all().order_by("-created_at")
    serializer_class = LearningGoalSerializer
    permission_classes = [AllowAny]