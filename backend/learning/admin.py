from django.contrib import admin
from .models import LearningProgram, LearningGoal

admin.site.register(LearningProgram)
admin.site.register(LearningGoal)