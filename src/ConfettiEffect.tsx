import { useEffect, useRef } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { TConductorInstance, TOnInitPresetFn } from "react-canvas-confetti/dist/types";

type ConfettiEffectProp = {
  isShow: boolean
}

const ConfettiEffect = ({ isShow }: ConfettiEffectProp) => {

  const conductorRef = useRef<TConductorInstance | null>(null);

  const onInitSetup: TOnInitPresetFn = ({ conductor }) => {
    conductorRef.current = conductor
  };

  const startFirework = () => {
    if(conductorRef.current){
      conductorRef.current?.run({
        speed: 3,
        duration: 5000
      });
    }
  };

  useEffect(() => {
    if(isShow){
      startFirework();
    }
  }, [isShow])
  
  return (
    <Fireworks onInit={onInitSetup} />
  );
}

export default ConfettiEffect