# Tooltip Component

The Tooltip component displays a tooltip when hovering or clicking on a target element.

 - If the tooltip does not fit in the given position (```position``` prop), it will be displayed on the opposite side if there is space.
 - You can manually specify fallback positions using the ```fallbackPlacements``` prop. This sets alternative positions where the tooltip can appear if there isn’t enough space.
 - If the tooltip doesn't fit within the visible screen area, you can pass the ```availableHeight``` prop to adjust its height according to the screen edge.
 - For ```left``` and ```right``` positions, if the tooltip overflows off-screen, you need to pass ```preventOverflow = false``` as an additional parameter.

This component is based on the [alfalab/core-components](https://github.com/alfa-laboratory/core-components) library.
