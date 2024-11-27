Used for displaying various content in tabs.

List of components:
 - TabsList
 - Tab
 - TabLinkTitle

## TabList
 TabList component is a container for rendering a list of tab titles in a scrollable or collapsible format. It manages tab selection, collapsibility, and responsiveness, and can be customized with additional functionality.

## Tab
 Tab is a container for the tab content. It displays children inside a div and manages visibility, disabled state, and styling.

## TabLinkTitle
 TabLinkTitle is a link representing a tab title. It supports custom styles, state (e.g., selected, disabled), and optional addons (left/right).

## Usage
```tsx
<Tabs scrollable>
    <Tabs.Tab title="First tab" id="1" leftAddons={<TicketIcon />}>
        Content of first tab
    </Tabs.Tab>
    <Tabs.Tab title="2nd disabled" id="2" disabled>
        <div>You cant reach me</div>
    </Tabs.Tab>
    <Tabs.Tab title="Third tab" id="custom_string" rightAddons={<span>99+</span>}>
        <div>Its a third tab</div>
    </Tabs.Tab>
</Tabs>
```
