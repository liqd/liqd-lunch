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
        

class TotalResistanceSerializer(serializers.ModelSerializer):
    total_resistance = serializers.SerializerMethodField()

    def get_total_resistance(self, obj):
        return obj.get_total_resistance_today()

    class Meta:
        model = models.Restaurant
        fields = ('name', 'total_resistance')
