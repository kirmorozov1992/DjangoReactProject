# Generated by Django 4.2 on 2025-05-07 11:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_category_post_notification_comment_bookmark'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='tags',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
