import {observable, action} from "mobx";

export default class MediaRecorderService {

    @observable isRecording = false;
    mediaRecorder;
    ws = new WebSocket(VOICE_REC_URL);
    intervalId;
    @observable messages = [];

    constructor() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                const reader = new FileReader();
                this.mediaRecorder = new MediaRecorder(stream, {bitsPerSecond: 44100});
                this.mediaRecorder.ondataavailable =(e) => {

                    reader.readAsDataURL(e.data);
                    reader.onloadend = () => {
                        this.ws.send(reader.result.substr(35));
                    }
                };

            });
        this.ws.onmessage = e => {
            if (e.data.charAt(0) !== '{') this.addMessage(e.data)
        }
    }

    @action.bound
    start(){
        this.isRecording = true;
        this.mediaRecorder.start();
        this.intervalId = setInterval(() => {
            this.mediaRecorder.requestData();
        }, 1000);
    }

    @action.bound
    stop(){
        this.isRecording = false;
        clearInterval(this.intervalId);
        this.mediaRecorder.stop();
        this.intervalId = setTimeout(() => {this.ws.send('stop')}, 1000);
    }

    @action
    addMessage(msg){
        this.messages.push(msg);
    }
}