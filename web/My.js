// JavaScript Document
var firebaseConfig = {
    apiKey: "xxxxxxxxxxxxxxxxxxxc",
    authDomain: "watragoweb.firebaseapp.com",
    databaseURL: "https://watragoweb.firebaseio.com",
    projectId: "watragoweb",
    storageBucket: "watragoweb.appspot.com",
    messagingSenderId: "427624837625",
    appId: "xxxxxxxxxxx8",
    measurementId: "Gxxxxxxxxxx"
};
firebase.initializeApp(firebaseConfig);
//以上是綁定db的code

const db = firebase.firestore();
var img_data = [];
var count = 0;
var like_temp_count = 0;

function compare(userid) {
    count = 0;
    like_temp_count = 0;
    for (var j = 0; j < like_list.length; j++) {
        var search_db = db.collection("Attraction").doc(like_list[j]);
        search_db.get().then(function (doc) {
            var docRef = db.collection("user").doc(userid);
            docRef.get().then(function (fun_doc) {
                like_list = fun_doc.data().Collection;
                console.log(doc.id);
                if (like_list.includes(doc.id)) {
                    var tempppp = document.getElementById("btn_" + like_temp_count);
                    tempppp.children[0].style.color = "red";
                }
                like_temp_count++;
            });
            img_data.push({
                "spotid": count,
                "btn_id": "btn_" + count++,
                "db_id": doc.id,
                "name": doc.data().AttractionName,
                "src": doc.data().PhotoUrl,
                "add": doc.data().Address,
                "tel": doc.data().TEL,
                "open5s": doc.data().OpenFriS,
                "open5c": doc.data().OpenFriC,
                "open1c": doc.data().OpenMonC,
                "open1s": doc.data().OpenMonS,
                "open6c": doc.data().OpenSatC,
                "open6s": doc.data().OpenSatS,
                "open7c": doc.data().OpenSunC,
                "open7s": doc.data().OpenSunS,
                "open4c": doc.data().OpenThuC,
                "open4s": doc.data().OpenThuS,
                "open2c": doc.data().OpenTueC,
                "open2s": doc.data().OpenTueS,
                "open3c": doc.data().OpenWedC,
                "open3s": doc.data().OpenWedS,
                "latitude": parseFloat(doc.data().latitude),
                "longitude": parseFloat(doc.data().longitude)
            });
        });
    }
}

function getEleNumber(evt) {
    $(".close_spotdata").css("display", "inline-block")
    $(".close_spotdata").text("x")
    $(".spotdata").css("font-size", "14px")
    $(".close_spotdata").css("width", "30px")
    $(".close_spotdata").css("height", "30px")
    var number = evt.target.attributes.id.value
    $(".spotdata").addClass("showdata")
    $(".name").text(img_data[number].name)
    $(".address").text(img_data[number].add)
    $(".tel").text(img_data[number].tel)
    $(".opentime1").text("(一) " + img_data[number].open1s + "-" + img_data[number].open1c)
    $(".opentime2").text("(二) " + img_data[number].open2s + "-" + img_data[number].open2c)
    $(".opentime3").text("(三) " + img_data[number].open3s + "-" + img_data[number].open3c)
    $(".opentime4").text("(四) " + img_data[number].open4s + "-" + img_data[number].open4c)
    $(".opentime5").text("(五) " + img_data[number].open5s + "-" + img_data[number].open5c)
    $(".opentime6").text("(六) " + img_data[number].open6s + "-" + img_data[number].open6c)
    $(".opentime7").text("(日) " + img_data[number].open7s + "-" + img_data[number].open7c)
    $("body").css("overflow-y", "hidden")
    $(".waterfall_area").css("opacity", "0.5")
    //---maps---
    initMap(img_data[number].latitude, img_data[number].longitude, img_data[number].name)
    //---maps---

} //fun getEleNumber

//-----這邊是使用者按愛心的程式碼，recommand也要記得加進去----------green----------
function like(evt) {
    //lillian 改
    var tempppp;
    var number = evt.target.id;
    number = number.toString().substr(4);
    // console.log(number);
    var docRef = db.collection("user").doc("MqiXBeBw2oMiy4uBrpx3");
    docRef.get().then(function (doc) {
        like_list = doc.data().Collection;
        if (like_list.includes(img_data[number].db_id)) {
            // console.log("remove");
            db.collection("user").doc("MqiXBeBw2oMiy4uBrpx3").update({
                Collection: firebase.firestore.FieldValue.arrayRemove(img_data[number].db_id)
            });
            // img_data.splice(index, img_data[number]);
            tempppp = document.getElementById("btn_" + number);
            tempppp.children[0].style.color = "#333";
        } else {
            // console.log("add");
            db.collection("user").doc("MqiXBeBw2oMiy4uBrpx3").update({
                Collection: firebase.firestore.FieldValue.arrayUnion(img_data[number].db_id)
            });
            tempppp = document.getElementById("btn_" + number);
            tempppp.children[0].style.color = "red";
        }
        like_list = doc.data().Collection;
    });
}//fun like
//lillian改完
//-----這邊是使用者按愛心的程式碼，recommand也要記得加進去 end----------green----------


var vm = new Vue({
    el: "#app",
    data: {
        spotdata: img_data
    },
    methods: {
        clickLike: like,
        // 用 Vue methods 寫的話，會在 click 該元素之後呼叫 getEleNumber
        clickMe: getEleNumber
        //-----這邊是使用者按愛心的程式碼，recommand也要記得加進去----------green----------

    }
});


$(".close_spotdata").click(function () {
    $(".spotdata").removeClass("showdata")
    $(".spotdata").css("font-size", "0")
    $(".close_spotdata").css({ "width": "0", "height": "0", "display": "none" })
    //--點開景點資訊之後不能滑動後面，
    $("body").css("overflow-y", "scroll")
    $(".waterfall_area").css("opacity", "1")
    //--這裡是 點開景點資訊之後不能滑動後面end
})

//-----地圖，recommand也要記得加進去--------------green------------
var map;
function initMap(latitude, longitude, name) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 12
    });
    var marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: name
    });
}
//-----地圖，recommand也要記得加進去 end--------------green------------

//catch user name
window.addEventListener("load", function (event) {
    getUserName();
});


//-----地圖，recommand也要記得加進去--------------green------------
var map;
function initMap(latitude, longitude, name) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 12
    });
    var marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: name
    });
}
//-----地圖，recommand也要記得加進去 end--------------green------------

var like_list = [];
var name;

function getUserName() {
    var user_email = "";
    user_email = "MqiXBeBw2oMiy4uBrpx3"; //這之後要改成抓db喔~~~
    var docRef = db.collection("user").doc(user_email);
    docRef.get().then(function (doc) {
        name = doc.data().UserName;
        like_list = doc.data().Collection;
        if (doc.exists) {
            console.log("user get!");
            name = doc.data().UserName;
            like_list = doc.data().Collection;

            var vm = new Vue({
                el: '#user',
                data: {
                    user_name: name
                }
            })//vm

            compare(user_email);

        } else {
            console.log("找不到文件");
        }
    })
        .catch(function (error) {
            console.log("提取文件時出錯:", error);
        });

}
