from django.db import models
from django.contrib.auth.models import User

class Plan(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_plans')
    expiration_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.title

class Opinion(models.Model):
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE, related_name='opinions')
    citizen = models.ForeignKey(User, on_delete=models.CASCADE, related_name='opinions')
    voice_note = models.FileField(upload_to='voice_notes/')
    transcribed_text = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Opinion by {self.citizen.username} on {self.plan.title}'

class Reply(models.Model):
    opinion = models.ForeignKey(Opinion, on_delete=models.CASCADE, related_name='replies')
    replied_by = models.ForeignKey(User, on_delete=models.CASCADE)
    reply_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Reply by {self.replied_by.username} to Opinion {self.opinion.id}'
