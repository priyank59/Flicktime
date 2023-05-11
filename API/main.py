#reference: https://medium.com/makedeveasy/authenitcation-using-python-flask-and-firestore-1958d29e2240

import os
from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app
import firebase_admin
import pyrebase
from flask_cors import CORS
import io
import json
from firebase_admin import auth
from collections.abc import MutableMapping
import json
import numpy as np
import pandas as pd
import pickle

app=Flask(__name__)
cred = credentials.Certificate("authKey.json")
default_app=firebase_admin.initialize_app(cred)
CORS(app)
db = firestore.client()
todo_ref=db.collection('todos')  #sample collections
pb = pyrebase.initialize_app(json.load(open('key.json')))

@app.route("/") 
def home():
    return "hello all"

@app.route('/registration',methods=['POST'])
def registration():
    email=request.json['email']  
    password=request.json['password'] 
    if email is None or password is None:
       return jsonify({'message':'Username or password must not be blank.'}),400
    try:
        user = auth.create_user(
               email=email,
               password=password
        )
        user = pb.auth().sign_in_with_email_and_password(email, password)
        pb.auth().send_email_verification(user['idToken']) 
        return jsonify({'idToken': user['idToken'], 'message': f'Successfully created user and verification link has been sent. Please activate your account.'}),200
    except:
        if email:
            emailexists=auth.get_user_by_email(email)
            if(emailexists.uid):
                return jsonify({'message': 'User already exists, please use another email adress.'}),400
        else:
            return jsonify({'message': 'Error creating in user.'}),401

@app.route('/login',methods=['POST'])
def signin():
    email=request.json['email'] 
    password=request.json['password']
    if email is None or password is None:
        return jsonify({'message':'username and password must not to be empty'}),400
    try:
       
        user = pb.auth().sign_in_with_email_and_password(email, password)
       
        arr=''
       
        for x in user:
            if x == 'localId':
                arr=(user[x])
                
        user1= auth.get_user(arr)
        user3=user1.email_verified

        if user3:
            return user
        else:
            return jsonify({'message':'please verify your account with your mailId'}),401
    except:
        return jsonify({'message':'invalid crendentails or user does not exist'}),403
    
@app.route('/recommend',methods=['POST'])
def getReccommendations():
    email = request.json['email']
    movieIdList = request.json['movieIdList']
    ratingsMap = request.json['ratingsMap']

    cosine_sim = pickle.load(open('../Files/cosine_sim.pkl', 'rb'))
    movie_dict = pickle.load(open('../Files/movie_df.pkl', 'rb'))

    movies = pd.DataFrame(movie_dict)

    programme_list = movies['title'].to_list()

    rec_list = []
    for id in movieIdList:
        try:
            movieTitle = movies.loc[movies['id'] == int(id), 'title'].values[0]
        except IndexError:
            continue
        
        vote_counts = movies[movies['vote_count'].notnull()]['vote_count'].astype('int')
        vote_averages = movies[movies['vote_average'].notnull()]['vote_average'].astype('int')
        C = vote_averages.mean()

        m = vote_counts.quantile(0.95)

        def weighted_rating(x):
            v = x['vote_count']
            R = x['vote_average']
            return (v/(v+m) * R) + (m/(m+v) * C)

        idx = programme_list.index(movieTitle)
        sim_scores = list(enumerate(cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:50]
        movie_indices = [i[0] for i in sim_scores]
        
        movies_1 = movies.iloc[movie_indices][['id','title', 'vote_count', 'vote_average']]
        vote_counts = movies_1[movies_1['vote_count'].notnull()]['vote_count'].astype('int')
        vote_averages = movies_1[movies_1['vote_average'].notnull()]['vote_average'].astype('int')
        C = vote_averages.mean()
        m = vote_counts.quantile(0.60)

        idx = programme_list.index(movieTitle)
        sim_scores = list(enumerate(cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:50]
        movie_indices = [i[0] for i in sim_scores]
        
        movies_1 = movies.iloc[movie_indices][['id','title', 'vote_count', 'vote_average']]
        vote_counts = movies_1[movies_1['vote_count'].notnull()]['vote_count'].astype('int')
        vote_averages = movies_1[movies_1['vote_average'].notnull()]['vote_average'].astype('int')
        C = vote_averages.mean()
        m = vote_counts.quantile(0.60)
        qualified = movies_1[(movies_1['vote_count'] >= m) & (movies_1['vote_count'].notnull()) & (movies_1['vote_average'].notnull())]
        qualified['vote_count'] = qualified['vote_count'].astype('int')
        qualified['vote_average'] = qualified['vote_average'].astype('int')
        qualified['wr'] = qualified.apply(weighted_rating, axis=1)
        qualified = qualified.sort_values('wr', ascending=False).head(20)

        rec_list.extend(qualified['id'].values)

    filtered_df = movies[movies['id'].isin(rec_list)]

    sorted_df = filtered_df.sort_values(by='popularity', ascending=False)

    final_list =  sorted_df['id'].head(20).values

    d = {}
    
    for i in range(len(final_list)):
        d[str(i)] = str(final_list[i])

    print('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX email: ', email)
    print('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX movieIdList', movieIdList)
    print('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX ratingsMap', ratingsMap)

    return jsonify(d)


if __name__ == '__main__':
    app.run(debug=True)