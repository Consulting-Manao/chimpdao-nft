

## Add Discord Link to Footer

A simple update to add a Discord social link after the existing X (Twitter) link in the footer.

### What will change

The footer's social links section (GitHub, X) will get a third icon -- a Discord icon linking to `https://discord.gg/Uvvk2kMtJw`. It will use the same circular button style as the existing GitHub and X links.

### Technical details

**File: `src/components/Footer.tsx`**

1. Add a custom `DiscordIcon` SVG component (similar to the existing `XIcon` component), using the standard Discord logo path.
2. Add a new entry to the `socialLinks` array:
   ```
   { label: "Discord", href: "https://discord.gg/Uvvk2kMtJw", icon: DiscordIcon }
   ```
   This will be placed after the X entry so the order is: GitHub, X, Discord.

No other files need to change -- the existing `socialLinks.map()` loop will automatically render the new link with the same styling.

