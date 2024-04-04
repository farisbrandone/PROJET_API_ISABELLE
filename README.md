# API_PROJECT_ISABELLE

# API d'interaction avec le backend de firebase pour la gestion des utilisateur

# CONSIGNE D'UTILISATION DE L'API

# POINT DE TERMINAISON PRESENT DANS L'API:

\*\* point1: domainName/auth/login

..Method: POST , body={email:"...", password:"..."}

..exemple: si votre nom de domain fournit par hebergeur de l'api est https://jesus.com
alors url = https://jesus.com/auth/login

..fonction: ce point de terminaison permet de se connecter a l'api
et de recevoir un jeton pour l'authentification

               elle s'assure principalement que celui qui se connecte est un administrateur
               et est evidement inscrit dans firebase

               les utilisateur administrateur sont stocker dans un fichier présent dans l'api.

\*\* point2: domainName/auth/verify_email/:email

..Method: GET , ":email" represente un paramètre dynamique et sera l'email à vérifier

..fonction : verifie qu'une adresse est celle d'un administrateur

..condition d'accès: il faut etre authentifier donc etre administrateur

\*\*point3 : domainName/users/all_users
..Method: GET
..Fonction: ce point de terminaison permet de fournir tout les utilisateur
inscrit dans le project firebase

..condition d'accès: il faut etre authentifier donc etre administrateur

\*\*point4 : domainName/users/one_user/:email
..Method: GET, ":email" represente un paramètre dynamique et sera l'email à rechercher

    ..Fouction: ce point de terminaison permet grace à l'email de l'utilisateur
                d'avoir tout les propriété de celui-ci dont: email, mots depasse, uid, ect.

    ..condition d'accès: il faut etre authentifier donc etre administrateur

\*\*point5 : domainName/users/create_user
..Method: POST, body={email:"...", password:"..."}

..Function: ce point de terminaison permet à partir d'une requete de ceer
un utilisateur dans le projet firebase associer

..condition d'accès: il faut etre authentifier donc etre administrateur

\*\*point6 : domainName/users/update_user/:email
..Method: PUT , body={email:"...", password:"..."}
ou email et body sont des paramètre optionnel

    ..Function: permet de modifier les propriéter d'un utilisateur
                inscrit dans le project firebase

    ..condition d'accès: il faut etre authentifier donc etre administrateur

\*\*point7 : domainName/users/delete_user/:email
..Method: DELETE

    ..Function: permet de supprimer un utilisateur donc l'adresse est
                le paramètre dynamique ":email"

    ..condition d'accès: il faut etre authentifier donc etre administrateur

\*\*point8 : domainName/users/desable_user/:email
..Method: GET

    ..Function: permet de desactiver ou d'activer un utilisateur selon son etat initial

    ..condition d'accès: il faut etre authentifier donc etre administrateur
