# Generated by Django 5.0.6 on 2024-08-19 00:56

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('planning', '0002_plan_expiration_date'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Reply',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reply_text', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('opinion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='replies', to='planning.opinion')),
                ('replied_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
