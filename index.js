

var editSection = document.querySelector('#viewUser');

function setUi(user) {
    if (user) {
        loginform.style.display = 'none';
        document.getElementById('userDeleteDiv').style.display = 'block';
        document.querySelector('.errorUser').style.display = 'none';

        userdbref.doc(user.uid).onSnapshot(function (doc) {
            var fnamehtml = doc.data().fname;
            var lnamehtml = doc.data().lname;
            document.querySelector('.card-title').innerHTML = fnamehtml + " " + lnamehtml;
        });
    }
    else {
        console.log("not loggin");
        loginform.style.display = 'block';
        document.getElementById('userDeleteDiv').style.display = 'none';
    }
}


function setUpdateUi(user) {
    if (user) {
        document.getElementById('loginNote').style.display = 'none';
        document.getElementById('viewform').style.display = 'block';
        userdbref.doc(user.uid).onSnapshot(function (doc) {
            var userid = doc.id;
            var fnamehtml = doc.data().fname;
            var lnamehtml = doc.data().lname;
            var mobilehtml = doc.data().mobile;
            var dobhtml = doc.data().dob;
            var emailhtml = doc.data().email;
            var passhtml = doc.data().pass;
            var repasshtml = doc.data().repass;
            // document.querySelector('.card-title').innerHTML = fnamehtml + " " + lnamehtml;

            document.getElementById('fnameUpdate').value = fnamehtml;
            document.getElementById('lnameUpdate').value = lnamehtml;
            document.getElementById('mobileUpdate').value = mobilehtml;
            document.getElementById('dobUpdate').value = dobhtml;
            document.getElementById('emailUpdate').value = emailhtml;
            document.getElementById('passUpdate').value = passhtml;
            document.getElementById('repassUpdate').value = repasshtml;

        });


    }
    else {
        document.getElementById('loginNote').style.display = 'block';
        document.getElementById('viewform').style.display = 'none';
    }
}