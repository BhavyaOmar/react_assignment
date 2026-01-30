import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

interface Props{
    overlayRef: React.RefObject<OverlayPanel | null>;
    count: string;
    setCount:(v:string) => void;
    onConfirm:(count:number) => void;
    onClose:()=> void;
}

export default function SelectionOverlays({

    overlayRef,
    count,
    setCount,
    onConfirm,
    onClose,
}:Props){

    return(
        <OverlayPanel ref={overlayRef}>
      <div className="flex flex-column gap-2">
        <InputText
          value={count}
          onChange={(e) => setCount(e.target.value)}
          placeholder="Enter number"
        />
        <Button
          label="Select"
          onClick={() => {
            onConfirm(Number(count));
            onClose();
          }}
        />
      </div>
    </OverlayPanel>
    )
}