from django.db import models

# Create your models here.
class Book(models.Model):
    name = models.CharField(max_length=30)
    image = models.ImageField(upload_to="photos/")

    def __str__(self):
        return str(self.name)