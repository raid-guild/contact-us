export const raidGuildColors = {
  // Moloch Palette (Primary Red/Orange)
  moloch: {
    100: "#FAEEEB", // #FAEEEB
    200: "#EFC5BB", // #EFC5BB
    300: "#E39B8B", // #E39B8B
    400: "#D25C41", // #D25C41 (Moloch 400)
    500: "#BD482D", // #BD482D (Moloch 500)
    600: "#8B3521", // #8B3521 (Moloch 600)
    700: "#5C2316", // #5C2316 (Moloch 700)
    800: "#29100A", // #29100A (Moloch 800)
  },

  // Scroll Palette (Yellow/Green)
  scroll: {
    100: "#F9F7E7", // #F9F7E7
    200: "#ECE5AC", // #ECE5AC
    300: "#DCCD6A", // #DCCD6A
    400: "#D2C141", // #D2C141
    500: "#B5A22C", // #B5A22C
    600: "#837820", // #837820
    700: "#534A13", // #534A13
    800: "#211E07", // #211E07
  },

  // Neutral Palette (Grays)
  neutral: {
    100: "#F1EFEE", // #F1EFEE
    200: "#D5CECD", // #D5CECD
    300: "#B9AEAC", // #B9AEAC
    400: "#9E8E8A", // #9E8E8A
    500: "#806F6B", // #806F6B
    600: "#645754", // #645754
    700: "#433937", // #433937
    800: "#221D1C", // #221D1C
  },

  // Black & White
  white: "#FAFAFA", // #FAFAFA
  black: "#0D0D0D", // #0D0D0D
};

// Semantic Color Mapping
export const semanticColors = {
  primary: raidGuildColors.moloch,
  secondary: raidGuildColors.scroll,
  neutral: raidGuildColors.neutral,
  background: {
    primary: raidGuildColors.black,
    secondary: raidGuildColors.neutral[800],
    tertiary: raidGuildColors.neutral[100],
  },
  text: {
    primary: raidGuildColors.white,
    secondary: raidGuildColors.neutral[300],
    muted: raidGuildColors.neutral[500],
    inverse: raidGuildColors.black,
  },
  border: {
    default: raidGuildColors.neutral[700],
    muted: raidGuildColors.neutral[800],
  },
};
