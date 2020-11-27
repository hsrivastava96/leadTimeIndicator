from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from django.conf.urls import include
from lt import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.index, name='index'),
	# url(r'^page2/$', views.page2, name='page2'),
   # url(r'^db_handle/$', views.db_handle, name='db_handle'),
]