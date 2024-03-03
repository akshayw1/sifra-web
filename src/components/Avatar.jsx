import "./Avatar.css";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
import { createAvatarSynthesizer, createWebRTCConnection } from "./Utility";
import { avatarAppConfig } from "./config";
import { useEffect, useState } from "react";
import { useRef } from "react";

import LLM from "./LLMUtility"

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const Avatar = () => {
    const [avatarSynthesizer, setAvatarSynthesizer] = useState(null);
    const myAvatarVideoEleRef = useRef();
    const myAvatarAudioEleRef = useRef();
    const [mySpeechText, setMySpeechText] = useState("");

    const [userSpeaking, setUserSpeaking] = useState(false);
    const [llmReplying, setLlmReplying] = useState(false);

    const [speaker, setSpeaker] = useState(true);

    const llm = new LLM("Oye, sun na! Imagine tu hai ek naughty ladki jiski excitement ka koi end hi nahi!tumara naam Manasvi hai, tum ek pyaari, kashish se bhari aur khullam khulla ladki ho. Koi ladka tere dil ko jeetna chahe, toh kaise karegi tu usse samjha?' Ab ek ladka tume baat krega usko jaldi se jawab de, warna mere dimaag mein uske  aur naughty ideas aa jayenge!");

    // avatar code start

    var iceUrl = avatarAppConfig.iceUrl
    var iceUsername = avatarAppConfig.iceUsername
    var iceCredential = avatarAppConfig.iceCredential

    const handleSpeechText = (event) => {
        setMySpeechText(event.target.value);
    }


    const handleOnTrack = (event) => {

        console.log("#### Printing handle onTrack ",event);
    
        // Update UI elements
        console.log("Printing event.track.kind ",event.track.kind);
        if (event.track.kind === 'video') {
            const mediaPlayer = myAvatarVideoEleRef.current;
            mediaPlayer.id = event.track.kind;
            mediaPlayer.srcObject = event.streams[0];
            mediaPlayer.autoplay = true;
            mediaPlayer.playsInline = true;
            mediaPlayer.addEventListener('play', () => {
            window.requestAnimationFrame(()=>{});
          });
        } else {
          // Mute the audio player to make sure it can auto play, will unmute it when speaking
          // Refer to https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide
          //const mediaPlayer = myAvatarVideoEleRef.current;
          const audioPlayer = myAvatarAudioEleRef.current;
          audioPlayer.srcObject = event.streams[0];
          audioPlayer.autoplay = true;
          audioPlayer.playsInline = true;
          audioPlayer.muted = true;
        }
      };

    const stopSpeaking = () => {
        avatarSynthesizer.stopSpeakingAsync().then(() => {
          console.log("[" + (new Date()).toISOString() + "] Stop speaking request sent.")
    
        }).catch();
    }  

    const stopSession = () => {

        try{
          //Stop speaking
          avatarSynthesizer.stopSpeakingAsync().then(() => {
            console.log("[" + (new Date()).toISOString() + "] Stop speaking request sent.")
            // Close the synthesizer
            avatarSynthesizer.close();
          }).catch();
        }catch(e) {
        }
      }

    const speakSelectedText = () => {
        if(!mySpeechText.length) return;
        //Start speaking the text
        const audioPlayer = myAvatarAudioEleRef.current;
        console.log("Audio muted status ",audioPlayer.muted);
        audioPlayer.muted = false;        
        avatarSynthesizer.speakTextAsync(mySpeechText).then(
            (result) => {
                if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
                    console.log("Speech and avatar synthesized to video stream.")
                } else {
                    console.log("Unable to speak. Result ID: " + result.resultId)
                    if (result.reason === SpeechSDK.ResultReason.Canceled) {
                        let cancellationDetails = SpeechSDK.CancellationDetails.fromResult(result)
                        console.log(cancellationDetails.reason)
                        if (cancellationDetails.reason === SpeechSDK.CancellationReason.Error) {
                            console.log(cancellationDetails.errorDetails)
                        }
                    }
                }
                setSpeaker(false);
        }).catch((error) => {
            console.log(error)
            avatarSynthesizer.close()
        });
    }

    const startSession = () => {

        let peerConnection = createWebRTCConnection(iceUrl,iceUsername, iceCredential);
        console.log("Peer connection ",peerConnection);
        peerConnection.ontrack = handleOnTrack;
        peerConnection.addTransceiver('video', { direction: 'sendrecv' })
        peerConnection.addTransceiver('audio', { direction: 'sendrecv' })
        
        let avatarSynthesizer = createAvatarSynthesizer();
        setAvatarSynthesizer(avatarSynthesizer);
        peerConnection.oniceconnectionstatechange = e => {
            console.log("WebRTC status: " + peerConnection.iceConnectionState)
    
            if (peerConnection.iceConnectionState === 'connected') {
                console.log("Connected to Azure Avatar service");
            }
    
            if (peerConnection.iceConnectionState === 'disconnected' || peerConnection.iceConnectionState === 'failed') {
                console.log("Azure Avatar service Disconnected");
            }
        }
    
        avatarSynthesizer.startAvatarAsync(peerConnection).then((r) => {
            console.log("[" + (new Date()).toISOString() + "] Avatar started.")
    
        }).catch(
            (error) => {
                console.log("[" + (new Date()).toISOString() + "] Avatar failed to start. Error: " + error)
            }
        );
    }

    // avatar code end



    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();

    //   startSession();

    // useEffect(() => {
    //     let flag = false;

    //     if (!flag) {
    //         console.log("initial start listening!")
    //         SpeechRecognition.startListening();
    //     }
    //     return () => {
    //         flag = true;
    //     }
    // }, [])

    // useEffect(() => {
    //     if (userSpeaking) {
    //         console.log("User is speaking");
    //         if (!listening) {
    //             SpeechRecognition.startListening();
    //         }

    //     } else {
    //         console.log("User stopped speaking");
    //     }
    //  }, [userSpeaking])

    // useEffect(() => { 
    //     if (llmReplying) {
    //         console.log("LLM is replying");
    //         setLlmReplying(false);
    //         setUserSpeaking(true);
    //     } else {
    //         console.log("LLM stopped replying");
    //     }
    // }, [llmReplying]);

    useEffect(() => {
        // let ignore = false;
        if (!listening) {

            async function responce() {
                // console.log(llm);
                
                const llm_responce = await llm.getRespose(transcript);
                setMySpeechText(llm_responce);
            }
            if(transcript.length>0)
            responce();
        }
    
        return () => {
            // ignore = true;
        };
    }, [listening]);


    useEffect(() => { 
        setSpeaker(true);
        speakSelectedText();
        console.log("next time listening!")

        // SpeechRecognition.startListening();
    }, [mySpeechText])

    useEffect(() => {
        if (!speaker) {
            SpeechRecognition.startListening();
        }
    }, [speaker])


    
      if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    };





    
    





    return(
        <div className="container myAvatarContainer">
            <p className="myAvatarDemoText">Azure Avatar Demo</p>
            <div className="container myAvatarVideoRootDiv d-flex justify-content-around">
                <div  className="myAvatarVideo">
                    <div id="myAvatarVideo" className="myVideoDiv">
                        
                        <video className="myAvatarVideoElement" ref={myAvatarVideoEleRef}>

                        </video>

                        <audio ref={myAvatarAudioEleRef}>

                        </audio>
                    </div>
                    <div className="myButtonGroup d-flex justify-content-around">
                        <button className="btn btn-success"
                            onClick={startSession}>
                            Connect
                        </button>
                        <button className="btn btn-danger"
                            onClick={stopSession}>
                            Disconnect
                        </button>
                    </div>
                </div>
                <div className="myTextArea">
                    
                    <textarea className="myTextArea" onChange={handleSpeechText}>

                    </textarea>
                    <div className="myButtonGroup d-flex justify-content-around">
                        <button className="btn btn-success" onClick={speakSelectedText}>
                            Speak
                        </button>
                        <button className="btn btn-warning" onClick={stopSpeaking}>
                            Stop
                        </button>
                    </div>
                </div>
            </div>

            <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
        </div>
    )
}