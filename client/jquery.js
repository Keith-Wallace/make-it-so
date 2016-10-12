$(document).ready( function() {
    console.log("test");

    var obj = document.createElement("audio");
    console.log('OBJECT', obj);
    obj.src = "http://www.wavlist.com/soundfx/010/crow-1.wav";
    obj.volume = 0.10;
    obj.autoPlay = false;
    obj.preLoad = true;       

    $("#makeitso-button").on("click",function() {
        console.log('clicked')
        obj.play();
    });

    // $("").on("click", function () {
    //   console.log('FLY PELICAN!')
    //   $(this).css("background-color","yellow");
    // })

    // $( "#makeitso-button" ).on( "click", function() {
    //   console.log('CLICKED');
    // });
});
