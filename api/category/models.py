from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=20)
    descriptions = models.CharField(max_length=250)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name