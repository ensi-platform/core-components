import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useEffect, useState } from 'react';

import TicketIcon from '@icons/small/card.svg';

import README from './README.md';
import Tabs from './index';

export default {
    title: 'Components / Tabs',
    component: Tabs,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
        backgrounds: {
            default: 'grey100',
        },
    },
} as Meta<typeof Tabs>;

const ShowMore = () => (
    <select>
        <option selected disabled>
            TODO: select
        </option>
    </select>
);

export const Basic: StoryObj<ComponentProps<typeof Tabs>> = {
    args: {
        fullWidthScroll: false,
        scrollable: false,
        collapsible: false,
        theme: 'basic',
    },
    argTypes: {
        scrollable: {
            description:
                'Табы за пределами ширины экраны доступны через горизонтальный скроллинг. Несовместим с `collapsible`.',
            type: 'boolean',
        },
        collapsible: {
            description:
                'Табы за пределами ширины экраны доступны через `Select` с опциями из табов, которые за пределами (обновляется автоматически). Несовместим со `scrollable`.',
        },
        theme: {
            options: ['basic', 'secondary'],
            control: { type: 'radio' },
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Story description',
            },
        },
    },
    render: args => (
        <Tabs {...args}>
            <Tabs.Tab title="First tab" id="1">
                Content of first tab
            </Tabs.Tab>
            <Tabs.Tab title="Second tab" id="2">
                Content of second tab
            </Tabs.Tab>
            <Tabs.Tab title="Third tab" id="3">
                Content of third tab
            </Tabs.Tab>
        </Tabs>
    ),
};

export const Scrollable: StoryObj<ComponentProps<typeof Tabs>> = {
    parameters: {
        docs: {
            description: {
                story: `Поддерживает флаг \`scrollable\`, позволяющий удобно перемещаться между 
                табами, когда их много.  Автоматически следит за активным табом при помощи мышки
                или клавиатуры, и не дает активному табу быть вне поля зрения, активируя плавный
                скроллинг`,
            },
        },
    },
    render: () => (
        <Tabs scrollable>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map(e => (
                <Tabs.Tab title={`Tab #${e}`} id={String(e)}>
                    Content of {e}
                </Tabs.Tab>
            ))}
        </Tabs>
    ),
};

export const Collapsible: StoryObj<ComponentProps<typeof Tabs>> = {
    parameters: {
        docs: {
            description: {
                story: 'Табы за пределами ширины экраны доступны через `Select` с опциями из табов, которые за пределами (обновляется автоматически). Несовместим со `scrollable`. TODO: Временно не работает пока не перенесли Select',
            },
        },
    },
    render: () => (
        <Tabs fullWidthScroll={false} scrollable={false} collapsible ShowMoreButton={ShowMore}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(e => (
                <Tabs.Tab key={e} title={`Lorem ipsum, dolor sit  #${e}`} id={String(e)}>
                    Lorem ipsum, dolor sit amet, concircipuus {e}
                </Tabs.Tab>
            ))}
        </Tabs>
    ),
};

const DynamicsTabsExample = (args: Omit<ComponentProps<typeof Tabs>, 'children'>) => {
    const [isLoading, setLoading] = useState(true);
    const [isLoadingRerender, setLoadingRerender] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        setTimeout(() => {
            setLoadingRerender(false);
        }, 1000);
    }, []);
    return (
        <Tabs {...args}>
            <Tabs.Tab title="First tab" id="1" leftAddons={<TicketIcon />}>
                Content of first tab
            </Tabs.Tab>
            <Tabs.Tab title="2nd disabled" disabled id="2">
                <div>You cant reach me</div>
            </Tabs.Tab>
            <Tabs.Tab
                title="Link has focus"
                id="link1"
                renderTitle={props => <Tabs.LinkTitle href="https://google.com" target="_blank" {...props} />}
                leftAddons={<TicketIcon />}
                rightAddons={<span style={{ color: 'red' }}>[SALE]</span>}
            >
                <div />
            </Tabs.Tab>
            <Tabs.Tab title="Third tab" id="3" rightAddons={<span>99+</span>}>
                <div>Its a third tab</div>
            </Tabs.Tab>
            {!isLoadingRerender
                ? [1, 2, 3].map(e => (
                      <Tabs.Tab
                          key={e + 3}
                          title={isLoading ? `Loading tab#${e + 3}` : `Appeared #${e + 3}`}
                          id={e + 3}
                          disabled={isLoading}
                      >
                          <div>Its a dynamic tab #{e + 3}</div>
                      </Tabs.Tab>
                  ))
                : null}
            {[4, 5, 6, 7, 8, 9, 10].map(e => (
                <Tabs.Tab
                    key={e + 3}
                    title={isLoading ? `Loading tab#${e + 3}` : `Dynamic tab#${e + 3}`}
                    id={e + 3}
                    disabled={isLoading}
                >
                    <div>Its a dynamic tab #{e + 3}</div>
                </Tabs.Tab>
            ))}
            <Tabs.Tab
                title="I am a last link"
                id="link2"
                renderTitle={props => <Tabs.LinkTitle href="https://ya.ru" target="_blank" {...props} />}
                unfocusable
            >
                <div />
            </Tabs.Tab>
        </Tabs>
    );
};

export const Dynamic: StoryObj<ComponentProps<typeof Tabs>> = {
    args: {
        scrollable: true,
        theme: 'basic',
    },
    argTypes: {
        theme: {
            options: ['basic', 'secondary'],
            control: { type: 'radio' },
        },
    },
    parameters: {
        docs: {
            description: {
                story: "Компонент поддерживает динамические табы, которые рендерятся, например, по запросу на API с клиента, или при помощи next функции ```dynamic((() => import('@components/Another'))``` Можно использовать `disabled` для незагруженных табов.",
            },
        },
    },
    render: args => <DynamicsTabsExample {...args} />,
};
