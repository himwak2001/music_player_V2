let main_container = document.getElementById("first");
let music_container = document.getElementsByClassName("song-item");
let song_image = document.getElementsByClassName("image-song");
let song_title = document.getElementsByClassName("song-title");
let song_artist = document.getElementsByClassName("song-artist");
let play_image = document.getElementById("play-image");
let play_title = document.getElementById("play-title");
let play_artist = document.getElementById("play-artist");
const music = document.querySelector(".audio");
let play = document.querySelector(".play");
let play_btn = document.getElementById("play-btn");
let previous = document.getElementById("previous-btn");
let next = document.getElementById("next-btn");
let song_duration = document.getElementById("duration");
let song_currentTime = document.getElementById("current-time");
let progress_bar = document.getElementById("progress-bar");
let progress_div = document.getElementById("progress-div");
let searchBar = document.getElementById("search-song");
let city_name = document.getElementById("city-name");
let location_name = document.getElementById("location-name");
let temperature = document.getElementById("temperature");
let pressure = document.getElementById("pressure");
let humidity = document.getElementById("humid");
let wind_speed = document.getElementById("wind_speed");
let description = document.getElementById("description");
let weather_icon = document.getElementById("icon-weather");
let isPlaying = false;
currentSongIndex = 0;

const songs = [{
	name: "dheere_dheere_se",
	title: "Dheere Dheere Se Meri Zindagi Mein Aana",
	artist: "Kumar Sanu",
	image: "dheere_dheere_se"
},
{
	name: "mera_dil_bhi_kitna_pagal_hai",
	title: "Mera Dil Bhi Kitna Pagal Hai",
	artist: "Alka Yagnik | Kumar Sanu",
	image: "mera_dil_bhi_kitna_pagal_hai"
},
{
	name: "saaton_janam_main_tere",
	title: "Saaton Janam Main Tere",
	artist: "Alka Yagnik | Kumar Sanu",
	image: "saaton_janam_main_tere"
},
{
	name: "dil_ne_yeh_kaha_hai_dil_se",
	title: "Dil ne yeh kaha hain dil se",
	artist: "Alka Yagnik | Kumar Sanu | Sonu Nigam",
	image: "dil_ne_yeh_kaha_hai_dil_se"
},
{
	name: "hum_yaar_hai_tumhare",
	title: "Hum Yaar Hai Tumhare",
	artist: "Alka Yagnik | Udit Narayan",
	image: "hum_yaar_hai_tumhare"
},
{
	name: "jaa_sajna_tujhko_bhula_diya",
	title: "Jaa Sajna Tujhko Bhula",
	artist: "Alka Yagnik | Udit Narayan",
	image: "jaa_sajna_tujhko_bhula_diya"
},
{
	name: "kisi_din_banugi",
	title: "Kisi Din Banoongi Main Raja",
	artist: "Alka Yagnik | Udit Narayan | Nadeem–Shravan",
	image: "kisi_din_banugi"
},
{
	name: "meri_mahbooba",
	title: "Meri Mehbooba",
	artist: "Alka Yagnik | Kumar Sanu",
	image: "meri_mahbooba"
},
{
	name: "pehli_pehli_baar_mohabaat",
	title: "Pehli Pehli Baar Mohabbat Ki Hai",
	artist: "Alka Yagnik | Kumar Sanu",
	image: "pehli_pehli_baar_mohabaat"
},
{
	name: "taaron_ka_chamkta_chera",
	title: "Taaron Ka Chamakta",
	artist: "Bali Brahmbhatt | Udit Narayan",
	image: "taaron_ka_chamkta_chera"
}];

for (let i = 0; i < songs.length - 1; i++) {
	main_container.insertAdjacentHTML("beforeend", music_container[0].outerHTML);
}

for (let i = 0; i < songs.length; i++) {
	song_image[i].src = songs[i].image + ".jpg";
	song_title[i].textContent = songs[i].title;
	song_artist[i].textContent = songs[i].artist;
}

const loadSongs = (song) => {
	music.src = song.name + ".mp3";
	play_image.src = song.image + ".jpg";
	play_title.textContent = song.title;
	play_artist.textContent = song.artist;
}

for (let i = 0; i < music_container.length; i++) {
	music_container[i].addEventListener('click', () => {
		loadSongs(songs[i]);
		currentSongIndex = i;
		playMusic();
	})
}

const playMusic = () => {
	isPlaying = true;
	play_btn.name = "pause";
	music.play();
}

const pauseMusic = () => {
	isPlaying = false;
	play_btn.name = "play";
	music.pause();
}

play.addEventListener('click', () => {
	isPlaying ? pauseMusic() : playMusic();
})

previous.addEventListener('click', () => {
	currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
	loadSongs(songs[currentSongIndex]);
})

next.addEventListener('click', () => {
	currentSongIndex = (currentSongIndex + 1) % songs.length;
	loadSongs(songs[currentSongIndex]);
})

// ======================================CURRENT TIME, DURATION AND PROGRESS BAR=================================
music.addEventListener('timeupdate', (event) => {
	const { currentTime, duration } = event.srcElement;
	let progress_limit = (currentTime / duration) * 100;
	progress_bar.style.width = `${progress_limit}%`;

	// Music duration update
	let duration_min = Math.floor(duration / 60);
	let duration_sec = Math.floor(duration % 60);
	let total_duration = `${duration_min}:${duration_sec}`;
	if (duration) {
		song_duration.textContent = total_duration;
	}

	// Current duration update
	let currentTime_min = Math.floor(currentTime / 60);
	let currentTime_sec = Math.floor(currentTime % 60);
	if (currentTime_sec < 10) {
		currentTime_sec = `0${currentTime_sec}`;
	}
	let totalCurrentTime = `${currentTime_min}:${currentTime_sec}`;
	song_currentTime.textContent = totalCurrentTime;
})

// ==========================================SEARCH BAR===========================================
const searchSongs = () => {
	let filter = searchBar.value.toUpperCase();
	for (let i = 0; i < music_container.length; i++) {
		let name = song_title[i];
		if (name) {
			let textValue = name.textContent || name.innerHTML;
			if (textValue.toUpperCase().search(filter) > -1) {
				music_container[i].style.display = "";
			} else {
				music_container[i].style.display = "none";
			}
		}
	}
}

// ============================================SEARCH WEATHER=============================================
const searchWeather = () => {
	let city = city_name.value;
	let weather = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1777dcd72d071c06819b23f1493c2f5c&units=metric`);
	weather.then((response) => {
		return response.json();
	}).then((value) => {
		location_name.textContent = value.name;
		temperature.textContent = Math.floor(value.main.temp);
		pressure.textContent = value.main.pressure;
		humidity.textContent = value.main.humidity;
		wind_speed.textContent = value.wind.speed;
		description.textContent = value.weather[0].description;
		weather_icon.src = "http://openweathermap.org/img/wn/" + value.weather[0].icon + "@2x.png";
	})
}