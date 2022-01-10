import {getDatabase, ref, set, child, get, update } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getFirebaseConfig } from './firebase-conf.js';

const auth = getAuth(getFirebaseConfig());
const db = getDatabase(getFirebaseConfig());

export function changeName(new_name){
    auth.onAuthStateChanged( user => {
        update(ref(db, '/leaderboard/' + user.uid), {
            name: new_name,
        });
        console.log("changed username!");
    });
}

export function getName(){
    auth.onAuthStateChanged( user => {
        get(child(ref(db), 'leaderboard/' + user.uid + '/name'))
        .then((snapshot) => {
            var userName = snapshot.val();   
            
            //TODO: Kevin stuff
            document.getElementById("navbarDropdownMenuLink").innerHTML = userName;

            console.log(userName);
        }).catch((error) => { //catch incase personal leaderboard can't be loaded
            console.log("IDK")
        });
    });
}

export function writeScores2leaderboard(score2048, scoreTetris){
    auth.onAuthStateChanged( user => {
        var yup = 'a' + new Date().getTime();
        set(ref(db, '/leaderboard/' + user.uid + '/attempt/' + yup), {
            score2048: score2048,
            scoreTetris: scoreTetris,
            combinedScore: score2048 + scoreTetris
        });
        console.log("done writing to database");
    });
}

export function getPersonalScores(){
    var arr = [];
    auth.onAuthStateChanged( user => {
        if (user) {
            get(child(ref(db), 'leaderboard/' + user.uid + '/attempt/'))
            .then((snapshot) => {
                var temp = snapshot.val();            
                for (const key in temp) {
                    const element = temp[key];
                    arr.push([element.combinedScore, element.score2048, element.scoreTetris]);
                }
                arr.sort(function(a, b) {
                    var a, b;
                    a = a[0];
                    b = b[0];
                    if (a > b) {
                        return -1;
                    }
                    else if (a < b) {
                        return 1;
                    }
                    return 0;
                });
                //console.log(arr);
                for (let i = 0; i < 3; i++) {
                    var playerID = user.email;
                    var combinedScore = arr[i][0];
                    var scoreTetris = arr[i][2];
                    var score2048 = arr[i][1];
    
                    let top3 = document.getElementById("user_top_3").getElementsByTagName('tbody')[0];
                    top3.insertRow(top3.rows.length).innerHTML = `<th>${i+1}</th>
                                                                  <td>${score2048}</td>
                                                                  <td>${scoreTetris}</td>
                                                                  <td>${combinedScore}</td>`;             
                }
                console.log("done retrieving personal scores");
            }).catch((error) => { //catch incase personal leaderboard can't be loaded
                //console.log("Error loading personal leaderboard")
            });
        } else {}
    });
}

export function getLeaderboardScores(){
    get(child(ref(db), 'leaderboard/'))
    .then((snapshot) => {
        var arr = [];
        var temp = snapshot.val();
        for (const key in temp) {
            var temp2 = temp[key].attempt;
            var name = temp[key].name;
            for(const key2 in temp2)
            {
                arr.push([name, temp2[key2].combinedScore, temp2[key2].score2048, temp2[key2].scoreTetris]);
            }
            arr.sort(function(a, b) {
                var a, b;
                a = a[1];
                b = b[1];
                if (a > b) {
                    return -1;
                }
                else if (a < b) {
                    return 1;
                }
                return 0;
            });
        }
        for (let i = 0; i < arr.length; i++) {
            var playerID = arr[i][0];
            var combinedScore = arr[i][1];
            var scoreTetris = arr[i][3];
            var score2048 = arr[i][2];
            let lb = document.getElementById("leader_table").getElementsByTagName('tbody')[0];
                lb.insertRow(lb.rows.length).innerHTML = `<th>${i+1}</th>
                                                              <td>${playerID}</td>
                                                              <td>${score2048}</td>
                                                              <td>${scoreTetris}</td>
                                                              <td>${combinedScore}</td>`;
        }
    }).catch((error => {})) //suppress error
}

getPersonalScores();
getLeaderboardScores();
