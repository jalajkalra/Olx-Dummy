const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data,context)=>{
    if(context.auth.token.admin !== true){
        return{error:'Only Admin Can Add Other Admin'}
    }
    return admin.auth().getUserByEmail(data.email).then(user=>{
        return admin.auth().setCustomUserClaims(user.uid,{
            admin:true
        });
    }).then(()=>{
        return{
            message:`success! ${data.email} has been made into admin`
        }
    }).catch(err=>{
        return err;
    });
});
 
