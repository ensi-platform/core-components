import { memo, useEffect, useMemo } from 'react';

import { ImagePreview } from '../scripts/constants';

interface DropzoneImageProps {
    file: File;
}

const areEqualFiles = (prevProps: DropzoneImageProps, nextProps: DropzoneImageProps) =>
    prevProps.file.name === nextProps.file.name || prevProps.file === nextProps.file;

const DropzoneImage = memo(({ file }: DropzoneImageProps) => {
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
            <img src={url} alt={`Превью картинки ${file.name}`} />
        </div>
    );
}, areEqualFiles);

export default DropzoneImage;
