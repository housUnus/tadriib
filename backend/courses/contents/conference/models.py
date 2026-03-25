from django.db import models
from django.conf import settings
import requests
from core.models import BaseModel
from courses.constants import ConferenceStatus

class Conference(BaseModel):
    content = models.OneToOneField(
        "courses.Content",
        on_delete=models.CASCADE,
        related_name="conference"
    )

    # Daily fields
    room_name = models.CharField(max_length=255, unique=True, blank=True, null=True)
    room_url = models.URLField(blank=True, null=True)

    # Lifecycle
    status = models.CharField(
        max_length=20,
        choices=ConferenceStatus.choices,
        default=ConferenceStatus.SCHEDULED
    )

    starts_at = models.DateTimeField(blank=True, null=True)
    ended_at = models.DateTimeField(blank=True, null=True)

    # Recording (optional)
    recording_url = models.URLField(blank=True, null=True)

    # -----------------------------
    # 🔹 DAILY INTEGRATION METHODS
    # -----------------------------
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if not self.room_name:
            self.create_daily_room()

    def create_daily_room(self):
        """Create a room on Daily and save it"""
        if self.room_name:
            return  # already created

        url = "https://api.daily.co/v1/rooms"

        room_name = f"conf-{self.public_id}"

        payload = {
            "name": room_name,
            "properties": {
                "enable_chat": True,
                # "enable_recording": "cloud",
                "start_video_off": False,
                "start_audio_off": False,
            }
        }

        headers = {
            "Authorization": f"Bearer {settings.DAILY_API_KEY}",
            "Content-Type": "application/json"
        }

        res = requests.post(url, json=payload, headers=headers)
        data = res.json()

        self.room_name = data["name"]
        self.room_url = data["url"]
        self.save(update_fields=["room_name", "room_url"])

    def get_meeting_token(self, user, is_host=False):
        """Generate a secure token for a user"""
        url = "https://api.daily.co/v1/meeting-tokens"

        payload = {
            "properties": {
                "room_name": self.room_name,
                "user_name": getattr(user, "username", "Guest"),
                "is_owner": is_host,
            }
        }

        headers = {
            "Authorization": f"Bearer {settings.DAILY_API_KEY}",
            "Content-Type": "application/json"
        }

        res = requests.post(url, json=payload, headers=headers)
        return res.json().get("token")

    def start(self):
        """Mark conference as live"""
        if not self.room_name:
            self.create_daily_room()

        self.status = ConferenceStatus.LIVE
        self.save(update_fields=["status"])

    def end(self):
        """Mark conference as ended"""
        from django.utils import timezone

        self.status = ConferenceStatus.ENDED
        self.ended_at = timezone.now()
        self.save(update_fields=["status", "ended_at"])