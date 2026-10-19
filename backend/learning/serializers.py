from rest_framework import serializers
from .models import LearningProgram, LearningGoal


class LearningProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningProgram
        fields = "__all__"


class LearningGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningGoal
        fields = "__all__"