import { memo, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ImagePreview } from '../scripts/constants';

interface DropzoneImageProps {
    file: File;
}

const areEqualFiles = (prevProps: DropzoneImageProps, nextProps: DropzoneImageProps) =>
    prevProps.file.name === nextProps.file.name || prevProps.file === nextProps.file;

const DropzoneImage = memo(({ file }: DropzoneImageProps) => {
    const { t } = useTranslation('translation');

    const url = useMemo(() => URL.createObjectURL(file), [file]);
    useEffect(() => () => URL.revokeObjectURL(url), [url]);

    return (
        <div
            css={{
                display: 'grid',
                placeItems: 'center',
                img: { width: ImagePreview.width, height: ImagePreview.height, objectFit: 'cover' },
            }}
        >
            <img src={url} alt={`${t('translation:preview')} ${file.name}`} />
        </div>
    );
}, areEqualFiles);

export default DropzoneImage;
