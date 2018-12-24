<title>Popover with custom Trigger</title>

<template>
<!-- div is needed: otherwise the popover will not be positioned correctly -->
<div>
  <FdPopover>
    <FdButton styling="emphasized" type="positive" slot="control">Custom Popover Trigger Control</FdButton>
    <FdMenu>
      <FdMenuList>
        <FdMenuItem>Option 1</FdMenuItem>
        <FdMenuItem>Option 2</FdMenuItem>
        <FdMenuItem>Option 3</FdMenuItem>
        <FdMenuItem>Option 4</FdMenuItem>
      </FdMenuList>
    </FdMenu>
  </FdPopover>
</div>
</template>