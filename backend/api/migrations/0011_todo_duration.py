# Generated by Django 5.0 on 2023-12-09 20:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_chatmessage'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='duration',
            field=models.IntegerField(default=0),
        ),
    ]
