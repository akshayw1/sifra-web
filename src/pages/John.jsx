import {React,useEffect,useRef} from "react";
import { Avatar } from "../components/Avatar";
import MainHome from "../components/NavBar";
// import NavBar from "./NavBar";


const John = () => {
    const videoRef = useRef(null);

    useEffect(() => {
      let stream;
  
      const renderCameraStream = async () => {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
  
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.autoplay = true;
            videoRef.current.className = 'my-cam-video';
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
        }
      };
  
      renderCameraStream();
  
      return () => {
        // Cleanup: stop the stream when the component unmounts
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
      };
    }, []);

    const dynamicConfig = {
        cogSvcRegion: "eastus",
        cogSvcSubKey: "4e8e4c5525614cc18d70e25327142b2c",
        voiceName: "en-US-JennyNeural",
        avatarCharacter: "lisa",
        avatarStyle: "casual-sitting",
        avatarBackgroundColor: "rgba(255, 255, 255, 0)", // Transparent background
        iceUrl: "stun:relay.communication.microsoft.com:3478",
        iceUsername: "BQAANrOeSIAB2m5o5KGEoRHWlEeqY2ISg9N+QRNVp/oAAAAMARC9dYP5KjZFsJTtdPP3zgvljp6ZcWbXJqXjamng6SK3AM7I9+A=",
        iceCredential: "bMmWbvT4bRrxxSukdyy/F6MCq/0="
    };
      
  return (
    <>
    <MainHome/>
      <div className="back h-[100vh]">
        <div className="main-chat p-4 gap-10 flex">
       
          <div className="avatar-bot rounded-lg bg-[#ffffff] h-[85vh] w-[100%]">
          <h1>Hey John here</h1>
          <Avatar config={dynamicConfig} />

          </div>

          <div className="my-cam bg-[#120d23] rounded-lg h-[85vh] w-[100%]">
      <video ref={videoRef} className="my-cam-video"></video>
    </div>
        </div>
      </div>
    </>
  );
};

export default John;
