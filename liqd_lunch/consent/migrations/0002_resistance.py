# Generated by Django 3.0.6 on 2020-05-29 10:22

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('consent', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Resistance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('resistance', models.PositiveSmallIntegerField(default=0, validators=[django.core.validators.MaxValueValidator(10)])),
                ('created', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('restaurant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='consent.Restaurant')),
            ],
        ),
    ]
