# Generated by Django 5.2.1 on 2025-06-20 10:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('group', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Post',
            new_name='Tweet',
        ),
        migrations.AlterField(
            model_name='group',
            name='code',
            field=models.CharField(max_length=120, unique=True),
        ),
    ]
