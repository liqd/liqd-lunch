import datetime

from django.db import models
from django.core.validators import MaxValueValidator
from django.db.models import Sum
from django.utils import timezone


class Restaurant(models.Model):
    name = models.CharField(
        max_length=255
    )
    link = models.URLField(
        blank=True
    )

    def __str__(self):
        return self.name

    def get_total_resistance_today(self):

        return self.resistance_set.filter(created__date=datetime.date.today())\
                .aggregate(Sum('resistance'))['resistance__sum']


class Resistance(models.Model):
    resistance = models.PositiveSmallIntegerField(
        default=0,
        validators=[MaxValueValidator(10)]
    )
    restaurant = models.ForeignKey(
        'Restaurant',
        on_delete=models.CASCADE
    )
    created = models.DateTimeField(
        editable=False,
        default=timezone.now
    )

    def __str__(self):
        return '{}_{}'.format(self.pk, self.restaurant.name)