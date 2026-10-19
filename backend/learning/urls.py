from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import LearningProgramViewSet, LearningGoalViewSet

router = DefaultRouter()
router.register("programs", LearningProgramViewSet)
router.register("goals", LearningGoalViewSet)

urlpatterns = [
    path("", include(router.urls)),
]