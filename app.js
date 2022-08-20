var music = new Audio("songs/9.mp3");

function hapusDiv(id){
    var element = document.getElementById(id);
    console.log(id);
    // element.remove();
    element.classlist.remove("kotak-lagu");
}

function playAudio() { 
    music.play(); 
  } 
  
  function pauseAudio() { 
    x.pause(); 
  } 
const songs = [
    {
        id:'1',
        judul:`Bagimu Negri <br>
        <div class="subtittle">Kusbini</div>`,
        poster:"img/1.png"
    },
    {
        id:'2',
        judul:`Garuda Pancasila <br>
        <div class="subtittle">Prohar Sudharnoto</div>`,
        poster:"img/2.png"
    },
    {
        id:'3',
        judul:`Halo Halo Bandung <br>
        <div class="subtittle">Ismail Marzuki</div>`,
        poster:"img/3.png"
    },
    {
        id:'4',
        judul:`Hari Merdeka <br>
        <div class="subtittle">Mutahar</div>`,
        poster:"img/4.png"
    },
    {
        id:'5',
        judul:`Indonesia Pusaka<br><div class="subtittle">Ismail Marzuki</div>`,
        poster:"img/5.png"
    },
    {
        id:'6',
        judul:`Indonesia Jaya <br>
        <div class="subtittle"> Chaken M</div>`,
        poster:"img/6.png"
    },
    {
        id:'7',
        judul:`Kulihat Ibu Pertiwi <br>
        <div class="subtittle">Charles C</div>`,
        poster:"img/7.png"
    },
    {
        id:'8',
        judul:`Nyiur Hijau <br>
        <div class="subtittle">Maladi</div>`,
        poster:"img/8.png"
    },
    {
        id:'9',
        judul:`Mengheningkan Cipta<br><div class="subtittle">T.Prawit</div>`,
        poster:"img/9.png"
    },
    {
        id:'10',
        judul:`Indonesia Raya <br> <div class="subtittle">WR.Supratman</div>`,
        poster:"img/1.png"
    },
];

Array.from(document.getElementsByClassName("song-item")).forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].judul;
    })

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName("wave")[0];
masterPlay.addEventListener('click', ()=>{
    if (music.pasued || music.currentTime <= 0){
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2')
    }else {
        music.pause();
        masterPlay.classList.remove('bi-pause-fill');
        masterPlay.classList.add('bi-play-fill');
        wave.classList.remove('active2')
    }
})

let makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('playlistPlay')).forEach((element)=>{
        element.classList.add('bi-play-circle-fill')
        element.classList.remove('bi-pause-circle-fill')
    })
}

let makeAllBackgrounds = () =>{
    Array.from(document.getElementsByClassName('song-item')).forEach((element)=>{
        element.style.background = "rgb(105, 105, 170, 0)";
    })
}

let index = 0;

let poster_master_play = document.getElementById("poster_master_play"); 
let title = document.getElementById("title"); 

Array.from(document.getElementsByClassName('playlistPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill')
        e.target.classList.add('bi-pause-circle-fill')
        music.src = `songs/${index}.mp3`;
        poster_master_play.src = `img/${index}.png`
        music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })

        song_title.forEach(ele=>{
            let {judul} = ele;
            title.innerHTML = judul;
        })
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2')
        music.addEventListener('ended', ()=>{
            masterPlay.classList.remove('bi-pause-fill');
            masterPlay.classList.add('bi-play-fill');
            wave.classList.remove('active2');

        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('song-item'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
    })
})

let currentStart = document.getElementById("current-start");
let currentEnd = document.getElementById("current-end");
let seek = document.getElementById("seek");
let bar2 = document.getElementById("bar2");
let dot = document.getElementsByClassName("dot")[0];


music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_duration = music.duration;

    let min = Math.floor(music_duration/60);
    let sec = Math.floor(music_duration%60);
    if(sec < 10){
        sec = `0${sec}`;
    }

    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if(sec1 < 10){
        sec1 = `0${sec1}`;
    }

    currentStart.innerText = `${min1}:${sec1}`;

    let progresBar = parseInt((music.currentTime/music.duration)*100);
    seek.value  = progresBar;
    let seekBar = seek.value;
    bar2.style.width = `${seekBar}%`;
    dot.style.left = `${seekBar}%`;

})

