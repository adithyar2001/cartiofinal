from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import login, logout
from .serializers import UserSerializer
from .models import CustomUser 
from django.contrib.auth import get_user_model
from django.http import JsonResponse, HttpResponse
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
import random
import re
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import CustomUser

# Handle user registration
def register_user(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        gender = request.POST.get('gender')
        phone = request.POST.get('phone')
        address = request.POST.get('address')
        date_of_birth = request.POST.get('date_of_birth')
        
        # Create a new user object and save it to the database
        user = CustomUser(
            name=name,
            email=email,
            password=password,
            gender=gender,
            phone=phone,
            address=address,
            date_of_birth=date_of_birth
        )
        user.save()
        
        return JsonResponse({'message': 'User registered successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})


# Create your views here.
#registration
# class RegisterView(APIView):
#      @csrf_exempt
#      def post(self,request):
#          if(request.method=="POST"):
#              serializer = UserSerializer(data=request.data)
#              serializer.is_valid(raise_exception=True)
#              serializer.save()
#              return Response(serializer.data)
#          else:
#              return ("registration error !!! ☉_☉ !!!")
         
#generating token random for session
def generate_session_token(length=10):
    return ''.join(random.SystemRandom().choice([chr(i) for i in range(97, 123)] + [str(i) for i in range(10)]) for _ in range(length))

#to check valid email
def is_valid_email(email):
    pattern = r'^[\w\.\+\-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(pattern, email)
    

@csrf_exempt

def signin(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Send a post request with valid parameters only'})

    try:
        data = json.loads(request.body)
        email = data.get("email", "")
        password = data.get("password", "")

        if not is_valid_email(email):
            return JsonResponse({'error': 'Enter a valid email address'})

        if len(password) < 3:
            return JsonResponse({'error': 'Password length too short, it needs to be at least 3 characters'})

        UserModel = get_user_model()

        try:
            user = UserModel.objects.get(email=email)

            if user.check_password(password):
                usr_dict = UserModel.objects.filter(email=email).values().first()
                usr_dict.pop('password')

                if user.session_token != "0":
                    user.session_token = "0"
                    user.save()
                    return JsonResponse({'error': "Previous session already exists!"})

                token = generate_session_token()
                user.session_token = token
                user.save()
                login(request, user)
                return JsonResponse({'token': token, 'user': usr_dict})
            else:
                return JsonResponse({'error': 'Invalid password, please enter the correct password'})

        except UserModel.DoesNotExist:
            return JsonResponse({'error': 'Invalid email, Enter a valid user'})

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON data'})

# def signin(request):
#     if not request.method == 'POST':
#         return JsonResponse({'error':'Send a post request with valid paramenter only'})

#     # username = request.POST['email']
#     # password = request.POST['password']
#     data=json.loads(request.body)
    
#     # print(data.items("email"))
#     email = data.get("email", "")
#     print(email)
#     # username = json.loads(request.body.email)
#     username = request.POST.get('email', '')
#     password = request.POST.get('password', '')
#     # password = json.loads(request.body.password)
    
#     if not is_valid_email(username):
        
#         return JsonResponse({'error': json.loads(request.body)})
#         # return JsonResponse({'error': 'Enter a valid email address. (ﾉಥ益ಥ）ﾉ'})
       

#     if len(password)<3:
#         return JsonResponse({'error': 'Password length too short length needs to be atleast 3. (ﾉಥ益ಥ）ﾉ'})

#     UserModel = get_user_model()

#     try:
#         user = UserModel.objects.get(email=username)

#         if user.check_password(password):
#             usr_dict = UserModel.objects.filter(email=username).values().first()
#             usr_dict.pop('password')

#             if user.session_token !="0":
#                 user.session_token ="0"
#                 user.save()
#                 return JsonResponse({'error':"Previous session already exists! (=^ェ^=)"})

#             token = generate_session_token()
#             user.session_token = token
#             user.save()
#             login(request, user)
#             return JsonResponse({'token':token,'user':usr_dict})
#         else:
#             return JsonResponse({'error':'Invalid password, please enter the correct password. ¯\_(ツ)_/¯'})

#     except UserModel.DoesNotExist:
#         return JsonResponse({'error':'Invalid email, Enter a valid user. ¯\_(ツ)_/¯'})

#################################
#user login
# class Loginview(APIView):
#     def post(self,request):
#         emailFromRequest=request.data['email']
#         password=request.data['password']
        
#         try: # email Validation
#             validate_email(emailFromRequest)
#         except ValidationError:
#             return Response({"message": "Enter valid email"})
        
#         if len(password) < 3: # password Length Validation
#             return Response({"message": "Password must be at least 3 characters long"})
#         UserModel = get_user_model()
#         try:
#             user = UserModel.objects.get(email=emailFromRequest)
#             if user.check_password(password):
#                 usr_dict = UserModel.objects.filter(email=emailFromRequest).values().first()
#                 usr_dict.pop('password')
#                 if user.session_token != "0":
#                     user.session_token = "0"
#                     user.save()
#                     return JsonResponse({'message': "Previous session exists"})
#                 token = generate_session_token()
#                 user.session_token = token
#                 user.save()
#                 login(request, user)
#                 return JsonResponse({'token': token, 'user': usr_dict})
#             else:
#                 return JsonResponse({'message': 'Invalid password'})
#         except UserModel.DoesNotExist:
#             return JsonResponse({'message':'Invalid Email'})

##########################################################
#backup for login view      
  
# class Loginview(APIView):
#     def post(self,request):
#         emailFromRequest=request.data['email']
#         password=request.data['password']
        
#         User=CustomUser.objects.filter(email=emailFromRequest).first()
        
#         if User is None:
#             return Response({
#                 "message":"user not found"
#             })
        
#         if not User.check_password(password):
#             return Response({
#                 "message":"incorrect password"
#             })
#         return Response({
#                 "message":"success"
#             })

########################################################################

#user logout
def signout(request, id):
    logout(request)
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk=id)
        user.session_token = "0"
        user.save()
    except UserModel.DoesNotExist:
        return JsonResponse({'message': 'Logout Failed  ☉_☉'})
    return JsonResponse({'message': 'Logout success  ヘ( ^o^)ノ＼(^_^ )'})

class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {'create': [AllowAny]}
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]
        
        

from django.core.mail import send_mail
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request, id):
    user = get_object_or_404(CustomUser, id=id)
    serializer = UserSerializer(user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def send_email(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email', '')

        if email:
            try:
                send_mail(
                    'Subscription Confirmation',
                    'Thank you for subscribing!',
                    'adithya54756@gmail.com',  
                    [email],
                    fail_silently=False,
                )
                return JsonResponse({'message': 'Email sent successfully'})
            except Exception as e:
                print('Error sending email:', e)
                return JsonResponse({'error': 'Failed to send email'}, status=500)
        else:
            return JsonResponse({'error': 'Email address is required'}, status=400)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
