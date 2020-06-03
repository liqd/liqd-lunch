import datetime

from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from . import models
from . import serializers


@api_view(['GET', 'POST'])
def restaurant_list(request):

    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        restaurants = models.Restaurant.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(restaurants, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = serializers.RestaurantSerializer(data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data,
                         'count': paginator.count,
                         'numpages': paginator.num_pages,
                         'nextlink': '/api/restaurants/?page=' + str(nextPage),
                         'prevlink': '/api/restaurants/?page=' + str(previousPage)})

    elif request.method == 'POST':
        serializer = serializers.RestaurantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def restaurant_detail(request, pk):

    try:
        restaurant = models.Restaurant.objects.get(pk=pk)
    except models.Restaurant.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = serializers.RestaurantSerializer(restaurant,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = serializers.RestaurantSerializer(restaurant, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        restaurant.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def resistance_list(request):

    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        restaurants = models.Restaurant.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(restaurants, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = serializers.TotalResistanceSerializer(data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data,
                         'count': paginator.count,
                         'numpages': paginator.num_pages,
                         'nextlink': '/api/resistances/?page=' + str(nextPage),
                         'prevlink': '/api/resistances/?page=' + str(previousPage)})

    elif request.method == 'POST':
        serializer = serializers.ResistanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def resistance_detail(request, pk):

    try:
        resistance = models.Resistance.objects.get(pk=pk)
    except models.Resistance.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = serializers.ResistanceSerializer(resistance,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = serializers.ResistanceSerializer(resistance, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        resistance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
