# Generated by Django 5.0.2 on 2024-03-04 15:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_product_image1_product_image2_product_image3'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='image1',
        ),
        migrations.RemoveField(
            model_name='product',
            name='image2',
        ),
        migrations.RemoveField(
            model_name='product',
            name='image3',
        ),
    ]
