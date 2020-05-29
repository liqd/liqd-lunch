from django.db import models


class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    link = models.URLField(blank=True)

    def __str__(self):
        return self.name
