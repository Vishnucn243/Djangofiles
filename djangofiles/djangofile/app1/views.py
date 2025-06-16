from django.shortcuts import render,redirect
from .forms import Bookform
from .models import Book
from django.http import FileResponse, Http404
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
import os

# Create your views here.


def bookview(request):
    photos = Book.objects.order_by("-id")
    return render(request, "bookview.html", {"photos": photos})


@login_required
def bookupload(request):
    if request.method == "POST":
        form = Bookform(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect("bookview")
    else:
        form = Bookform()
    return render(request, "bookupload.html", {"form": form})

@login_required
def secure_media(request, path):
    try:
        file_path = os.path.join(settings.MEDIA_ROOT, path)
        if not os.path.exists(file_path):
            raise Http404("File not found")
        return FileResponse(open(file_path, 'rb'))
    except Exception as e:
        raise Http404("File not found")

def loggedout(request):
    logout(request)
    return redirect('login')
