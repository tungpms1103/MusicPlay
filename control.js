var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

const audio = $('#audio');
const nameSong = $('.name_music .nameSong');
const singer = $('.name_music .singer');
const thumb_song = $('.cd .music_thumb');
const music_box = $('.music_box');

const btn_play_pause = $('.btn-play');

console.log(nameSong, singer, thumb_song,btn_play_pause)

const app = {
    currentIndex: 0,
    isPlaying: false,
    songs: [
        {
            name:'Cơn mưa tháng 5',
            singer: 'Bức Tường',
            path:'./Assets/Music/Con-Mua-Thang-5-Buc-Tuong.mp3',
            image:'./Assets/image/CơnMuaThang5.jpg'
        },
        {
            name:'Bong hong thuy tinh',
            singer:'Bức Tường',
            path:'./Assets/Music/Bong-Hong-Thuy-Tinh-Buc-Tuong.mp3',
            image:'./Assets/image/BongHongThuyTinh.jpg'
        },
        {
            name:'Di ve yeu thuong',
            singer: 'Phan Cuong OST',
            path:'./Assets/Music/Di-Ve-Yeu-Thuong-Fanatic-Band.mp3',
            image:'./Assets/image/fan_cuong.jpg'
        },
        {
            name:'Hanh Phuc Bat Dau',
            singer: 'Phan Cuong OST',
            path:'./Assets/Music/Hanh-Phuc-Bat-Dau-Fanatic-Band.mp3',
            image:'./Assets/image/hanhphucbatdau.png'
        },       
        {
            name:'Mot Nhanh Mai',
            singer: 'Thai Hoa',
            path:'./Assets/Music/Mot-Nhanh-Mai-Fanatic-Band.mp3',
            image:'./Assets/image/motNhanhMai.jpg'
        }
        ,{
            name:'Di ve yeu thuong',
            singer: 'Phan Cuong OST',
            path:'./Assets/Music/Di-Ve-Yeu-Thuong-Fanatic-Band.mp3',
            image:'./Assets/image/fan_cuong.jpg'
        },
        {
            name:'Hanh Phuc Bat Dau',
            singer: 'Phan Cuong OST',
            path:'./Assets/Music/Hanh-Phuc-Bat-Dau-Fanatic-Band.mp3',
            image:'./Assets/image/hanhphucbatdau.png'
        },       
        {
            name:'Mot Nhanh Mai',
            singer: 'Thai Hoa',
            path:'./Assets/Music/Mot-Nhanh-Mai-Fanatic-Band.mp3',
            image:'./Assets/image/motNhanhMai.jpg'
        }
    ],
    defineProperties: function(){
        Object.defineProperty(app,'currentSong', {
            get: function(){
                return this.songs[this.currentIndex];
            }
        })
    },
    render: function(){
        var htmls = this.songs.map(function(song){
            return `
            <div class="song">
                <div class="image_song"
                    style=" background-image: url(${song.image}); background-size: cover;background-repeat: no-repeat;">
                </div>
                <div class="info_song">
                    <h1>${song.name}</h1>
                    <p class="singer">${song.singer}</p>
                </div>
            </div>
            `
        });

        const listMusic = $('.list_music');
        listMusic.innerHTML = htmls.join('');

        
    },

    loadCurrentSong: function(){
        nameSong.textContent = this.currentSong.name;
        singer.textContent = this.currentSong.singer;
        thumb_song.style.backgroundImage = `url(${this.currentSong.image})`;   
        audio.src = this.currentSong.path;   
    },

    handleEvent: function(){
        const _this = this;
        // Xử lý Zoom in zoom out Header
        const cd = $('.cd');
        const cdWidth = cd.offsetWidth;
        document.onscroll = function(){
           const scrollTop =window.scrollY || document.documentElement.scrollTop;
            const newWidth = cdWidth - scrollTop;
            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0;
            cd.style.opacity = newWidth/cdWidth;
        }

        // Play and Pause

        btn_play_pause.onclick = function(){
            if(_this.isPlaying){
                audio.pause();
            }else{              
                audio.play()
            }
           
            audio.onplay = function(){
                _this.isPlaying = true;
                music_box.classList.add('playing');
            }
            audio.onpause = function(){
                _this.isPlaying = false;
                music_box.classList.remove('playing');
            }
        }
    },
  

    start: function(){
        // Định nghĩa các Properties
        this.defineProperties();
       
        // Render playlist
        this.render();

        //Tải bài hát đầu tiên lên UI khi chạy App
        this.loadCurrentSong();

        // Xử lý các DOM Event
        this.handleEvent();

        // audio.play();
    }

}

app.start();