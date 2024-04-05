import {
    FC,
    KeyboardEventHandler,
    MouseEvent,
    MouseEventHandler,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import DefaultTag from '@greensight/core-components-tags/src/components/Tag';
import LoadingSkeleton from '@greensight/core-components-loading-skeleton';

import { scale } from '@greensight/core-components-common';

import { FieldProps } from '@greensight/core-components-select';
import FormControl, { FormControlProps } from '@greensight/core-components-form-control';

import { BASE_INPUT_CSS } from '@greensight/core-components-input';
import { calculateTotalElementsPerRow } from '../../scripts/helpers';
import { TagListOwnProps } from './types';

export const TagList: FC<FieldProps & FormControlProps & TagListOwnProps> = ({
    size = 'md',
    isOpen,
    disabled,
    placeholder,
    selected = [],
    Arrow,
    innerProps,
    className,
    fieldCSS,
    value = '',
    rightAddons,
    autocomplete,
    isLoading = false,
    collapseOnClose = false,
    label,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    valueRenderer,
    onInput,
    handleDeleteTag,
    collapseTagList,
    moveInputToNewLine,
    transformCollapsedTagText,
    transformTagText,
    isPopoverOpen,
    handleUpdatePopover,
    Tag = DefaultTag,
    overflow = 'grow-height',
    ...restProps
}) => {
    const [focused, setFocused] = useState(false);
    const [isShowMoreEnabled, setShowMoreEnabled] = useState<boolean | undefined>(false);
    const [visibleElements, setVisibleElements] = useState(1);
    const [inputOnNewLine, setInputOnNewLine] = useState(false);
    const inputFocused = useRef(false);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const contentWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!inputRef.current) return;

        const focusHandler = () => {
            inputFocused.current = true;
        };
        const blurHandler = () => {
            inputFocused.current = false;
        };

        const input = inputRef.current;

        input.addEventListener('focus', focusHandler);
        input.addEventListener('blur', blurHandler);

        return () => {
            input?.removeEventListener('focus', focusHandler);
            input?.removeEventListener('blur', blurHandler);
        };
    }, []);

    useLayoutEffect(() => {
        if (!collapseOnClose || isPopoverOpen) return;

        setShowMoreEnabled(false);
    }, [collapseOnClose, isPopoverOpen]);

    useLayoutEffect(() => {
        setVisibleElements(selected.length);
        // setShowMoreEnabled(false);
    }, [selected]);

    useLayoutEffect(() => {
        if (collapseTagList && contentWrapperRef.current) {
            const totalVisibleElements = calculateTotalElementsPerRow(
                contentWrapperRef.current,
                autocomplete && inputRef.current ? inputRef.current : null
            );

            setVisibleElements(Math.max(1, totalVisibleElements));
        }
    }, [collapseTagList, visibleElements, autocomplete]);

    const handleFocus = useCallback(() => setFocused(true), []);
    const handleBlur = useCallback(() => setFocused(false), []);

    const inputTextIsOverflow = useCallback(
        () => inputRef.current && inputRef.current.scrollWidth > inputRef.current.clientWidth,
        []
    );

    const handleMouseDown = useCallback((event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
    }, []);

    const { onClick, ...restInnerProps } = innerProps;

    const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
        event => {
            if (onClick && contentWrapperRef.current) {
                const eventTarget = event.target as HTMLDivElement;

                const clickedInsideContent =
                    eventTarget !== contentWrapperRef.current && contentWrapperRef.current.contains(eventTarget);

                if (!clickedInsideContent) {
                    onClick(event);
                }
            }

            if (inputRef.current) {
                inputRef.current.focus();
            }
        },
        [onClick]
    );

    const handleKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
        event => {
            const lastSelectedTag = selected[selected.length - 1];

            if (event.key === 'Backspace' && !value && handleDeleteTag && lastSelectedTag) {
                handleDeleteTag(lastSelectedTag.label);
            }
        },
        [handleDeleteTag, selected, value]
    );

    const toggleCollapseRef = useRef<HTMLButtonElement>(null);

    const toggleShowMoreLessButton = useCallback<MouseEventHandler<HTMLButtonElement>>(
        event => {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
                setShowMoreEnabled(v => !v);
                if (handleUpdatePopover) {
                    handleUpdatePopover();
                }
            }
        },
        [handleUpdatePopover]
    );

    useEffect(() => {
        /**
         * Если текст не помещается в инпут, то нужно перенести инпут на новую строку.
         */
        if (moveInputToNewLine) {
            setInputOnNewLine(old => {
                // избагем дергания
                if (inputFocused.current) return true;

                if (inputTextIsOverflow() && !old) {
                    return true;
                }

                if (value.length === 0) {
                    return false;
                }

                return old;
            });
        }
    }, [value, inputTextIsOverflow, moveInputToNewLine]);

    const collapseTagTitle = useMemo(() => {
        if (isShowMoreEnabled) {
            return 'Свернуть';
        }
        if (transformCollapsedTagText) {
            return transformCollapsedTagText(selected.length - visibleElements);
        }

        return `Развернуть (${selected.length - visibleElements})`;
    }, [transformCollapsedTagText, isShowMoreEnabled, selected.length, visibleElements]);

    const filled = Boolean(selected.length > 0) || Boolean(value);

    return (
        <div ref={wrapperRef} onFocus={handleFocus} onBlur={handleBlur} className={className}>
            <FormControl
                {...restProps}
                ref={innerProps.ref}
                block
                size={size}
                focused={isOpen || focused}
                disabled={disabled}
                filled={filled || !!placeholder}
                onMouseDown={handleMouseDown}
                rightAddons={
                    <>
                        {rightAddons}
                        {Arrow}
                    </>
                }
                onClick={handleClick}
                label={label}
                labelCSS={{}}
                css={fieldCSS}
            >
                <div
                    css={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        width: '100%',
                        padding: `${scale(1, true)}px ${scale(1)}px`,
                        gap: scale(1, true),
                    }}
                    ref={contentWrapperRef}
                >
                    {selected.map((option, index) =>
                        isShowMoreEnabled || index + 1 <= visibleElements ? (
                            <Tag
                                key={option.label}
                                disabled={option.disabled || disabled}
                                onDelete={
                                    isLoading || option.disabled || disabled
                                        ? undefined
                                        : () => handleDeleteTag?.(option.label)
                                }
                                css={
                                    overflow === 'grow-height'
                                        ? { height: 'auto', textAlign: 'left' }
                                        : {
                                              overflow: 'hidden',
                                              textOverflow: 'ellipsis',
                                              whiteSpace: 'nowrap',
                                              textAlign: 'left',
                                          }
                                }
                            >
                                {/* eslint-disable-next-line no-nested-ternary */}
                                {option.content ? (
                                    transformTagText ? (
                                        transformTagText(option.content)
                                    ) : (
                                        option.content
                                    )
                                ) : option.isPreloader ? (
                                    <LoadingSkeleton
                                        width={scale(12)}
                                        height={scale(2)}
                                        css={{ alignSelf: 'center' }}
                                    />
                                ) : (
                                    option.label
                                )}
                            </Tag>
                        ) : null
                    )}
                    {visibleElements < selected.length && (
                        <Tag
                            data-collapse="collapse-last-tag-element"
                            onClick={toggleShowMoreLessButton}
                            key="collapse"
                            ref={toggleCollapseRef}
                        >
                            {collapseTagTitle}
                        </Tag>
                    )}

                    {autocomplete && (
                        // eslint-disable-next-line jsx-a11y/autocomplete-valid
                        <input
                            {...restInnerProps}
                            autoComplete="force-off"
                            ref={inputRef}
                            value={value}
                            onChange={onInput}
                            css={{
                                ...BASE_INPUT_CSS,
                                flexGrow: 1,
                                flexBasis: scale(6),
                                minWidth: scale(6),
                                minHeight: scale(3),
                                ...(inputOnNewLine && { minWidth: '100%' }),
                            }}
                            disabled={disabled}
                            onKeyDown={handleKeyDown}
                            placeholder={filled ? '' : placeholder}
                        />
                    )}

                    {placeholder && !filled && !autocomplete && <span css={{}}>{placeholder}</span>}
                </div>
            </FormControl>
        </div>
    );
};

TagList.displayName = 'TagList';
