## Description

Component of term - definition list, made on ul/li tags  
Each item of list can have one of these three types:

1. base (ReactNode | string)
2. date
3. boolean

## Usage

Specify an array with the following structure of each element:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` |  param name / term |
| `value` | `ReactNode | string | boolean` |  param value / definition |
| `type` | `'base' | 'date' | 'boolean'` |  value type (if the type is omitted, the default type "base" will be used) |
| `valueNoWrap` | `boolean` |  prop, responsible for text wrapping (default -false) |


```tsx
<DescriptionList>
    {(
        [
            {
                name: 'Number of characteristics:',
                value: 5,
            },
            {
                name: 'Number of products:',
                value: 10,
            },
        ] as DescriptionListItemCommonType[]
    ).map(item => (
        <DescriptionListItem {...item} key={item.name} />
    ))}
</DescriptionList>
```
