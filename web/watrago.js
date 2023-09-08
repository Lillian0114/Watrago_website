// JavaScript Document
var firebaseConfig = {
    apiKey: "xxxxxxxxxxx",
    authDomain: "watragoweb.firebaseapp.com",
    databaseURL: "https://watragoweb.firebaseio.com",
    projectId: "watragoweb",
    storageBucket: "xxxxxxx",
    messagingSenderId: "xxxxxxx",
    appId: "xxxxxxxx",
    measurementId: "xxxxxxxxx"
};
firebase.initializeApp(firebaseConfig);
//以上是綁定db的code

const db = firebase.firestore();
var img_data = [];
var count = 0;

function compare() {
    for (var j = 0; j < like_list.length; j++) {
        console.log(like_list[j]);
        var search_db = db.collection("Attraction").doc(like_list[j]);
        search_db.get().then(function (doc) {
            console.log("我有抓到景點歐~" + doc.data().AttractionName);
            img_data.push({
                "spotid": count++,
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
                "open3s": doc.data().OpenWedS
            });
            console.log(img_data[0].src);
        });
        //		console.log(img_data[0].src);
    }
}

//spot information

var vm = new Vue({
    el: "#app",
    data: {
        spotdata: img_data
    },
    methods: {
        // 用 Vue methods 寫的話，會在 click 該元素之後呼叫 getEleNumber
        clickMe: getEleNumber
    }
});

$(".close_spotdata").click(function () {
    $(".spotdata").removeClass("showdata")
    $(".spotdata").css("font-size", "0")
    $(".close_spotdata").css({ "width": "0", "height": "0", "display": "none" })
})
function getEleNumber(evt) {
    $(".close_spotdata").css("display", "inline-block")
    $(".close_spotdata").text("x")
    $(".spotdata").css("font-size", "14px")
    $(".close_spotdata").css("width", "30px")
    $(".close_spotdata").css("height", "30px")
    console.log(evt)
    var number = evt.target.attributes.id.value
    // console.log(typeof(number))
    // console.log(number)
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
}



//catch user name
window.addEventListener("load", function (event) {
    getUserName();
});


var like_list = [];
var name;
function getUserName() {
    var docRef = db.collection("user").doc("MqiXBeBw2oMiy4uBrpx3");
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
            //		console.log(like_list);
            compare();

        } else {
            console.log("找不到文件");
        }
    })
        .catch(function (error) {
            console.log("提取文件時出錯:", error);
        });

}
