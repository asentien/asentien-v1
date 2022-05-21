# Social Media / Social Network https://www.asentien.com #

Created with React, Django, JavaScript, Python, Django Rest Framework, Simple JWT, Docker, Nginx, Gunicorn, Redux, and Redux Toolkit.


<img src="https://user-images.githubusercontent.com/104103689/169641418-036a1e39-ab2a-4abe-8523-739fee2a6708.png" width="300px" height="580px"> <img src="https://user-images.githubusercontent.com/104103689/169641203-ab69a26f-7751-4797-9bd2-9a4456289982.png" width="300px" height="580px">

   - **Features:**
   
    - Responsive and mobile-first.
    - Posts with video, hashtags, image, title, and text.
    - Like and Dislike.
    - (Like - Dislike) display.
    - List people who have liked a post.
    - Shares with optional text and comments.
    - List shares, comments, and the text they may contain.
    - Follow button, list followers, and following.
    - Promotion system and users with multiple permissions.
    - Custom User Model.
    - Profiles with avatar and cover images.
    - Infinite scrolling.
    - Videos automatically play when on screen.
    - List and search for hashtags.
    - User search. 
    - List users by amount of followers.
    - List posts by most likes.
    - Display info about the author by hovering over their avatar or name.
    - Local, Docker, and Production setup. 
    - ReQuery posts by double-clicking navigation icons.
    - Parts are accessible without an account, others restricted to authenticated.
    - JWT authentication.
    - Custom loader. 
    - Lazy loading.
    - Contact form.
    - List linked notifications.
    - Notification badge.
    - Bugs. 

asentien believes in internet's promise. Our mission is to deliver it. 
https://www.youtube.com/watch?v=TXeemTPjUCQ&list=PL0HCjuq24JPRn1lAaGecOkdZslTdPDdM1.

This is a video explaining what asentien is.
https://www.youtube.com/watch?v=0qiK3nx8vu8.

This is a YouTube short displaying asentien in mobile form.
https://www.youtube.com/shorts/FyJeyZlAO-c.



The project should work both locally and in production 
but we personally keep two separate verisons.
One for production and another one for development. 
Therefore everything may not be perfect without some slight modifications on your part.

In the todos folder in the project root, 
you'll find text files providing additional information about the project. 
As well as areas of improvement if you're interested in helping out.
   - **You can reach us:**


    - through our contact form over at https://www.asentien.com
    - on our Discord server https://discord.gg/t3RXkmYpKe
    - through our YT channel https://www.youtube.com/channel/UC_yeAhNZ2qCP40s0mJHemog
    - or by email at support@asentien.com
    
    
    

**Running the project locally with Python Environment and NPM:**
   
    - This is the recommended setup
    - The project is pre-setup for it
    - You only need Python3, NPM, and pgAdmin installed
    
   - *****Both Backend and Frontend setup portions:*****
  
    - Choose a folder where you want the project to be located
    - git clone https://github.com/asentien/asentien-v1/
    - cd asentien-v1 or open the root of the project through your file system
    - code . or use the folder system in your code editor and open the code in the project root

   - *****Backend portion:*****
   
    - Create a virtual environment in the project root
    - Windows and Mac
          - python -m venv venv
          - or python3 -m venv venv
          - or py -m venv venv
    - Activate the virtual environment
    - Windows
          - venv\Scripts\activate
    - Mac
          - source venv/bin/activate
    - cd backend
    - pip install -r requirements.txt
    - Create a database through pgAdmin
             - Add the corresponding 
                - name of the database 
                - the pgAdmin user or database user 
                - and the pgAdmin password
             - to the database fields in the mainapp settings file
    - cd django_app from the project root
    - python manage.py makemigrations
    - python manage.py migrate
    - python manage.py runserver
    - Shutdown the server with CTRL C
    - python manage.py createsuperuser
              - first name
              - last name
              - email@example.com
              - birthday in this format 1987-06-24
              - password
              - password
              - python manage.py runserver

   - *****Frontend portion:*****
   
    - cd frontend from the project root
    - cd react_app
    - npm install
    - npm start


**Running the project locally with Docker:**

    - Not, at least initially, recommended:
      - It's harder to do
      - Any changes you make requires you to rebuild the project
      - The rebuilds will probably fail unless you understand how to correctly drop 
            - images
            - volumes
            - caches
            - ports

   - *****Setup:*****
   
    - Go to the settings file in the mainapp folder and uncomment the import at the bottom
    - Add the correct info to the .env files in all places in the project
    - If you're on Windows you need to change entrypoint.sh's CRLF to LF
    - Should then work by running docker-compose up or docker-compose up --build
    - The project should be found at http://127.0.0.1
    - Append /api/location-you-want-to-go-to/ to checkout the api
    - Append /admin/ to check out the Django admin

**Running the project in production:**

   - *****Cloud requirements:*****
   
    - virtual machine
    - database
    - storage bucket
    
   - *****Code setup:*****
   
    - Once the code is reachable from your VM
    - Go to init-letsencrypt.sh and set staging to 0
    - In the project root
    - docker-compose build
    - sudo chmod +x init-letsencrypt.sh
    - sudo ./init-letsencrypt.sh
    - Add your email
    - docker-compose down
    - docker-compose up
