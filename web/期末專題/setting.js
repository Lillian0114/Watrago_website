var firebaseConfig = {
    apiKey: "xxxxxxxxxx",
    authDomain: "watragoweb.firebaseapp.com",
    databaseURL: "https://watragoweb.firebaseio.com",
    projectId: "watragoweb",
    storageBucket: "watragoweb.appspot.com",
    messagingSenderId: "xxxxxxx",
    appId: "1xxxxxxxxxxx",
    measurementId: "xxxxxxxxx2"
  };
firebase.initializeApp(firebaseConfig);
  //以上是綁定db的code
const db = firebase.firestore();

//以下是顯示user資訊的code
$(document).ready(function(){
    db.collection("user").doc("user").get().then(function(doc){
        if (doc.exists) {
            $("#username").attr("placeholder",doc.data().user_name)
            $("#useremail").attr("placeholder",doc.data().user_mail)
            $("#customRange3").attr("value",doc.data().SpotPrefer)
            if(doc.data().DurationPrefer==true){
                // $("#customRadio1").val()==true
                $("#customRadio1").attr("checked","true")
            }else{
                $("#customRadio2").attr("checked","true")
            }

          } else {
            console.log("找不到文件");
          }



    })
    $("#username").attr("placeholder",$("#username").val())
    $("#useremail").attr("placeholder",$("#useremail").val())


})
//以上是顯示user資訊的code

//以下是個人資料編輯的code/////////////////
$(".edit").click(function(){
    $(".confirm").css("display","inline-block")
    $("fieldset").attr("disabled",false)
 
  })
$(".confirm").click(function(){
    if($("#username").val()!=""&& $("#useremail").val()!=""){
        $(".confirm").css("display","none")
            $("fieldset").attr("disabled",true)
            db.collection("user").doc("user").update({
                user_name: $("#username").val(),
                user_mail: $("#useremail").val()
            });
            $("#username").attr("placeholder",$("#username").val())
            $("#useremail").attr("placeholder",$("#useremail").val())
    }
    
})

$("#customRadio1").click(function(){
    db.collection("user").doc("user").update({
        DurationPrefer: true
        // SpotPrefer: $("#useremail").val()
    });


})

$("#customRadio2").click(function(){
    db.collection("user").doc("user").update({
        DurationPrefer: false
    });
})
$("#customRange3").click(function(){
    db.collection("user").doc("user").update({
        SpotPrefer: $("#customRange3").val()
    });
})
  
  
  //以上是個人資料編輯的code/////////////////
