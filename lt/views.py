from django.shortcuts import render
from django.http import HttpResponse
import json
from . import custom_Scripts

# Create your views here.

def index(request):
	data_Dict = custom_Scripts.createDictFromExcel()
	return render(request, 'lt/index.html', {'data_Dict': json.dumps(data_Dict)})
