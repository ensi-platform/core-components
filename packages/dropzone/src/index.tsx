import { type FormFieldDescendantProps, scale, useDeferredLoading } from '@ensi-platform/core-components-common';
import { FormControl } from '@ensi-platform/core-components-form-control';
import { LoadingSkeleton } from '@ensi-platform/core-components-loading-skeleton';

import { type FC, type ReactNode, useCallback, useMemo, useState } from 'react';
import {
    type DragDropContextProps,
    type DropResult,
    type DroppableProps,
    DragDropContext as UntypedDragDropContext,
    Droppable as UntypedDroppable,
} from 'react-beautiful-dnd';
import { type FileRejection, type DropzoneProps as UseDropzoneProps, useDropzone } from 'react-dropzone';

import DropzoneArea from './components/DropzoneArea';
import { DraggableDropzoneFile, DropzoneFile, type DropzoneFileProps, type FileType } from './components/DropzoneFile';
import { ErrorCodes, ImagePreview } from './scripts/constants';
import { canPreviewImages, getFileSize, makeMatrixArray, removeItemFromArray } from './scripts/utils';

const DragDropContext = UntypedDragDropContext as never as FC<DragDropContextProps & { children: ReactNode }>;
const Droppable = UntypedDroppable as never as FC<DroppableProps>;

type DropzoneProps = UseDropzoneProps &
    FormFieldDescendantProps<FileType[]> & {
        label?: string;
        /** On files change callback */
        onFilesChange?: (files: FileType[]) => void;
        /** On file remove callback. You may need it for remove already uploaded file from Database */
        onFileRemove?: DropzoneFileProps['onRemoveClick'];
        /** On file click callback. You may need it for downloading file */
        onFileClick?: DropzoneFileProps['onFileClick'];
        /** Enable file click callback. */
        enableFileClick?: DropzoneFileProps['enableFileClick'];
        /** Disable dragging */
        isDragDisabled?: boolean;
        /** Disable delete button */
        isDisableRemove?: boolean;
        /** Button-like view */
        simple?: boolean;

        maxFileNameLength?: number;

        isLoading?: boolean;

        onBlur?: () => void;
    };

