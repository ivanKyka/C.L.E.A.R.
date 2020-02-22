import {observable, action} from "mobx";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";
import {getAllMediadata} from "../api/MediaData";
import uniqid from 'uniqid';

export default class PlayerStore {

    @observable wavesurfer = {};
    @observable isReady = true;
    @observable isPlaying = false;
    @observable volume = 0.5;
    @observable currentTime = 0;
    @observable isMute = false;
    @observable files = [];
    @observable currentTrack = undefined;
    @observable isTrackLoading = false;
    @observable labels = [];
    @observable currentRegion = '';
    @observable isMetadataOpen = false;

    constructor() {
        this.play = this.play.bind(this);
        this.initializeService = this.initializeService.bind(this);
        this.on = this.on.bind(this);
        this.load = this.load.bind(this);
        this.stop = this.stop.bind(this);
    }

    initializeService (){
        this.wavesurfer = WaveSurfer.create({
            container: '#waveform',
            waveColor: '#787c72',
            progressColor: '#1d316f',
            height: 200,
            // barWidth: 2,
            // barRadius: 2,
            cursorWidth: 1,
            barGap: 2,
            responsive: true,
            normalize: true,
            plugins: [
                RegionsPlugin.create({}),
                // CursorPlugin.create({
                //     width: '2px',
                //     color: '#00b0cc',
                //     opacity: '0.3'
                // }),
                TimelinePlugin.create({
                    container: "#wave-timeline",
                    primaryColor: '#fff',
                    secondaryColor: '#fff',
                    primaryFontColor: '#fff',
                    secondaryFontColor: '#fff',
                })
            ]
        });

        this.wavesurfer.on('ready', () => {
            this.isTrackLoading = false;
        });

        this.wavesurfer.on('loading', () => {
            console.log('loading')
            this.isTrackLoading = true;
        });

        this.wavesurfer.setVolume(0.5);

        this.wavesurfer.on('audioprocess',e => {
            this.currentTime = Math.ceil(e);
        });

        this.wavesurfer.on('region-in', (region, e) => {
            this.setCurrentRegion(region.id);
        });

        this.wavesurfer.on('region-out', (region, e) => {
            this.setCurrentRegion('')
        });


        getAllMediadata().then(files => {
            this.files = files;
        });

    }

    @action
    play(start, end) {
        this.isPlaying = true;
        if (start){
            if (end) {
                this.wavesurfer.play(start,end);
                setTimeout(() => {this.pause()}, (end-start) * 1000 + 10)
            }
            else this.wavesurfer.play(start)
        } else this.wavesurfer.play();
    }

    @action
    stop(){
        this.isPlaying = false;
        this.wavesurfer.stop();
        this.currentTime = 0;
        this.currentRegion = '';
    }

    @action
    pause(){
        this.isPlaying = false;
        this.wavesurfer.pause();
    }

    @action
    load(link){
        this.wavesurfer.load(link);
    }

    on(eventName, handler){
        this.wavesurfer.on(eventName, handler);
    }

    @action
    setVolume(volume){
        this.wavesurfer.setVolume(volume);
        this.volume = volume;
    }

    @action
    mute(){
        this.isMute = !this.isMute;
        this.wavesurfer.setMute(this.isMute);
    }

    @action
    addRegion(st, end, label, id){
        this.wavesurfer.addRegion({
            id: id,
            start: st,
            end: end,
            color: getColorByLabel(label),
            drag: false,
            resize: false,
            data: {
                category: label
            }
        });
    }

    @action
    toggleMetadata(){
        this.isMetadataOpen = !this.isMetadataOpen;
    }

    @action
    setIsReady(val){
        this.isReady = val;
    }

    @action
    setCurrentRegion(id){
        this.currentRegion = id;
    }

    @action
    setCurrentTrack(track){
        this.wavesurfer.empty();
        this.stop();
        this.currentTime = 0;
        this.currentTrack = track;
        this.isTrackLoading = true;
        this.wavesurfer.clearRegions();
        this.labels = track.metadata.map(el => {
            el.id = uniqid();
            return el;
        })
        this.load(STRAPI_URL + track.acess_list.url);
        this.labels.forEach(el => this.addRegion(el.st, el.end, el.label, el.id));
    }
}

function getColorByLabel(label){
    switch (label) {
        case 'zero': return 'rgba(198,78,157,0.3)';
        case 'sheila': return 'rgba(97,22,133,0.3)';
        case 'dog': return 'rgba(200,151,57,0.3)';
        case 'happy': return 'rgba(54,0,149,0.3)';
        case 'house': return 'rgba(0,79,255,0.3)';
    }
}