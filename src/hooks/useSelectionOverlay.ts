import { useState,useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";

export function useSelectionOverlay(){

    const overlayRef = useRef<OverlayPanel>(null);
    const [count, setCount] = useState("");

    function open(event:React.MouseEvent){
        overlayRef.current?.toggle(event);
    }

    function close(){

        overlayRef.current?.hide();
        setCount('');
    }

    return{
        overlayRef,
        count,
        setCount,
        open,
        close
    }
}