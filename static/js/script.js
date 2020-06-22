$(function(){
    var selection = $('.selection')
    var equation = $('.equation')
    var steps = $('.steps')
    //connect to the socket server.
    const socket = io.connect('http://' + document.location.host + '/');

    //send details from server
    $('form').submit(function(e){
        e.preventDefault(); //prevents page reloading
        socket.emit('equation', equation.val());
        //receive details from server
        socket.on('result', function(info) {
            console.log(info)
            steps.text(info);
        });
    });
});
