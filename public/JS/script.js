var socket = io();

var $window = $(window);
var $usernameInput = $('.usernameInput');
var $inputMessage = $('#m');

var $pages = $('.pages');

var username;

function cleanInput(input) {
    return $('<div/>').text(input).text();
}

function setUsername() {
    username = cleanInput($usernameInput.val().trim());

    if (username) {
        $pages.fadeOut();
        $pages.off('click');
        $('#container').show();
        $inputMessage.focus();
    }

    console.log(socket.id);

    socket.emit('chat message', { val: username + ' joined chat', id: socket.id });
}

$window.keydown(function(event) {
    if (event.which === 13) {
        if (!username) {
            setUsername();

            event.preventDefault();
        }
    }
});

$('form').submit(function() {
    console.log(socket.id);

    if ($inputMessage.val() != '') {
        socket.emit('chat message', { val: username + ': ' + $inputMessage.val(), id: socket.id });
        $inputMessage.val('');
    }

    return false;
});

socket.on('chat message', function(msg) {
    console.log(msg.id == socket.id);

    if (msg.id == socket.id) {
        $('#messages').append($('<li id="self">').text(msg.val));
    }
    
    else {
        $('#messages').append($('<li>').text(msg.val));
    }

    $('body').scrollTop($('ul li').last().position().top + $('ul li').last().height());
});