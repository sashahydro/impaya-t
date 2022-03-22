import { useRef } from "react";
import { UiMaskedInputRef } from "../ui/ui-masked-input";

export default function useFocus()  {
    const htmlElRef = useRef<UiMaskedInputRef>(null);
    const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

    return [htmlElRef, setFocus] as const;
};
