from rest_framework import serializers
from . import models


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Restaurant
        fields = ('pk', 'name', 'link')


class ResistanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Resistance
        fields = ('pk', 'resistance', 'restaurant', 'created')
