

document.getElementById('userform').addEventListener('submit', formSubmit);

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "****",
    authDomain: "****",
    databaseURL: "****",
    projectId: "****",
    storageBucket: "****",
    messagingSenderId: "****",
    appId: "****",
    measurementId: "****"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var userdb = firebase.firestore();
var userdbref = userdb.collection('userdata');
var auth = firebase.auth();
var user = firebase.auth().currentUser;

//Listen auth data
auth.onAuthStateChanged(function (user) {
    if (user) {
        console.log("login" + user);
        setUi(user);
        setUpdateUi(user);
        var deluser = document.querySelector('#btnDeleteId');
        deluser.addEventListener('click', deleteuser);
    }
    else {
        setUi();
        setUpdateUi();
    }

});

//    ............delete User Credi .....................................

function deleteuser(e) {
    user = firebase.auth().currentUser;
    e.preventDefault();
    userdbref.doc(user.uid).delete();
    user.delete().then(function () {
        alert("Account Deleted Successfully");
        console.log('delete');
    }).catch(function (error) {
        console.log(error);
    });
}

//........delete user End...........

document.getElementById('userform').addEventListener('submit', formSubmit);

function formSubmit(e) {
    e.preventDefault();
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var mobile = document.getElementById('mobile').value;
    var dob = document.getElementById('dob').value;
    var email = document.getElementById('email').value;
    var pass = document.getElementById('pass').value;
    var repass = document.getElementById('repass').value;
    if (pass != repass) {
        document.getElementById('repass').style.borderColor = "#f80505";
        alert("password do not match");
    }
    else {
        insertData(fname, lname, mobile, dob, email, pass, repass);
    }
}


//...........insert data into Firebase Cloud FireStore..........

function insertData(fname, lname, mobile, dob, email, pass, repass) {

    var docid = userdbref.doc();
    var insert;
    docid.get()
        .then(function (doc) {
            if (doc.exists) {
                alert("Oops.., UserId is Already Taken..!");
            }
            else {
                $("#spinLoad").css("display", "block");
                auth.createUserWithEmailAndPassword(email, pass).then(function (cred) {
                    console.log(cred.user.uid);
                    insert = userdbref.doc(cred.user.uid).set({
                        fname: fname,
                        lname: lname,
                        mobile: mobile,
                        dob: dob,
                        email: email,
                        pass: pass,
                        repass: repass
                    }).then(function () {
                        $("#spinLoad").css("display", "none");
                        $("#saveAlert").css("display", "block");
                        setTimeout(function () {
                            $("#saveAlert").css("display", "none");
                        }, 3000);

                        document.getElementById('userform').reset();
                        auth.signOut();
                    });

                }).catch(function (error) {
                    $("#spinLoad").css("display", "none");
                    alert(error);
                });

            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

}


function readData() {
    var tuser = document.getElementById('tuser');
    var rowin = 1;
    var rdata = userdbref.onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());

            var useridCell = rowin;
            var fnameCell = doc.data().fname;
            var lnameCell = doc.data().lname;
            var dobCell = doc.data().dob;
            var emailCell = doc.data().email;

            var row = tuser.insertRow(rowin);

            row.insertCell(0).appendChild(document.createTextNode(useridCell));
            row.insertCell(1).appendChild(document.createTextNode(fnameCell));
            row.insertCell(2).appendChild(document.createTextNode(lnameCell));
            row.insertCell(3).appendChild(document.createTextNode(dobCell));
            row.insertCell(4).appendChild(document.createTextNode(emailCell));

            rowin = rowin + 1;
        });
    });

}

//...........read Data End.....................

//..............login User...................
var loginform = document.querySelector('#loginform');
loginform.addEventListener('submit', userLogin);

function userLogin(e) {
    e.preventDefault();

    var logid = document.getElementById('logid').value;
    var logpass = document.getElementById('logpass').value;
    console.log(logid);
    auth.signInWithEmailAndPassword(logid, logpass).then(function (cred) {

        loginform.style.display = 'none';
        loginform.reset();
    }).then(function () {

    }).catch(function (error) {
        document.querySelector('.errorUser').style.display = 'block';
    });

}



//...................Update User.........................................................
//document.querySelector('#viewform').addEventListener('submit', function (e) {
//var user = firebase.auth().currentUser;
document.querySelector('#viewform').addEventListener('submit', updateclick);
function updateclick(e) {
    e.preventDefault();
    user = firebase.auth().currentUser;
    if (user) {
        updateUser(user);
        //console.log('updateclicked');
    }
    else {
        console.log(error);
    }
}
function updateUser(user) {

    var fnameUpdate = document.getElementById('fnameUpdate').value;
    var lnameUpdate = document.getElementById('lnameUpdate').value;
    var mobileUpdate = document.getElementById('mobileUpdate').value;
    var dobUpdate = document.getElementById('dobUpdate').value;
    var emailUpdate = document.getElementById('emailUpdate').value;
    var passUpdate = document.getElementById('passUpdate').value;
    var repassUpdate = document.getElementById('repassUpdate').value;

    if (user) {
        if (passUpdate != repassUpdate) {
            //document.getElementById('repass').style.borderColor = "#f80505";
            alert("password do not match");
        }
        else {
            userdbref.doc(user.uid).set({
                fname: fnameUpdate,
                lname: lnameUpdate,
                mobile: mobileUpdate,
                dob: dobUpdate,
                email: emailUpdate,
            }).then(function () {

                swal({
                    title: "Update Successfully",
                    icon: "success",
                });
            }).catch(function (error) {
                console.log(error);
            });

        }
    }
    else {
        alert("Something went Wrong");
    }
    console.log('updateUser function' + user);

}

//.................Update User End............................................

// logout
var logout = document.querySelector('#logoutId');
logout.addEventListener('click', userLogout);

function userLogout(e) {
    e.preventDefault();
    auth.signOut().then(function () {
        console.log('logout');
        loginform.style.display = 'block';
    });
}





