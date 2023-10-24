import { useEffect, useMemo, useState } from 'react';
import deepEqual from 'react-fast-compare';

import { usePrevious } from './usePrevious';

export const useFiltersHelperClient = <T extends Record<string, any>>(emptyInitValues: T) => {
    const [initialValues, setInitialValues] = useState(emptyInitValues);

    const prevEmptyInitValues = usePrevious(emptyInitValues);
    useEffect(() => {
        if (!deepEqual(prevEmptyInitValues, emptyInitValues)) {
            setInitialValues(emptyInitValues);
        }
    }, [emptyInitValues, prevEmptyInitValues]);
    const filtersActive = useMemo(() => !deepEqual(emptyInitValues, initialValues), [emptyInitValues, initialValues]);

    return { initialValues, pushValues: setInitialValues, filtersActive };
};