export const Dropzone: FC<DropzoneProps> = ({
    meta,
    accept,
    maxFiles,
    maxSize,
    maxFileNameLength,
    field,
    onFilesChange,
    onFileRemove: onFileRemoveFromProps,
    isDragDisabled,
    isDisableRemove,
    disabled,
    simple,
    isLoading = false,
    onFileClick,
    enableFileClick = false,
    label,
    onBlur,
    ...props
}) => {
    const imagePreview = canPreviewImages(accept);

    /** checks is our Dropzone controlled by Formik or not  */
    const isControlled = typeof field?.value !== 'undefined';
    const [filesState, setFilesState] = useState<File[]>([]);
    const files = useMemo(
        () => (isControlled ? field?.value || [] : filesState),
        [field?.value, filesState, isControlled]
    );

    const setFiles = useCallback(
        (newFiles: FileType[]) => {
            if (isControlled) {
                field?.onChange({
                    target: {
                        value: newFiles,
                    },
                });
            } else {
                setFilesState(newFiles);
            }
            if (onFilesChange) onFilesChange(newFiles);
        },
        [field, isControlled, onFilesChange]
    );

    const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);

    const fileValidator = (file: FileType) => {
        if (maxSize && file.size > maxSize)
            return { code: ErrorCodes.TOO_BIG_FILE, message: `Максимальный размер файла ${getFileSize(maxSize)}` };
        if (maxFileNameLength && file.name.length > maxFileNameLength)
            return {
                code: ErrorCodes.TOO_LONG_FILE_NAME,
                message: `Максимальная длина имени файла ${maxFileNameLength} символов`,
            };
        return null;
    };

    const filterRepeatedFiles = useCallback(
        (newFiles: FileType[]) => newFiles.filter(f => !files.find(af => af.name === f.name)),
        [files]
    );

    const onDropAccepted = useCallback(
        (acceptedFiles: FileType[]) => {
            setFiles([...files, ...filterRepeatedFiles(acceptedFiles)]);
        },
        [files, filterRepeatedFiles, setFiles]
    );

    const onDropRejected = useCallback((rejectedFiles: FileRejection[]) => {
        setRejectedFiles(rejectedFiles);
    }, []);

    const onFileRemove = useCallback(
        (removedFileIndex: number, removedFile: FileType) => {
            setFiles(removeItemFromArray<FileType>(files, removedFileIndex));
            if (onFileRemoveFromProps) onFileRemoveFromProps(removedFileIndex, removedFile);
        },
        [files, onFileRemoveFromProps, setFiles]
    );

    const onRejectedFileRemove = useCallback(
        (removedFileIndex: number) => {
            const newRejectedFiles = removeItemFromArray<FileRejection>(rejectedFiles, removedFileIndex);

            /** If add too much files and delete one, so validation will be passed, move valid files to state */
            if (maxFiles && newRejectedFiles.length <= maxFiles) {
                const accepted = newRejectedFiles
                    .filter(f => f.errors.find(e => e.code === ErrorCodes.TOO_MANY_FILES))
                    .map(f => f.file);
                const rejected = newRejectedFiles.filter(f => f.errors.find(e => e.code !== ErrorCodes.TOO_MANY_FILES));
                setFiles([...files, ...accepted]);
                setRejectedFiles(rejected);
            } else {
                setRejectedFiles(newRejectedFiles);
            }
        },
        [rejectedFiles, maxFiles, setFiles, files]
    );

    const { getRootProps, getInputProps, rootRef } = useDropzone({
        onDropAccepted,
        onDropRejected,
        accept,
        maxFiles,
        validator: fileValidator,
        disabled,
        ...props,
    });

    const containerWidth = useMemo(
        () => (imagePreview ? rootRef.current?.offsetWidth || 0 : 0),
        [imagePreview, rootRef]
    );
    const itemsInRow = useMemo(
        () => (imagePreview ? Math.floor(containerWidth / (ImagePreview.width + scale(2))) || 0 : 0),
        [containerWidth, imagePreview]
    );
    const filesMatrix = useMemo(() => {
        if (imagePreview && itemsInRow) {
            return makeMatrixArray<FileType>(files, itemsInRow);
        }
        return [files];
    }, [files, imagePreview, itemsInRow]);

    /** react beautiful dnd callbacks */
    const reorderItems = useCallback(
        (startIndex: number, endIndex: number) => {
            const newFiles = files.slice();
            const [movedItem] = newFiles.splice(startIndex, 1);
            let newEndIndex = endIndex;
            if (Math.floor(endIndex / itemsInRow) > Math.floor(startIndex / itemsInRow) && endIndex > startIndex) {
                newEndIndex -= 1;
            }
            newFiles.splice(newEndIndex, 0, movedItem);
            setFiles(newFiles);
        },
        [files, itemsInRow, setFiles]
    );

    const onDragEnd = useCallback(
        ({ source, destination }: DropResult) => {
            if (!destination || (destination.index === source.index && destination.droppableId === source.droppableId))
                return;
            reorderItems(
                source.index + +source.droppableId * itemsInRow,
                destination.index + +destination.droppableId * itemsInRow
            );
        },
        [reorderItems, itemsInRow]
    );

    const deferredIsLoading = useDeferredLoading(isLoading, 1000);

    return (
        <FormControl label={label} error={meta?.error}>
            <DropzoneArea
                {...getRootProps()}
                inputFieldProps={{
                    ...getInputProps(),
                    onBlur,
                }}
                disabled={disabled || isDragDisabled}
                simple={simple}
                meta={meta}
            />
            {deferredIsLoading ? (
                <LoadingSkeleton height={scale(28)} width={scale(23)} />
            ) : (
                <div css={imagePreview && { display: 'flex', flexWrap: 'wrap' }}>
                    <DragDropContext onDragEnd={onDragEnd}>
                        {filesMatrix.map((filesArr, idx) => (
                            <Droppable
                                droppableId={`${idx}`}
                                direction={imagePreview ? 'horizontal' : 'vertical'}
                                isCombineEnabled={imagePreview}
                                key={idx}
                            >
                                {provided => (
                                    <ul
                                        css={{
                                            marginTop: scale(1),
                                            ...(imagePreview && {
                                                marginRight: scale(2),
                                                overflow: 'hidden',
                                                width: '100%',
                                            }),
                                        }}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {filesArr?.map((file, index) => (
                                            <DraggableDropzoneFile
                                                key={
                                                    file?.name && file?.lastModified
                                                        ? `${file.name + file.lastModified}`
                                                        : index
                                                }
                                                file={file}
                                                index={index}
                                                onRemoveClick={onFileRemove}
                                                isDisableRemove={isDisableRemove}
                                                imagePreview={imagePreview}
                                                isDragDisabled={disabled || isDragDisabled}
                                                disabled={disabled}
                                                onFileClick={onFileClick}
                                                enableFileClick={enableFileClick}
                                            />
                                        ))}
                                        {provided.placeholder as string}
                                    </ul>
                                )}
                            </Droppable>
                        ))}
                    </DragDropContext>
                    <ul css={{ marginTop: scale(1) }}>
                        {rejectedFiles.map((rejections, index) => (
                            <DropzoneFile
                                key={rejections.file.name}
                                file={rejections.file}
                                index={index}
                                onRemoveClick={onRejectedFileRemove}
                                imagePreview={imagePreview}
                                errors={rejections.errors}
                                onFileClick={onFileClick}
                                enableFileClick={enableFileClick}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </FormControl>
    );
};
