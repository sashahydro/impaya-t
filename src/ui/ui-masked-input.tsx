import {
    forwardRef,
    Ref,
    useImperativeHandle,
    useMemo,
    useRef
} from 'react';
import ReactInputMask, { Props } from 'react-input-mask';
import React, { InputHTMLAttributes } from 'react';

type UiMaskedInputProps = {
    isInvalid?: boolean;
    isValid?: boolean;
    value: string;
    mask: string|(RegExp|string)[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    beforeMaskedStateChange?: Props['beforeMaskedStateChange'];
} & InputHTMLAttributes<HTMLInputElement>;


export interface UiMaskedInputRef {
    focus: () => void;
}

export default forwardRef((props: UiMaskedInputProps, ref: Ref<UiMaskedInputRef>) => {
    const inputRef = useRef<ReactInputMask>(null);

    const propsCopy = useMemo(() => {
        const _copy = JSON.parse(JSON.stringify(props));

        // cleanup
        (['isInvalid', 'isValid', 'className', 'mask', 'onChange', 'beforeMaskedStateChange'] as const).forEach((prop) => {
            try {
                delete _copy[prop];
            } catch (e) {
                //
            }
        });

        return _copy;
    }, [props]);

    useImperativeHandle(ref, () => ({
        focus: () => {
            try {
                const { current } = inputRef;

                // Cause render will generate plain <input>
                // Let's trick it a bit to save time on typing someones component
                ((current as unknown) as HTMLInputElement).focus();
            } catch (e) {
                // No focus - no luck
            }
        }
    }));

    const classes = ['form-control'];

    if (props.className) {
        classes.push(props.className);
    }

    if (props.isInvalid) {
        classes.push('is-invalid');
    } else if (props.isValid) {
        classes.push('is-valid');
    }


    return (
        <ReactInputMask
            ref={inputRef}
            className={classes.join(' ')}
            {...propsCopy}
            mask={props.mask}
            onChange={props.onChange}
            beforeMaskedStateChange={props.beforeMaskedStateChange}>
        </ReactInputMask>
    );
});
