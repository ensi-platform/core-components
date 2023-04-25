import { HTMLProps, MutableRefObject, Ref, forwardRef, useEffect, useRef } from 'react';

import Checkbox from '@components/Checkbox';

export interface IndeterminateCheckboxProps extends HTMLProps<HTMLInputElement> {
    indeterminate?: boolean;
    id: string;
    parentTableName?: string;
}

const useCombinedRefs = (...refs: any[]): MutableRefObject<any> => {
    const targetRef = useRef();

    useEffect(() => {
        refs.forEach(ref => {
            if (!ref) return;

            if (typeof ref === 'function') {
                ref(targetRef.current);
            } else {
                ref.current = targetRef.current;
            }
        });
    }, [refs]);

    return targetRef;
};

// TODO: доработать компонент Checkbox, дать ему состояние неопределенности.
// уже не первый случай когда это требуется

const IndeterminateCheckbox = forwardRef<HTMLInputElement, IndeterminateCheckboxProps>(
    ({ indeterminate, parentTableName, ...rest }, ref: Ref<HTMLInputElement>) => {
        const defaultRef = useRef(null);
        const combinedRef = useCombinedRefs(ref, defaultRef);

        useEffect(() => {
            if (combinedRef?.current) {
                combinedRef.current.indeterminate = indeterminate ?? false;
            }
        }, [combinedRef, indeterminate]);

        return (
            <Checkbox
                name={`checkbox-${rest.id}${parentTableName ? `-${parentTableName}` : ''}`}
                innerRef={combinedRef}
                {...rest}
            />
        );
    }
);

export default IndeterminateCheckbox;
