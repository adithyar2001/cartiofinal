from django.db import migrations
from api.user.models import CustomUser


        
class Migration(migrations.Migration):
    def seed_data(apps, schema_editor):
        user = CustomUser.objects.create(name="adithya",
                          email="adithya54756@gmail.com",
                          is_staff=True,
                          is_superuser=True,
                          phone="9061146624",
                          gender="Male"
                          )
        user.set_password("superuserme")
        user.save()
    dependencies = [
        ('user','0002_customuser_session_token')
    ]

    operations = [
        migrations.RunPython(seed_data),
    ]
