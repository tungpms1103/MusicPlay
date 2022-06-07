var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'Son_Tung';

const audio = $('#audio');
const nameSong = $('.name_music .nameSong');
const singer = $('.name_music .singer');
const thumb_song = $('.cd .music_thumb');
const music_box = $('.music_box');
const progress = $('.progress');
const beatContainer = $('.beatContainer');
const listMusic = $('.list_music');

// console.log(beatContainer);

const btn_play_pause = $('.btn-play');
const btn_back_song = $('.btn-back');
const btn_next = $('.btn-next');
const btn_random = $('.btn-random');
const btn_repeat = $('.btn-repeat');
const btn_volume = $('.btn-volume');
const volume_progress = $('.volume_progress')

// console.log(volume_progress);

const app = {
    currentIndex: 0,
    isPlaying: false,
    isPlayRandom: false,
    isRepeatSong: false,
    isVolumeOff: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name:'Cơn mưa tháng 5',
            singer: 'Bức Tường',
            path:'./Assets/Music/Con-Mua-Thang-5-Buc-Tuong.mp3',
            image:'./Assets/image/CơnMuaThang5.jpg'
        },
        {
            name:'Bông hồng thủy tinh',
            singer:'Bức Tường',
            path:'./Assets/Music/Bong-Hong-Thuy-Tinh-Buc-Tuong.mp3',
            image:'./Assets/image/BongHongThuyTinh.jpg'
        },
        {
            name:'Đi về yêu thương',
            singer: 'Phan Cuong OST',
            path:'./Assets/Music/Di-Ve-Yeu-Thuong-Fanatic-Band.mp3',
            image:'./Assets/image/fan_cuong.jpg'
        },
        {
            name:'Hạnh phúc bắt đầu',
            singer: 'Phan Cuong OST',
            path:'./Assets/Music/Hanh-Phuc-Bat-Dau-Fanatic-Band.mp3',
            image:'./Assets/image/hanhphucbatdau.png'
        },       
        {
            name:'Một nhành mai',
            singer: 'Phan Cuong OST',
            path:'./Assets/Music/Mot-Nhanh-Mai-Fanatic-Band.mp3',
            image:'./Assets/image/motNhanhMai.jpg'
        }
        ,{
            name:'Live Wave',
            singer: 'Ngũ cung',
            path:'./Assets/Music/Live-Wave-Ngu-Cung.mp3',
            image:'./Assets/image/1397189773819_600.jpg'
        },
        {
            name:'Vỡ tan (Break)',
            singer: 'Bụi gió',
            path:'./Assets/Music/Vo-Tan-Break-Bui-Gio.mp3',
            image:'./Assets/image/1468828774209_600.jpg'
        },
        {
            name:'Ký ức ở lại',
            singer: '9th demension',
            path:'./Assets/Music/Ki-Uc-O-Lai-Loved-9th-Dimension.mp3',
            image:'./Assets/image/auniverseof1.jpg'
        },
        {
            name:'Viết tình ca',
            singer: 'Tạ quang thắng',
            path:'./Assets/Music/Viet-Tinh-Ca-Ta-Quang-Thang.mp3',
            image:'./Assets/image/ab67616d0000b2733b1c38085406488468fe226d.jpg'
        },
        {
            name:'chỉ là giấc mơ',
            singer: 'microWave',
            path:'./Assets/Music/Chi-La-Giac-Mo-MicroWave.mp3',
            image:'./Assets/image/chilagiacmo.jpg'
        },
        {
            name:'sẽ không yêu thêm ai',
            singer: 'tạ quang thắng',
            path:'./Assets/Music/SeKhongYeuThemAiCountryRockVersion-TaQuangThang-6102952.mp3',
            image:'./Assets/image/1570000123776_640.jpg'
        },
        {
            name:'mắt đen',
            singer: 'bức tường',
            path:'./Assets/Music/Mat-Den-Buc-Tuong.mp3',
            image:'./Assets/image/maxresdefault.jpg'
        },
        {
            name:'bài ca tuổi trẻ',
            singer: 'JGKiD, Emceel, KraziNoyze, linh cáo',
            path:'./Assets/Music/Bai-Ca-Tuoi-Tre-JGKiD-EmceeL-KraziNoyze-Linh-Cao.mp3',
            image:'./Assets/image/1531124811438_640.jpg'
        },
        {
            name:'magic in the air',
            singer: 'magic system, chawki',
            path:'./Assets/Music/Magic In The Air - Magic System_ Chawki.mp3',
            image:'./Assets/image/magicintheair.jpg'
        },
        {
            name:'the way i still love you',
            singer: 'Reynard Silva',
            path:'./Assets/Music/TheWayIStillLoveYou-ReynardSilva-6014974.mp3',
            image:'./Assets/image/1562221403656_640.jpg'
        },
        {
            name:'stereo hearts',
            singer: 'gym class heroes, dam levine',
            path:'./Assets/Music/Stereo-Hearts-Gym-Class-Heroes-Adam-Levine.mp3',
            image:'./Assets/image/stereoheart.jpg'
        },
        
    ],
    setConfig: function(key,value){
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    // Load config khi load hoac Reset web
    loadConfig: function(){
        
        
       if(!Object.hasOwn(this.config,('isPlayRandom'))){
        this.setConfig('isPlayRandom', false);
       }else{
        this.isPlayRandom = this.config.isPlayRandom
       }   
       btn_random.classList.toggle('color_red',this.isPlayRandom);
        

       if(!Object.hasOwn(this.config,('isRepeatSong'))){
        this.setConfig('isRepeatSong', false);
       }else{
        this.isRepeatSong = this.config.isRepeatSong
       }
        btn_repeat.classList.toggle('color_red',this.isRepeatSong);

        if(!Object.hasOwn(this.config,('isVolumeOff'))){
            this.setConfig('isVolumeOff', false);
        }else{
            this.isVolumeOff = this.config.isVolumeOff
        }
        btn_volume.classList.toggle('volumeBtn',this.isVolumeOff);

        if(!Object.hasOwn(this.config,('timeSongLastTime'))){
            this.setConfig('timeSongLastTime', 1);
        }else{
            audio.currentTime = this.config.timeSongLastTime
        }

        if(!Object.hasOwn(this.config,('songLaterIndex')) || this.config.songLaterIndex === null){
            this.setConfig('songLaterIndex', 0);
        }else{
            this.currentIndex = this.config.songLaterIndex
        }
       
        this.loadCurrentSong();
    },
    // Dinh nghia properties
    defineProperties: function(){
        Object.defineProperty(app,'currentSong', {
            get: function(){
                return this.songs[this.currentIndex];
            }
        })
    },

    // render playlist
    render: function(){
        var htmls = this.songs.map(function(song,index){
            return `
            <div class="song ${index == app.currentIndex ? 'activeSong' : '' }" index-Song="${index}">
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

        listMusic.innerHTML = htmls.join('');

        
    },

    //===== Xu ly tat ca cac Event======
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
             //Xu ly khi scroll CD
         if(cd.offsetWidth == 0){
            beatContainer.classList.add('beat-active');
         }else{
            beatContainer.classList.remove('beat-active');
         }
        }

        //Xử lý quay CD 
        const thumbSongRote = thumb_song.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 10000,
            iterations: Infinity,
        })
        thumbSongRote.pause();


        // Auto play song
        var autoPlaySong = function(){
            _this.isPlaying = true;
            music_box.classList.add('playing');
            audio.play();
            thumbSongRote.play();
        }

        // Play and Pause
        btn_play_pause.onclick = function(){
            if(_this.isPlaying){
                audio.pause();

            }else{              
                audio.play()
            }       
            // Khi play 
            audio.onplay = function(){
                _this.isPlaying = true;
                music_box.classList.add('playing');
                thumbSongRote.play();
                if(_this.isVolumeOff){
                    audio.volume = 0;
                }
            }
            // Bat event Pause
            audio.onpause = function(){
                _this.isPlaying = false;
                music_box.classList.remove('playing');
                thumbSongRote.pause();
            }                    
        }

        // Bat event Update time cua Audio           
        audio.ontimeupdate = function(){
            const percentProgress = Math.floor(audio.currentTime / audio.duration * 100);
            // console.log(percentProgress);
            progress.value = percentProgress;

            _this.setConfig('timeSongLastTime',Math.floor(audio.currentTime));
        }
       
        //Change time khi tua
        progress.onchange = function(e){
            const timeSeeked = e.target.value * audio.duration / 100;
            audio.currentTime = timeSeeked;
            autoPlaySong();
         }

         // Bat Event back song
         btn_back_song.onclick = function(){
             if(_this.isPlayRandom ){
                 _this.playRandomSong();                        
             }else{
                 _this.backSong();                
             }

            //  if(_this.isRepeatSong){
            //      const currentIndexSong = _this.currentIndex;
            //      if(currentIndexSong == _this.songs.length - 1){
            //          _this.currentIndex = 0;
            //      }else{
            //          _this.currentIndex = currentIndexSong + 1;
            //      }
            //      _this.loadCurrentSong();
            //  }
             
             autoPlaySong();
             
            
         }

         // Bat Event next Song
         btn_next.onclick = function(){
            if(_this.isPlayRandom ){
                _this.playRandomSong();              
            }else{
                 _this.nextSong();               
            }
            autoPlaySong();

         }
        
         // On/Off Play Random Song
         btn_random.onclick = function(){
             _this.isPlayRandom = !_this.isPlayRandom;

            if(_this.isRepeatSong){
                _this.isRepeatSong = !_this.isRepeatSong;

                btn_repeat.classList.toggle('color_red',_this.isRepeatSong);

                _this.setConfig('isRepeatSong',_this.isRepeatSong);
            }

            // isPlayRandom true thi them CLass color_red trả về false thì remove class
             btn_random.classList.toggle('color_red',_this.isPlayRandom);

           _this.setConfig('isPlayRandom',_this.isPlayRandom);

         }
        
         // On//Off repeat Song
         btn_repeat.onclick = function(){
            _this.isRepeatSong = !_this.isRepeatSong;

            // isRepeatSong true thi them CLass color_red trả về false thì remove class
            btn_repeat.classList.toggle('color_red',_this.isRepeatSong);

            //set Config
           _this.setConfig('isRepeatSong',_this.isRepeatSong);

            if(_this.isPlayRandom){

            _this.isPlayRandom = false;
            _this.setConfig('isPlayRandom',false);

            btn_random.classList.toggle('color_red',_this.isPlayRandom);
            }
         }

         // Next khi het bai 
        audio.onended = function(){
            if(_this.isRepeatSong){
                audio.play();
            }else{
                btn_next.click();                
            }
        }

         // Render lai khi load data 1 bai nao do
         audio.onloadeddata = function(){
            _this.render();
            _this.scrollToActiveSong();

            _this.setConfig('songLaterIndex',_this.currentIndex);
         }


         //Xử lý event Volume On/Off
         btn_volume.onclick = function(){
             _this.isVolumeOff = ! _this.isVolumeOff;
             
             // Trả về True thì add False thì Remove class
             btn_volume.classList.toggle('volumeBtn',_this.isVolumeOff);

            //set Config
            _this.setConfig('isVolumeOff',_this.isVolumeOff);
            
             if(_this.isVolumeOff){
                 audio.volume = 0;
             }else{
                 const valueVolumeCurrent = volume_progress.value;
                 audio.volume = valueVolumeCurrent;
             }
         }
         // Xu ly volume range
        //  + Set volume cho audio theo gia tri default tren range
         const volumeDefaut = volume_progress.value;
         audio.volume = volumeDefaut;

         volume_progress.oninput = function(e){
             const valueRange = e.target.value;
             audio.volume = valueRange;
             _this.isVolumeOff = false;
             btn_volume.classList.remove('volumeBtn');
         }

        // Xu ly khi click Playlist

        listMusic.onclick = function(e){
        const songClicked =  e.target.closest('.song:not(.activeSong)')

        if(songClicked){
            const indexSong = songClicked.getAttribute('index-Song');

            _this.currentIndex = indexSong;
            _this.loadCurrentSong();
            autoPlaySong();
        }
       
            
        }

    },
    // ====Load bai hat =======
    loadCurrentSong: function(){
        nameSong.textContent = this.currentSong.name;
        singer.textContent = this.currentSong.singer;
        thumb_song.style.backgroundImage = `url(${this.currentSong.image})`;   
        audio.src = this.currentSong.path;   
    },
    //==== Next bai hat tiep theo======
    nextSong: function(){
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    //===== Lui ve 1 bai=====
    backSong: function(){
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    // =====Random Index song=====
    playRandomSong: function(){
        let newIndex;
        do{
            newIndex = Math.floor(Math.random() * this.songs.length);
        }while(newIndex === this.currentIndex)  
        
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    // ==== Scroll den song dang active=== 
    scrollToActiveSong: function(){
        const songActive = $('.song.activeSong');
        setTimeout(function(){
            songActive.scrollIntoView({
                behavior: 'smooth',
                block: 'center',              
            })
        },500)
    },

    //======= Chay app ==========
    start: function(){
        // Định nghĩa các Properties
        this.defineProperties();
       
        // Render playlist
        this.render();

        // Load config
        this.loadConfig();

        //Tải bài hát đầu tiên lên UI khi chạy App
        this.loadCurrentSong();

        // Xử lý các DOM Event
        this.handleEvent();

     
    }

}

app.start();