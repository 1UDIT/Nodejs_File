const io = require('socket.io')({
    cors: {
        origin: ['http://localhost:3000']
    }
});

let time = 20;
let Sec = 10;
let countdown = setInterval(update, 100); 
let test; 
 
function update() {
    // let min = Math.floor(time / 60);
    // let sec = time % 60;

    if (time == 0) {
        Sec = (Sec < 10) ? ("0" + Sec) : Sec;
        test = Sec + ":" + time;
        // console.log(`test${time}`);
        Sec--
        time = 20;
    } else if (Sec == 4) {
        // console.log(`test${time}`);
        Sec = 10
    } else {
        Sec = String(Sec).padStart(2, '0')
        time = String(time).padStart(2, '0')
        // console.log(`${time}`);
        test = "00:"+Sec + ":" + time;
        time--;
    }
} 





var body = {
    'up': test
};

io.on('connection', socket => {
    console.log(`connect: ${socket.id}`);

    socket.on('hello!', () => {
        console.log(`hello from ${socket.id}`);
    });

    socket.on('disconnect', () => {
        console.log(`disconnect: ${socket.id}`);
    });
});

io.listen(8888);

setInterval(() => {
    // console.log('message', { up: test});
    io.emit('message', { up: test });
}, 1);